// 装备属性计算：解析词条文本、计算基础/评分加成/副属性、合并角色最终面板
import { setEnhancementValue } from '@/utils/utils'
import { deriveEquipmentFaction } from '@/utils/equipment'

// 10 种固定副属性词条
export const EQUIPMENT_SUB_ATTR_OPTIONS: equipmentSubAttrOption[] = [
  { key: 'php', name: '生命力 10.8%', value: 10.8, isPercent: true },
  { key: 'hp', name: '生命力 96', value: 96, isPercent: false },
  { key: 'patk', name: '攻击力 9%', value: 9, isPercent: true },
  { key: 'atk', name: '攻击力 12', value: 12, isPercent: false },
  { key: 'pmatk', name: '魔法力 9%', value: 9, isPercent: true },
  { key: 'matk', name: '魔法力 12', value: 12, isPercent: false },
  { key: 'pdef', name: '防御力 4.32%', value: 4.32, isPercent: true },
  { key: 'pmdef', name: '魔法抵抗 4.32%', value: 4.32, isPercent: true },
  { key: 'criticalRate', name: '致命率 3%', value: 3, isPercent: true },
  { key: 'critical', name: '致命伤害 18%', value: 18, isPercent: true },
]

// 各系别需要排除的攻击类词条
const FACTION_EXCLUDE_MAP: Record<equipmentFaction, equipmentAttrKey[]> = {
  魔法系: ['atk', 'patk'],
  物理系: ['matk', 'pmatk'],
  通用系: [],
}

// 获取装备系别：数据未带 faction（旧本地数据）时按主属性兜底推导
export const getEquipmentFaction = (item: equipmentDataObj): equipmentFaction =>
  item.faction || deriveEquipmentFaction(item.mainAttr, item.part)

// 按装备系别过滤可选的副属性词条
export const getSubAttrOptions = (equipment?: equipmentDataObj): equipmentSubAttrOption[] => {
  const exclude = equipment ? FACTION_EXCLUDE_MAP[getEquipmentFaction(equipment)] : []
  return EQUIPMENT_SUB_ATTR_OPTIONS.filter((opt) => !exclude.includes(opt.key))
}

// 词条名称 -> 固定/百分比属性键
const ATTR_NAME_MAP: Record<string, { fixed: equipmentAttrKey; percent: equipmentAttrKey }> = {
  攻击力: { fixed: 'atk', percent: 'patk' },
  魔法力: { fixed: 'matk', percent: 'pmatk' },
  生命力: { fixed: 'hp', percent: 'php' },
  防御力: { fixed: 'def', percent: 'pdef' },
  魔法抵抗: { fixed: 'mdef', percent: 'pmdef' },
  致命伤害: { fixed: 'critical', percent: 'critical' },
  致命率: { fixed: 'criticalRate', percent: 'criticalRate' },
}

// 词条属性键 -> 评分加成键
const SCORE_KEY_MAP: Record<equipmentAttrKey, keyof ReturnType<typeof setEnhancementValue>> = {
  atk: 'atk',
  matk: 'atk',
  patk: 'patk',
  pmatk: 'patk',
  def: 'def',
  pdef: 'def',
  mdef: 'mdef',
  pmdef: 'mdef',
  hp: 'hp',
  php: 'php',
  critical: 'critical',
  criticalRate: 'criticalRate',
}

export const createEmptyStatPanel = (): equipmentStatPanel => ({
  atk: 0,
  matk: 0,
  patk: 0,
  pmatk: 0,
  def: 0,
  mdef: 0,
  pdef: 0,
  pmdef: 0,
  hp: 0,
  php: 0,
  critical: 0,
  criticalRate: 0,
})

// 累加面板
const mergePanel = (target: equipmentStatPanel, source: equipmentStatPanel) => {
  ;(Object.keys(target) as (keyof equipmentStatPanel)[]).forEach((key) => {
    target[key] += source[key]
  })
}

// 解析单条词条文本：「攻击力 37」→ fixed atk 37；「攻击力 45%」→ percent patk 45
export const parseEquipmentAttrText = (text: string): equipmentAttrEntry | null => {
  const trimmed = text.trim()
  if (!trimmed) return null
  const isPercent = trimmed.includes('%')
  const match = trimmed.match(/\d+(\.\d+)?/)
  if (!match) return null
  const value = parseFloat(match[0])
  const name = trimmed.replace(match[0], '').replace('%', '').trim()
  const keyMap = ATTR_NAME_MAP[name]
  if (!keyMap) return null
  return {
    type: isPercent ? 'percent' : 'fixed',
    key: isPercent ? keyMap.percent : keyMap.fixed,
    value,
    text: trimmed,
  }
}

// 解析 / 分隔的词条（专武 jbnl 为多词条可选）
export const parseEquipmentAttrEntry = (str: string): equipmentAttrEntry[] => {
  if (!str) return []
  return str
    .split('/')
    .map((item) => parseEquipmentAttrText(item))
    .filter((item): item is equipmentAttrEntry => !!item)
}

// 词条条目写入面板
const addEntryToPanel = (panel: equipmentStatPanel, entry: equipmentAttrEntry) => {
  panel[entry.key] += entry.value
}

// 词条条目按评分算法写入评分加成面板
const addScoreToPanel = (panel: equipmentStatPanel, entry: equipmentAttrEntry, score: number) => {
  const enhancement = setEnhancementValue(score)
  const scoreKey = SCORE_KEY_MAP[entry.key]
  panel[scoreKey] += enhancement[scoreKey]
}

/**
 * 计算单件装备的属性拆解（基础/评分加成/副属性）
 * @param equipment 装备数据
 * @param wear 穿戴配置（评分/副属性/专武词条选择）
 */
export const computeEquipmentStatParts = (
  equipment: equipmentDataObj,
  wear: equipmentWearObj,
): equipmentStatParts | null => {
  // 制作装备取 UR4(ur3) 属性，专武取 mainAttr
  const isSpecial = equipment.type === '专用'
  const attrSource: equipmentMainAttrObj | null = isSpecial
    ? equipment.mainAttr
    : equipment.otherAttr?.ur3 || equipment.mainAttr
  if (!attrSource) return null

  const base = createEmptyStatPanel()
  const scoreBonus = createEmptyStatPanel()
  const sub = createEmptyStatPanel()

  // 基础属性：专武主词条 zynl（固定、不吃评分）
  if (attrSource.zynl) {
    parseEquipmentAttrEntry(attrSource.zynl).forEach((entry) => addEntryToPanel(base, entry))
  }
  // 基本能力 1/2：专武按所选索引，制作装取全部
  const jbnl1List = parseEquipmentAttrEntry(attrSource.jbnl1)
  const jbnl2List = parseEquipmentAttrEntry(attrSource.jbnl2)
  const baseEntries: equipmentAttrEntry[] = []
  if (isSpecial) {
    if (jbnl1List.length && wear.jbnl1Choice !== undefined) {
      baseEntries.push(jbnl1List[wear.jbnl1Choice])
    }
    if (jbnl2List.length && wear.jbnl2Choice !== undefined) {
      baseEntries.push(jbnl2List[wear.jbnl2Choice])
    }
  } else {
    baseEntries.push(...jbnl1List, ...jbnl2List)
  }
  baseEntries.forEach((entry) => {
    addEntryToPanel(base, entry)
    addScoreToPanel(scoreBonus, entry, wear.score)
  })

  // 副属性词条
  wear.subAttrs.forEach((key) => {
    const option = EQUIPMENT_SUB_ATTR_OPTIONS.find((item) => item.key === key)
    if (option) sub[key] += option.value
  })

  return { base, scoreBonus, sub }
}

// 属性键展示名（基础词条展示用，百分比不另加 % 字样）
const ATTR_DISPLAY_NAME: Record<equipmentAttrKey, string> = {
  atk: '攻击力',
  matk: '魔法力',
  patk: '攻击力',
  pmatk: '魔法力',
  def: '防御力',
  mdef: '魔法抵抗',
  pdef: '防御力',
  pmdef: '魔法抵抗',
  hp: '生命力',
  php: '生命力',
  critical: '致命伤害',
  criticalRate: '致命率',
}

/**
 * 计算装备基础词条展示列表（每个词条单独一行：基础值+评分加成值）
 * 专武按所选索引取词条（主词条 zynl 不吃评分，score 为 0），制作装取 ur3 全部词条
 */
export const computeEquipmentBaseEntries = (
  equipment: equipmentDataObj,
  wear: equipmentWearObj,
): equipmentBaseEntryItem[] => {
  const isSpecial = equipment.type === '专用'
  const attrSource: equipmentMainAttrObj | null = isSpecial
    ? equipment.mainAttr
    : equipment.otherAttr?.ur3 || equipment.mainAttr
  if (!attrSource) return []

  const enhancement = setEnhancementValue(wear.score)
  const list: equipmentBaseEntryItem[] = []
  const pushEntry = (entry: equipmentAttrEntry, withScore: boolean) => {
    const scoreKey = SCORE_KEY_MAP[entry.key]
    list.push({
      name: ATTR_DISPLAY_NAME[entry.key],
      base: entry.value,
      score: withScore ? enhancement[scoreKey] : 0,
      isPercent: entry.type === 'percent',
    })
  }

  // 专武主词条：固定、不吃评分
  if (attrSource.zynl) {
    parseEquipmentAttrEntry(attrSource.zynl).forEach((entry) => pushEntry(entry, false))
  }
  const jbnl1List = parseEquipmentAttrEntry(attrSource.jbnl1)
  const jbnl2List = parseEquipmentAttrEntry(attrSource.jbnl2)
  if (isSpecial) {
    if (wear.jbnl1Choice !== undefined && jbnl1List[wear.jbnl1Choice]) {
      pushEntry(jbnl1List[wear.jbnl1Choice], true)
    }
    if (wear.jbnl2Choice !== undefined && jbnl2List[wear.jbnl2Choice]) {
      pushEntry(jbnl2List[wear.jbnl2Choice], true)
    }
  } else {
    ;[...jbnl1List, ...jbnl2List].forEach((entry) => pushEntry(entry, true))
  }
  return list
}

/**
 * 计算角色最终面板：裸面板 + 所有佩戴装备
 * @param charactar 角色数据（裸面板）
 * @param wears 佩戴装备列表
 * @param equipmentMap content_id -> 装备数据
 */
export const computeCharacterFinalStats = (
  charactar: selectCharacterDataObj,
  wears: equipmentWearObj[],
  equipmentMap: Map<number, equipmentDataObj>,
): finalCharacterStatsObj => {
  const merged = createEmptyStatPanel()
  wears.forEach((wear) => {
    const equipment = equipmentMap.get(wear.contentId)
    if (!equipment) return
    const parts = computeEquipmentStatParts(equipment, wear)
    if (!parts) return
    mergePanel(merged, parts.base)
    mergePanel(merged, parts.scoreBonus)
    mergePanel(merged, parts.sub)
  })
  const isMatk = charactar.attackAttribute === 'matk'
  const fixedAttack = isMatk ? merged.matk : merged.atk
  const percentAttack = isMatk ? merged.pmatk : merged.patk
  return {
    ...merged,
    panel: Math.round((charactar.panel || 0) + fixedAttack),
    attackAdd: Math.round(percentAttack * 100) / 100,
    critical: Math.round(((charactar.critical || 0) + merged.critical) * 100) / 100,
    attributeDamage: charactar.attributeDamage || 0,
  }
}

// 获取制作装备列表（UR4：存在 otherAttr.ur3）
export const getUr4CraftEquipmentList = (list: equipmentDataObj[]) =>
  list.filter((item) => item.type === '制作' && !!item.otherAttr?.ur3)

// 获取专武列表（type=专用，可选按角色过滤：只保留自身专武）
export const getSpecialEquipmentList = (
  list: equipmentDataObj[],
  charactar?: { cName?: string; name?: string },
) =>
  list.filter(
    (item) =>
      item.type === '专用' &&
      (!charactar || item.roleName === charactar.cName || item.roleName === charactar.name),
  )

// 获取可穿戴装备列表（自身专武 + UR4 制作）
export const getWearableEquipmentList = (
  list: equipmentDataObj[],
  charactar?: { cName?: string; name?: string },
) => [...getSpecialEquipmentList(list, charactar), ...getUr4CraftEquipmentList(list)]
