import type {
  CharacterEntry,
  GamekeeTreeResponse,
  ParsedCharacter,
  WikiDetailResponse,
} from './types'
import { parseCharacterDetail, parseCharacterTree } from './parse'
import { decodePng } from './png'
import { analyzeScope } from './scope'
import type { ScopeResult } from './scope'

/** 图鉴需要带的请求头，缺了会返回 {"code":403,"msg":"缺少游戏信息"} */
export const GAME_ALIAS = 'zsca2'

/** 角色图鉴树的 pid（角色/物品图鉴） */
export const CHARACTER_TREE_PID = 194491

/** 本地开发走 vite 代理，避免 api-cdn 的 Origin 校验 */
const WIKI_PREFIX = '/gk-wiki'
const CDN_PREFIX = '/gk-cdn'

const requestJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { headers: { 'game-alias': GAME_ALIAS } })
  if (!response.ok) throw new Error(`请求失败：${response.status} ${url}`)
  return (await response.json()) as T
}

/** 详情里的图片挂在 cdnimg-v2 上，换成 api-cdn 走代理（代理会补 gamekee 的 Referer） */
const toCdnUrl = (url: string): string => {
  const absolute = url.startsWith('//') ? `https:${url}` : url
  const matched = absolute.match(/^https?:\/\/[^/]+(\/.*)$/)
  return `${CDN_PREFIX}${matched ? matched[1] : absolute}`
}

/** 同一张范围图会被反复用到（预览、保存），解析结果缓存一下 */
const scopeCache = new Map<string, Promise<ScopeResult>>()

export const fetchScope = (url: string): Promise<ScopeResult> => {
  const cached = scopeCache.get(url)
  if (cached) return cached
  const task = (async () => {
    const response = await fetch(toCdnUrl(url))
    if (!response.ok) throw new Error(`下载失败：${response.status}`)
    return analyzeScope(await decodePng(new Uint8Array(await response.arrayBuffer())))
  })()
  scopeCache.set(url, task)
  // 失败的不要留在缓存里，下次还能重试
  task.catch(() => scopeCache.delete(url))
  return task
}

/** 逐个技能解析范围图；失败只记 warning，不影响整体生成 */
const resolveScopes = async (character: ParsedCharacter): Promise<void> => {
  await Promise.all(
    character.skills.map(async (skill) => {
      const url = skill.levels.find((level) => level.scopeUrl)?.scopeUrl
      if (!url) {
        character.warnings.push(`技能「${skill.cName}」wiki 没有技能范围图，scope 需要人工确认`)
        return
      }
      try {
        const result = await fetchScope(url)
        skill.scope = result.cells
        if (result.kind !== 'grid') {
          character.warnings.push(
            `技能「${skill.cName}」范围图识别为${result.kind === 'all' ? '「全部」' : '「自己」'}`,
          )
        }
      } catch (error) {
        character.warnings.push(`技能「${skill.cName}」范围图解析失败：${(error as Error).message}`)
      }
      // 爆发升级里的「范围改变」图同样解析成 scope
      await Promise.all(
        skill.burst.map(async (burstLevel) => {
          if (!burstLevel.scopeUrl) return
          try {
            const result = await fetchScope(burstLevel.scopeUrl)
            burstLevel.scope = result.cells
            if (result.kind !== 'grid') {
              character.warnings.push(
                `技能「${skill.cName}」${burstLevel.label}范围图识别为${result.kind === 'all' ? '「全部」' : '「自己」'}`,
              )
            }
          } catch (error) {
            character.warnings.push(
              `技能「${skill.cName}」${burstLevel.label}范围图解析失败：${(error as Error).message}`,
            )
          }
        }),
      )
    }),
  )
}

/** 拉取角色列表（5/4/3 星三个分组） */
export const fetchCharacterList = async (): Promise<CharacterEntry[]> => {
  const raw = await requestJson<GamekeeTreeResponse>(
    `${WIKI_PREFIX}/v1/entry/treesByPidV1?pid=${CHARACTER_TREE_PID}`,
  )
  if (raw.code !== 0) throw new Error(`图鉴接口返回：${raw.code} ${raw.msg}`)
  return parseCharacterTree(raw)
}

/** 拉取单个角色的详情，返回解析好的结构（含技能范围） */
export const fetchCharacter = async (entry: CharacterEntry) => {
  const raw = await requestJson<WikiDetailResponse>(
    `${CDN_PREFIX}/wiki2.0/pro/50118/content/${entry.contentId}.json`,
  )
  if (!raw || typeof raw.content !== 'string') {
    throw new Error(`详情页返回异常：${entry.cName}（contentId ${entry.contentId}）`)
  }
  const character = parseCharacterDetail(raw, {
    entryId: entry.entryId,
    contentId: entry.contentId,
  })
  await resolveScopes(character)
  return character
}

export * from './types'
export { parseCharacterDetail, parseCharacterTree } from './parse'
export { generateCharacterFile, summarizeCharacter, toFileName } from './generate'
