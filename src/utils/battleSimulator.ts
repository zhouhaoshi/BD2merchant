// 战斗模拟引擎：纯 TS。按排轴行动顺序模拟多队车轮战
// 规则：
// - boss 身上的 debuff / dot 跨队持续存在
// - dot 伤害基于角色裸面板（无装备），只作用于 boss，使用 damage.ts 公式
// - boss 释放必杀技（kill 技能）后当前队伍全灭，下一队上场时技能队列重置
// - 队伍在必杀技前被全灭时，下一队上场技能队列按顺序继续
// - 每回合：玩家按排轴行动 -> dot 结算(吃连锁) -> 清连锁 -> boss 行动 -> dot 结算 -> 回合结束衰减
import calculateDamage from '@/utils/damage'

// 属性克制表 light -> dark -> light   water -> fire -> wind -> water
const BENEFICIAL_ELEMENT_LIST = ['light', 'dark', 'light', 'water', 'fire', 'wind', 'water']

// ---------- 模拟状态 ----------

// boss 跨队状态
interface simBossState {
  hp: number
  maxHp: number
  panel: number // 基础面板
  element: string
  attackAttribute?: 'atk' | 'matk'
  attributeResistance: number
  maxWeakness: number // 弱点最高倍率（模拟默认命中弱点格）
  queue: warcraftSkillData[] // 技能队列（含必杀技）
  queueCursor: number // 队列指针
  specialUsedTeam: Record<number, boolean> // 每队特殊技能是否已触发
  debuffs: simBossDebuff[] // 玩家给 boss 上的 debuff（跨队持续）
  dots: simBossDot[] // 玩家给 boss 上的 dot（跨队持续）
}

// boss 身上的 debuff
interface simBossDebuff {
  enemyWeakness: number // 易伤/脆弱
  attackReduce: number // 面板攻击力削减
  chainDamageAdd: number // 连锁伤害加成
  duration: number // 剩余回合
}

// boss 身上的 dot（基于角色裸面板）
interface simBossDot {
  ownerName: string // 上 dot 的角色
  barePanel: number // 裸面板
  bareAttributeDamage: number // 裸属伤
  element: string // 角色属性（克制判断）
  stacks: number // 层数
  dotMultiplying: number // 每层倍率
  duration: number // 剩余回合
}

// 角色身上的 buff
interface simActiveBuff {
  attackAdd: number
  critical: number
  attributeDamage: number
  increasedDamage: number
  chainAddNumber: number
  duration: number // 剩余回合
}

// 角色状态
interface simCharacterState {
  char: battleSimulationCharacter
  hp: number
  cds: Record<string, number> // 技能名 -> 剩余cd
  buffs: simActiveBuff[]
}

// ---------- 工具函数 ----------

// 元素克制判断
const isElementCounter = (charElement: string, bossElement: string) => {
  const index = BENEFICIAL_ELEMENT_LIST.indexOf(charElement)
  return (
    index >= 0 &&
    index < BENEFICIAL_ELEMENT_LIST.length - 1 &&
    BENEFICIAL_ELEMENT_LIST[index + 1] === bossElement
  )
}

type simBuffKey =
  | 'attackAdd'
  | 'critical'
  | 'attributeDamage'
  | 'increasedDamage'
  | 'chainAddNumber'
const sumBuffs = (state: simCharacterState, key: simBuffKey) =>
  state.buffs.reduce((sum, item) => sum + item[key], 0)

type simDebuffKey = 'enemyWeakness' | 'attackReduce' | 'chainDamageAdd'
const sumDebuffs = (boss: simBossState, key: simDebuffKey) =>
  boss.debuffs.reduce((sum, item) => sum + item[key], 0)

// 角色技能对 boss 的伤害
const playerDamageToBoss = (
  state: simCharacterState,
  skill: editableCharactarSkill | undefined,
  boss: simBossState,
  chainCount: number,
) => {
  const stats = state.char.stats
  const skillEffect = skill?.skillEffect
  // 普攻 100%
  let multiplier = 100
  if (skillEffect) {
    multiplier = skillEffect.multiplying || 0
    if (skillEffect.mainMultiplying) {
      multiplier = skillEffect.mainMultiplying
    }
    if (skillEffect.extraMultiplying) {
      multiplier = multiplier + skillEffect.extraMultiplying
    }
  }
  const attributeDamage = isElementCounter(state.char.charactar.element, boss.element)
    ? stats.attributeDamage + sumBuffs(state, 'attributeDamage')
    : 0
  return calculateDamage({
    panel: stats.panel,
    attackAdd: stats.attackAdd + sumBuffs(state, 'attackAdd'),
    multiplier,
    critical: stats.critical + sumBuffs(state, 'critical'),
    attributeDamage,
    enemyWeakness: sumDebuffs(boss, 'enemyWeakness'),
    increasedDamage: sumBuffs(state, 'increasedDamage'),
    weakPointDamageAdd: boss.maxWeakness,
    enemyDefence: 0,
    attributeResistance: boss.attributeResistance,
    damageReduction: 0,
    chainCount,
    chainDamageAdd: sumDebuffs(boss, 'chainDamageAdd'),
  })
}

// boss 技能对单个角色的单次伤害
const bossDamageToChar = (
  boss: simBossState,
  skill: warcraftSkillData,
  state: simCharacterState,
) => {
  const def = boss.attackAttribute === 'matk' ? state.char.mres : state.char.def
  return calculateDamage({
    panel: Math.max(0, boss.panel - sumDebuffs(boss, 'attackReduce')),
    attackAdd: 0,
    multiplier: skill.multiplying,
    critical: 0,
    attributeDamage: 0,
    enemyWeakness: 0,
    increasedDamage: 0,
    weakPointDamageAdd: 0,
    enemyDefence: def,
    attributeResistance: 0,
    damageReduction: 0,
    chainCount: 0,
    chainDamageAdd: 0,
  })
}

// dot 对 boss 的伤害（裸面板）
const dotDamageToBoss = (dot: simBossDot, boss: simBossState, chainCount: number) => {
  const attributeDamage = isElementCounter(dot.element, boss.element) ? dot.bareAttributeDamage : 0
  return calculateDamage({
    panel: dot.barePanel,
    attackAdd: 0,
    multiplier: dot.dotMultiplying * dot.stacks,
    critical: 0,
    attributeDamage,
    enemyWeakness: sumDebuffs(boss, 'enemyWeakness'),
    increasedDamage: 0,
    weakPointDamageAdd: 0,
    enemyDefence: 0,
    attributeResistance: boss.attributeResistance,
    damageReduction: 0,
    chainCount,
    chainDamageAdd: sumDebuffs(boss, 'chainDamageAdd'),
  })
}

// 应用角色技能 buff（作用于自身）
const applyBuffs = (state: simCharacterState, buffList: buffObj[] | undefined) => {
  ;(buffList || []).forEach((buff) => {
    state.buffs.push({
      attackAdd: buff.attackAdd || 0,
      critical: buff.critical || 0,
      attributeDamage: (buff.attributeDamage || 0) + (buff.lightAttributeDamage || 0),
      increasedDamage: buff.increasedDamage || 0,
      chainAddNumber: buff.chainAddNumber || 0,
      duration: buff.duration || 1,
    })
  })
}

// 应用角色技能 debuff（作用于 boss）
const applyDebuffs = (boss: simBossState, deBuffList: deBuffObj[] | undefined) => {
  ;(deBuffList || []).forEach((item) => {
    boss.debuffs.push({
      enemyWeakness:
        (item.enemyWeakness || 0) + (item.darkEnemyWeakness || 0) + (item.mainEnemyWeakness || 0),
      attackReduce: item.attackReduce || 0,
      chainDamageAdd: item.chainDamageAdd || 0,
      duration: item.duration || 1,
    })
  })
}

// 应用角色技能 dot（作用于 boss，基于裸面板）
const applyDots = (
  boss: simBossState,
  state: simCharacterState,
  dotList: dotBuffObj[] | undefined,
) => {
  ;(dotList || []).forEach((item) => {
    boss.dots.push({
      ownerName: state.char.charactar.cName || state.char.charactar.name,
      barePanel: state.char.bareStats.panel,
      bareAttributeDamage: state.char.bareStats.attributeDamage,
      element: state.char.charactar.element,
      stacks: item.dotbuffNumber || 1,
      dotMultiplying: item.dotMultiplying,
      duration: item.duration || 1,
    })
  })
}

// ---------- 主流程 ----------

export const runBattleSimulation = (input: battleSimulationInput): battleSimulationResult => {
  const levelData = input.boss.levelData[input.bossLevel]
  if (!levelData) {
    return {
      status: 'maxTurn',
      totalDamage: 0,
      logs: [
        {
          turn: 0,
          teamIndex: -1,
          source: 'system',
          content: `boss 等级 ${input.bossLevel} 数据不存在`,
          type: 'end',
        },
      ],
      hpHistory: [],
      teamResults: [],
    }
  }

  const boss: simBossState = {
    hp: levelData.hp,
    maxHp: levelData.hp,
    panel: levelData.panel,
    element: input.boss.element,
    attackAttribute: input.boss.attackAttribute,
    attributeResistance: input.boss.attributeResistance,
    maxWeakness: Math.max(0, ...input.boss.scopeWeaknesses.map((item) => item.weaknesses)),
    queue: input.boss.Skill || [],
    queueCursor: 0,
    specialUsedTeam: {},
    debuffs: [],
    dots: [],
  }

  const teamStates: simCharacterState[][] = input.teams.map((team) =>
    team.characters.map((char) => ({
      char,
      hp: char.hp,
      cds: {},
      buffs: [],
    })),
  )
  const logs: simulationLogEntry[] = []
  const hpHistory: simulationHpHistory[] = []
  const teamResults: simulationTeamResult[] = input.teams.map((team) => ({
    index: team.index,
    damage: 0,
    status: 'survive',
  }))

  let totalDamage = 0
  let status: battleSimulationResult['status'] = 'maxTurn'
  let teamIndex = 0
  let teamSp = input.startSp
  let turn = 0 // 全局 boss 行动回合

  logs.push({
    turn: 1,
    teamIndex: 0,
    source: input.boss.cName,
    content: `战斗开始（boss HP ${boss.hp.toLocaleString()}）`,
    type: 'teamSwitch',
  })

  const aliveStates = (states: simCharacterState[]) => states.filter((item) => item.hp > 0)
  const firstAlive = (states: simCharacterState[]) => aliveStates(states)[0]
  // 血量快照
  const pushHpHistory = (turnNumber: number) => {
    hpHistory.push({
      turn: turnNumber,
      bossHp: Math.max(0, boss.hp),
      teamHp: input.teams.flatMap((teamItem, ti) =>
        teamStates[ti].map((item) => ({
          teamIndex: ti,
          name: item.char.charactar.cName || item.char.charactar.name,
          hp: Math.max(0, item.hp),
          maxHp: item.char.maxHp,
        })),
      ),
    })
  }

  while (teamIndex < input.teams.length && turn < input.maxTurn) {
    const team = input.teams[teamIndex]
    const states = teamStates[teamIndex]
    teamResults[teamIndex].status = 'survive'
    teamSp = input.startSp
    let teamTurn = 0 // 队伍内的回合序号（boss 行动次数）
    let axisExhausted = false
    logs.push({
      turn: turn + 1,
      teamIndex,
      source: 'system',
      content: `队伍${teamIndex + 1}上场`,
      type: 'teamSwitch',
    })

    // 该队战斗循环
    let teamAlive = true
    while (teamAlive && boss.hp > 0 && turn < input.maxTurn) {
      teamTurn++
      turn++
      let chainCount = 0 // 连锁每回合重置
      let maxChain = 0 // 本回合最高连锁（特殊技能判定用）

      // ---- 玩家阶段 ----
      if (teamTurn > team.turns.length && !axisExhausted) {
        axisExhausted = true
        logs.push({
          turn,
          teamIndex,
          source: 'system',
          content: '排轴回合已用尽，角色不再行动',
          type: 'skill',
        })
      }
      if (!axisExhausted) {
        const actions = team.turns[teamTurn - 1] || []
        for (const action of actions) {
          const state = states.find((item) => item.char.charactar.name === action.charactarName)
          if (!state || state.hp <= 0 || boss.hp <= 0) continue
          const charName = state.char.charactar.cName || state.char.charactar.name
          let skill = state.char.skills.find((item) => item.name === action.skillName)
          // 冷却检查
          if (skill && (state.cds[skill.name] || 0) > 0) {
            logs.push({
              turn,
              teamIndex,
              source: charName,
              content: `${skill.cName} 冷却中，改用普攻`,
              type: 'skill',
            })
            skill = undefined
          }
          // SP 检查
          if (skill && (skill.sp || 0) > teamSp) {
            logs.push({
              turn,
              teamIndex,
              source: charName,
              content: `${skill.cName} SP 不足（${teamSp}/${input.maxSp}），改用普攻`,
              type: 'skill',
            })
            skill = undefined
          }
          if (skill && skill.sp) {
            teamSp -= skill.sp
          }
          // 伤害
          const damage = playerDamageToBoss(state, skill, boss, chainCount)
          const skillName = skill ? skill.cName : '普攻'
          if (damage > 0) {
            boss.hp -= damage
            totalDamage += damage
            teamResults[teamIndex].damage += damage
          }
          logs.push({
            turn,
            teamIndex,
            source: charName,
            content: `${skillName} 造成 ${damage.toLocaleString()} 伤害${
              chainCount > 0 ? `（连锁${chainCount}）` : ''
            }`,
            type: 'skill',
          })
          // 连锁累计（角色自身的连锁增强 buff）
          const chainAdd = 1 + sumBuffs(state, 'chainAddNumber')
          chainCount += (skill?.chain ?? 1) * chainAdd
          maxChain = Math.max(maxChain, chainCount)
          // 技能效果
          if (skill?.skillEffect) {
            applyBuffs(state, skill.skillEffect.buff)
            applyDebuffs(boss, skill.skillEffect.deBuff)
            applyDots(boss, state, skill.skillEffect.dotBuff)
          }
          // 普攻回复 1sp / 技能特殊 sp 回复
          if (!skill) {
            teamSp = Math.min(input.maxSp, teamSp + 1)
          }
          if (skill?.skillEffect?.special) {
            skill.skillEffect.special.forEach((item) => {
              if (item.spAdd) {
                teamSp = Math.min(input.maxSp, teamSp + item.spAdd)
              }
            })
          }
          // cd
          if (skill && (skill.cd || 0) > 0) {
            state.cds[skill.name] = skill.cd
          }
          if (boss.hp <= 0) break
        }
      }
      if (boss.hp <= 0) {
        status = 'bossDead'
        teamResults[teamIndex].status = 'bossDead'
        break
      }

      // ---- dot 第一次结算（吃连锁） ----
      boss.dots.forEach((dot) => {
        if (boss.hp <= 0) return
        const damage = dotDamageToBoss(dot, boss, chainCount)
        if (damage > 0) {
          boss.hp -= damage
          totalDamage += damage
          teamResults[teamIndex].damage += damage
          logs.push({
            turn,
            teamIndex,
            source: dot.ownerName,
            content: `DOT 造成 ${damage.toLocaleString()} 伤害`,
            type: 'dot',
          })
        }
      })
      if (boss.hp <= 0) {
        status = 'bossDead'
        teamResults[teamIndex].status = 'bossDead'
        break
      }
      // 清空连锁
      chainCount = 0

      // ---- boss 行动 ----
      let usedSpecial = false
      const specialSkill = input.boss.specialSkill?.[0]
      if (
        specialSkill &&
        !boss.specialUsedTeam[teamIndex] &&
        specialSkill.condition?.minChainCount &&
        maxChain > specialSkill.condition.minChainCount
      ) {
        usedSpecial = true
        boss.specialUsedTeam[teamIndex] = true
        const target = firstAlive(states)
        if (target) {
          let bossDamage = 0
          const hits = specialSkill.chain || 1
          for (let h = 0; h < hits; h++) {
            bossDamage += bossDamageToChar(boss, specialSkill, target)
          }
          target.hp -= bossDamage
          applyBuffs(target, specialSkill.buff)
          logs.push({
            turn,
            teamIndex,
            source: `${input.boss.cName}·${specialSkill.cname}`,
            content: `触发特殊技能，对 ${
              target.char.charactar.cName || target.char.charactar.name
            } 造成 ${bossDamage.toLocaleString()} 伤害`,
            type: 'boss',
          })
        }
      }

      // 必杀技判断：killTurn 指定回合 或 队列指向 kill 技能
      const queueSkill = boss.queue.length ? boss.queue[boss.queueCursor] : undefined
      const forceKill = !!input.boss.killTurn && teamTurn >= input.boss.killTurn
      const isKill = forceKill || !!queueSkill?.kill

      if (isKill) {
        // 必杀技：解除敌人有益效果并使敌人立即死亡
        logs.push({
          turn,
          teamIndex,
          source: input.boss.cName,
          content: 'boss 释放必杀技，队伍全灭',
          type: 'kill',
        })
        states.forEach((item) => {
          item.hp = 0
        })
        pushHpHistory(turn)
        boss.queueCursor = 0 // 必杀技后技能队列重置
        teamResults[teamIndex].status = 'killed'
        if (teamIndex + 1 >= input.teams.length) {
          status = 'allDead'
          teamAlive = false
        } else {
          teamIndex++
          teamAlive = false
        }
      } else if (queueSkill && !usedSpecial) {
        // 普通技能：攻击最前排存活角色
        const target = firstAlive(states)
        if (target) {
          let bossDamage = 0
          const hits = queueSkill.chain || 1
          for (let h = 0; h < hits; h++) {
            bossDamage += bossDamageToChar(boss, queueSkill, target)
          }
          target.hp -= bossDamage
          // boss 技能 buff 应用到被攻击角色
          applyBuffs(target, queueSkill.buff)
          logs.push({
            turn,
            teamIndex,
            source: `${input.boss.cName}·${queueSkill.cname}`,
            content: `对 ${
              target.char.charactar.cName || target.char.charactar.name
            } 造成 ${bossDamage.toLocaleString()} 伤害${hits > 1 ? `（${hits}次）` : ''}`,
            type: 'boss',
          })
        }
        // 队列按顺序继续
        boss.queueCursor = (boss.queueCursor + 1) % boss.queue.length
      }

      if (teamAlive && boss.hp > 0) {
        // ---- dot 第二次结算（无连锁） ----
        boss.dots.forEach((dot) => {
          if (boss.hp <= 0) return
          const damage = dotDamageToBoss(dot, boss, 0)
          if (damage > 0) {
            boss.hp -= damage
            totalDamage += damage
            teamResults[teamIndex].damage += damage
            logs.push({
              turn,
              teamIndex,
              source: dot.ownerName,
              content: `DOT 造成 ${damage.toLocaleString()} 伤害`,
              type: 'dot',
            })
          }
        })
        if (boss.hp <= 0) {
          status = 'bossDead'
          teamResults[teamIndex].status = 'bossDead'
          break
        }
      }

      if (teamAlive && boss.hp > 0) {
        // ---- 回合结束结算 ----
        // 角色回合与 boss 回合各回复一次 sp
        teamSp = Math.min(input.maxSp, teamSp + (input.boss.sp || 0) * 2)
        states.forEach((item) => {
          Object.keys(item.cds).forEach((key) => {
            item.cds[key] = Math.max(0, item.cds[key] - 1)
          })
          item.buffs = item.buffs.filter((buff) => {
            buff.duration -= 1
            return buff.duration > 0
          })
        })
        boss.debuffs = boss.debuffs.filter((item) => {
          item.duration -= 1
          return item.duration > 0
        })
        boss.dots = boss.dots.filter((item) => {
          item.duration -= 1
          return item.duration > 0
        })
        // 血量快照
        pushHpHistory(turn)
        // 队伍被全灭（非必杀技）
        if (aliveStates(states).length === 0) {
          logs.push({
            turn,
            teamIndex,
            source: 'system',
            content: `队伍${teamIndex + 1}全灭`,
            type: 'teamSwitch',
          })
          teamResults[teamIndex].status = 'killed'
          if (teamIndex + 1 >= input.teams.length) {
            status = 'allDead'
            teamAlive = false
          } else {
            teamIndex++
            teamAlive = false
          }
        }
      }
    }
  }

  logs.push({
    turn,
    teamIndex: teamIndex < input.teams.length ? teamIndex : -1,
    source: 'system',
    content:
      status === 'bossDead'
        ? `boss 被击败，总伤害 ${totalDamage.toLocaleString()}`
        : status === 'allDead'
          ? `所有队伍全灭，总伤害 ${totalDamage.toLocaleString()}`
          : `达到最大回合数，总伤害 ${totalDamage.toLocaleString()}`,
    type: 'end',
  })

  return { status, totalDamage, logs, hpHistory, teamResults }
}
