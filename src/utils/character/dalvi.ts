// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 607173 / entryId: 135141
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const dalvi: characterDataObj = {
  name: 'dalvi',
  cName: '达非',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 352, // 魔法力
  HP: 2016, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 60, // 属性伤害
  panel: 352, // TODO 默认面板，装备/词条加成需要另配
  critical: 75, // 默认爆伤
  attributeDamage: 60, // 默认属伤
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
    // 服装：明月 / 技能：月夜豪谈
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '明月',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [0, -1],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_1240/h_1322/50118/497891/2026/3/7/806015.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/530972.png',
      description:
        '6回合内，释放九尾狐之力，并进行变身。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。4回合内，对敌人应用每层叠加造成相当于自身魔法力80%的魔法伤害的出血叠加效果。最多可应用叠加至99层。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 350 }, // +0
        1: { sp: 1, cd: 0, multiplying: 350 }, // +1
        2: { sp: 1, cd: 0, multiplying: 400 }, // +2
        3: { sp: 1, cd: 0, multiplying: 450 }, // +3
        4: { sp: 1, cd: 0, multiplying: 500 }, // +4
        5: { sp: 1, cd: 0, multiplying: 550 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '伤害量+15%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '出血伤害量+40%',
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
          PHP: 17,
          PMATK: 52,
          DMG: 30,
        },
      },
    },
    // 服装：暑假 / 技能：妖力风暴
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '暑假',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 4,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_1240/h_1240/50118/497891/2026/3/7/44534.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/921548.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。6回合内，对敌人应用每层叠加造成相当于自身魔法力55%的魔法伤害的出血叠加效果。最多可应用叠加至99层。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 55 }, // +0
        1: { sp: 1, cd: 0, multiplying: 55 }, // +1
        2: { sp: 1, cd: 0, multiplying: 70, special: [{ spAdd: 2 }] }, // +2
        3: { sp: 1, cd: 0, multiplying: 70 }, // +3
        4: { sp: 1, cd: 0, multiplying: 85 }, // +4
        5: { sp: 1, cd: 0, multiplying: 85 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '出血伤害量+15%',
        },
        potentials2: {
          multiplying: 15,
          description: '伤害量+15%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '出血伤害量+15%',
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
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
    // 服装：机智恋人 / 技能：这场闹剧，也该收场了吧？
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '机智恋人',
      target: 'enemy',
      sp: -7,
      cd: 9,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_602/h_1175/497891/2026/6/14/94317465mrkeki9p.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/6/16/21487422mrndis9g.png',
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。若敌人处于【出血】状态，则改为根据敌人持有的总量，每拥有1个出血，造成相当于自身魔法力100%的魔法伤害。解除敌人身上的出血效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 100 }, // +0
        1: { sp: 1, cd: 0, multiplying: 100 }, // +1
        2: { sp: 1, cd: 0, multiplying: 100 }, // +2
        3: { sp: 1, cd: 0, multiplying: 100 }, // +3
        4: { sp: 1, cd: 0, multiplying: 100 }, // +4
        5: { sp: 1, cd: 0, multiplying: 100 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '每拥有1个出血，伤害量+20%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '每拥有1个出血，伤害量+20%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '总量伤害量+50%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '总量伤害量+50%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '冷却时间-4回合',
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
          DMG: 45.6,
        },
      },
    },
  },
}

export default dalvi
