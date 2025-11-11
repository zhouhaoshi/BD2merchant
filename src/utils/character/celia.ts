const celia: characterDataObj = {
  name: 'celia',
  cName: '西利亚',
  element: 'dark',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 275, // 攻击力
  HP: 2562, // 生命值
  DEF: 0, // 防御力
  MRES: 20, // 魔法抵抗
  CR: 20, // 暴击率
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
    theCurse: {
      name: 'theCurse',
      cName: '诅咒之星',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 7,
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
      image: 'Celia_1_large', // 图片形象
      qimage: 'Celia_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。&-effect/deBuff/0/duration-&回合内，敌人攻击力减少&-effect/deBuff/0/attackReduce-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 18,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 35,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 21,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 45,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 24,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 55,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 24,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 55,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 27,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 65,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'atk',
              attackReduce: 65,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '2回合期间防御力减少10%',
          deBuff: {
            index: 1,
            duration: 2,
            scope: [],
            extra: 1, // 是否为额外值
            extraDescription: '【额外能力】2回合期间防御力减少10%。',
            DEFReduce: 10,
          },
        },
        potentials2: {
          multiplying: 5,
          description: '每次攻击技能伤害增加5%',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间减少2次',
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
          PHP: 28.4,
          PMATK: 52, // 百分比攻击力
          DEF: 5, // 百分比攻击力
        },
      },
    },
    descendantOfTheGreatWitch: {
      name: 'descendantOfTheGreatWitch',
      cName: '大魔女的后裔',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 5,
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
      image: 'Celia_2_large', // 图片形象
      qimage: 'Celia_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。&-effect/deBuff/0/duration-&回合内，敌人魔法力减少&-effect/deBuff/0/attackReduce-&%。',
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
              attribute: 'matk',
              attackReduce: 35,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 31,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'matk',
              attackReduce: 45,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 37,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'matk',
              attackReduce: 55,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 37,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'matk',
              attackReduce: 55,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 43,
          deBuff: [
            {
              duration: 4,
              scope: [],
              attribute: 'matk',
              attackReduce: 65,
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
              attribute: 'matk',
              attackReduce: 65,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '2回合期间魔法抵抗减少10%',
          deBuff: {
            index: 1,
            duration: 2,
            scope: [],
            extra: 1, // 是否为额外值
            extraDescription: '【额外能力】2回合期间魔法抵抗减少10%。',
            MRESReduce: 10,
          },
        },
        potentials2: {
          multiplying: 8,
          description: '每次攻击技能伤害增加8%',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间减少2次',
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
          PHP: 28.4,
          MATK: 80, // 百分比攻击力
          MRES: 5, // 百分比攻击力
        },
      },
    },
    masqueradeBunny: {
      name: 'masqueradeBunny',
      cName: '化装舞会兔女郎',
      target: 'enemy',
      sp: -4,
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
      image: 'Celia_3_large', // 图片形象
      qimage: 'Celia_3_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对自己应用&-effect/buff/0/chainAddNumber-&连携强化效果。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 65,
          buff: [
            {
              duration: 4,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 65,
          buff: [
            {
              duration: 4,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 85,
          buff: [
            {
              duration: 4,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 105,
          buff: [
            {
              duration: 4,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 105,
          buff: [
            {
              duration: 6,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 125,
          buff: [
            {
              duration: 6,
              chainAddNumber: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '每次攻击技能伤害增加10%',
        },
        potentials2: {
          multiplying: 10,
          description: '每次攻击技能伤害增加10%',
        },
        potentials3: {
          multiplying: 15,
          description: '每次攻击技能伤害增加15%',
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
  },
}

export default celia
