const wilhelmina: characterDataObj = {
  name: 'wilhelmina',
  cName: '威廉明娜',
  element: 'water',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 319, // 攻击力
  HP: 2331, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
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
    ironMonarch: {
      name: 'ironMonarch',
      cName: '钢铁君主',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 12,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Wilhelmina_1_large', // 图片形象
      qimage: 'Wilhelmina_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 60,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 60,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 67,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 74,
        },
        4: {
          sp: 1,
          cd: -2,
          multiplying: 74,
        },
        5: {
          sp: 1,
          cd: -2,
          multiplying: 81,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 7,
          description: '每次攻击的技能伤害增加7%',
        },
        potentials2: {
          multiplying: 7,
          description: '每次攻击的技能伤害增加7%',
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
          ATK: 16, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          DMG: 30, // 攻击力
          ATK: 80,
          DEF: 5, // 防御
        },
      },
    },
    waterParkQueen: {
      name: 'waterParkQueen',
      cName: '水上乐园女王',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 9,
      scope: [
        [0, 0],
        [-1, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Wilhelmina_2_large', // 图片形象
      qimage: 'Wilhelmina_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对自己应用&-effect/buff/0/chainAddNumber-&连携强化效果。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 45,
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
          multiplying: 45,
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
          multiplying: 55,
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
          multiplying: 65,
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
          multiplying: 65,
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
          multiplying: 75,
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
          multiplying: 5,
          description: '每次攻击的技能伤害增加5%',
        },
        potentials2: {
          multiplying: 5,
          description: '每次攻击的技能伤害增加5%',
        },
        potentials3: {
          multiplying: 5,
          description: '每次攻击的技能伤害增加5%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          CDMG: 10.8, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          CDMG: 75.6, // 攻击力
          PATK: 28.4,
          MRES: 8.4, // 防御
        },
      },
    },
  },
}

export default wilhelmina
