const helena: characterDataObj = {
  name: 'helena',
  cName: '海伦娜',
  element: 'light',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 352, // 攻击力
  HP: 2016, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2086,
  critical: 143.6,
  attributeDamage: 50,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    MATK: 34, // 攻击力
    MRES: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    MRES: 4, // 百分比攻击力
    PHP: 14, // 属性伤害
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
    topIdol: {
      name: 'topIdol',
      cName: '顶尖偶像',
      target: 'friendly',
      sp: -2,
      cd: 5,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Helena_1_large', // 图片形象
      qimage: 'Helena_1_idle', // q版形象
      description:
        '友军的SP恢复&-effect/special/0/spAdd-&点。&-effect/buff/0/duration-&回合内，对友军应用&-effect/buff/0/damageReduction-&%的防护罩效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          special: [
            {
              spAdd: 4,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 30,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          special: [
            {
              spAdd: 4,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 37,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          special: [
            {
              spAdd: 4,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 44,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 4,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 44,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 4,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 6,
            },
          ],
          buff: [
            {
              duration: 4,
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '受到伤害减少增加10%',
          buff: {
            index: 0,
            damageReduction: 10,
          },
        },
        potentials2: {
          description: '受到伤害减少增加10%',
          buff: {
            index: 0,
            damageReduction: 10,
          },
        },
        potentials3: {
          cd: -2,
          description: '冷却时间减少2次',
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
    BRankIdol: {
      name: 'BRankIdol',
      cName: 'B级偶像',
      target: 'friendly',
      sp: -3,
      cd: 3,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Helena_2_large', // 图片形象
      qimage: 'Helena_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，友军的魔法力增加&-effect/buff/0/attackAdd-&%。&-effect/buff/1/duration-&回合内，每回合结束时，恢复友军相当于自身魔法力&-effect/buff/1/HPAdd-&%的生命力。&-effect/buff/2/duration-&回合内，友军的暴击率增加&-effect/buff/2/CRAdd-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              attribute: 'matk', // 效果类型
              attackAdd: 35,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 25,
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
              attribute: 'matk', // 效果类型
              attackAdd: 45,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 75,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 25,
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
              attribute: 'matk', // 效果类型
              attackAdd: 55,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 25,
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
              attribute: 'matk', // 效果类型
              attackAdd: 55,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 25,
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
              attribute: 'matk', // 效果类型
              attackAdd: 75,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              attribute: 'matk', // 效果类型
              attackAdd: 75,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '魔法力增加20%',
          buff: {
            index: 0,
            attackAdd: 20,
          },
        },
        potentials2: {
          description: '魔法力增加20%',
          buff: {
            index: 0,
            attackAdd: 20,
          },
        },
        potentials3: {
          description: 'SP消耗减少1',
          sp: 1,
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
          HP: 410, // 攻击力
          PMATK: 52, // 百分比攻击力
        },
      },
    },
  },
}

export default helena
