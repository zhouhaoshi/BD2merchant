// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593626 / entryId: 122360
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const elise: characterDataObj = {
  name: 'elise',
  cName: '爱丽洁',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  ATK: 275, // 攻击力
  HP: 2877, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 275, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：可爱小姐 / 技能：赴死之爱
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '可爱小姐',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [-1, -1],
        [-1, 0],
        [-2, 0],
        [-1, 1],
        [1, 1],
        [1, 0],
        [2, 0],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/600712.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/548564.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，敌人防御力减少50%。4回合内，敌人魔法抵抗减少50%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 90 }, // +0
        1: { sp: 0, cd: 0, multiplying: 115 }, // +1
        2: { sp: 0, cd: 0, multiplying: 140 }, // +2
        3: { sp: 1, cd: 0, multiplying: 140 }, // +3
        4: { sp: 1, cd: 0, multiplying: 165 }, // +4
        5: { sp: 1, cd: 0, multiplying: 185 }, // +5
        // TODO 描述里识别到的效果：减防50%（4回合） | 减魔抗50%（4回合） | 减防50%（6回合） | 减魔抗50%（6回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 35,
          description: '伤害量+35%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials3: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PHP: 6.4,
        },
        Bonding: {
          // 绑定属性
          PATK: 52,
          DEF: 5,
          CDMG: 47.2,
        },
      },
    },
    // 服装：代号O / 技能：慎重地···砰！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '代号O',
      target: 'friendly',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/687216.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/960288.png',
      description: '友军的SP恢复3点。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 500, special: [{ spAdd: 3 }] }, // +0
        1: { sp: 0, cd: 0, multiplying: 600, special: [{ spAdd: 3 }] }, // +1
        2: { sp: 0, cd: 0, multiplying: 700, special: [{ spAdd: 3 }] }, // +2
        3: { sp: 1, cd: 0, multiplying: 700, special: [{ spAdd: 3 }] }, // +3
        4: { sp: 1, cd: 0, multiplying: 800, special: [{ spAdd: 3 }] }, // +4
        5: { sp: 1, cd: 0, multiplying: 900, special: [{ spAdd: 3 }] }, // +5
        // TODO 描述里识别到的效果：SP变化（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: '伤害量+100%',
        },
        potentials2: {
          cd: -4,
          description: '冷却时间-4回合',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: 'SP恢复+1',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '[额外能力]【前置效果】每次攻击命中敌人时，SP恢复1，伤害量+150%',
        },
        burst2: {
          sp: 2, // 消耗SP
          description: '伤害量+300%',
        },
        burst3: {
          sp: 2, // 消耗SP
          description: '伤害量+300%',
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
          ATK: 80,
          HP: 154,
          DMG: 30,
        },
      },
    },
    // 服装：稚心佳人 / 技能：我也想赢嘛！
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '稚心佳人',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_572/h_1125/497891/2026/5/30/39508775mr0cik94.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/6/2/83648230mr350j6l.png',
      description:
        '对自己在6回合内，应用施加伤害增加70%的增强效果。【共鸣】战场上处于能力值弱化状态的目标，6回合内，对自己应用4%的增强效果，每有1个目标，可叠加1。最多可叠加至30。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 100 }, // +0
        1: { sp: 1, cd: 0, multiplying: 100 }, // +1
        2: { sp: 1, cd: 0, multiplying: 100 }, // +2
        3: { sp: 1, cd: 0, multiplying: 120 }, // +3
        4: { sp: 1, cd: 0, multiplying: 120 }, // +4
        5: { sp: 1, cd: 0, multiplying: 140 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害量+20%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '增强+2%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '增强+50%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+50%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '共鸣增强叠加数量+1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 16,
        },
        Bonding: {
          // 绑定属性
          PATK: 37.8,
        },
      },
    },
  },
}

export default elise
