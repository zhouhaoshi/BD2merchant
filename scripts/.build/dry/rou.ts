// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593586 / entryId: 122347
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核


import { dotBuffType } from '@/utils/globals'

const rou: characterDataObj = {
  name: 'rou',
  cName: '鲁',
  star: 5, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 308, // 攻击力
  HP: 2646, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 308, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    DEF: 8,
  },
  Awakening: {
    // 觉醒
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
    // 服装：白色猫咪 / 技能：半月脚
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '白色猫咪',
      target: 'enemy',
      sp: -2,
      cd: 3,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/699964.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/279158.png',
      description:
        '2回合内，自身有75%的概率闪避敌人的攻击。每次成功闪避时，成功闪避后续攻击的概率将减少5%。对敌人造成1的物理伤害，并将目标向后方击退&-effect/repellingDistance-&格。对被撞击的敌人造成相当于被推开目标最大生命力&-effect/repellingMultiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&的物理伤害的出血效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 100,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 75,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 100,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 125,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 150,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 125,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 150,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 125,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 200,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 125,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 3,
          repellingMultiplying: 200,
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 175,
            },
          ],
        },
        // TODO 描述里未能识别的效果：，自身有75%的概率闪避敌人的攻击
        // 　　　　　　　　　　　每次成功闪避时，成功闪避后续攻击的概率将减少5%
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          dotMultiplying: 20,
          description: '出血效果倍率+20%',
        },
        potentials2: {
          dotMultiplying: 20,
          description: '出血效果倍率+20%',
        },
        potentials3: {
          repellingMultiplying: 12,
          description: '撞击伤害倍率+12%',
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
          PATK: 14.2,
          CR: 17,
          DMG: 30,
        },
      },
    },
    // 服装：小红帽 / 技能：吃零食咯！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '小红帽',
      target: 'friendly',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/755010.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/376597.png',
      description:
        '&-effect/buff/0/duration-&回合内，友军的暴击率增加&-effect/buff/0/CRAdd-&%。&-effect/buff/1/duration-&回合内，友军的暴击伤害增加&-effect/buff/1/critical-&%。4回合内，队友军应用相当于自身最大生命力50%的能量护盾效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 30,
              scope: [],
            },
            {
              duration: 6,
              critical: 150,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 40,
              scope: [],
            },
            {
              duration: 6,
              critical: 150,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 50,
              scope: [],
            },
            {
              duration: 6,
              critical: 150,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 50,
              scope: [],
            },
            {
              duration: 6,
              critical: 150,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 50,
              scope: [],
            },
            {
              duration: 6,
              critical: 225,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              CRAdd: 50,
              scope: [],
            },
            {
              duration: 6,
              critical: 300,
              scope: [],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，队友军应用相当于自身最大生命力50%的能量护盾效果
        // 　　　　　　　　　　　，队友军应用相当于自身最大生命力60%的能量护盾效果
        // 　　　　　　　　　　　，对友军应用相当于自身最大生命力70%的能量护盾效果
        // 　　　　　　　　　　　，对友军应用相当于自身最大生命力95%的能量护盾效果
        // 　　　　　　　　　　　，对友军应用相当于自身最大生命力120%的能量护盾效果
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '最大生命值护盾倍率+15%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '最大生命值护盾倍率+15%',
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
          PHP: 62.4,
          DEF: 13.4,
        },
      },
    },
    // 服装：自然之爪 / 技能：追赶游戏开始！
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '自然之爪',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 5,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/989941.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/276934.png',
      description:
        '2回合内，自身有75%的概率闪避敌人的攻击。每次成功闪避攻击时，成功闪避后续攻击的概率将减少5%。攻击敌人&-chain-&次，每次攻击时，对敌人造成相当于敌人最大生命力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 14 }, // +0
        1: { sp: 0, cd: 0, multiplying: 17 }, // +1
        2: { sp: 0, cd: 0, multiplying: 19 }, // +2
        3: { sp: 1, cd: 0, multiplying: 19 }, // +3
        4: { sp: 1, cd: 0, multiplying: 21 }, // +4
        5: { sp: 1, cd: 0, multiplying: 23 }, // +5
        // TODO 描述里未能识别的效果：，自身有75%的概率闪避敌人的攻击
        // 　　　　　　　　　　　每次成功闪避攻击时，成功闪避后续攻击的概率将减少5%
        // TODO 待人工复核：描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 2,
          description: '伤害倍率+2%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '【额外能力】2回合内，敌人防御力减少20%',
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
          PHP: 17,
          PATK: 52,
          CDMG: 47.2,
        },
      },
    },
    // 服装：流浪猫 / 技能：泰拉爆发
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '流浪猫',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/302327.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/558550.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身暴击率增加&-effect/buff/0/CRAdd-&%。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 350,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 450,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 550,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 600,
          buff: [
            {
              duration: 1,
              CRAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
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
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          MRES: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default rou
