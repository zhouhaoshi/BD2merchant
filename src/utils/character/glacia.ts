// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 600786 / entryId: 127664
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const glacia: characterDataObj = {
  name: 'glacia',
  cName: '克蕾西亚',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 110, // 魔法力
  HP: 4473, // 生命值
  DEF: 0, // 防御力
  MRES: 20, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 110, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    MATK: 34,
    MRES: 8,
  },
  Awakening: {
    // 觉醒
    MRES: 4,
    PHP: 14,
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
    // 服装：爱丽丝 / 技能：永恒茶派对
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '爱丽丝',
      target: 'enemy',
      sp: -4,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/123852.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/350316.png',
      description:
        '2回合内，对自己应用挑衅效果。2回合内，对自己应用相当于自身魔法力200%的能量护盾效果。4回合内，对自己应用复活效果。死亡时，将以100%的生命力复活，并在2回合内，对自己应用挑衅效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: 0, multiplying: 0 }, // +1
        2: { sp: 0, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：挑衅（2回合） | 护盾（2回合） | 挑衅（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '护盾量+125%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '护盾量+125%',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
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
          PHP: 62.4,
          MRES: 13.4,
        },
      },
    },
    // 服装：纪律部 / 技能：绝对校规！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '纪律部',
      target: 'enemy',
      sp: -3,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/177774.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/997781.png',
      description:
        '2回合内，对自己应用50%的魔法防护罩效果。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 200 }, // +0
        1: { sp: 1, cd: 0, multiplying: 200 }, // +1
        2: { sp: 1, cd: 0, multiplying: 230 }, // +2
        3: { sp: 1, cd: 0, multiplying: 260 }, // +3
        4: { sp: 1, cd: 0, multiplying: 290 }, // +4
        5: { sp: 1, cd: 0, multiplying: 320 }, // +5
        // TODO 描述里识别到的效果：护盾（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害量+20%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials3: {
          multiplying: 20,
          description: '伤害量+20%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 16,
        },
        Bonding: {
          // 绑定属性
          MATK: 80,
          DEF: 5,
        },
      },
    },
    // 服装：天守传人 / 技能：真龙现影
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '天守传人',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 5,
      scope: [
        [0, 0],
        [-1, 1],
        [-2, 2],
        [-1, 2],
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1],
        [2, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_602/h_1241/497891/2026/6/28/84165550ms4fpq6f.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/6/30/73953186ms7429ms.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法固定伤害。4回合内，对敌人应用6的连携保留效果。',
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
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '连携保留+3',
        },
        potentials3: {
          multiplying: 20,
          description: '伤害量+20%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '连携保留+2回合',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '连携保留+5',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '[额外能力]使自身获得1层连携强化，持续2回合',
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
          PHP: 62.4,
          DEF: 13.4,
        },
      },
    },
  },
}

export default glacia
