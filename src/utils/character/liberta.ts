const liberta: characterDataObj = {
  name: 'liberta',
  cName: '黎维塔',
  element: 'fire',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 187, // 攻击力
  HP: 3885, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2592,
  critical: 650.56,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    ATK: 34, // 攻击力
    DEF: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    DEF: 4, // 百分比攻击力
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
    darkSaintess: {
      name: 'darkSaintess',
      cName: '暗黑圣女',
      target: 'friendly',
      sp: -3,
      cd: 3,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Liberta_2_large', // 图片形象
      qimage: 'Liberta_2_idle', // q版形象
      description:
        '友军的SP恢复&-effect/special/0/spAdd-&点。&-effect/buff/0/duration-&回合内，友军的攻击力增加&-effect/buff/0/attackAdd-&%。&-effect/buff/1/duration-&回合内，友军的暴击率增加&-effect/buff/1/CRAdd-&%。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 35,
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
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 35,
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
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 50,
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
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 65,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              CRAdd: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 3,
            },
          ],
          buff: [
            {
              attribute: 'atk', // 效果类型
              duration: 4,
              attackAdd: 85,
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
          description: '4回合期间攻击力增加15%',
          buff: {
            index: 0,
            attackAdd: 15,
          },
        },
        potentials2: {
          description: '4回合期间攻击力增加15%',
          buff: {
            index: 0,
            attackAdd: 15,
          },
        },
        potentials3: {
          sp: 1,
          description: 'sp消耗量减少1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          HP: 56, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          HP: 564, // 攻击力
          MRES: 13.4, // 防御
        },
      },
    },
    onsenManager: {
      name: 'onsenManager',
      cName: '温泉管理员',
      target: 'friendly',
      sp: -3,
      cd: 5,
      chain: 0,
      scope: [], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Liberta_1_large', // 图片形象
      qimage: 'Liberta_1_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合内，对友军应用攻击连携叠加&-effect/buff/0/minChainCount-&或以上的敌人时，施加的伤害增加&-effect/buff/0/increasedDamage-&%的增强效果。&-effect/buff/1/duration-&回合内，每回合结束时，恢复友军相当于各自自身最大生命力&-effect/buff/1/HPAdd-&%的生命力。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 4,
              minChainCount: 10,
              increasedDamage: 80,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              minChainCount: 10,
              increasedDamage: 80,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 4,
              minChainCount: 10,
              increasedDamage: 90,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
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
              minChainCount: 10,
              increasedDamage: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
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
              minChainCount: 10,
              increasedDamage: 110,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
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
              minChainCount: 10,
              increasedDamage: 120,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 4,
              HPAdd: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '傷害增益效果增加10%',
          buff: {
            index: 0,
            increasedDamage: 10,
          },
        },
        potentials2: {
          description: '恢復量增加10%',
          buff: {
            index: 1,
            HPAdd: 10,
          },
        },
        potentials3: {
          description: '增強效果增加2回合',
          buff: {
            index: 0,
            duration: 2,
          },
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
          DEF: 13.4, // 攻击力
        },
      },
    },
  },
}

export default liberta
