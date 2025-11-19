const nebris: characterDataObj = {
  name: 'nebris',
  cName: '内布利斯',
  element: 'wind',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 396, // 攻击力
  HP: 1470, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2223,
  critical: 605.12,
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
      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',
      scope: [[0, 0]],
      skillEffect: {
        multiplying: 100,
      },
    },
  },
  // 服装技能
  Skill: {
    labyrinthGatekeeper: {
      name: 'labyrinthGatekeeper',
      cName: '迷宫的门卫',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 2,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Nebris_2_large', // 图片形象
      qimage: 'Nebris_2_idle', // q版形象
      description:
        '对自己在&-effect/buff/0/duration-&回合内，应用施加伤害增加&-effect/buff/0/increasedDamage-&%的增强效果。若自己正应用增强效果，则改为在&-effect/buff/1/duration-&回合内，暴击伤害增加&-effect/buff/1/critical-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          cd: 0,
          sp: 0,
          multiplying: 125,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 100,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 200,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          cd: 0,
          sp: 1,
          multiplying: 125,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 100,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 200,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          cd: 0,
          sp: 1,
          multiplying: 125,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 125,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 250,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          cd: 0,
          sp: 1,
          multiplying: 150,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 125,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 250,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          cd: 0,
          sp: 1,
          multiplying: 150,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 150,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 300,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          cd: 0,
          sp: 1,
          multiplying: 175,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              increasedDamage: 150,
              scope: [[0, 0]],
            },
            {
              duration: 6,
              critical: 300,
              judgingCondition: ['increasedDamage'],
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials2: {
          multiplying: 20,
          description: '每次攻击的技能伤害增加20%',
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
          CDMG: 10.8, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          CDMG: 75.6, // 百分比生命值
          ATK: 80, // 百分比攻击力
        },
      },
    },
    laidBackLifeguard: {
      name: 'laidBackLifeguard',
      cName: '松散的救生员',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Nebris_1_large',
      qimage: 'Nebris_1_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。若自己正应用能力值强化效果，则改为在&-effect/buff/1/duration-&回合内，属性伤害增加&-effect/buff/1/attributeDamage-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          cd: 0,
          sp: 0,
          multiplying: 100,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          multiplying: 100,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          multiplying: 120,
          buff: [
            {
              duration: 6,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          multiplying: 140,
          buff: [
            {
              duration: 10,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          multiplying: 160,
          buff: [
            {
              duration: 10,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          multiplying: 180,
          buff: [
            {
              duration: 10,
              judgingCondition: [],
              attribute: 'atk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              attributeDamage: 50,
              judgingCondition: ['attackAdd', 'critical'],
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials2: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials3: {
          scope: [
            [-1, 0],
            [1, 0],
          ],
          description: '范围增加',
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
          CDMG: 104, // 暴击伤害
          PATK: 14.2, // 攻击力
          DMG: 30, // 属性伤害
        },
      },
    },
    newEmployee: {
      name: 'newEmployee',
      cName: '新进员工',
      target: 'enemy',
      sp: -4,
      cd: 7,
      chain: 3,
      scope: [
        [0, 0],
        [1, 0],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Nebris_3_large',
      qimage: 'Nebris_3_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。此时，根据自身拥有的增益效果数量，每增加&-effect/buffNumber-&个时，将额外增加相当于攻击力&-effect/buffExtraMultiplying-&%的伤害量。',
      effect: {
        // 技能效果
        0: {
          cd: 0,
          sp: 0,
          multiplying: 40,
          buffNumber: 1,
          buffExtraMultiplying: 15,
        },
        1: {
          cd: 0,
          sp: 1,
          multiplying: 40,
          buffNumber: 1,
          buffExtraMultiplying: 15,
        },
        2: {
          cd: 0,
          sp: 1,
          multiplying: 55,
          buffNumber: 1,
          buffExtraMultiplying: 15,
        },
        3: {
          cd: 0,
          sp: 1,
          multiplying: 55,
          buffNumber: 1,
          buffExtraMultiplying: 20,
        },
        4: {
          cd: 0,
          sp: 1,
          multiplying: 70,
          buffNumber: 1,
          buffExtraMultiplying: 20,
        },
        5: {
          cd: 0,
          sp: 1,
          multiplying: 70,
          buffNumber: 1,
          buffExtraMultiplying: 25,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '每次攻击的技能伤害增加10%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间减少2次',
        },
        potentials3: {
          buffExtraMultiplying: 5,
          description: '增益效果伤害增加量增加5%',
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
          DEF: 5, // 暴击伤害
          PATK: 52, // 攻击力
          CR: 7.8, // 属性伤害
        },
      },
    },
  },
}

export default nebris
