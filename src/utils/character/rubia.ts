// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593601 / entryId: 122350
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核


import { dotBuffType } from '@/utils/globals'

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
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&的物理伤害的灼伤效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 40,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 150,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 60,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 150,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 75,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 150,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 75,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 150,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 75,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 195,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 75,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 7,
              dotMultiplying: 240,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 35,
          description: '伤害倍率+35%',
        },
        potentials2: {
          description: '灼伤效果倍率+50%',
          dotBuff: {
            index: 0,
            dotMultiplying: 50,
          },
        },
        potentials3: {
          description: '灼伤效果倍率+50%',
          dotBuff: {
            index: 0,
            dotMultiplying: 50,
          },
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '灼伤伤害量+100%，增加技能范围。',
          multiplying: 100,
          scope: [[0, 0]], // TODO: 范围图没解析出来，请人工确认命中范围
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '灼伤伤害量+100%',
          multiplying: 100,
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
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/0/duration-&回合内，敌人防御力减少&-effect/deBuff/0/DEFReduce-&%。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 40,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 48,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 56,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 56,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 64,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 72,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 25,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '防御力减少倍率+10%',
          deBuff: {
            index: 0,
            DEFReduce: 10,
          },
        },
        potentials2: {
          multiplying: 8,
          description: '伤害倍率+8%',
        },
        potentials3: {
          description: '防御力减少倍率+10%',
          deBuff: {
            index: 0,
            DEFReduce: 10,
          },
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
        '自身成功闪避敌人&-effect/buff/0/sidestep-&次前，以100%的概率闪避敌人的攻击。&-effect/buff/1/duration-&回合内，自身攻击力增加&-effect/buff/1/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 120,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 120,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 140,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 160,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 180,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 200,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，以100%的概率闪避敌人的攻击
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
        potentials2: {
          description: '+2回合',
          buff: {
            index: 1,
            duration: 2,
          },
        },
        potentials3: {
          description: '闪避次数+1次',
          buff: {
            index: 0,
            sidestep: 1,
          },
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
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&的物理伤害的灼伤效果。&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/dotWeakness-&%的施加持续伤害虚弱效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 150,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 250,
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 150,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 250,
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 150,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 350,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 200,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 350,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 200,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 450,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          deBuff: [
            {
              duration: 4,
              scope: [],
              dotWeakness: 250,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 2,
              dotMultiplying: 450,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '持续伤害虚弱效果倍率+25%',
          deBuff: {
            index: 0,
            dotWeakness: 25,
          },
        },
        potentials2: {
          description: '持续伤害虚弱效果倍率+25%',
          deBuff: {
            index: 0,
            dotWeakness: 25,
          },
        },
        potentials3: {
          description: '灼伤效果倍率+50%',
          dotBuff: {
            index: 0,
            dotMultiplying: 50,
          },
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
