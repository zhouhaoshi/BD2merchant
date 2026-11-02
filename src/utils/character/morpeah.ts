// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 632282 / entryId: 160899
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const morpeah: characterDataObj = {
  name: 'morpeah',
  cName: '墨菲亚',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 297, // 魔法力
  HP: 2772, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 297, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：海滨度假 / 技能：反派假面
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '海滨度假',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/79707.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/364841.png',
      description:
        '【先发制人】通过召唤至友军阵营，生成【崇拜假面】1个。生成【诽谤假面】1个。 崇拜假面：【攻击目标】最前方，【击退】左后方一格，【SP消耗】：0，【CD】：0，【技能】：对最前方的目标使用3格左右范围的自爆技能。【伤害】：自身魔法力的300%。 诽谤假面：【攻击目标】最前方，【击退】右后方一格，【SP消耗】：0，【CD】：0，【技能】：对最前方的目标使用3格穿透范围的自爆技能。【伤害】：自身魔法力的300%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +0
        1: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +1
        2: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +2
        3: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +3
        4: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +4
        5: { sp: 0, cd: 0, multiplying: 0, lifemanship: 1 }, // +5
        // TODO 描述里未能识别的效果：通过召唤至友军阵营，生成【崇拜假面】1个
        // 　　　　　　　　　　　崇拜假面：【攻击目标】最前方，【击退】左后方一格，【SP消耗】：0，【CD】：0…
        // 　　　　　　　　　　　诽谤假面：【攻击目标】最前方，【击退】右后方一格，【SP消耗】：0，【CD】：0…
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '【额外能力】4回合内，对自己应用30%的防护罩效果',
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
    // 服装：白日梦兔女郎 / 技能：白日梦召唤
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '白日梦兔女郎',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/890326.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/741450.png',
      description:
        '通过召唤至友军阵营，生成【兔女郎之魂】1个。 兔女郎之魂：【攻击目标】最前方，【击退】右后方一格，【SP消耗】：0，【CD】：0，【技能】：对最前方的目标使用9格8个方向范围的自爆技能，并减少30%的魔法抗性。【伤害】：自身魔法力的200%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: 0, multiplying: 0 }, // +1
        2: { sp: 0, cd: 0, multiplying: 0 }, // +2
        3: { sp: 0, cd: 0, multiplying: 0 }, // +3
        4: { sp: 0, cd: 0, multiplying: 0 }, // +4
        5: { sp: 0, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里未能识别的效果：通过召唤至友军阵营，生成【兔女郎之魂】1个
        // 　　　　　　　　　　　兔女郎之魂：【攻击目标】最前方，【击退】右后方一格，【SP消耗】：0，【CD】：…
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
        // 　　　　　　描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 16,
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PMATK: 52,
          DMG: 30,
        },
      },
    },
    // 服装：使徒 / 技能：黑暗密令
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '使徒',
      target: 'enemy',
      sp: -3,
      cd: 1,
      chain: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/709577.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/795633.png',
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。2回合内，对主要目标敌人应用集中射击效果。2回合内，对敌人应用100%的召唤兽虚弱效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 100 }, // +0
        1: { sp: 1, cd: 0, multiplying: 100 }, // +1
        2: { sp: 1, cd: 0, multiplying: 125 }, // +2
        3: { sp: 1, cd: 0, multiplying: 150 }, // +3
        4: { sp: 1, cd: 0, multiplying: 175 }, // +4
        5: { sp: 1, cd: 0, multiplying: 200 }, // +5
        // TODO 描述里未能识别的效果：，对主要目标敌人应用集中射击效果
        // 　　　　　　　　　　　，对敌人应用100%的召唤兽虚弱效果
        // 　　　　　　　　　　　，对敌人应用115%的召唤兽虚弱效果
        // 　　　　　　　　　　　，对敌人应用130%的召唤兽虚弱效果
        // 　　　　　　　　　　　，对敌人应用145%的召唤兽虚弱效果
        // 　　　　　　　　　　　，对敌人应用160%的召唤兽虚弱效果
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '召唤物虚弱效果倍率+10%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '召唤物虚弱效果倍率+10%',
        },
        potentials3: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '召唤物虚弱+70%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+200%',
          multiplying: 200,
        },
        burst3: {
          sp: 2, // 消耗SP
          description: '伤害量+400%',
          multiplying: 400,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 16,
        },
        Bonding: {
          // 绑定属性
          MATK: 80,
          MRES: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default morpeah
