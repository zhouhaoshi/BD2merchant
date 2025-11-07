// 伤害计算相关增益属性
interface damageObj extends userBuff, warcraftBuff {}
// 角色的属性
interface userBuff {
  panel?: number // 面板攻击力/魔法力
  attackAdd?: number // 攻击力/魔法力加成
  critical?: number // 爆伤
  multiplier?: number // 倍率
  increasedDamage?: number // 增伤
  attributeDamage?: number // 属性伤害
}
// 魔兽的属性
interface warcraftBuff {
  enemyWeakness?: number // 易伤/脆弱
  enemyDefence?: number // 防御/魔抗
  damageReduction?: number // 减伤
  chainCount?: number // 当前连锁数
  chainDamageAdd?: number // 连锁伤害加成
  attributeResistance?: number // 属性抵抗
  weakPointDamageAdd?: number // 弱点加伤
}
// 角色数据结构定义
interface characterDataObj {
  name: string // 英文名称 / key
  cName: string // 中文名称
  element: string // 元素属性
  attackAttribute: string // 攻击属性
  ATK?: number // 攻击力
  MATK?: number // 魔力值
  HP: number // 生命值
  DEF: number // 防御力
  MRES: number // 魔法抵抗
  CR: number // 暴击率
  CDMG: number // 暴击伤害
  DMG: number // 属性伤害
  panel: number // 默认面板
  critical: number // 默认爆伤
  attributeDamage: number // 默认属伤
  engraving: {
    // 刻印
    HP?: number // 生命值
    ATK?: number // 攻击力
    MATK?: number // 魔力值
    DEF?: number // 防御力
    MRES?: number // 魔抗
  }
  Awakening: {
    // 觉醒
    PATK?: number // 百分比攻击力
    PMATK?: number // 百分比攻击力
    DMG?: number // 属性伤害
    DEF?: number // 防御
    MRES?: number // 魔抗
    PHP?: number // 百分比生命
  }
  attackType: string // 攻击类型 front为最前 skip为跳过
  commonSkill: Record<string, commonSkillObj> // 通用技能 普攻和击退
  Skill: Record<string, skillObj> // 技能列表
}

interface selectCharacterDataObj extends characterDataObj, damageObj {
  skillBoxList: string[]
  allBreakthrough: Record<string, number>
  allCheckList: Record<string, string>
  allPotentials: Record<string, effectObj>
}

interface commonSkill {
  name: string // 英文名称 / key
  cName: string // 中文名称
  sp: number // 技能消耗
  cd: number // 技能冷却
  chain: number // 连锁次数
  target: string // 目标 enemy 敌方 friendly 友军
  image: string // 图片形象
  qimage?: string // q版形象
  scope: number[][] // 攻击范围，二维坐标系存储。直接命中目标为[0,0]
}

// 角色技能数据结构定义
interface skillObj {
  name: string // 英文名称 / key
  cName: string // 中文名称
  sp: number // 技能消耗
  cd: number // 技能冷却
  chain: number // 连锁次数
  target: string // 目标 enemy 敌方 friendly 友军
  scope: number[][] // 攻击范围，二维坐标系存储。直接命中目标为[0,0]
  image: string // 图片形象
  qimage: string // q版形象
  description: string // 技能描述
  effect: Record<number, effectObj> // 技能效果
  skillPotentials: Record<string, unknown> // 技能觉醒效果
  ability: Record<string, unknown> // 服装能力
}

interface effectObj {
  sp?: number // 消耗
  cd?: number
  buff?: buffObj[] // 各类加成
  multiplying?: number // 倍率
  mainMultiplying?: number // 特殊倍率 - 主目标倍率
  ThreeMultiplying?: number // 特殊倍率 -- 三的倍数
  extraMultiplying?: number // 额外倍率
  special?: Record<string, number>[] // 特殊类型 比如sp回复
}

interface buffObj {
  duration: number // 持续回合
  scope: number[][] // 范围
  attribute?: 'atk' | 'matk' // 效果类型
  attackAdd?: number // 效果值
  critical?: number // 暴击伤害
  attributeDamage?: number // 属性伤害
  lightAttributeDamage?: number // 光属性伤害 芮彼特有
  chainAddNumber?: number // 连锁增强
  CRAdd?: number // 暴击率
  increasedDamage?: number // 增强--增伤
  damageReduction?: number // 减伤
  minChainCount?: number // 最低连锁数量
  maxChainCount?: number // 最高连锁数量
  spReduce?: number // sp减少
  shield?: number // 护盾 以后再处理 目前的护盾有自身最大生命值的盾 法强盾 和buff人最大生命值的盾
  HPAdd?: number // 回复 以后再处理 魔法回复。自身值生命回复 buff人生命值回复
}

interface editableTabsObj {
  name: number
  charactarList: editableCharactar[]
  battleGroundList: unknown[] // 角色场地位置
}

interface editableCharactar {
  name?: string // 名称
  cName?: string // 中文名称
  panel?: number // 面板攻击力/魔法力
  critical?: number // 爆伤
  attributeDamage?: number // 属性伤害
  element?: string // 属性
  attackType?: string // 攻击类型
  selectSikll?: string // 选中的皮肤
  commonSkill?: Record<string, commonSkillObj> // 通用技能 普攻和击退
  skill?: Record<string, editableCharactarSkill> // 技能
}

interface editableCharactarSkill {
  cName?: string
  name?: string
  cd?: number
  chain?: number
  sp?: number
  target?: string
  image?: string
  qimage?: string
  multiplier?: number
  description?: string
  scope?: number[][]
  skillBoxList?: string[] // 选中的技能
  allBreakthrough?: Record<string, number> // 所有选中的技能的突破次数
  allCheckList?: Record<string, string> //技能的觉醒
  allPotentials?: Record<string, effectObj> // 技能觉醒后的效果
  skillEffect: skillEffectObj // 行动条展示倍率
}

interface skillEffectObj {
  buff: buffObj[]
  extraMultiplying: number
  multiplying: number
  mainMultiplying?: number // 主目标倍率
  ThreeMultiplying?: number // 卢班希亚3x倍率
}
