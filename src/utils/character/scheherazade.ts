// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593577 / entryId: 122345
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const scheherazade: characterDataObj = {
  name: 'scheherazade',
  cName: '莎赫拉查德',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 385, // 魔法力
  HP: 1638, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 385, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    MATK: 34,
    MRES: 8,
  },
  Awakening: {
    // 觉醒
    PMATK: 12,
    DMG: 10,
  },
  commonSkill: {
    general: {
      name: 'general',
      cName: '普攻',
      target: 'enemy',
      sp: 0,
      cd: 0,
      chain: 1,
      scope: [[0, 0]],
      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',
      skillEffect: { multiplying: 100 },
    },
  },
  // 服装技能
  Skill: {
    // 服装：苍蓝魔女 / 技能：水流裂破
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '苍蓝魔女',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/94236.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/224958.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。解除应用于敌人的增益效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 180 }, // +0
        1: { sp: 0, cd: 0, multiplying: 205 }, // +1
        2: { sp: 0, cd: 0, multiplying: 230 }, // +2
        3: { sp: 1, cd: 0, multiplying: 230 }, // +3
        4: { sp: 1, cd: 0, multiplying: 255 }, // +4
        5: { sp: 1, cd: 0, multiplying: 280 }, // +5
        // TODO 描述里未能识别的效果：解除应用于敌人的增益效果
        // TODO 待人工复核：描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 30,
          description: '伤害量+30%',
        },
        potentials2: {
          multiplying: 30,
          description: '伤害量+30%',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '伤害量+80%，增加技能范围。',
          multiplying: 80,
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+80%',
          multiplying: 80,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+80%',
          multiplying: 80,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PMATK: 52,
          CDMG: 47.2,
        },
      },
    },
    // 服装：魔法学校教授 / 技能：幽静水流
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '魔法学校教授',
      target: 'enemy',
      sp: -6,
      cd: 5,
      chain: 7,
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
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/526457.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/267029.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。解除应用于敌人的增益效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 35 }, // +0
        1: { sp: 0, cd: 0, multiplying: 45 }, // +1
        2: { sp: 0, cd: 0, multiplying: 55 }, // +2
        3: { sp: 1, cd: 0, multiplying: 55 }, // +3
        4: { sp: 1, cd: 0, multiplying: 65 }, // +4
        5: { sp: 1, cd: 0, multiplying: 75 }, // +5
        // TODO 描述里未能识别的效果：解除应用于敌人的增益效果
        // TODO 待人工复核：描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '[额外能力]2回合内，敌人魔法抵抗减少15%',
          deBuff: {
            index: 0,
            duration: 2,
            scope: [],
            extra: 1, // 是否为额外值
            extraDescription: '【额外能力】2回合内，敌人魔法抵抗减少15%。',
            MRESReduce: 15,
          },
        },
        potentials2: {
          multiplying: 15,
          description: '伤害量+15%',
        },
        potentials3: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          MATK: 80,
          MRES: 5,
          DMG: 30,
        },
      },
    },
    // 服装：代号S / 技能：蓝宝石回旋镖
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '代号S',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_787/h_1168/50118/157597/2025/0/22/906286.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/193841.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。解除应用于敌人的增益效果。&-effect/deBuff/0/duration-&回合内，对敌人应用沉默效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 95,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 120,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 145,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 145,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 165,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 185,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        // TODO 描述里未能识别的效果：解除应用于敌人的增益效果
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 30,
          description: '伤害量+30%',
        },
        potentials2: {
          multiplying: 30,
          description: '伤害量+30%',
        },
        potentials3: {
          description: '+2回合',
          deBuff: {
            index: 0,
            duration: 2,
          },
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PMATK: 52,
          CR: 4.6,
          DMG: 30,
        },
      },
    },
    // 服装：泳池派对 / 技能：盛夏热浪
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '泳池派对',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 5,
      scope: [
        [0, 0],
        [-1, 1],
        [-2, 2],
        [1, 1],
        [2, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/470524.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/144855.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。若此攻击对敌人叠加的连携数量为15或以上，则改为造成相当于自身魔法力&-effect/conditionMultiplying-&%的魔法伤害。解除应用于敌人的增益效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 30, conditionMultiplying: 140 }, // +0
        1: { sp: 0, cd: 0, multiplying: 38, conditionMultiplying: 160 }, // +1
        2: { sp: 0, cd: 0, multiplying: 46, conditionMultiplying: 180 }, // +2
        3: { sp: 1, cd: 0, multiplying: 46, conditionMultiplying: 180 }, // +3
        4: { sp: 1, cd: 0, multiplying: 53, conditionMultiplying: 200 }, // +4
        5: { sp: 1, cd: 0, multiplying: 60, conditionMultiplying: 220 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          description: '伤害量+10%；若此攻击对敌人叠加的连携数量为15或以上，伤害量+20%',
          multiplying: 10,
          conditionMultiplying: 20,
        },
        potentials2: {
          description: '伤害量+10%；若此攻击对敌人叠加的连携数量为15或以上，伤害量+20%',
          multiplying: 10,
          conditionMultiplying: 20,
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '敌人连携数达到15及以上时，伤害量+160%',
          conditionMultiplying: 160,
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '敌人连携数达到15及以上时，伤害量+80%',
          conditionMultiplying: 80,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '[额外能力]6回合内，为自身赋予1层连携强化',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          MATK: 116,
        },
      },
    },
  },
}

export default scheherazade
