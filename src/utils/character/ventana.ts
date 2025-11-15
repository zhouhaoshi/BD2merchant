import { damageType, enemyWeaknessDeBuffType } from '@/utils/globals'

const ventana: characterDataObj = {
  name: 'ventana',
  cName: '班塔纳',
  element: 'light',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 385, // 攻击力
  HP: 1491, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 50, // 暴击伤害
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
    snowWhite: {
      name: 'snowWhite',
      cName: '白雪',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Ventana_1_large', // 图片形象
      qimage: 'Ventana_1_idle', // q版形象
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人处于挑衅或集中射击状态，则改为造成相当于自身攻击力&-effect/conditionMultiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          condition: ['provocation'],
          conditionMultiplying: 600,
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 245,
          condition: ['provocation'],
          conditionMultiplying: 735,
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 285,
          condition: ['provocation'],
          conditionMultiplying: 855,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 285,
          condition: ['provocation'],
          conditionMultiplying: 855,
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 320,
          condition: ['provocation'],
          conditionMultiplying: 960,
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 350,
          condition: ['provocation'],
          conditionMultiplying: 1050,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          conditionMultiplying: 125,
          description: '伤害增加50%,目标处在挑衅或集中状态时,增伤125%',
        },
        potentials2: {
          multiplying: 50,
          conditionMultiplying: 125,
          description: '伤害增加50%,目标处在挑衅或集中状态时,增伤125%',
        },
        potentials3: {
          sp: 1,
          description: 'sp消耗减少1',
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
          PATK: 52, // 百分比攻击力
          CDMG: 28.4, // 爆伤
          DMG: 30,
        },
      },
    },
    comebackIdol: {
      name: 'comebackIdol',
      cName: '回归偶像',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Ventana_2_large', // 图片形象
      qimage: 'Ventana_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人处于挑衅或集中射击状态，则改为造成相当于自身攻击力&-effect/multiplying-&%的物理纯粹伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 50,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 75,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 75,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 600,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 700,
          condition: ['provocation'],
          conditionType: damageType.pure,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: '伤害增加100%,目标处在挑衅或集中状态时,增伤100%',
        },
        potentials2: {
          description: '4回合期间攻击力增加25%',
          buff: {
            index: 0,
            attackAdd: 25,
          },
        },
        potentials3: {
          sp: 1,
          description: 'sp消耗减少1',
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
          ATK: 80, // 攻击力
          CR: 4.6,
          DMG: 30,
        },
      },
    },
    onsenPractitioner: {
      name: 'onsenPractitioner',
      cName: '温泉修行者',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Ventana_2_large', // 图片形象
      qimage: 'Ventana_2_idle', // q版形象
      description:
        '若敌人处于挑衅或集中射击状态，则在&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/enemyWeakness-&%的光属性虚弱效果。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 300,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 100,
              attributeElement: 'light',
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 100,
              attributeElement: 'light',
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 390,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 100,
              attributeElement: 'light',
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 390,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 200,
              attributeElement: 'light',
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 480,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 200,
              attributeElement: 'light',
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 570,
          deBuff: [
            {
              condition: ['provocation'],
              duration: 6,
              scope: [],
              type: enemyWeaknessDeBuffType.weakness,
              enemyWeakness: 200,
              attributeElement: 'light',
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 90,
          description: '伤害增加90%',
        },
        potentials2: {
          multiplying: 90,
          description: '伤害增加90%',
        },
        potentials3: {
          description: '虚弱状态持续时间增加4回合',
          deBuff: {
            index: 0,
            duration: 4,
          },
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
          PHP: 17, // 攻击力
          CR: 7.8,
          ATK: 80,
        },
      },
    },
  },
}

export default ventana
