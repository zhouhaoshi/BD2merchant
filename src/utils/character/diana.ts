const diana: characterDataObj = {
  name: 'diana',
  cName: '黛安娜',
  element: 'wind',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  attackType: 'skip', // 攻击类型 front为最前 skip为跳过
  MATK: 176, // 攻击力
  HP: 4011, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2592,
  critical: 650.56,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    MATK: 34, // 攻击力
    MRES: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    MRES: 4, // 百分比攻击力
    PHP: 14, //
  },
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
    adventurerOfTheUnknown: {
      name: 'adventurerOfTheUnknown',
      cName: '未知的探究者',
      target: 'friendly',
      sp: -3,
      cd: 9,
      chain: 0,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, -1],
        [0, -2],
        [-1, 0],
        [-2, 0],
        [1, 0],
        [2, 0],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Diana_1_large', // 图片形象
      qimage: 'Diana_1_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对自己应用光环效果。光环内友军的属性伤害增加&-effect/aureole/0/attributeDamage-&%，暴击率增加&-effect/aureole/1/CRAdd-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          aureole: [
            {
              attributeDamage: 100,
              scope: [],
            },
            {
              CRAdd: 20,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          aureole: [
            {
              attributeDamage: 140,
              scope: [],
            },
            {
              CRAdd: 20,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          aureole: [
            {
              attributeDamage: 170,
              scope: [],
            },
            {
              CRAdd: 20,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              attributeDamage: 170,
              scope: [],
            },
            {
              CRAdd: 20,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              attributeDamage: 170,
              scope: [],
            },
            {
              CRAdd: 30,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              attributeDamage: 200,
              scope: [],
            },
            {
              CRAdd: 30,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 8,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '属性伤害增加20%',
          aureole: {
            index: 0,
            attributeDamage: 20,
          },
        },
        potentials2: {
          description: '冷却时间减少2次',
          cd: -2,
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, -3],
            [0, 3],
            [3, 0],
            [-3, 0],
          ],
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
          PHP: 62.4, // 攻击力
          MRES: 13.4, // 防御
        },
      },
    },
    antiDystopia: {
      name: 'antiDystopia',
      cName: '反乌托邦',
      target: 'friendly',
      sp: -2,
      cd: 5,
      chain: 0,
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
        [0, 2],
        [0, -2],
        [2, 0],
        [-2, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Diana_2_large', // 图片形象
      qimage: 'Diana_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对自己应用光环效果。光环效果内友军应用相当于自身魔法力&-effect/aureole/0/shield-&%的能量护盾效果，并且此能量护盾效果将每回合恢复。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          aureole: [
            {
              shield: 500,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              shield: 500,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              shield: 650,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          aureole: [
            {
              shield: 800,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: -2,
          aureole: [
            {
              shield: 800,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: -2,
          aureole: [
            {
              shield: 1000,
              scope: [],
            },
          ],
          buff: [
            {
              duration: 2,
              aureole: 1,
              scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '能量护盾增加50%',
          aureole: {
            index: 0,
            shield: 50,
          },
        },
        potentials2: {
          description: '能量护盾增加50%',
          aureole: {
            index: 0,
            shield: 50,
          },
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [0, 3],
            [-1, 2],
            [1, 2],
            [-2, 1],
            [2, 1],
            [3, 0],
            [-3, 0],
            [-2, -1],
            [2, -1],
            [-1, -2],
            [1, -2],
            [0, -3],
          ],
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
          PHP: 45.4, // 攻击力
          MATK: 80, // 攻击力
        },
      },
    },
  },
}

export default diana
