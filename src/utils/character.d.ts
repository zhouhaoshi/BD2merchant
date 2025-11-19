// buff的通用属性
interface buffComonElement {
  addTurn: number // 上buff的回合
  key: string // buffid，防止同一个buff上多次
  duration: number // 持续回合
}

interface conditionObj {
  condition?: (number | string)[] //伤害条件
  conditionType?: number //攻击类型
  conditionMultiplying?: number // 条件倍率
}

// 角色通用属性
interface userComonElement {
  element: 'light' | 'dark' | 'fire' | 'wind' | 'water' // 元素属性
  attackAttribute?: 'atk' | 'matk' // 攻击属性
  attackType: 'front' | 'skip' // 攻击类型 front为最前 skip为跳过
}
// 通用的技能属性
interface commonSkill {
  name: string // 英文名称 / key
  cName: string // 中文名称
  sp: number // 技能消耗
  cd: number // 技能冷却
  chain: number // 连锁次数
  target?: 'friendly' | 'enemy' // 作用目标 友军或者敌人
  image: string // 图片形象
  qimage?: string // q版形象
  scope: number[][] // 攻击范围，二维坐标系存储。直接命中目标为[0,0]
}

// 角色选中后的回显属性
interface skillSelectShow {
  skillBoxList: string[] // 选中的技能
  allBreakthrough: Record<string, number> // 所有选中的技能的突破次数
  allCheckList: Record<string, string> //技能的觉醒
  allPotentials: Record<string, effectObj> // 技能觉醒后的效果
}

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
interface characterDataObj extends userComonElement {
  name: string // 英文名称 / key
  cName: string // 中文名称
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
  commonSkill: Record<string, commonSkillObj> // 通用技能 普攻和击退
  Skill: Record<string, skillObj> // 技能列表
}

interface selectCharacterDataObj extends characterDataObj, damageObj, skillSelectShow {}

type skillObjKeys = keyof skillObj
// 角色技能数据结构定义
interface skillObj extends commonSkill {
  description: string // 技能描述
  effect: Record<number, effectObj> // 技能效果
  skillPotentials: Record<string, unknown> // 技能觉醒效果
  ability: Record<string, unknown> // 服装能力
}

// 击退的类型的数据
interface repellingElement {
  repellingDirection?: number[] // 击退方向 如 [0,1]向后 [0, -1]向前 [-1, 0] 向左 [0, 1]向右
  repellingDistance?: number // 击退距离
  repellingMultiplying?: number // 击退后的碰撞伤害
}

interface dotBuffObj {
  duration: number // 持续回合
  scope?: number[][] // 范围 // 如果为空继技能本身访问
  type?: number //  dotbuff枚举
  dotMultiplying: number // 特殊效果倍率
  dotbuffNumber?: number // 作用层数
  maxNumber?: number // 最大层数
}

interface effectObj extends repellingElement, conditionObj {
  sp?: number // 消耗
  cd?: number
  hitBuff?: hitBuffObj[] // 受击buff
  buff?: buffObj[] // 各类加成
  deBuff?: deBuffObj[] // 各类减益Buff
  specialInjuryBuff?: specialInjuryBuffSkillObj[] // 负伤伤害buff
  dotBuff?: dotBuffObj[] // dot伤害buff
  aureole?: aureoleObj[] // 光环
  multiplying?: number // 倍率
  type?: number // 攻击类型
  lifemanship?: number // 先发制人
  spNumber?: number // utm的sp数量
  spExtraMultiplying?: number // utm的sp倍率
  buffNumber?: number // 黑皮的buff数量
  buffExtraMultiplying?: number // 黑皮的buff倍率
  mainMultiplying?: number // 特殊倍率 - 主目标倍率
  ThreeMultiplying?: number // 特殊倍率 -- 三的倍数
  extraMultiplying?: number // 额外倍率
  special?: Record<string, number>[] // 特殊类型 比如sp回复
  removeBuffList?: (string | number)[] // 需要移除的buff列表
}
// 受到打击触发的特殊buff 比如使徒的反击 塞尔的sp回复
interface hitBuffObj {
  duration?: number
  scope?: number[][] // 独立范围，单独触发
  triggerCount?: number // 可触发次数
  target: 'friendly' | 'enemy' // 作用目标 友军或者敌人
  spAdd?: number
  increasedDamage?: number // 增强--增伤
  HPAdd?: number // 生命回复
  hitMultiplying?: number // 倍率
  increasingNumber?: number // 递增数量
  maxNumber?: number // 最大递增数量
}
interface buffElement {
  attackAdd?: number // 效果值
  critical?: number // 暴击伤害
  attributeDamage?: number // 属性伤害
  lightAttributeDamage?: number // 光属性伤害 芮彼特有
  chainAddNumber?: number // 连锁增强
  CRAdd?: number // 暴击率
  increasedDamage?: number // 增强--增伤
  damageReduction?: number // 减伤
  spReduce?: number // sp减少
  shield?: number // 护盾 以后再处理 目前的护盾有自身最大生命值的盾 法强盾 和buff人最大生命值的盾
  HPAdd?: number // 回复 以后再处理 魔法回复。自身值生命回复 buff人生命值回复
  aureole?: number // 是否有光环 1为有其他为0 光环只能套给自己
  hit?: number // 是否有收击buff 1为有 其他为0
  provocation?: number // 嘲讽 正常为0 -1为降低嘲讽 +为增加嘲讽
  minChainCount?: number // 最低连锁数量
  maxChainCount?: number // 最高连锁数量
  maxchainAddNumber?: number // 限制条件 最大连锁数
  superpositionNumber?: number // 叠加数量目前就塞尔用
  triggerCount?: number // 反击有效次数 布莱德使徒用
  judgingCondition?: string[] // 判断条件为空是基础状态，有值则是条件成立。类似if else
  sidestep?: number // 闪避数量
}

interface buffObj extends buffElement {
  duration: number // 持续回合
  scope: number[][] // 范围 // 如果为空继技能本身访问
  attribute?: 'atk' | 'matk' // 效果类型
}

interface deBuffElement {
  attribute?: 'atk' | 'matk' // 效果类型
  attributeElement?: 'light' | 'dark' | 'fire' | 'wind' | 'water'
  condition?: (string | number)[] // 限制条件
  type?: number // 那种类型的 易伤/脆弱
  minChainCount?: number // 限制条件
  enemyWeakness?: number // 易伤/脆弱
  darkEnemyWeakness?: number // 暗属性脆弱
  mainEnemyWeakness?: number // 主目标脆弱
  chainDamageAdd?: number // 连锁伤害加成
  delay?: number // 延时buff 先打击后上
  provocation?: number // 嘲讽
  silence?: number // 沉默
}

interface deBuffObj extends deBuffElement {
  duration: number // 持续回合
  attackReduce?: number // 面板减少
  DEFReduce?: number // 防御减少
  MRESReduce?: number // 魔抗减少
  scope?: number[][] // 范围 // 如果为空继技能本身访问
}

interface specialInjuryBuffSkillObj {
  duration: number // 持续回合
  scope?: number[][] // 范围 // 如果为空继技能本身访问
  type?: number //  特殊持续buff枚举
  specialMultiplying: number // 特殊效果倍率
}

interface aureoleObj {
  CRAdd?: number // 暴击率
  shield?: number // 护盾
  attributeDamage?: number // 属性伤害
  damageReduction?: number // 减伤
  scope: number[][] // 范围 // 如果为空继技能本身访问
}

interface editableTabsObj {
  name: number
  charactarList: editableCharactar[]
  battleGroundList: editableCharactar[] // 角色场地位置
  buffList: Record<string, userBuffObj> // 角色buff列表
  warcraftBuffList: Record<number, warcraftBuffObj> // 魔兽buff列表
  warcraftCanUseSkill: warcraftCanUseSkillObj // 魔兽可使用的技能队列
  canUseSp: number // 本回合可使用sp
}

interface editableCharactar extends userComonElement {
  name: string // 名称
  cName?: string // 中文名称
  panel?: number // 面板攻击力/魔法力
  critical: number // 爆伤
  attributeDamage: number // 属性伤害
  selectSikll?: string // 选中的皮肤
  commonSkill?: Record<string, commonSkillObj> // 通用技能 普攻和击退
  skill: Record<string, editableCharactarSkill> // 技能
}

interface editableCharactarSkill extends commonSkill, skillSelectShow {
  multiplier?: number
  description?: string
  skillEffect: skillEffectObj // 行动条展示倍率
}

interface skillEffectObj extends conditionObj {
  type?: number // 攻击类型
  buff: buffObj[]
  hitBuff?: hitBuffObj[] // 受打擊buff
  dotBuff?: dotBuffObj[] // dotbuff
  special?: Record<string, number>[] // 特殊类型 比如sp回复
  aureole: aureoleObj[]
  extraMultiplying: number
  multiplying: number
  mainMultiplying?: number // 主目标倍率
  ThreeMultiplying?: number // 卢班希亚3x倍率
  deBuff?: deBuffObj[] // 负面buff
  specialInjuryBuff?: specialInjuryBuffObj[] // 特殊伤害buff
}
type userBuffObjKeys = keyof userBuffObj
// 角色身上的buff
interface userBuffObj extends buffComonElement, buffElement {}

type warcraftBuffObjKeys = keyof warcraftBuffObj

// 魔兽身上的buff
interface warcraftBuffObj {
  chainDamageAdd?: chainDamageAddBuffObj[]
  enemyWeakness?: enemyWeaknessBuffObj[]
  specialInjuryBuff?: specialInjuryBuffObj[] // 给魔兽上特殊伤害类型buff
  othersDebuff?: othersDebuffObj[] // 给魔兽上特殊伤害类型buff
  dotBuff?: warcraftDotBuffObj[] // 给魔兽上特殊伤害类型buff
}

interface othersDebuffObj extends buffComonElement {
  provocation?: number
  silence?: number
}
interface warcraftDotBuffObj extends buffComonElement {
  dotMultiplying: number
  type: number
}

type chainDamageAddBuffObjKeys = keyof chainDamageAddBuffObj
interface chainDamageAddBuffObj extends buffComonElement {
  chainDamageAdd: number
}

type enemyWeaknessBuffObjKeys = keyof enemyWeaknessBuffObj
interface enemyWeaknessBuffObj extends buffComonElement {
  enemyWeakness: number
  type?: number // 是那种增伤buff
  attribute?: 'atk' | 'matk' // 效果类型 为空就是全是
  attributeElement?: 'light' | 'dark' | 'fire' | 'wind' | 'water'
}

interface specialInjuryBuffObj extends buffComonElement {
  specialMultiplying?: number // 特殊伤害的倍率
  type?: number // 是那种特殊buff 1为恶魔
}

interface warcraftData extends userComonElement {
  name: string
  cName: string
  attributeResistance: number // 属性抵抗
  sp: number // 魔兽每回合回复sp
  // 魔兽坐标位置
  scope: number[][]
  // 弱点位置
  scopeWeaknesses: warcraftScopeWeaknessesData[]
  // 魔兽技能
  Skill: warcraftSkillData[]
  // 魔兽特殊技能
  specialSkill: warcraftSpecialSkillData[]
  levelData: Record<string, warcraftLevelData>
}
// 魔兽弱点
interface warcraftScopeWeaknessesData {
  weaknesses: number
  scope: number[][]
}

// 魔兽弱点
interface warcraftSkillData {
  name: string
  cname: string
  chain: number // 攻击次数
  scope: number[][]
  multiplying: number
  description?: string
  buff?: buffObj[]
  fixed?: number // 打击位置是否固定 1为固定
}

// 魔兽弱点
interface warcraftSpecialSkillData extends warcraftSkillData {
  condition: Record<string, number> // 触发条件
}

interface warcraftLevelData {
  hp: number
  panel: number
}

interface warcraftCanUseSkillObj {
  Skill?: warcraftSkillData[]
  specialSkill?: warcraftSpecialSkillData[]
}
