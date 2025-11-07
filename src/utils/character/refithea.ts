const refithea: characterDataObj = {
  name: 'refithea',
  cName: '芮彼泰雅',
  element: 'light',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  MATK: 187, // 攻击力
  HP: 3885, // 生命值
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
    PHP: 14, // 属性伤害
  },
  attackType: 'skip', // 攻击类型 front为最前 skip为跳过
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
    pureWhiteBlessing: {
      name: 'pureWhiteBlessing',
      cName: '純白的祝福',
      target: 'friendly',
      sp: -3,
      cd: 1,
      chain: 0,
      scope: [
        [0, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。范围为空就是全部
      image: 'Refithea_2_large', // 图片形象
      qimage: 'Refithea_2_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合期間，我軍的屬性傷害增加&-effect/buff/0/attributeDamage-&%。&-effect/buff/1/duration-&回合期間，對我軍套用&-effect/buff/1/chainAddNumber-&連鎖強化效果。&-effect/buff/2/duration-&回合期間，對我軍套用相當於各自自身最大生命力&-effect/buff/2/shield-&%的能量防衛效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 40,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 40,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 55,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 85,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 2,
              attributeDamage: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              chainAddNumber: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 2,
              shield: 20,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '2回合期間能量防衛增加15%',
          buff: {
            index: 2,
            shield: 15,
          },
        },
        potentials2: {
          description: '2回合期間能量防衛增加15%',
          buff: {
            index: 2,
            shield: 15,
          },
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [-1, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
          ],
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
    theGluttonous: {
      name: 'theGluttonous',
      cName: '貪婪之星',
      target: 'friendly',
      sp: -3,
      cd: 7,
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
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Refithea_1_large', // 图片形象
      qimage: 'Refithea_1_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合期間，我軍的致命傷害增加&-effect/buff/0/critical-&%。&-effect/buff/1/duration-&回合期間，對自身套用光環效果。光環效果內，我軍將套用&-effect/buff/1/damageReduction-&%的減傷效果。我軍的SP恢復&-effect/special/0/spAdd-&點。',
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
              duration: 6,
              critical: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 25,
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
              duration: 6,
              critical: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 25,
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
              duration: 6,
              critical: 75,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 25,
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
              duration: 6,
              critical: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 5,
            },
          ],
          buff: [
            {
              duration: 6,
              critical: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 25,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          special: [
            {
              spAdd: 5,
            },
          ],
          buff: [
            {
              duration: 6,
              critical: 100,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              damageReduction: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '冷卻時間減少2次',
          cd: -2,
        },
        potentials2: {
          description: '6回合期間致命傷害增加10%',
          buff: {
            index: 0,
            critical: 10,
          },
        },
        potentials3: {
          description: '6回合期間致命傷害增加15%',
          buff: {
            index: 0,
            critical: 15,
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
    poolsideFairy: {
      name: 'poolsideFairy',
      cName: '水上精靈',
      target: 'friendly',
      sp: -7,
      cd: 7,
      chain: 0,
      scope: [
        [0, 0],
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Refithea_3_large', // 图片形象
      qimage: 'Refithea_3_idle', // q版形象
      description:
        '&-effect/buff/0/duration-&回合期間，我軍的屬性傷害增加&-effect/buff/0/attributeDamage-&%。若目標為光屬性，則在&-effect/buff/0/duration-&回合期間，屬性傷害變為增加&-effect/buff/0/lightAttributeDamage-&%。&-effect/buff/1/duration-&回合期間，對我軍套用SP消耗減少&-effect/buff/1/spReduce-&的效果。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          buff: [
            {
              duration: 6,
              attributeDamage: 25,
              lightAttributeDamage: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 6,
              attributeDamage: 25,
              lightAttributeDamage: 50,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 6,
              attributeDamage: 30,
              lightAttributeDamage: 60,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 6,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              attributeDamage: 30,
              lightAttributeDamage: 60,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              attributeDamage: 35,
              lightAttributeDamage: 70,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          buff: [
            {
              duration: 8,
              attributeDamage: 40,
              lightAttributeDamage: 80,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
            {
              duration: 8,
              spReduce: 1,
              scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '范围增加',
          scope: [
            [-1, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
          ],
        },
        potentials2: {
          description: '屬性傷害增加5%，光屬性屬性傷害增加10%',
          buff: {
            index: 0,
            attributeDamage: 5,
            lightAttributeDamage: 10,
          },
        },
        potentials3: {
          description: '屬性傷害增加5%，光屬性屬性傷害增加10%',
          buff: {
            index: 0,
            attributeDamage: 5,
            lightAttributeDamage: 10,
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

export default refithea
