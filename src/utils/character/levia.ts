import { enemyWeaknessDeBuffType } from '@/utils/globals'
const levia: characterDataObj = {
  name: 'levia',
  cName: '莱维亚',
  element: 'fire',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 396, // 攻击力
  HP: 1470, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 1548,
  critical: 446,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    MATK: 34, // 攻击力
    DEF: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    PMATK: 12, // 百分比攻击力
    DMG: 10, // 属性伤害
  },
  attackType: 'skip', // 攻击类型 front为最前 skip为跳过
  commonSkill: {
    general: {
      name: 'general',
      cName: '普攻',
      target: 'enemy',
      cd: 0,
      sp: 0,
      chain: 1,
      scope: [[0, 0]],
      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',
      skillEffect: {
        multiplying: 100,
      },
    },
  },
  // 服装技能
  Skill: {
    nightofJealousy: {
      name: 'nightofJealousy',
      cName: '忌妒之夜',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 4,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Levia_2_large', // 图片形象
      qimage: 'Levia_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的魔法伤害。若敌人为主要目标，则改为造成相当于自身魔法力&-effect/mainMultiplying-&%的魔法伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          mainMultiplying: 80,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          mainMultiplying: 80,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          mainMultiplying: 120,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          mainMultiplying: 160,
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          mainMultiplying: 200,
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          mainMultiplying: 240,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          mainMultiplying: 20,
          description: '主要目标、次要目标伤害增加20%',
        },
        potentials2: {
          mainMultiplying: 40,
          description: '主要目标伤害增加40%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, -2],
            [0, 2],
            [2, 0],
            [-2, 0],
          ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          CDMG: 47.2, // 百分比生命值
          PMATK: 14.2, // 百分比攻击力
          MATK: 80,
        },
      },
    },
    trackAndFieldTeamCaptain: {
      name: 'trackAndFieldTeamCaptain',
      cName: '田径社社长',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 4,
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
      image: 'Levia_1_large', // 图片形象
      qimage: 'Levia_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/enemyWeakness-&%的魔法虚弱效果。若敌人为主要目标，则改为在&-effect/deBuff/0/duration-&回合内，应用&-effect/deBuff/0/mainEnemyWeakness-&%的魔法虚弱效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 60,
              enemyWeakness: 40,
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 60,
              enemyWeakness: 40,
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 80,
              enemyWeakness: 60,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 80,
              enemyWeakness: 60,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 100,
              enemyWeakness: 80,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'matk',
              delay: 1,
              mainEnemyWeakness: 100,
              enemyWeakness: 80,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '每次攻击的技能伤害增加10%',
        },
        potentials2: {
          multiplying: 10,
          description: '每次攻击的技能伤害增加10%',
        },
        potentials3: {
          description: '一般目标与主要目标受到的魔法虚弱效果均增加20%',
          deBuff: {
            index: 0,
            mainEnemyWeakness: 20,
            enemyWeakness: 20,
          },
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PMATK: 66.2, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    overheat: {
      name: 'overheat',
      cName: '过热',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 1,
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
      image: 'Levia_3_large', // 图片形象
      qimage: 'Levia_3_idle', // q版形象
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。若敌人处于虚弱状态，则改为造成相当于自身魔法力&-effect/conditionMultiplying-&%的魔法伤害。解除应用于敌人的虚弱效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          condition: ['enemyWeakness'],
          conditionMultiplying: 450,
          removeBuffList: ['enemyWeakness'],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 200,
          condition: ['enemyWeakness'],
          conditionMultiplying: 450,
          removeBuffList: ['enemyWeakness'],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 275,
          condition: ['enemyWeakness'],
          conditionMultiplying: 450,
          removeBuffList: ['enemyWeakness'],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 275,
          condition: ['enemyWeakness'],
          conditionMultiplying: 600,
          removeBuffList: ['enemyWeakness'],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 350,
          condition: ['enemyWeakness'],
          conditionMultiplying: 600,
          removeBuffList: ['enemyWeakness'],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 350,
          condition: ['enemyWeakness'],
          conditionMultiplying: 750,
          removeBuffList: ['enemyWeakness'],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          conditionMultiplying: 50,
          description: '敌人若处于虚弱状态，伤害增加50%',
        },
        potentials2: {
          conditionMultiplying: 50,
          description: '敌人若处于虚弱状态，伤害增加50%',
        },
        potentials3: {
          description: '冷却时间减少2次',
          cd: -2,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PMATK: 75.6, // 魔法攻击
          CDMG: 28.4, // 爆伤
        },
      },
    },
  },
}

export default levia
