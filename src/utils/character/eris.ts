// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 624137 / entryId: 151332
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const eris: characterDataObj = {
  name: 'eris',
  cName: '艾莉丝',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 374, // 攻击力
  HP: 1848, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 374, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
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
    // 服装：受祝福的冒险家 / 技能：红色闪光
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '受祝福的冒险家',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 0],
        [1, 0],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/184259.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/923183.png',
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若此攻击对敌人叠加的连携数量为7或7以下，则改为造成相当于自身攻击力600%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 300 }, // +0
        1: { sp: 1, cd: 0, multiplying: 300 }, // +1
        2: { sp: 1, cd: 0, multiplying: 375 }, // +2
        3: { sp: 1, cd: 0, multiplying: 450 }, // +3
        4: { sp: 1, cd: 0, multiplying: 525 }, // +4
        5: { sp: 1, cd: 0, multiplying: 600 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若此攻击对敌人叠加的连携数量为7或7以下，伤害倍率+100%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若此攻击对敌人叠加的连携数量为7或7以下，伤害倍率+100%',
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
          HP: 154,
          PATK: 52,
          CDMG: 47.2,
        },
      },
    },
    // 服装：只属于你的猫咪 / 技能：兽人族秘技
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '只属于你的猫咪',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 5,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/99778.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/238829.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，对主要目标敌人应用100%的物理虚弱效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 30 }, // +0
        1: { sp: 1, cd: 0, multiplying: 30 }, // +1
        2: { sp: 1, cd: 0, multiplying: 30 }, // +2
        3: { sp: 1, cd: 0, multiplying: 45 }, // +3
        4: { sp: 1, cd: 0, multiplying: 45 }, // +4
        5: { sp: 1, cd: 0, multiplying: 60 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
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
          DEF: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default eris
