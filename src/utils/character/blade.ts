import { enemyWeaknessDeBuffType } from '@/utils/globals'
const blade: characterDataObj = {
  name: 'blade',
  cName: '布莱德',
  element: 'dark',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 429, // 攻击力
  HP: 1050, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2592,
  critical: 650.56,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    ATK: 34, // 攻击力
    DEF: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    PATK: 12, // 百分比攻击力
    DMG: 10, // 属性伤害
  },
  attackType: 'front', // 攻击类型 front为最前 skip为跳过
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
    apostle: {
      name: 'apostle',
      cName: '使者',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [-1, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Blade_1_idle', // 图片形象
      qimage: 'Blade_1_idle', // q版形象
      description:
        '自身遭受攻击时，将进行反击。每次反击时，对敌人全体造成相当于自身攻击力&-effect/hitBuff/0/hitMultiplying-&%的物理伤害。此效果在遭受&-effect/hitBuff/0/triggerCount-&次攻击后将消失。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 300,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 100,
              triggerCount: 8, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 380,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 120,
              triggerCount: 8, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 380,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 120,
              triggerCount: 10, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 460,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 140,
              triggerCount: 10, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 540,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 160,
              triggerCount: 10, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 620,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 180,
              triggerCount: 10, // 可触发次数
            },
          ],
          buff: [
            {
              duration: 99,
              scope: [[0, 0]],
              hit: 1,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 80,
          description: '伤害增加80%',
        },
        potentials2: {
          hitBuff: {
            index: 0,
            hitMultiplying: 20,
          },
          description: '反击伤害增加20%',
        },
        potentials3: {
          sp: 1,
          description: 'sp消耗量减少1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          ATK: 80, // 攻击力
          DEF: 5, // 防御
          CDMG: 47.2, // 爆伤
        },
      },
    },
    youngLady: {
      name: 'youngLady',
      cName: '小公主',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 4,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
        [0, 1],
        [-1, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Blade_2_idle', // 图片形象
      qimage: 'Blade_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/0/duration-&回合内，对主要目标敌人应用&-effect/deBuff/0/mainEnemyWeakness-&%的物理虚弱效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 100,
            },
          ],
        },
        1: {
          sp: -1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 100,
            },
          ],
        },
        2: {
          sp: -1,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 110,
            },
          ],
        },
        3: {
          sp: -1,
          cd: 0,
          multiplying: 90,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 120,
            },
          ],
        },
        4: {
          sp: -1,
          cd: 0,
          multiplying: 110,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 130,
            },
          ],
        },
        5: {
          sp: -1,
          cd: 0,
          multiplying: 130,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              mainEnemyWeakness: 140,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '每次攻击的技能伤害增加20%',
        },
        potentials2: {
          deBuff: {
            index: 0,
            mainEnemyWeakness: 10,
          },
          description: '虚弱效果增加10%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, 2],
            [-1, 2],
            [1, 2],
          ],
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PATK: 52, // 百分比攻击力
          DMG: 30,
        },
      },
    },
  },
}

export default blade
