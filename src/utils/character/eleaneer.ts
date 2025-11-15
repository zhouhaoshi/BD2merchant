const eleaneer: characterDataObj = {
  name: 'eleaneer',
  cName: '艾尼尔',
  element: 'dark',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 352, // 攻击力
  HP: 1911, // 生命值
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
    piercingMagicBow: {
      name: 'piercingMagicBow',
      cName: '贯穿的魔弓',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Eleaneer_1_large', // 图片形象
      qimage: 'Eleaneer_1_idle', // q版形象
      description:
        '攻击敌人&chain&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。解除应用于敌人的增益效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 80,
          removeBuffList: ['allBuff'],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 105,
          removeBuffList: ['allBuff'],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 130,
          removeBuffList: ['allBuff'],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 130,
          removeBuffList: ['allBuff'],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 155,
          removeBuffList: ['allBuff'],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 180,
          removeBuffList: ['allBuff'],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间减少2次',
        },
        potentials3: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
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
          CDMG: 75.6, // 爆伤
        },
      },
    },
    wildDog: {
      name: 'wildDog',
      cName: 'B级偶像',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Eleaneer_2_large', // 图片形象
      qimage: 'Eleaneer_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/deBuff/0/duration-&回合内，对敌人应用沉默效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 135,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 160,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 185,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 185,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 210,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 235,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 35,
          description: '每次攻击的技能伤害增加35%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间减少2次',
        },
        potentials3: {
          description: '2回合期间防御力减少10%',
          deBuff: {
            index: 1,
            duration: 2,
            scope: [],
            extra: 1, // 是否为额外值
            extraDescription: '【额外能力】2回合期间防御力减少20%。',
            DEFReduce: 20,
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
          PATK: 52, // 攻击力
          CR: 4.6,
          DMG: 30,
        },
      },
    },
  },
}

export default eleaneer
