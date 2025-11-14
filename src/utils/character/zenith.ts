import { enemyWeaknessDeBuffType } from '@/utils/globals'

const zenith: characterDataObj = {
  name: 'zenith',
  cName: '杰尼斯',
  element: 'wind',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 198, // 攻击力
  HP: 3759, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 1019,
  critical: 213.04,
  attributeDamage: 50,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    ATK: 34, // 攻击力
    DEF: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    DEF: 4, // 百分比攻击力
    PHP: 14, // 属性伤害
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
    robinHood: {
      name: 'robinHood',
      cName: '罗宾汉',
      target: 'enemy',
      sp: -2,
      cd: 1,
      chain: 6,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Zenith_1_large', // 图片形象
      qimage: 'Zenith_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/1/duration-&回合内，对敌人应用集中射击效果。&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/enemyWeakness-&%的虚弱效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 20,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 28,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 36,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 36,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 43,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 25,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 50,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '虚弱效果增加25%',
          deBuff: {
            index: 0,
            enemyWeakness: 25,
          },
        },
        potentials2: {
          description: '虚弱效果增加25%',
          deBuff: {
            index: 0,
            enemyWeakness: 25,
          },
        },
        potentials3: {
          description: 'sp消耗减少1',
          sp: 1,
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
          DEF: 13.4, // 防御
        },
      },
    },
    poolsideGuardian: {
      name: 'poolsideGuardian',
      cName: '水上守护者',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 6,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Zenith_2_large', // 图片形象
      qimage: 'Zenith_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/1/duration-&回合内，对敌人应用集中射击效果。&-effect/deBuff/0/duration-&回合内，对敌人应用受到的连携伤害增加&-effect/deBuff/0/chainDamageAdd-&%的效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 2,
              scope: [],
              chainDamageAdd: 5,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 2,
              scope: [],
              chainDamageAdd: 5,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 2,
              scope: [],
              chainDamageAdd: 6,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
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
              chainDamageAdd: 6,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
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
              chainDamageAdd: 7,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          deBuff: [
            {
              duration: 4,
              scope: [],
              chainDamageAdd: 8,
              delay: 1,
            },
            {
              duration: 2,
              delay: 1,
              provocation: 1,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '连锁伤害增加1%',
          deBuff: {
            index: 0,
            chainDamageAdd: 1,
          },
        },
        potentials2: {
          description: 'sp消耗减少1',
          sp: 1,
        },
        potentials3: {
          description: '连锁伤害增加1%',
          deBuff: {
            index: 0,
            chainDamageAdd: 1,
          },
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
          HP: 564,
          MRES: 13.4, // 防御
        },
      },
    },
  },
}

export default zenith
