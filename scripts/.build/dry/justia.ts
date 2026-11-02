// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593571 / entryId: 122344
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const justia: characterDataObj = {
  name: 'justia',
  cName: '悠丝缇亚',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 352, // 攻击力
  HP: 2121, // 生命值
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
    // 服装：血骑士 / 技能：月晕砍击
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '血骑士',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/926661.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/315284.png',
      description:
        '攻击敌人&-chain-&次 每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 75 }, // +0
        1: { sp: 0, cd: 0, multiplying: 105 }, // +1
        2: { sp: 0, cd: 0, multiplying: 130 }, // +2
        3: { sp: 1, cd: 0, multiplying: 130 }, // +3
        4: { sp: 1, cd: 0, multiplying: 155 }, // +4
        5: { sp: 1, cd: 0, multiplying: 175 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials2: {
          multiplying: 25,
          description: '伤害倍率+25%',
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
          PHP: 17,
          ATK: 80,
          DMG: 30,
        },
      },
    },
    // 服装：皎洁死神 / 技能：下弦刺击
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '皎洁死神',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/458760.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/932438.png',
      description: '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 275 }, // +0
        1: { sp: 0, cd: 0, multiplying: 350 }, // +1
        2: { sp: 0, cd: 0, multiplying: 420 }, // +2
        3: { sp: 1, cd: 0, multiplying: 420 }, // +3
        4: { sp: 1, cd: 0, multiplying: 490 }, // +4
        5: { sp: 1, cd: 0, multiplying: 555 }, // +5
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 35,
          description: '伤害倍率+35%',
        },
        potentials2: {
          multiplying: 35,
          description: '伤害倍率+35%',
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
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PHP: 17,
          ATK: 80,
          MRES: 8.4,
        },
      },
    },
    // 服装：血之贪食者 / 技能：贪食尖齿
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '血之贪食者',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/331967.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/839306.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身属性伤害增加&-effect/buff/0/attributeDamage-&%。恢复自身相当于自身最大生命力&-effect/buff/1/HPAdd-&%的生命力。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          buff: [
            {
              duration: 8,
              attributeDamage: 200,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          buff: [
            {
              duration: 8,
              attributeDamage: 200,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 185,
          buff: [
            {
              duration: 8,
              attributeDamage: 250,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 225,
          buff: [
            {
              duration: 8,
              attributeDamage: 300,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 260,
          buff: [
            {
              duration: 8,
              attributeDamage: 350,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          buff: [
            {
              duration: 8,
              attributeDamage: 400,
              scope: [[0, 0]],
            },
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
        potentials2: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '【额外能力】【前置效果】解除套用于主要目标的防护罩和能量护盾。伤害量+45%',
          multiplying: 45,
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+45%',
          multiplying: 45,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+45%',
          multiplying: 45,
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
          PATK: 14.2,
          DMG: 30,
        },
      },
    },
    // 服装：剑道社 / 技能：樱花砍击
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '剑道社',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/806321.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/73970.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 90 }, // +0
        1: { sp: 0, cd: 0, multiplying: 120 }, // +1
        2: { sp: 0, cd: 0, multiplying: 150 }, // +2
        3: { sp: 1, cd: 0, multiplying: 150 }, // +3
        4: { sp: 1, cd: 0, multiplying: 175 }, // +4
        5: { sp: 1, cd: 0, multiplying: 200 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '伤害倍率+15%',
        },
        potentials2: {
          multiplying: 15,
          description: '伤害倍率+15%',
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
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PHP: 17,
          PATK: 52,
          DMG: 30,
        },
      },
    },
    // 服装：泳池派对 / 技能：食物战士
    skill5: {
      name: 'skill5', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '泳池派对',
      target: 'enemy',
      sp: -2,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/188506.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/715790.png',
      description:
        '自身成功闪避敌人&-effect/buff/0/sidestep-&次前，以100%的概率闪避敌人的攻击。&-effect/buff/1/duration-&回合内，自身攻击力增加&-effect/buff/1/attackAdd-&%。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 185,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 3,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 210,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 210,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 245,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 99,
              sidestep: 4,
              scope: [[0, 0]],
            },
            {
              duration: 8,
              attribute: 'atk',
              attackAdd: 270,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，以100%的概率闪避敌人的攻击
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          attackAdd: 30,
          description: '攻击力增加倍率+30%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '+4回合',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '【额外能力】友军的SP恢复6点',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '100%闪避+3次',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: 'SP+4',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '攻击力增加+100%',
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
          PHP: 17,
          PATK: 52,
          DEF: 8.4,
        },
      },
    },
  },
}

export default justia
