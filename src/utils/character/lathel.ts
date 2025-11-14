const lathel: characterDataObj = {
  name: 'lathel',
  cName: '拉德尔',
  element: 'fire',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 275, // 攻击力
  HP: 2877, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 721,
  critical: 240.64,
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
    medicinalHerbTracker: {
      name: 'medicinalHerbTracker',
      cName: '草药猎人',
      target: 'enemy',
      sp: -3,
      cd: 3,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 1],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_2_large', // 图片形象
      qimage: 'Lathel_1_idle', // q版形象
      description:
        '遭受相当于自身当前生命力&-effect/buff/1/HPAdd-&%的伤害，并在&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 200,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 245,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 245,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 285,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 320,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
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
          description: '范围增加',
          scope: [[-2, 2]],
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
          HP: 154, // 攻击力
          ATK: 80,
          DEF: 8.4, // 防御
        },
      },
    },
    lonelySurvivor: {
      name: 'lonelySurvivor',
      cName: '孤独的生存者',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_2_large', // 图片形象
      qimage: 'Lathel_2_idle', // q版形象
      description:
        '遭受相当于自身当前生命力&-effect/buff/1/HPAdd-&%的伤害，并在&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 65,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 90,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 115,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 115,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 135,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 155,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
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
          description: 'sp消耗减少1',
          sp: 1,
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
          HP: 154, // 攻击力
          ATK: 80,
          DEF: 8.4, // 防御
        },
      },
    },
    darkKnight: {
      name: 'darkKnight',
      cName: '暗黑骑士',
      target: 'friendly',
      sp: -2,
      cd: 5,
      chain: 0,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_4_large', // 图片形象
      qimage: 'Lathel_4_idle', // q版形象
      description:
        '【先发制人】&-effect/buff/0/duration-&回合内，对自己应用相当于最大生命力&-effect/buff/0/shield-&%的能量护盾效果。&-effect/buff/1/duration-&回合内，对自己应用&-effect/buff/1/damageReduction-&%的物理防护罩效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              shield: 170,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              shield: 220,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              shield: 270,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
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
              shield: 270,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
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
              shield: 320,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 6,
              shield: 320,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              attribute: 'atk', // 效果类型
              damageReduction: 50,
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
            shield: 15,
          },
          description: '护罩增加15%',
        },
        potentials2: {
          buff: {
            index: 1,
            damageReduction: 10,
          },
          description: '受到的物理伤害减少增加10%',
        },
        potentials3: {
          buff: {
            index: 0,
            shield: 15,
          },
          description: '护罩增加15%',
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
          PHP: 62.4, // 百分比攻击力
          ATK: 22,
          DEF: 8.4, // 防御
        },
      },
    },
    promiseOfVengeance: {
      name: 'promiseOfVengeance',
      cName: '复仇的誓约',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_5_large', // 图片形象
      qimage: 'Lathel_5_idle', // q版形象
      description:
        '遭受相当于自身当前生命力&-effect/buff/1/HPAdd-&%的伤害，并在&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 450,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 600,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 750,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 750,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 875,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 1000,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 75,
          description: '技能伤害增加75%',
        },
        potentials2: {
          buff: {
            index: 0,
            attackAdd: 10,
          },
          description: '攻击力增加10%',
        },
        potentials3: {
          multiplying: 75,
          description: '技能伤害增加75%',
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
          CR: 4.6, // 百分比攻击力
          ATK: 80,
          CDMG: 47.2, // 防御
        },
      },
    },
    poolParty: {
      name: 'poolParty',
      cName: '泳池派对',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_6_large', // 图片形象
      qimage: 'Lathel_6_idle', // q版形象
      description:
        '遭受相当于自身当前生命力&-effect/buff/1/HPAdd-&%的伤害，并在&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/CRAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 75,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 93,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 111,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 111,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 128,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 145,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              HPAdd: -5,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '每次攻击技能伤害增加15%',
        },
        potentials2: {
          multiplying: 15,
          description: '每次攻击技能伤害增加15%',
        },
        potentials3: {
          scope: [
            [0, -2],
            [0, 2],
          ],
          description: '范围增加',
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
          CDMG: 28.4, // 百分比攻击力
          PATK: 52,
          DMG: 30, // 防御
        },
      },
    },
    homunculus: {
      name: 'homunculus',
      cName: '霍尔蒙克斯',
      target: 'friendly',
      sp: -2,
      cd: 5,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Lathel_3_large', // 图片形象
      qimage: 'Lathel_3_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，友军的攻击力增加&-effect/buff/0/attackAdd-&%。&-effect/buff/1/duration-&回合内，友军的攻击力增加&-effect/buff/1/attackAdd-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 60,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 60,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 80,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 6,
              attackAdd: 80,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              attribute: 'atk', // 效果类型
              duration: 2,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          buff: {
            index: 1,
            attackAdd: 10,
          },
          description: '2回合期间攻击力增加10%',
        },
        potentials2: {
          buff: {
            index: 0,
            attackAdd: 10,
          },
          description: '4~6回合期间(根据技能等级)攻击力增加10%',
        },
        potentials3: {
          buff: {
            index: 1,
            attackAdd: 10,
          },
          description: '2回合期间攻击力增加10%',
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
          PHP: 62.4, // 百分比攻击力
          MRES: 13.4, // 防御
        },
      },
    },
  },
}

export default lathel
