import type {
  CharacterEntry,
  Element,
  GamekeeTreeResponse,
  ParsedBurstLevel,
  ParsedCharacter,
  ParsedSkill,
  ParsedSkillLevel,
  WikiCell,
  WikiContent,
  WikiDetailResponse,
} from './types'

/** 单元格取值（数字/字符串都转成去掉首尾空白的字符串） */
const cellText = (cell?: WikiCell): string => {
  if (!cell) return ''
  const v = cell.value
  if (typeof v === 'number') return String(v)
  if (typeof v === 'string') return v.trim()
  return ''
}

/** 取出「标签 -> 后面几列」的映射，标签是每行第一格 */
const toRowMap = (rows: WikiCell[][]): Map<string, string[]> => {
  const map = new Map<string, string[]>()
  for (const row of rows || []) {
    if (!row || !row.length) continue
    const label = cellText(row[0])
    if (!label) continue
    const values = row.slice(1).map((cell) => cellText(cell))
    if (!map.has(label)) map.set(label, values)
  }
  return map
}

/** '10%' -> 10, '8.4%' -> 8.4, '167cm' -> 0, '' -> 0 */
const parseNumber = (value?: string): number => {
  if (!value) return 0
  const matched = value.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/)
  return matched ? Number(matched[0]) : 0
}

const elementMap: Record<string, Element> = {
  火: 'fire',
  水: 'water',
  风: 'wind',
  光: 'light',
  暗: 'dark',
  黑暗: 'dark',
}

/** 攻击属性：物理 -> atk，魔法 -> matk */
const parseAttackAttribute = (value: string): 'atk' | 'matk' =>
  value.includes('魔') ? 'matk' : 'atk'

/** 攻击目标：最前方 -> front，跳过 -> skip */
const parseAttackType = (value: string): 'front' | 'skip' =>
  value.includes('跳过') || value.includes('后方') ? 'skip' : 'front'

const mapHPKey = (label: string): string => {
  if (label.includes('生命')) return 'HP'
  if (label.includes('攻击')) return 'ATK'
  if (label.includes('魔法力')) return 'MATK'
  if (label.includes('防御')) return 'DEF'
  if (label.includes('抵抗')) return 'MRES'
  return ''
}

const mapAwakeningKey = (label: string): string => {
  if (label.includes('生命')) return 'PHP'
  if (label.includes('攻击')) return 'PATK'
  if (label.includes('魔法力')) return 'PMATK'
  if (label.includes('防御')) return 'DEF'
  if (label.includes('抵抗')) return 'MRES'
  if (label.includes('属性伤害')) return 'DMG'
  return ''
}

/** '//cdnimg...' -> 'https://cdnimg...' */
const absUrl = (url?: string): string | undefined => {
  if (!url) return undefined
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('http')) return url
  return undefined
}

/** 解析角色列表（只保留三个星级分组里的角色节点） */
export const parseCharacterTree = (raw: GamekeeTreeResponse): CharacterEntry[] => {
  const groups = raw?.data?.child || []
  const result: CharacterEntry[] = []
  for (const group of groups) {
    const starMatched = group.name.match(/([345])星角色/)
    if (!starMatched) continue
    const star = Number(starMatched[1])
    for (const node of group.child || []) {
      const contentId = Number(node.content_id || 0)
      if (!contentId) continue
      result.push({
        entryId: node.id,
        contentId,
        cName: node.name,
        alias: node.name_alias && node.name_alias !== node.name ? node.name_alias : undefined,
        star,
        icon: node.icon
          ? node.icon.startsWith('//')
            ? `https:${node.icon}`
            : node.icon
          : undefined,
        group: group.name,
      })
    }
  }
  return result
}

/** 解析单个角色的详情 JSON */
export const parseCharacterDetail = (
  raw: WikiDetailResponse,
  entry?: Pick<CharacterEntry, 'entryId' | 'contentId'>,
): ParsedCharacter => {
  const content: WikiContent = JSON.parse(raw.content)
  const warnings: string[] = []
  const base = toRowMap(content.baseData)

  const nameRow = base.get('角色名称') || [] // [中文名, 英文名, ...]
  const cName = nameRow[0] || ''
  const name = nameRow[1] || ''

  const star = parseNumber(base.get('星级')?.[0])
  const elementText = base.get('元素属性')?.[0] || ''
  const element = elementMap[elementText.trim()] || 'fire'
  if (!elementMap[elementText.trim()]) warnings.push(`未识别的元素属性：${elementText}`)

  const attackAttribute = parseAttackAttribute(base.get('攻击属性')?.[0] || '')
  const attackType = parseAttackType(base.get('攻击目标')?.[0] || '')

  // 面板表：1级 / 满级 / 满刻印觉醒
  const rowNumber = (label: string, index = 1): number => {
    const values = base.get(label)
    if (!values || !values.length) return 0
    const safeIndex = Math.min(index, values.length - 1)
    return parseNumber(values[safeIndex])
  }

  const HP = rowNumber('生命力')
  const ATK = rowNumber('攻击力')
  const MATK = rowNumber('魔法力')
  const CR = rowNumber('致命率')
  const CDMG = rowNumber('致命伤害')
  const DEF = rowNumber('防御力')
  const MRES = rowNumber('魔法抵抗')

  // 属性伤害那一行的标签会带元素名，比如“火属性伤害”
  let DMG = 0
  for (const [label, values] of base) {
    if (label.includes('属性伤害') && !label.includes('抵抗')) {
      DMG = parseNumber(values[1] ?? values[0])
      break
    }
  }

  // 刻印 / 觉醒：表头行形如 ['刻印', '', '觉醒', '']，后面每行是「标签 值 标签 值」
  const engraving: Record<string, number> = {}
  const awakening: Record<string, number> = {}
  const sealIndex = content.baseData.findIndex((row) => cellText(row[0]) === '刻印')
  if (sealIndex >= 0) {
    for (let i = sealIndex + 1; i < content.baseData.length; i++) {
      const row = content.baseData[i]
      const leftLabel = cellText(row[0])
      if (!leftLabel) break
      const leftKey = mapHPKey(leftLabel)
      if (leftKey) engraving[leftKey] = parseNumber(cellText(row[1]))
      const rightLabel = cellText(row[2])
      if (rightLabel) {
        const rightKey = mapAwakeningKey(rightLabel)
        if (rightKey) awakening[rightKey] = parseNumber(cellText(row[3]))
      }
    }
  } else {
    warnings.push('没有找到「刻印/觉醒」表，刻印与觉醒留空')
  }

  const skills: ParsedSkill[] = []
  for (const [index, skin] of (content.styleData || []).entries()) {
    const skinMap = toRowMap(skin.data)
    const skill = parseSkin(skinMap, skin.data, index, warnings)
    if (skill) skills.push(skill)
  }
  if (!skills.length) warnings.push('没有解析到任何技能，详情页结构可能变了')

  return {
    contentId: entry?.contentId || 0,
    entryId: entry?.entryId,
    name,
    cName,
    star,
    element,
    attackAttribute,
    attackType,
    HP,
    ATK,
    MATK,
    CR,
    CDMG,
    DEF,
    MRES,
    DMG,
    engraving,
    awakening,
    talent: base.get('天赋名称')?.[0] || undefined,
    skills,
    icon: absUrl(
      (base.get('角色头像') || []).find((url) => url.startsWith('//') || url.startsWith('http')),
    ),
    warnings,
  }
}

/** 解析一个服装(皮肤)的技能表 */
const parseSkin = (
  skinMap: Map<string, string[]>,
  rows: WikiCell[][],
  index: number,
  warnings: string[],
): ParsedSkill | null => {
  const costume = skinMap.get('服装名称')?.[0] || ''
  const skillName = skinMap.get('技能名称')?.[0] || ''
  if (!costume && !skillName) {
    warnings.push(`皮肤${index + 1} 没有服装名称和技能名称，已跳过`)
    return null
  }

  // 技能等级表：表头 ['技能效果','技能范围','SP消耗','CD','效果']，数据行标签是 +0..+5 与「满破满潜力」
  const headerIndex = rows.findIndex((row) => cellText(row[0]) === '技能效果')
  const levels: ParsedSkillLevel[] = []
  if (headerIndex >= 0) {
    for (let i = headerIndex + 1; i < rows.length; i++) {
      const row = rows[i]
      const label = cellText(row[0])
      if (!label) break
      if (!/^\+\d$/.test(label)) continue
      const level: ParsedSkillLevel = {
        label,
        sp: parseNumber(cellText(row[2])),
        cd: parseNumber(cellText(row[3])),
        description: cellText(row[4]),
        scopeUrl: absUrl(cellText(row[1])),
      }
      const spRecover = parseNumber(cellText(row[5]))
      if (spRecover) level.spRecover = spRecover
      levels.push(level)
    }
    // 个别角色（比如朱莉）wiki 只填了「满破满潜力」，用这一行兜底
    if (!levels.length) {
      const fallbackIndex = rows.findIndex(
        (row) => cellText(row[0]) === '满破满潜力' && cellText(row[4]),
      )
      if (fallbackIndex >= 0) {
        const row = rows[fallbackIndex]
        levels.push({
          label: '满破满潜力',
          sp: parseNumber(cellText(row[2])),
          cd: parseNumber(cellText(row[3])),
          description: cellText(row[4]),
          scopeUrl: absUrl(cellText(row[1])),
        })
        warnings.push(`技能「${costume || skillName}」wiki 只给了满破数据，+0~+5 需要人工补`)
      }
    }
  }
  if (!levels.length) warnings.push(`技能「${costume || skillName}」没有解析到等级表（+0~+5）`)

  // 技能潜力：行标签是 潜力1、潜力2…
  const potentials: string[] = []
  for (const [label, values] of skinMap) {
    if (/^潜力\d*$/.test(label)) {
      const desc = values[0]
      if (desc) potentials.push(desc)
    }
  }

  // 爆发表：表头 ['爆发','消耗SP','爆发效果','范围改变']，数据行标签是 爆发1/爆发2/爆发3
  // 老角色没有这一区；有些角色有表头但内容全空，这里只保留有内容的行
  const burst: ParsedBurstLevel[] = []
  for (const [label, values] of skinMap) {
    if (!/^爆发\d+$/.test(label)) continue
    const level: ParsedBurstLevel = {
      label,
      sp: parseNumber(values[0]),
      description: values[1] || '',
    }
    const scopeUrl = absUrl(values[2])
    if (scopeUrl) level.scopeUrl = scopeUrl
    if (level.sp || level.description || level.scopeUrl) burst.push(level)
  }

  const parseAbility = (text?: string): Record<string, number> => {
    const result: Record<string, number> = {}
    if (!text) return result
    for (const part of text.split(/[；;，,、\n]/)) {
      const matched = part.match(/([^\d：:]+)[：:]\s*(-?\d+(?:\.\d+)?)(%?)/)
      if (!matched) continue
      const label = matched[1].trim()
      const value = Number(matched[2])
      const percent = matched[3] === '%'
      // 字段名跟现有角色文件保持一致：防御/魔抗不论百分比都写 DEF/MRES
      let key = ''
      if (label.includes('生命')) key = percent ? 'PHP' : 'HP'
      else if (label.includes('攻击')) key = percent ? 'PATK' : 'ATK'
      else if (label.includes('魔法力')) key = percent ? 'PMATK' : 'MATK'
      else if (label.includes('防御')) key = 'DEF'
      else if (label.includes('抵抗')) key = 'MRES'
      else if (label.includes('致命率') || label.includes('暴击率')) key = 'CR'
      else if (label.includes('致命伤害') || label.includes('爆伤')) key = 'CDMG'
      else if (label.includes('属性伤害')) key = 'DMG'
      if (key) result[key] = value
    }
    return result
  }

  const permanent = parseAbility(skinMap.get('共享能力值')?.[0])
  const bonding = parseAbility(skinMap.get('绑定能力值')?.[0])

  return {
    costume: costume || skillName,
    cName: costume || skillName,
    skillName,
    levels,
    burst,
    potentials,
    permanent,
    bonding,
    icon: absUrl(
      (skinMap.get('技能图标') || []).find((url) => url.startsWith('//') || url.startsWith('http')),
    ),
    art: absUrl(
      (skinMap.get('服装立绘') || []).find((url) => url.startsWith('//') || url.startsWith('http')),
    ),
    chibi: absUrl(
      (skinMap.get('服装小人图') || []).find(
        (url) => url.startsWith('//') || url.startsWith('http'),
      ),
    ),
  }
}

export { cellText, parseNumber }
