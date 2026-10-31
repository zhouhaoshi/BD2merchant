// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593648 / entryId: 122338
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const samay: characterDataObj = {
  name: 'samay',
  cName: '莎美',
  star: 4, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 252, // 魔法力
  HP: 2142, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 252, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 195,
    MATK: 27,
    MRES: 6,
  },
  Awakening: {
    // 觉醒
    PMATK: 10,
    DMG: 8,
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
    // 服装：深情解放者 / 技能：犹豫之刃
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '深情解放者',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_832/h_1126/50118/72324/2025/0/21/574795.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/530592.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。4回合内，敌人魔法抵抗减少50%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 80 }, // +0
        1: { sp: 0, cd: -4, multiplying: 80 }, // +1
        2: { sp: 0, cd: -4, multiplying: 100 }, // +2
        3: { sp: 1, cd: -4, multiplying: 100 }, // +3
        4: { sp: 1, cd: -4, multiplying: 140 }, // +4
        5: { sp: 1, cd: -4, multiplying: 200 }, // +5
        // TODO 描述里识别到的效果：减魔抗50%（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 12,
        },
        Bonding: {
          // 绑定属性
          HP: 122,
          MATK: 60,
          CDMG: 37.8,
        },
      },
    },
    // 服装：和善学生 / 技能：靠你了！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '和善学生',
      target: 'friendly',
      sp: -5,
      cd: 5,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_610/h_1004/50118/72324/2025/0/21/644445.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/654593.png',
      description:
        '2回合内，友军的攻击力增加20%。2回合内，友军的魔法力增加20%。2回合内，每回合结束时，恢复友军相当于自身魔法力25%的生命力。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 3, cd: -4, multiplying: 0 }, // +1
        2: { sp: 3, cd: -4, multiplying: 0 }, // +2
        3: { sp: 4, cd: -4, multiplying: 0 }, // +3
        4: { sp: 4, cd: -4, multiplying: 0 }, // +4
        5: { sp: 4, cd: -4, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：友军攻击/魔法力20%（2回合） | 友军攻击/魔法力25%（2回合） | 友军攻击/魔法力35%（2回合） | 友军攻击/魔法力50%（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 12,
        },
        Bonding: {
          // 绑定属性
          HP: 122,
          PMATK: 60,
        },
      },
    },
  },
}

export default samay
