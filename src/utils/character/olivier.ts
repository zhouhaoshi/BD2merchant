const olivier: characterDataObj = {
  name: 'olivier',
  cName: '奥利维耶',
  element: 'light',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 341, // 攻击力
  HP: 2037, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2050,
  critical: 458.64,
  attributeDamage: 80,
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
    fallenWings: {
      name: 'fallenWings',
      cName: '堕落之翼',
      target: 'enemy',
      sp: -2,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [1, 1],
        [-1, 1],
        [0, 2],
        [-1, 3],
        [1, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Olivier_1_large', // 图片形象
      qimage: 'Olivier_1_idle', // q版形象
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。此时，暴走会造成额外伤害。每额外消耗&-effect/spNumber-&点SP，伤害提升&-effect/spExtraMultiplying-&点%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 150,
          spNumber: 1,
          spExtraMultiplying: 60,
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 150,
          spNumber: 1,
          spExtraMultiplying: 60,
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 170,
          spNumber: 1,
          spExtraMultiplying: 68,
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 190,
          spNumber: 1,
          spExtraMultiplying: 76,
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 210,
          spNumber: 1,
          spExtraMultiplying: 84,
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 230,
          spNumber: 1,
          spExtraMultiplying: 92,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '基础技能伤害增加20%',
          multiplying: 20,
        },
        potentials2: {
          description: '范围增加',
          scope: [
            [0, 4],
            [2, 2],
            [2, 4],
            [-2, 2],
            [-2, 4],
          ],
        },
        potentials3: {
          spExtraMultiplying: 8,
          description: '额外技能伤害增加8%',
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
          DMG: 30,
          PMATK: 52, // 百分比攻击力
          CDMG: 28.4, // 百分比攻击力
        },
      },
    },
    olivier2: {
      name: 'olivier2',
      cName: '信实之翼',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 5,
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
      image: 'Olivier_2_large', // 图片形象
      qimage: 'Olivier_2_idle', // q版形象
      description: '每次攻击',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
        1: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
        2: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
        3: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
        4: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
        5: {
          sp: 0,
          cd: 0,
          special: [
            {
              extraAdd: 1,
            },
          ],
          multiplying: 60,
          extraMultiplying: 5,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '基础伤害增加10%',
        },
        potentials2: {
          multiplying: 10,
          description: '基础伤害增加10%',
        },
        potentials3: {
          extraMultiplying: 4,
          description: '追加伤害增加4%',
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
    apostle: {
      name: 'apostle',
      cName: '使徒',
      target: 'friendly',
      sp: -2,
      cd: 9,
      chain: 0,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Olivier_3_large', // 图片形象
      qimage: 'Olivier_3_idle', // q版形象
      description:
        '【先发制人】自身成功闪避敌人&-effect/buff/0/sidestep-&次前，以100%的概率闪避敌人的攻击。&-effect/buff/1/duration-&回合内，自身魔法力增加&-effect/buff/1/attackAdd-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 50,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 2,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 56,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 3,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 56,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 3,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 62,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          lifemanship: 1,
          buff: [
            {
              duration: 99,
              sidestep: 3,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              attribute: 'matk', // 效果类型
              attackAdd: 68,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          buff: {
            index: 1,
            attackAdd: 6,
          },
          description: '魔法力增加6%',
        },
        potentials2: {
          buff: {
            index: 1,
            attackAdd: 6,
          },
          description: '魔法力增加6%',
        },
        potentials3: {
          buff: {
            index: 1,
            duration: 2,
          },
          description: '魔法力增强持续时间增加2回合',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4,
          MRES: 13.4, // 百分比攻击力
        },
      },
    },
  },
}

export default olivier
