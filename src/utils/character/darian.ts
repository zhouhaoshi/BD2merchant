// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 678559 / entryId: 195333
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const darian: characterDataObj = {
  name: 'darian',
  cName: '达丽安',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  ATK: 385, // 攻击力
  HP: 1701, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 5, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 385, // TODO 默认面板，装备/词条加成需要另配
  critical: 100, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    ATK: 34,
    DEF: 8,
  },
  Awakening: {
    // 觉醒
    PATK: 12,
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
    // 服装：启示之梦 / 技能：为了母亲的梦想
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '启示之梦',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, -1],
        [-2, -2],
        [-1, 1],
        [-2, 2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/615663.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/426809.png',
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人为主要目标，则改为造成相当于自身攻击力775%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 500 }, // +0
        1: { sp: 1, cd: 0, multiplying: 500 }, // +1
        2: { sp: 1, cd: 0, multiplying: 600 }, // +2
        3: { sp: 1, cd: 0, multiplying: 600 }, // +3
        4: { sp: 1, cd: 0, multiplying: 700 }, // +4
        5: { sp: 1, cd: 0, multiplying: 700 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为主要目标，伤害倍率+175%',
        },
        potentials3: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '普通伤害量+200%，增加技能范围。',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '主要目标伤害量+300%，一般伤害量+300%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '主要目标伤害量+300%，一般伤害量+300%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          CDMG: 10.8,
        },
        Bonding: {
          // 绑定属性
          PATK: 52,
          MRES: 13.4,
        },
      },
    },
    // 服装：半糖余韵兔女郎 / 技能：雪之花
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '半糖余韵兔女郎',
      target: 'enemy',
      sp: -7,
      cd: 17,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [-1, -1],
        [-2, -2],
        [-1, 1],
        [-2, 2],
        [0, 1],
        [0, 2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/517434.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/354975.png',
      description:
        '每命中一个目标，该技能的冷却时间减少2。对敌人造成相当于自身200%的物理伤害。若敌人处于持续伤害状态，则改为造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。5回合内，对敌人应用每层叠加造成相当于自身攻击110%的物理伤害的冻伤效果。最多可应用叠加至7。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 400 }, // +0
        1: { sp: 1, cd: 0, multiplying: 400 }, // +1
        2: { sp: 1, cd: -2, multiplying: 400 }, // +2
        3: { sp: 1, cd: -2, multiplying: 475 }, // +3
        4: { sp: 1, cd: -2, multiplying: 475 }, // +4
        5: { sp: 1, cd: -2, multiplying: 550 }, // +5
        // TODO 描述里识别到的效果：持续伤害（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '冻伤效果倍率+30%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人处于持续伤害状态，伤害倍率+50%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
  },
}

export default darian
