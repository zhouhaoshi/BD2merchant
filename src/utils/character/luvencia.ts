const luvencia: characterDataObj = {
  name: 'luvencia',
  cName: '卢班希亚',
  element: 'dark',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 319, // 攻击力
  HP: 2331, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2241,
  critical: 657.92,
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
    dealSnatcher: {
      name: 'dealSnatcher',
      cName: '印鉴掠夺者',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 8,
      scope: [
        [0, 0],
        [0, 1],
        [-1, 1],
        [1, 1],
        [0, 2],
        [-1, 2],
        [1, 2],
        [-2, 2],
        [2, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Luvencia_1_large', // 图片形象
      qimage: 'Luvencia_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人为主要目标，则改为造成相当于自身攻击力&-effect/mainMultiplying-&%的物理伤害。每命中一个目标，伤害量额外减少&-effect/extraMultiplying-&%。伤害量减少将以首次攻击为基准固定。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 60,
          mainMultiplying: 80,
          extraMultiplying: -5,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 60,
          mainMultiplying: 80,
          extraMultiplying: -5,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 60,
          mainMultiplying: 100,
          extraMultiplying: -5,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          mainMultiplying: 110,
          extraMultiplying: -5,
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 70,
          mainMultiplying: 130,
          extraMultiplying: -5,
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 80,
          mainMultiplying: 140,
          extraMultiplying: -5,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          mainMultiplying: 10,
          description: '主目标伤害增加10%',
        },
        potentials2: {
          sp: 1,
          description: 'sp消耗量减少1',
        },
        potentials3: {
          mainMultiplying: 10,
          description: '主目标伤害增加10%',
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
  },
}

export default luvencia
