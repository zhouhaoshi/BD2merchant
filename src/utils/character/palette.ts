// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 697006 / entryId: 210629
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const palette: characterDataObj = {
  name: 'palette',
  cName: '帕莱特',
  star: 5, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 385, // 魔法力
  HP: 1617, // 生命值
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
    // 服装：惊悚之梦 / 技能：让你见识真正的杰作···！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '惊悚之梦',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_631/h_847/50118/497891/2026/2/13/407244.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/2/31/853577.png',
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。敌人持有的所有减益效果的持续回合数2回合延长。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 500 }, // +0
        1: { sp: 1, cd: 0, multiplying: 500 }, // +1
        2: { sp: 1, cd: 0, multiplying: 550 }, // +2
        3: { sp: 1, cd: 0, multiplying: 600 }, // +3
        4: { sp: 1, cd: 0, multiplying: 650 }, // +4
        5: { sp: 1, cd: 0, multiplying: 700 }, // +5
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害倍率+50%',
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
          MRES: 5,
          DMG: 30,
        },
      },
    },
    // 服装：奇迹紫罗兰 / 技能：紫罗兰☆极限突袭
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '奇迹紫罗兰',
      target: 'enemy',
      sp: -5,
      cd: 3,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_589/h_923/50118/497891/2026/4/6/398815.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/50118/497891/2026/4/13/1778639372068_1778638379000_tobmy23doi_wxvpvksncc.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。此时，敌方的减益效果达到7个及以上时，则改为造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 110 }, // +0
        1: { sp: 1, cd: 0, multiplying: 110 }, // +1
        2: { sp: 1, cd: 0, multiplying: 125 }, // +2
        3: { sp: 1, cd: 0, multiplying: 140 }, // +3
        4: { sp: 1, cd: 0, multiplying: 155 }, // +4
        5: { sp: 1, cd: 0, multiplying: 170 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '伤害倍率+10%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '条件伤害倍率+15%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '条件伤害倍率+15%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '【额外能力】【前置效果】4回合内，敌人魔法抵抗减少50%，攻击次数+1.',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '条件伤害量+25%',
          multiplying: 25,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '条件伤害量+25%',
          multiplying: 25,
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
          DEF: 5,
          CDMG: 47.2,
        },
      },
    },
  },
}

export default palette
