const sacredJustia = {
  name: 'sacredJustia',
  cName: '神圣悠丝缇亚',
  element: 'light',
  ATK: 352, // 攻击力
  HP: 2121, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
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
    reclaimedDestiny: {
      name: 'reclaimedDestiny',
      cName: '找回的命运',
      target: 'enemy',
      sp: -6,
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
      image: 'SacredJustia_1_large', // 图片形象
      qimage: 'SacredJustia_1_idle', // q版形象
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&的物理伤害。每命中一个目标，伤害量增加&-effect/extraMultiplying-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          extraMultiplying: 50,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          extraMultiplying: 50,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          extraMultiplying: 50,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 300,
          extraMultiplying: 70,
        },
        4: {
          sp: 1,
          cd: -2,
          multiplying: 300,
          extraMultiplying: 70,
        },
        5: {
          sp: 1,
          cd: -2,
          multiplying: 300,
          extraMultiplying: 90,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          extraMultiplying: 5,
          description: '额外伤害加成增加5%',
        },
        potentials2: {
          extraMultiplying: 5,
          description: '额外伤害加成增加5%',
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
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 17, // 百分比生命值
          PATK: 52, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
  },
}

export default sacredJustia
