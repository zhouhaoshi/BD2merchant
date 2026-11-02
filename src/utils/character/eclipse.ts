// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593603 / entryId: 122351
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const eclipse: characterDataObj = {
  name: 'eclipse',
  cName: '伊柯利普斯',
  star: 5, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 308, // 魔法力
  HP: 2499, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 308, // TODO 默认面板，装备/词条加成需要另配
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
    PMATK: 12,
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
    // 服装：空间魔女 / 技能：泰拉抽嗜
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '空间魔女',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/792485.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/688973.png',
      description:
        '恢复自身相当于自身最大生命力&-effect/buff/0/HPAdd-&%的生命力。每次攻击命中敌人时，敌人的SP减少3点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 220,
          buff: [
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 250,
          buff: [
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 280,
          buff: [
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
          multiplying: 280,
          buff: [
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
          multiplying: 310,
          buff: [
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
          multiplying: 340,
          buff: [
            {
              duration: 0,
              HPAdd: 35,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：每次攻击命中敌人时，敌人的SP减少3点
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 30,
          description: '伤害量+30%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
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
          PMATK: 14.2,
          MRES: 8.4,
        },
      },
    },
    // 服装：恶梦兔女郎 / 技能：噬梦者
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '恶梦兔女郎',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [-1, -2],
        [-2, -2],
        [2, -2],
        [1, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/30374.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/257341.png',
      description:
        '每次攻击命中敌人时，友军的SP恢复&-effect/hitBuff/0/spAdd-&点，敌人的SP减少1点。&-effect/deBuff/0/duration-&回合内，敌人魔法抵抗减少&-effect/deBuff/0/MRESReduce-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 75,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 100,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 125,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 175,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 4,
              MRESReduce: 15,
              scope: [],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，敌人的SP减少1点
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '魔法抵抗减少+5%',
          deBuff: {
            index: 0,
            MRESReduce: 5,
          },
        },
        potentials2: {
          multiplying: 10,
          description: '伤害量+10%',
        },
        potentials3: {
          multiplying: 10,
          description: '伤害量+10%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PMATK: 52,
          PHP: 17,
          DMG: 30,
        },
      },
    },
    // 服装：海滨度假 / 技能：夏季巅峰
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '海滨度假',
      target: 'enemy',
      sp: -5,
      cd: 11,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/375998.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/624239.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 420 }, // +0
        1: { sp: 1, cd: 0, multiplying: 420 }, // +1
        2: { sp: 1, cd: 0, multiplying: 470 }, // +2
        3: { sp: 1, cd: 0, multiplying: 520 }, // +3
        4: { sp: 1, cd: 0, multiplying: 570 }, // +4
        5: { sp: 1, cd: 0, multiplying: 620 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害量+50%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害量+50%',
        },
        potentials3: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 4, // 消耗SP
          description: '冷却时间-10回合，增加技能范围',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+160%',
          multiplying: 160,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+160%',
          multiplying: 160,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          CDMG: 10.8,
        },
        Bonding: {
          // 绑定属性
          PMATK: 52,
          CDMG: 75.6,
        },
      },
    },
    // 服装：梦中的新娘 / 技能：蜜月礼包
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '梦中的新娘',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/529582.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/397498.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身魔法力增加&-effect/buff/0/attackAdd-&%。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 400,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 450,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 500,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 550,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 600,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '魔法力增加+25%',
          buff: {
            index: 0,
            attackAdd: 25,
          },
        },
        potentials2: {
          description: '魔法力增加+25%',
          buff: {
            index: 0,
            attackAdd: 25,
          },
        },
        potentials3: {
          multiplying: 50,
          description: '伤害量+50%',
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
          CDMG: 75.6,
        },
      },
    },
  },
}

export default eclipse
