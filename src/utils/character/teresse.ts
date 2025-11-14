import { dotBuffType } from '@/utils/globals'

const teresse: characterDataObj = {
  name: 'teresse',
  cName: '泰瑞丝',
  element: 'water',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 132, // 攻击力
  HP: 4515, // 生命值
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
    angelOfDestruction: {
      name: 'angelOfDestruction',
      cName: '破坏的天使',
      target: 'enemy',
      sp: -2,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Teresse_1_large', // 图片形象
      qimage: 'Teresse_1_idle', // q版形象
      description:
        '友军的SP恢复&-effect/special/0/spAdd-&点。对敌人造成1的物理伤害，并将目标向后方击退&-effect/repellingDistance-&格。对被撞击的敌人造成相当于被推开目标最大生命力&-effect/repellingMultiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&%的物理伤害的出血效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          repellingDirection: [0, -1],
          repellingDistance: 2,
          repellingMultiplying: 50,
          special: [
            {
              spAdd: 3,
            },
          ],
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
          repellingDistance: 2,
          repellingMultiplying: 50,
          special: [
            {
              spAdd: 3,
            },
          ],
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
          repellingDistance: 2,
          repellingMultiplying: 75,
          special: [
            {
              spAdd: 3,
            },
          ],
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
          repellingDistance: 2,
          repellingMultiplying: 75,
          special: [
            {
              spAdd: 3,
            },
          ],
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
          repellingDistance: 2,
          repellingMultiplying: 125,
          special: [
            {
              spAdd: 3,
            },
          ],
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
          repellingDistance: 2,
          repellingMultiplying: 125,
          special: [
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 175,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '出血伤害增加50%',
          dotBuff: {
            index: 0,
            dotMultiplying: 50,
          },
        },
        potentials2: {
          repellingMultiplying: 25,
          description: '技能碰撞伤害增加25%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [2, 0],
            [-2, 0],
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
          PHP: 28.4, // 攻击力
          ATK: 80,
          DEF: 5, // 防御
        },
      },
    },
    medicalClub: {
      name: 'medicalClub',
      cName: '保健社',
      target: 'friendly',
      sp: -4,
      cd: 5,
      chain: 0,
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
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Teresse_2_large', // 图片形象
      qimage: 'Teresse_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，友军的攻击力或魔法力将根据各自攻击类型增加&-effect/buff/0/CRAdd-&%。&-effect/buff/1/duration-&回合内，每回合结束时，恢复友军相当于自身当前生命力&-effect/buff/1/HPAdd-&%的生命力。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 90,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              CRAdd: 110,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '攻击力或魔法力增加10%',
          buff: {
            index: 0,
            CRAdd: 10,
          },
        },
        potentials2: {
          buff: {
            index: 1,
            HPAdd: 25,
          },
          description: '恢复量增加25%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, 2],
            [0, -2],
            [2, 0],
            [-2, 0],
          ],
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PHP: 6.4, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4, // 攻击力
          PATK: 14.2,
          MRES: 8.4, // 防御
        },
      },
    },
    beachsideAngel: {
      name: 'beachsideAngel',
      cName: '海边天使',
      target: 'friendly',
      sp: -4,
      cd: 5,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Teresse_3_large', // 图片形象
      qimage: 'Teresse_3_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对友军应用攻击连携叠加&-effect/buff/0/maxChainCount-&或以下的敌人时，施加伤害增加&-effect/buff/0/increasedDamage-&%的增强效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              maxChainCount: 5,
              increasedDamage: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              maxChainCount: 5,
              increasedDamage: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              maxChainCount: 5,
              increasedDamage: 120,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              maxChainCount: 5,
              increasedDamage: 120,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              maxChainCount: 5,
              increasedDamage: 140,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              maxChainCount: 5,
              increasedDamage: 160,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          buff: {
            index: 0,
            increasedDamage: 20,
          },
          description: '伤害增益效果增加20%',
        },
        potentials2: {
          description: 'SP消耗减少1',
          sp: 1,
        },
        potentials3: {
          buff: {
            index: 0,
            increasedDamage: 20,
          },
          description: '伤害增益效果增加20%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PHP: 6.4, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4, // 攻击力
          PATK: 14.2,
          DEF: 8.4, // 防御
        },
      },
    },
  },
}

export default teresse
