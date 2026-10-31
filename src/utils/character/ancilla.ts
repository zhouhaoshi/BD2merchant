// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 718485 / entryId: 221621
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const ancilla: characterDataObj = {
  name: 'ancilla',
  cName: '阿奇拉',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  ATK: 352, // 攻击力
  HP: 2100, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 352, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    ATK: 34,
    DEF: 8,
  },
  Awakening: {
    // 觉醒
    PATK: 12,
    DMG: 10,
  },
  commonSkill: {
    general: {
      name: 'general',
      cName: '普攻',
      target: 'enemy',
      sp: 0,
      cd: 0,
      chain: 1,
      scope: [[0, 0]],
      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',
      skillEffect: { multiplying: 100 },
    },
  },
  // 服装技能
  Skill: {
    // 服装：战场猛兽 / 技能：战场狂喜
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '战场猛兽',
      target: 'enemy',
      sp: -5,
      cd: 9,
      chain: 3,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_1233/h_1505/497891/2026/7/25/53302409mt8fz762.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/7/27/27528619mtb4ngqj.png',
      description:
        '4回合内，自身受到攻击时，为自己附加持续4回合攻击力增加15%的效果。此效果叠加至1。最多可叠加至99。2回合内，自身受到攻击时，当前服装的冷却时间减少2。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 200 }, // +0
        1: { sp: 1, cd: 0, multiplying: 200 }, // +1
        2: { sp: 1, cd: 0, multiplying: 250 }, // +2
        3: { sp: 1, cd: 0, multiplying: 250 }, // +3
        4: { sp: 1, cd: 0, multiplying: 300 }, // +4
        5: { sp: 1, cd: 0, multiplying: 300 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          attackAdd: 3,
          description: '攻击力+3%',
        },
        potentials2: {
          multiplying: 25,
          description: '伤害量+25%',
        },
        potentials3: {
          multiplying: 25,
          description: '伤害量+25%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '伤害量+125%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+125%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '[额外能力]获得相当于攻击力200%的能量护盾，持续2回合。',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PATK: 52,
          DMG: 30,
        },
      },
    },
    // 服装：被封印的欲望 / 技能：狩猎时间到！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '被封印的欲望',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 2,
      scope: [
        [0, 0],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_2048/h_2048/497891/2026/9/22/76496014mvj4w0ot.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/9/10/94165154mv23wx2r.png',
      description:
        '消耗自身当前生命值的95%，并使自身属性伤害在2回合内增加100%。为自身施加持续2回合的恢复技能效果免疫。此效果不会因为解除效果而消失。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害 。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 350 }, // +0
        1: { sp: 1, cd: 0, multiplying: 350 }, // +1
        2: { sp: 1, cd: 0, multiplying: 380 }, // +2
        3: { sp: 1, cd: 0, multiplying: 410 }, // +3
        4: { sp: 1, cd: 0, multiplying: 440 }, // +4
        5: { sp: 1, cd: 0, multiplying: 470 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '属性伤害增加+2回合',
        },
        potentials3: {
          multiplying: 30,
          description: '伤害量+30%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '技能范围扩大',
          scope: [
            [0, 0],
            [0, -1],
            [0, -2],
            [-1, -1],
            [-1, 0],
            [-2, 0],
            [-1, 1],
            [0, 1],
            [0, 2],
            [1, 1],
            [1, 0],
            [2, 0],
            [1, -1],
          ], // 爆发后的攻击范围，二维坐标系存储。直接命中目标为[0,0]
        },
        burst2: {
          sp: 1, // 消耗SP
          description:
            '[额外能力]自身的防御力与魔法抵抗降低50%，持续2回合。自身获得200%的增强效果，持续4回合。',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+200%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PATK: 66.2,
          CDMG: 47.2,
        },
      },
    },
  },
}

export default ancilla
