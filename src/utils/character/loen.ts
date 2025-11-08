const loen: characterDataObj = {
  name: 'loen',
  cName: '罗安',
  element: 'fire',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 319, // 攻击力
  HP: 2520, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 5, // 暴击率
  CDMG: 100, // 暴击伤害
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
    lastHope: {
      name: 'lastHope',
      cName: '最后希望',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Loen_1_large', // 图片形象
      qimage: 'Loen_1_idle', // q版形象
      description: '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 300,
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 370,
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 440,
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 510,
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 580,
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 650,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '技能伤害增加50%',
        },
        potentials2: {
          multiplying: 50,
          description: '技能伤害增加50%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [-1, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
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
          CDMG: 104, // 百分比生命值
          PMATK: 14.2, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    trackAndFieldTeamMember: {
      name: 'trackAndFieldTeamMember',
      cName: '田径社社员',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [1, 0],
        [2, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Loen_2_large', // 图片形象
      qimage: 'Loen_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，自身魔法力增加&-effect/buff/0/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 100,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 40,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 100,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 40,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 115,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 60,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 135,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 60,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 80,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 170,
          buff: [
            {
              duration: 4,
              attribute: 'matk',
              attackAdd: 80,
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '技能伤害增加15%',
        },
        potentials2: {
          multiplying: 15,
          description: '技能伤害增加15%',
        },
        potentials3: {
          description: '冷却时间减少两回合',
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
          CDMG: 104, // 百分比生命值
          PMATK: 14.2, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    celebrityBunny: {
      name: 'celebrityBunny',
      cName: '名人兔女郎',
      target: 'enemy',
      sp: -7,
      cd: 9,
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
      image: 'Loen_3_large', // 图片形象
      qimage: 'Loen_3_idle', // q版形象
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。每命中一个目标，伤害量增加&-effect/extraMultiplying-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 75,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 75,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 95,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 115,
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 135,
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 50,
          extraMultiplying: 155,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          extraMultiplying: 10,
          description: '额外伤害加成增加10%',
        },
        potentials2: {
          extraMultiplying: 10,
          description: '额外伤害加成增加10%',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, 2],
            [0, -2],
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
          MATK: 80, // 魔法攻击
          CDMG: 75.6, // 爆伤
        },
      },
    },
  },
}

export default loen
