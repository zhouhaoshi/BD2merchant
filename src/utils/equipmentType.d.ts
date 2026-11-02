// wiki 图鉴装备列表接口（tj-eq-list）原始条目
interface equipmentRawItem {
  content_id: number | string // wiki 内容 id
  name: string // 装备名称（可能带换行，解析时 trim）
  icon: string // 装备大立绘
  icon1: string // 装备小立绘
  part: string // 装备部位 武器/盔甲/头盔/饰品/手套
  type: string // 装备类型 制作/专用/魔兽
  role_name: string // 专属角色名（通用装备为空）
  role_avatar: string // 专属角色头像
  main_attr: string // 主属性 JSON 字符串（zynl 主词条 / jbnl1 基本能力1 / jbnl2 基本能力2）
  other_attr: string // 等级属性 JSON 字符串（sr 或 ur1/ur2/ur3）
  level?: string // 备用字段（接口目前为空）
  materials?: string // 备用字段（接口目前为空）
  desc?: string // 备用字段（接口目前为空）
  sec_attr?: string // 备用字段（接口目前为空）
  third_attr?: string // 备用字段（接口目前为空）
}

// main_attr 解析后的主属性
interface equipmentMainAttrObj {
  zynl: string // 主词条
  jbnl1: string // 基本能力 1
  jbnl2: string // 基本能力 2
}

// other_attr 解析后的等级属性：专用/魔兽装备为 sr，制作装备为 ur1/ur2/ur3，值为嵌套的主属性结构
interface equipmentOtherAttrObj {
  sr?: equipmentMainAttrObj // SR 等级
  ur1?: equipmentMainAttrObj // 制作等级 一般
  ur2?: equipmentMainAttrObj // 制作等级 高级
  ur3?: equipmentMainAttrObj // 制作等级 顶级
}

// 装备系别：魔法系副属性只出魔法力词条，物理系只出攻击力词条，通用系两者都有
type equipmentFaction = '魔法系' | '物理系' | '通用系'

// 装备解析后的页面数据结构
interface equipmentDataObj {
  content_id: number
  name: string // 装备名称（已 trim）
  icon: string // 大立绘
  icon1: string // 小立绘
  part: string // 装备部位
  type: string // 装备类型
  roleName: string // 专属角色名（空串即通用装备）
  roleAvatar: string // 专属角色头像
  mainAttr: equipmentMainAttrObj | null // 解析失败/为空时 null
  otherAttr: equipmentOtherAttrObj | null // 解析失败/为空时 null
  faction?: equipmentFaction // 装备系别（由主属性推导，本地旧数据缺失时运行时兜底推导）
}

// 装备属性键
type equipmentAttrKey =
  | 'atk' // 固定攻击力
  | 'matk' // 固定魔法力
  | 'patk' // 百分比攻击力
  | 'pmatk' // 百分比魔法力
  | 'def' // 固定防御力
  | 'mdef' // 固定魔法抵抗
  | 'pdef' // 百分比防御力
  | 'pmdef' // 百分比魔法抵抗
  | 'hp' // 固定生命力
  | 'php' // 百分比生命力
  | 'critical' // 致命伤害
  | 'criticalRate' // 致命率

// 单条装备属性（解析后）
interface equipmentAttrEntry {
  type: 'fixed' | 'percent' // 固定值 / 百分比
  key: equipmentAttrKey // 属性键
  value: number // 数值（百分比为百分数，如 9 表示 9%）
  text: string // 原始文本
}

// 固定副属性词条选项
interface equipmentSubAttrOption {
  key: equipmentAttrKey
  name: string // 词条名称
  value: number // 词条数值
  isPercent: boolean // 是否百分比
}

// 穿戴的装备
interface equipmentWearObj {
  contentId: number // 装备 content_id
  slot: number // 部位槽位 0-4
  score: number // 装备评分 6-24
  subAttrs: [equipmentAttrKey, equipmentAttrKey, equipmentAttrKey] // 3条副属性
  jbnl1Choice?: number // 专武基本能力1 所选词条索引
  jbnl2Choice?: number // 专武基本能力2 所选词条索引
}

// 装备属性面板（基础/评分加成/副属性 三部分同构）
interface equipmentStatPanel {
  atk: number // 固定攻击力
  matk: number // 固定魔法力
  patk: number // 百分比攻击力
  pmatk: number // 百分比魔法力
  def: number // 固定防御力
  mdef: number // 固定魔法抵抗
  pdef: number // 百分比防御力
  pmdef: number // 百分比魔法抵抗
  hp: number // 固定生命力
  php: number // 百分比生命力
  critical: number // 致命伤害
  criticalRate: number // 致命率
}

// 单件装备属性拆解
interface equipmentStatParts {
  base: equipmentStatPanel // 基础属性
  scoreBonus: equipmentStatPanel // 评分加成
  sub: equipmentStatPanel // 副属性词条
}

// 基础词条展示项（每个词条单独展示：基础值+评分加成值）
interface equipmentBaseEntryItem {
  name: string // 属性名（攻击力/致命伤害…）
  base: number // 基础值
  score: number // 评分加成值（主词条为 0）
  isPercent: boolean // 是否百分比
}

// 角色最终面板（裸面板 + 装备）
interface finalCharacterStatsObj extends equipmentStatPanel {
  panel: number // 最终面板攻击力/魔法力
  attackAdd: number // 最终攻击力/魔法力加成（装备百分比攻击合计）
  attributeDamage: number // 最终属性伤害（裸面板，装备无此属性）
}
