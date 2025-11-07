const yuridata: characterDataObj = {
  name: 'yuri',
  cName: '尤里',
  element: 'light',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 363, // 攻击力
  HP: 1995, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2223,
  critical: 605.12,
  attributeDamage: 0,
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
    whitebolt: {
      name: 'whitebolt',
      cName: '白雪',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 4,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Yuri_1_large', // 图片形象
      qimage: 'Yuri_1_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&的物理伤害。解除应用于敌人的增益效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 80,
        },
        1: {
          sp: 1,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 80,
        },
        2: {
          sp: 1,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 95,
        },
        3: {
          sp: 1,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 110,
        },
        4: {
          sp: 1,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 125,
        },
        5: {
          sp: 1,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 140,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '技能冷却减少2回合',
        },
        potentials2: {
          multiplying: 20,
          description: '每次攻击的技能伤害增加20%',
        },
        potentials3: {
          description: '4回合期间攻击力增加10%',
          buff: {
            index: 0,
            attackAdd: 10,
          },
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
          HP: 154, // 百分比生命值
          PATK: 75.6, // 百分比攻击力
        },
      },
    },
    comebackIdol: {
      name: 'comebackIdol',
      cName: '回归偶像',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [1, 0],
        [2, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Yuri_2_large',
      qimage: 'Yuri_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，自身暴击伤害增加&-effect/buff/0/critical-&%。4回合内，对自己应用闪避目标效果。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 495,
        },
        1: {
          sp: 1,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 495,
        },
        2: {
          sp: 1,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 575,
        },
        3: {
          sp: 1,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 655,
        },
        4: {
          sp: 1,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 735,
        },
        5: {
          sp: 1,
          buff: [
            {
              duration: 4,
              critical: 150,
              scope: [[0, 0]],
            },
          ],
          multiplying: 820,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 40,
          description: '技能伤害增加40%',
        },
        potentials2: {
          cd: -2,
          description: '技能冷却减少2回合',
        },
        potentials3: {
          multiplying: 40,
          description: '技能伤害增加40%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          CR: 1.6, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          CDMG: 28.4, // 暴击伤害
          ATK: 80, // 攻击力
          DMG: 30, // 属性伤害
        },
      },
    },
  },
}

export default yuridata
