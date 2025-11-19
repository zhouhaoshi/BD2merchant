import { enemyWeaknessDeBuffType } from '@/utils/globals'

const rafina: characterDataObj = {
  name: 'rafina',
  cName: '拉菲娜',
  element: 'water',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 220, // 攻击力
  HP: 3507, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
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
    steelEngine: {
      name: 'steelEngine',
      cName: '钢铁引擎',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Rafina_1_large', // 图片形象
      qimage: 'Rafina_1_idle', // q版形象
      description:
        '解除应用于敌人的防护罩和能量护盾效果。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          removeBuffList: ['shield', 'damageReduction'],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 595,
          removeBuffList: ['shield', 'damageReduction'],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 685,
          removeBuffList: ['shield', 'damageReduction'],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 685,
          removeBuffList: ['shield', 'damageReduction'],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 775,
          removeBuffList: ['shield', 'damageReduction'],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 860,
          removeBuffList: ['shield', 'damageReduction'],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '技能伤害增加65%',
          multiplying: 65,
        },
        potentials2: {
          description: '冷却时间减少2次',
          cd: -2,
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, -2],
            [0, 2],
            [2, 0],
            [-2, 0],
          ],
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 16, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          ATK: 80, // 攻击力
          DEF: 5, // 防御
          DMG: 30,
        },
      },
    },
    codeNameA: {
      name: 'codeNameA',
      cName: '代号A',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 5,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Rafina_2_large', // 图片形象
      qimage: 'Rafina_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/0/duration-&回合内，敌人防御力减少&-effect/deBuff/0/DEFReduce-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 40,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 60,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 75,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 75,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 90,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 100,
          deBuff: [
            {
              duration: 4,
              DEFReduce: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '每次攻击的技能伤害增加15%',
          multiplying: 15,
        },
        potentials2: {
          description: '每次攻击的技能伤害增加15%',
          multiplying: 15,
        },
        potentials3: {
          description: 'SP消耗减少1',
          sp: 1,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 16, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PATK: 52,
          PHP: 28.4, // 攻击力
          DEF: 5, // 攻击力
        },
      },
    },
    gameClub: {
      name: 'gameClub',
      cName: '游戏社',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 3,
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
      image: 'Rafina_3_large', // 图片形象
      qimage: 'Rafina_3_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/0/duration-&回合内，对敌人应用&-effect/deBuff/0/enemyWeakness-&%的物理虚弱效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 50,
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 50,
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 75,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 90,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 75,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 90,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 100,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 110,
          deBuff: [
            {
              duration: 4,
              scope: [],
              type: enemyWeaknessDeBuffType.fragility,
              attribute: 'atk',
              delay: 1,
              enemyWeakness: 100,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '每次攻击的技能伤害增加15%',
          multiplying: 15,
        },
        potentials2: {
          description: '每次攻击的技能伤害增加15%',
          multiplying: 15,
        },
        potentials3: {
          description: 'SP消耗减少1',
          sp: 1,
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
          ATK: 22,
          DEF: 8.4, // 攻击力
        },
      },
    },
  },
}

export default rafina
