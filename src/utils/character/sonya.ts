import { enemyWeaknessDeBuffType, specialInjuryBuffType } from '@/utils/globals'
const sonya: characterDataObj = {
  name: 'sonya',
  cName: '索尼娅',
  element: 'dark',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 407, // 攻击力
  HP: 1449, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2550,
  critical: 606.08,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    MATK: 34, // 攻击力
    MRES: 8, // 防御力
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
    shadowedDream: {
      name: 'shadowedDream',
      cName: '潜藏的梦',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Sonya_1_large', // 图片形象
      qimage: 'Sonya_1_idle', // q版形象
      description:
        '&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/enemyWeakness-&%虚弱效果。若此攻击对敌人叠加的连携数量为&-effect/deBuff/0/minChainCount-&或以上，则改为在&-effect/deBuff/0/duration-&回合内，应用&-effect/deBuff/0/darkEnemyWeakness-&%的暗属性虚弱效果。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 300,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 55,
              darkEnemyWeakness: 75,
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 55,
              darkEnemyWeakness: 75,
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 80,
              darkEnemyWeakness: 115,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 400,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 80,
              darkEnemyWeakness: 115,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 400,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 105,
              darkEnemyWeakness: 155,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 500,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              minChainCount: 6,
              enemyWeakness: 105,
              darkEnemyWeakness: 155,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '脆弱效果增加10%',
          deBuff: {
            index: 0,
            enemyWeakness: 10,
            darkEnemyWeakness: 10,
          },
        },
        potentials2: {
          description: '脆弱效果增加10%',
          deBuff: {
            index: 0,
            enemyWeakness: 10,
            darkEnemyWeakness: 10,
          },
        },
        potentials3: {
          multiplying: 50,
          description: '技能伤害增加50%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 16, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PMATK: 52, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    littlePumpkinGirl: {
      name: 'littlePumpkinGirl',
      cName: '賣南瓜的少女',
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
      image: 'Sonya_2_large', // 图片形象
      qimage: 'Sonya_2_idle', // q版形象
      description:
        '對敵人造成相當於自身魔法力&-effect/multiplying-&%的魔法傷害。&-effect/specialInjuryBuff/0/duration-&回合期間，對敵人套用相當於自身魔法力&-effect/specialInjuryBuff/0/specialMultiplying-&%魔法傷害的惡夢效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          specialInjuryBuff: [
            {
              duration: 2,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 45,
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 200,
          specialInjuryBuff: [
            {
              duration: 2,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 45,
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 225,
          specialInjuryBuff: [
            {
              duration: 2,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 60,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 225,
          specialInjuryBuff: [
            {
              duration: 4,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 60,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 250,
          specialInjuryBuff: [
            {
              duration: 4,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 75,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 275,
          specialInjuryBuff: [
            {
              duration: 4,
              scope: [],
              type: specialInjuryBuffType.Nightmare,
              specialMultiplying: 90,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 25,
          description: '技能伤害增加25%',
        },
        potentials2: {
          description: '噩梦效果增加5%',
          specialInjuryBuff: {
            index: 0,
            specialMultiplying: 5,
          },
        },
        potentials3: {
          description: '噩梦效果增加5%',
          specialInjuryBuff: {
            index: 0,
            specialMultiplying: 5,
          },
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 16, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4,
          MRES: 13.4, // 百分比攻击力
        },
      },
    },
  },
}

export default sonya
