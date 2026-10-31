// 战斗模拟相关类型（全局 ambient，勿加 import/export）

// 排轴类型
type shaftMode = 'guild' | 'warcraft' // guild 公会战 / warcraft 魔兽战

// 参与模拟的角色
interface battleSimulationCharacter {
  charactar: editableCharactar // 排轴角色
  stats: finalCharacterStatsObj // 最终面板（含装备）
  bareStats: finalCharacterStatsObj // 裸面板快照（dot 伤害用）
  skills: editableCharactarSkill[] // 已选技能（排轴顺序）
  def: number // 最终防御力（裸 + 装备）
  mres: number // 最终魔法抵抗（裸 + 装备）
  hp: number // 当前血量
  maxHp: number // 最大血量
}

// 单回合角色行动
interface battleSimulationAction {
  charactarName: string // 角色名
  skillName: string // 本回合使用的技能名
}

// 参与模拟的队伍
interface battleSimulationTeam {
  index: number // 队伍序号 0 起
  characters: battleSimulationCharacter[]
  turns: battleSimulationAction[][] // 排轴行动：每回合每位角色的技能选择
}

// 模拟输入
interface battleSimulationInput {
  mode: shaftMode
  groundColumn: number // 场地列数
  groundRow: number // 场地行数
  boss: warcraftData // boss 数据
  bossLevel: number // boss 等级（取 levelData）
  teams: battleSimulationTeam[]
  maxSp: number // SP 上限
  startSp: number // 起始 SP
  maxTurn: number // 最大回合数（防死循环）
}

// 日志条目
interface simulationLogEntry {
  turn: number // 回合
  teamIndex: number // 队伍序号（boss 行为 -1）
  source: string // 来源（角色名/boss 技能名）
  content: string // 内容
  type: 'skill' | 'dot' | 'boss' | 'kill' | 'teamSwitch' | 'end' // 类型
}

// 每回合血量快照
interface simulationHpHistory {
  turn: number
  bossHp: number
  teamHp: {
    teamIndex: number
    name: string
    hp: number
    maxHp: number
  }[]
}

// 队伍结果
interface simulationTeamResult {
  index: number
  damage: number // 该队造成的总伤害
  status: 'bossDead' | 'killed' | 'survive' // boss 死亡时存活 / 被击杀 / 未上场存活
}

// 模拟结果
interface battleSimulationResult {
  status: 'bossDead' | 'allDead' | 'maxTurn'
  totalDamage: number
  logs: simulationLogEntry[]
  hpHistory: simulationHpHistory[]
  teamResults: simulationTeamResult[]
}
