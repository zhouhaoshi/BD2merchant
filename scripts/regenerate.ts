// 批量重新生成 src/utils/character 下全部角色文件（数据源：gamekee wiki zsca2 图鉴）
//
// 生成策略：
//   - HAND 文件（头部没有「自动生成」，且 Skill 块里已含 &- 占位符）：保留原 Skill / commonSkill /
//     panel / critical / attributeDamage，其余基础面板、刻印、觉醒从 wiki 重新生成
//   - 其余文件（AUTO / 老式 HAND）：整体重新生成，按技能 cName 复用现有 scope 数组，保留
//     panel / critical / attributeDamage 手工值
//
// 用法（项目根目录）：
//   npx esbuild scripts/regenerate.ts --bundle --platform=node --format=esm \
//     --outfile=scripts/.build/regenerate.mjs
//   node scripts/.build/regenerate.mjs --dry        # 只生成到 scripts/.build/dry/ 并出报告
//   node scripts/.build/regenerate.mjs              # 写回 src/utils/character
//   node scripts/.build/regenerate.mjs --only=loen  # 只处理文件名/中文名匹配的角色

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { generateCharacterFile, parseCharacterDetail, parseCharacterTree, toFileName } from '../src/utils/gamekee/index'
import { extractSkillEffect } from '../src/utils/gamekee/generate'
import type { CharacterEntry, GamekeeTreeResponse, ParsedCharacter, WikiDetailResponse } from '../src/utils/gamekee/types'

const DRY = process.argv.includes('--dry')
const ONLY = process.argv.find((arg) => arg.startsWith('--only='))?.slice(7)?.toLowerCase() ?? ''

const ROOT = process.cwd()
const CHARACTER_DIR = join(ROOT, 'src', 'utils', 'character')
const DRY_DIR = join(ROOT, 'scripts', '.build', 'dry')
const REPORT_PATH = join(ROOT, 'scripts', 'regenerate-report.txt')

const HEADERS = {
  'game-alias': 'zsca2',
  Origin: 'https://www.gamekee.com/',
  Referer: 'https://www.gamekee.com/',
}

const requestJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return (await res.json()) as T
}

// ==================== 文本工具 ====================

/** 从 open 下标扫描平衡括号，返回闭括号下标（找不到返回 -1） */
const balancedEnd = (text: string, open: number): number => {
  const opener = text[open]
  const closer = opener === '{' ? '}' : ']'
  let depth = 0
  for (let i = open; i < text.length; i++) {
    if (text[i] === opener) depth++
    else if (text[i] === closer) {
      depth--
      if (!depth) return i
    }
  }
  return -1
}

/** 提取 marker（形如 '  Skill: {'）开头的整个大括号块（含 marker），找不到返回 null */
const extractBlock = (text: string, marker: string): string | null => {
  const at = text.indexOf(marker)
  if (at < 0) return null
  const open = text.indexOf('{', at)
  const end = balancedEnd(text, open)
  if (end < 0) return null
  return text.slice(at, end + 1)
}

/** 替换 marker 开头的大括号块 */
const replaceBlock = (text: string, marker: string, replacement: string): string => {
  const at = text.indexOf(marker)
  if (at < 0) return text
  const open = text.indexOf('{', at)
  const end = balancedEnd(text, open)
  if (end < 0) return text
  return text.slice(0, at) + replacement + text.slice(end + 1)
}

/** Skill 块按「// 服装：」切成技能段，返回 { header, prefix, skills, tail } */
const splitSkillBlock = (block: string): { header: string; prefix: string; skills: string[]; tail: string } => {
  const match = /^(  Skill: \{)([\s\S]*)(\n  \})$/.exec(block)
  if (!match) return { header: block, prefix: '', skills: [], tail: '' }
  const parts = match[2].split(/(?=^    \/\/ 服装：)/m)
  return { header: match[1], prefix: parts[0], skills: parts.slice(1), tail: match[3] }
}

/** 块内第一个 scope 整条语句（含行尾注释），找不到返回 null */
const scopeStmtOf = (block: string): string | null => {
  const at = block.indexOf('scope:')
  if (at < 0) return null
  const open = block.indexOf('[', at)
  if (open < 0) return null
  const close = balancedEnd(block, open)
  if (close < 0) return null
  const lineEnd = block.indexOf('\n', close)
  return block.slice(at, lineEnd < 0 ? close + 1 : lineEnd)
}

/** 块内第一个 scope 整条语句替换成 newStmt */
const replaceScopeStmt = (block: string, newStmt: string): string => {
  const at = block.indexOf('scope:')
  if (at < 0) return block
  const open = block.indexOf('[', at)
  if (open < 0) return block
  const close = balancedEnd(block, open)
  if (close < 0) return block
  const lineEnd = block.indexOf('\n', close)
  const end = lineEnd < 0 ? close + 1 : lineEnd
  return block.slice(0, at) + newStmt + block.slice(end)
}

/** 技能块内的技能 cName */
const cNameOf = (block: string): string => {
  const match = /^\s{6}cName: '([^']*)'/m.exec(block)
  return match ? match[1] : ''
}

/** 技能块注释里的服装名（「// 服装：xxx / 技能：yyy」的 xxx） */
const costumeOf = (block: string): string => {
  const match = /^    \/\/ 服装：([^/]+)/m.exec(block)
  return match ? match[1].trim() : ''
}

/** 顶层某一行的整行内容（panel/critical/attributeDamage 这类单值行） */
const lineOf = (text: string, key: string): string | null =>
  text.match(new RegExp(`^  ${key}: .*$`, 'm'))?.[0] ?? null

const replaceLine = (text: string, key: string, line: string): string =>
  text.replace(new RegExp(`^  ${key}: .*$`, 'm'), line)

/** 角色文件里可能用到的 globals 枚举 */
const GLOBAL_ENUMS = ['dotBuffType', 'enemyWeaknessDeBuffType', 'specialInjuryBuffType', 'damageType']

/** 以最终文本为准重算 import 行 */
const fixImports = (out: string): string => {
  let text = out.replace(/^import .* from '@\/utils\/globals'\n/gm, '')
  const needed = GLOBAL_ENUMS.filter((name) => new RegExp(`\\b${name}\\b`).test(text))
  if (needed.length) {
    const importLine = `import { ${needed.join(', ')} } from '@/utils/globals'\n`
    text = text.replace(/(?=^const \w+: characterDataObj = \{)/m, `${importLine}\n`)
  }
  return text
}

// ==================== 现有文件 ====================

interface ExistingFile {
  file: string
  text: string
  cName: string
  isAuto: boolean
}

const existingFiles: ExistingFile[] = readdirSync(CHARACTER_DIR)
  .filter((name) => name.endsWith('.ts'))
  .map((name) => {
    const text = readFileSync(join(CHARACTER_DIR, name), 'utf8')
    return {
      file: name,
      text,
      cName: /^\s{2}cName: '([^']*)'/m.exec(text)?.[1] ?? '',
      // 带「手工维护」标记的自动生成文件仍按 HAND 处理，Skill 块不会被覆盖
      isAuto: text.includes('自动生成') && !text.includes('手工维护'),
    }
  })
const usedFiles = new Set<string>()

// ==================== 单个角色处理 ====================

interface CharReport {
  order: number
  file: string
  cName: string
  star: number
  kind: 'AUTO' | 'HAND-keep' | 'HAND-regen' | 'NEW'
  skillCount: number
  scopeInfo: string
  baseDiff: string[]
  skillLines: string[]
  skipped: boolean
}

const FIELD_KEYS = [
  'name',
  'cName',
  'star',
  'element',
  'attackAttribute',
  'attackType',
  'ATK',
  'MATK',
  'HP',
  'DEF',
  'MRES',
  'CR',
  'CDMG',
  'DMG',
  'panel',
  'critical',
  'attributeDamage',
]

const fieldValues = (text: string): Record<string, string> => {
  const map: Record<string, string> = {}
  for (const key of FIELD_KEYS) {
    const match = text.match(new RegExp(`^  ${key}: ('[^']*'|-?\\d+(?:\\.\\d+)?)`, 'm'))
    if (match) map[key] = match[1]
  }
  return map
}

const processCharacter = async (entry: CharacterEntry, order: number): Promise<CharReport | null> => {
  const raw = await requestJson<WikiDetailResponse>(
    `https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/${entry.contentId}.json`,
  )
  if (!raw || typeof raw.content !== 'string') {
    throw new Error(`详情页返回异常：${entry.cName}（contentId ${entry.contentId}）`)
  }
  const ch: ParsedCharacter = parseCharacterDetail(raw, {
    entryId: entry.entryId,
    contentId: entry.contentId,
  })

  // 现有文件：优先按中文名匹配，其次按生成的英文文件名
  let existing = existingFiles.find((f) => f.cName === ch.cName && !usedFiles.has(f.file))
  if (!existing) {
    const byName = existingFiles.find((f) => f.file === `${toFileName(ch)}.ts` && !usedFiles.has(f.file))
    existing = byName
  }
  const fileName = existing ? existing.file : `${toFileName(ch)}.ts`
  if (existing) usedFiles.add(existing.file)

  let out = generateCharacterFile(ch, fileName.replace(/\.ts$/, ''))

  let kind: CharReport['kind'] = 'NEW'
  let scopeInfo = '-'
  let skipped = false
  const baseDiff: string[] = []
  const skillLines: string[] = []

  if (existing) {
    const oldSkill = extractBlock(existing.text, '  Skill: {')
    const keepSkills = !existing.isAuto && !!oldSkill && oldSkill.includes('&-')

    if (keepSkills) {
      // 手工文件已符合 &- 占位符规范：整文件不动（wiki 面板数据有自相矛盾的地方，
      // 重新生成会把手工核对过的属性覆盖掉）
      kind = 'HAND-keep'
      skipped = true
      skillLines.push('    已使用 &- 占位符，且含手工维护数据，整文件保持不变')
      return {
        order,
        file: fileName,
        cName: ch.cName,
        star: ch.star,
        kind,
        skillCount: ch.skills.length,
        scopeInfo,
        baseDiff,
        skillLines,
        skipped,
      }
    }

    // 保留手工字段：panel / critical / attributeDamage
    for (const key of ['panel', 'critical', 'attributeDamage']) {
      const line = lineOf(existing.text, key)
      if (line) out = replaceLine(out, key, line)
    }
    // 保留 commonSkill
    const oldCommon = extractBlock(existing.text, '  commonSkill: {')
    if (oldCommon) out = replaceBlock(out, '  commonSkill: {', oldCommon)

    kind = existing.isAuto ? 'AUTO' : 'HAND-regen'
    // 按服装名（注释里的「服装：xxx」）复用 scope，找不到按 cName，再按顺序兜底
    const oldChunks = oldSkill ? splitSkillBlock(oldSkill).skills : []
    const oldScopes = oldChunks
      .map((chunk) => ({
        costume: costumeOf(chunk),
        name: cNameOf(chunk),
        stmt: scopeStmtOf(chunk),
        used: false,
      }))
      .filter((item) => item.stmt)
    const takeScope = (chunk: string): string | null => {
      const costume = costumeOf(chunk)
      const name = cNameOf(chunk)
      const byCostume = oldScopes.find((item) => !item.used && costume && item.costume === costume)
      const byName = oldScopes.find((item) => !item.used && name && item.name === name)
      const hit = byCostume || byName
      if (hit) {
        hit.used = true
        return hit.stmt
      }
      return null
    }
    const newBlock = extractBlock(out, '  Skill: {')
    const { header, prefix, skills, tail } = splitSkillBlock(newBlock ?? '')
    let matched = 0
    const rebuilt = skills.map((chunk) => {
      const scope = takeScope(chunk)
      if (scope) {
        matched++
        return replaceScopeStmt(chunk, scope)
      }
      return null
    })
    const finalChunks = rebuilt.map((chunk, index) => {
      if (chunk !== null) return chunk
      const unused = oldScopes.find((item) => !item.used)
      if (unused) {
        unused.used = true
        matched++
        return replaceScopeStmt(skills[index], unused.stmt as string)
      }
      return skills[index]
    })
    out = replaceBlock(out, '  Skill: {', header + prefix + finalChunks.join('') + tail)
    scopeInfo = `${matched}/${skills.length}`

    // 每个技能的解析结果摘要（取 +0 级）
    const newChunks = splitSkillBlock(extractBlock(out, '  Skill: {') ?? '').skills
    ch.skills.forEach((skill, index) => {
      const e0 = extractSkillEffect(skill.levels[0]?.description || '')
      const chunk = newChunks[index] ?? ''
      const hasPlaceholder = chunk.includes('&-')
      const onlyMax = skill.levels.length === 1 && skill.levels[0]?.label !== '+0'
      skillLines.push(
        `    技能「${skill.skillName || skill.cName}」${onlyMax ? '(仅满破)' : ''}: ` +
          `buff=${e0.buffs.length} deBuff=${e0.deBuffs.length} dot=${e0.dotBuffs.length} ` +
          `hit=${e0.hitBuffs.length} | uncertain=${e0.uncertain.length} notes=${e0.notes.length} | ` +
          `占位符=${hasPlaceholder ? '有' : '无'} | ${skill.levels[0]?.description?.slice(0, 50) ?? ''}`,
      )
    })

    // 基础属性差异（用最终文本对比现有文件）
    const oldValues = fieldValues(existing.text)
    const newValues = fieldValues(out)
    for (const key of FIELD_KEYS) {
      if (key === 'panel' || key === 'critical' || key === 'attributeDamage') continue
      if (oldValues[key] !== undefined && oldValues[key] !== newValues[key]) {
        baseDiff.push(`${key}: ${oldValues[key]} → ${newValues[key]}`)
      }
    }
  } else {
    skillLines.push('    新角色，无现有文件，全部按 wiki 生成')
  }

  out = fixImports(out)
  if (!out.endsWith('\n')) out += '\n'

  const target = DRY ? join(DRY_DIR, fileName) : join(CHARACTER_DIR, fileName)
  mkdirSync(DRY ? DRY_DIR : CHARACTER_DIR, { recursive: true })
  writeFileSync(target, out, 'utf8')

  return {
    order,
    file: fileName,
    cName: ch.cName,
    star: ch.star,
    kind,
    skillCount: ch.skills.length,
    scopeInfo,
    baseDiff,
    skillLines,
    skipped,
  }
}

// ==================== 主流程 ====================

const tree = await requestJson<GamekeeTreeResponse>('https://www.gamekee.com/v1/entry/treesByPidV1?pid=194491')
const entries = parseCharacterTree(tree)
if (ONLY) {
  // 命中现有文件名的，用它的中文名去匹配 wiki 条目
  const cNames = new Set(
    existingFiles
      .filter((f) => f.file.replace(/\.ts$/, '').toLowerCase().includes(ONLY) && f.cName)
      .map((f) => f.cName),
  )
  const filtered = entries.filter(
    (entry) =>
      entry.cName.toLowerCase().includes(ONLY) ||
      (entry.alias || '').toLowerCase().includes(ONLY) ||
      cNames.has(entry.cName),
  )
  console.log(`--only=${ONLY} 命中 ${filtered.length} 个角色`)
  entries.length = 0
  entries.push(...filtered)
}

console.log(`wiki 角色数：${entries.length}，模式：${DRY ? 'dry（写 scripts/.build/dry/）' : '写回 src/utils/character'}`)

const reports: CharReport[] = []
const failures: string[] = []
for (let i = 0; i < entries.length; i++) {
  const entry = entries[i]
  try {
    const report = await processCharacter(entry, i + 1)
    if (report) {
      reports.push(report)
      console.log(
        `[${i + 1}/${entries.length}] [${report.kind}] ${report.file} ${report.cName} ` +
          `(${report.star}星/${report.skillCount}技能) scope=${report.scopeInfo}`,
      )
    }
  } catch (error) {
    failures.push(`${entry.cName}（contentId ${entry.contentId}）：${(error as Error).message}`)
    console.log(`[${i + 1}/${entries.length}] [FAILED] ${entry.cName}: ${(error as Error).message}`)
  }
}

// 孤儿文件：wiki 上没有对应的现有文件（--only 模式不统计）
const orphans = ONLY ? [] : existingFiles.filter((f) => !usedFiles.has(f.file)).map((f) => f.file)

// ==================== 报告 ====================

const count = (kind: CharReport['kind']) => reports.filter((r) => r.kind === kind).length
const lines: string[] = []
lines.push(`===== 角色文件重新生成报告（${new Date().toLocaleString('zh-CN')}） =====`)
lines.push(`模式：${DRY ? 'dry' : 'write'} | wiki 角色 ${entries.length} | 生成成功 ${reports.length} | 失败 ${failures.length}`)
lines.push(
  `分类：AUTO ${count('AUTO')} | HAND保留技能 ${count('HAND-keep')} | HAND重建 ${count('HAND-regen')} | 新增 ${count('NEW')}`,
)
lines.push('')
if (failures.length) {
  lines.push('---- 失败 ----')
  failures.forEach((item) => lines.push(`  ${item}`))
  lines.push('')
}
if (orphans.length) {
  lines.push(`---- 孤儿文件（wiki 无对应，未处理）----`)
  orphans.forEach((item) => lines.push(`  ${item}`))
  lines.push('')
}
lines.push('---- 各角色 ----')
for (const r of reports) {
  lines.push(`[${r.order}] [${r.kind}] ${r.file} ${r.cName}（${r.star}星）scope复用 ${r.scopeInfo}`)
  if (r.baseDiff.length) lines.push(`    基础属性差异: ${r.baseDiff.join(' | ')}`)
  r.skillLines.forEach((item) => lines.push(item))
}
lines.push('')
lines.push('---- 汇总：+0 级 uncertain / notes 不为空的技能 ----')
for (const r of reports) {
  const interesting = r.skillLines.filter(
    (line) => line.includes('uncertain=') && !/uncertain=0 notes=0/.test(line),
  )
  if (interesting.length) {
    lines.push(`[${r.file}]`)
    interesting.forEach((item) => lines.push(item))
  }
}
writeFileSync(REPORT_PATH, lines.join('\n') + '\n', 'utf8')
console.log(`\n报告已写入 ${REPORT_PATH}`)
console.log(`分类：AUTO ${count('AUTO')} | HAND保留技能 ${count('HAND-keep')} | HAND重建 ${count('HAND-regen')} | 新增 ${count('NEW')} | 失败 ${failures.length} | 孤儿 ${orphans.length}`)
if (orphans.length) console.log(`孤儿文件：${orphans.join(', ')}`)
