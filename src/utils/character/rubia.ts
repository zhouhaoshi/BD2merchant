// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593601 / entryId: 122350
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const rubia: characterDataObj = {
  name: 'rubia',
  cName: '露比雅',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 352, // 攻击力
  HP: 1911, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 0, // 属性伤害
  panel: 352, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 0, // 默认属伤
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
    // 服装：沙漠之刺 / 技能：短剑之舞
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '沙漠之刺',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/498918.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/231437.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。7回合内，对敌人应用造成相当于自身攻击力150%的物理伤害的灼伤效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 40 }, // +0
        1: { sp: 0, cd: 0, multiplying: 60 }, // +1
        2: { sp: 0, cd: 0, multiplying: 75 }, // +2
        3: { sp: 1, cd: 0, multiplying: 75 }, // +3
        4: { sp: 1, cd: 0, multiplying: 75 }, // +4
        5: { sp: 1, cd: 0, multiplying: 75 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 35,
          description: '伤害倍率+35%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '灼伤效果倍率+50%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '灼伤效果倍率+50%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '灼伤伤害量+100%，增加技能范围。',
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
          ], // 爆发后的攻击范围，二维坐标系存储。直接命中目标为[0,0]
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '灼伤伤害量+100%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '灼伤+5回合',
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
          PATK: 52,
          HP: 154,
          CDMG: 47.2,
        },
      },
    },
    // 服装：大海女帝 / 技能：爆裂子弹
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '大海女帝',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 6,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/12873.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/822312.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，敌人防御力减少25%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 40 }, // +0
        1: { sp: 0, cd: 0, multiplying: 48 }, // +1
        2: { sp: 0, cd: 0, multiplying: 56 }, // +2
        3: { sp: 1, cd: 0, multiplying: 56 }, // +3
        4: { sp: 1, cd: 0, multiplying: 64 }, // +4
        5: { sp: 1, cd: 0, multiplying: 72 }, // +5
        // TODO 描述里识别到的效果：减防25%（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '防御力减少倍率+10%',
        },
        potentials2: {
          multiplying: 8,
          description: '伤害倍率+8%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '防御力减少倍率+10%',
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
          ATK: 116,
          DEF: 5,
        },
      },
    },
    // 服装：女仆代号C / 技能：秘密服务
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '女仆代号C',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 2,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/144461.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/431417.png',
      description:
        '自身成功闪避敌人2次前，以100%的概率闪避敌人的攻击。4回合内，自身攻击力增加50%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 120 }, // +0
        1: { sp: 1, cd: 0, multiplying: 120 }, // +1
        2: { sp: 1, cd: 0, multiplying: 140 }, // +2
        3: { sp: 1, cd: 0, multiplying: 160 }, // +3
        4: { sp: 1, cd: 0, multiplying: 180 }, // +4
        5: { sp: 1, cd: 0, multiplying: 200 }, // +5
        // TODO 描述里识别到的效果：闪避（1回合） | 自身攻击力50%（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '+2回合',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '闪避次数+1次',
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
          PATK: 52,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
    // 服装：女仆比基尼 / 技能：秘密指令
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '女仆比基尼',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_1210/h_3000/50118/497891/2026/3/29/562889.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/798884.png',
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。2回合内，对敌人应用造成相当于自身攻击力250%的物理伤害的灼伤效果。4回合内，对敌人应用150%的施加持续伤害虚弱效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 150 }, // +0
        1: { sp: 1, cd: 0, multiplying: 150 }, // +1
        2: { sp: 1, cd: 0, multiplying: 150 }, // +2
        3: { sp: 1, cd: 0, multiplying: 150 }, // +3
        4: { sp: 1, cd: 0, multiplying: 150 }, // +4
        5: { sp: 1, cd: 0, multiplying: 150 }, // +5
        // TODO 描述里识别到的效果：持续伤害（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '持续伤害虚弱效果倍率+25%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '持续伤害虚弱效果倍率+25%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '灼伤效果倍率+50%',
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
          CR: 4.6,
          CDMG: 47.2,
        },
      },
    },
  },
}

export default rubia
