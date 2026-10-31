// gamekee wiki 接口的原始结构 + 解析后的中间结构
// 原始数据来自：
//   角色列表 https://www.gamekee.com/v1/entry/treesByPidV1?pid=194491
//   角色详情 https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/{contentId}.json
// 两个接口都必须带请求头 game-alias: zsca2，详情接口还要求 Origin/Referer 是 gamekee.com

/** wiki 表格里的一个单元格 */
export interface WikiCell {
  key?: string
  type?: string
  value?: string | number | null
  [key: string]: unknown
}

/** 详情页正文：baseData 是角色总表，styleData 是每个服装(皮肤)一张表 */
export interface WikiContent {
  baseData: WikiCell[][]
  styleData: { name: string; data: WikiCell[][] }[]
}

export interface WikiDetailResponse {
  content: string // 里面是一段 JSON 字符串
  editor_type?: number
}

/** 角色列表接口的节点 */
export interface GamekeeTreeNode {
  id: number // entry id（不是详情页的 contentId）
  name: string
  pid?: number
  content_id?: number // 详情页 id，type=3 的角色节点才有
  icon?: string
  name_alias?: string
  grad?: number
  tab_num?: number
  type?: number
  child?: GamekeeTreeNode[]
}

export interface GamekeeTreeResponse {
  code: number
  msg: string
  data: GamekeeTreeNode
}

export type Element = 'light' | 'dark' | 'fire' | 'wind' | 'water'

/** 角色列表里筛出来的一条角色（只保留能打开详情页的节点） */
export interface CharacterEntry {
  entryId: number
  contentId: number
  cName: string
  alias?: string
  star: number
  icon?: string
  group: string
}

/** 技能某一级（+0 ~ +5 / 满破满潜力）的数据 */
export interface ParsedSkillLevel {
  label: string // '+0' / '满破满潜力'
  sp: number
  cd: number
  description: string
  spRecover?: number
  /** 这一级的「技能范围」小图地址（wiki 各等级用的是同一张图） */
  scopeUrl?: string
}

/** 爆发升级（爆发1/爆发2/爆发3），来自服装表的「爆发」区 */
export interface ParsedBurstLevel {
  label: string // '爆发1'
  sp: number
  description: string
  /** 「范围改变」列的范围图地址（爆发后攻击范围会变的角色才有） */
  scopeUrl?: string
  /** 范围图解析结果，与技能 scope 同一套坐标系 */
  scope?: [number, number][]
}

/** 解析出来的 buff（生成 effect 时再转成项目结构） */
export interface ParsedBuff {
  kind: 'buff' | 'deBuff' | 'dot'
  /** buff 上的具体字段，比如 attackAdd / enemyWeakness */
  fields: Record<string, number>
  duration: number
  note: string
}

export interface ParsedSkill {
  /** 服装名，比如“草药猎人” */
  costume: string
  /** 技能中文名 */
  cName: string
  /** 技能名（wiki 的“技能名称”，和服装名不是一回事） */
  skillName: string
  levels: ParsedSkillLevel[]
  /** 爆发升级（爆发1/2/3），wiki 老角色没有这一区，为空数组 */
  burst: ParsedBurstLevel[]
  /** 技能潜力（wiki 里叫“技能潜力”，描述形如“伤害倍率+15%”） */
  potentials: string[]
  /** 共享能力值（Permanent） */
  permanent: Record<string, number>
  /** 绑定能力值（Bonding） */
  bonding: Record<string, number>
  /** 技能图标 */
  icon?: string
  /** 服装立绘（大图） */
  art?: string
  /** 服装小人图（Q 版） */
  chibi?: string
  /** 攻击范围：[x, y] 相对自己的偏移；[] 表示全部，[[0,0]] 表示只打自己（含中心） */
  scope?: [number, number][]
}

export interface ParsedCharacter {
  contentId: number
  entryId?: number
  /** 英文名，来自 wiki 的“角色名称”第二列，联动角色常常为空 */
  name: string
  cName: string
  star: number
  element: Element
  attackAttribute: 'atk' | 'matk'
  attackType: 'front' | 'skip'
  /** 满级面板 */
  HP: number
  ATK: number
  MATK: number
  CR: number
  CDMG: number
  DEF: number
  MRES: number
  DMG: number
  engraving: Record<string, number>
  awakening: Record<string, number>
  /** 天赋名 */
  talent?: string
  skills: ParsedSkill[]
  icon?: string
  /** 解析过程中的不确定项，页面上会展示出来提示人工复核 */
  warnings: string[]
}
