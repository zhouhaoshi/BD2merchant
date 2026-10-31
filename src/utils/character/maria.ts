// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593572 / entryId: 122321
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const maria: characterDataObj = {
  name: 'maria',
  cName: '玛丽亚',
  star: 3, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 224, // 魔法力
  HP: 1183, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 224, // TODO 默认面板，装备/词条加成需要另配
  critical: 75, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 146,
    MATK: 20,
    MRES: 5,
  },
  Awakening: {
    // 觉醒
    PMATK: 7,
    DMG: 6,
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
    // 服装：大魔法师 / 技能：破坏魔法
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '大魔法师',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/630574.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/928659.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 80 }, // +0
        1: { sp: 0, cd: -4, multiplying: 80 }, // +1
        2: { sp: 0, cd: -4, multiplying: 100 }, // +2
        3: { sp: 1, cd: -4, multiplying: 100 }, // +3
        4: { sp: 1, cd: -4, multiplying: 140 }, // +4
        5: { sp: 1, cd: -4, multiplying: 200 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 4,
        },
        Bonding: {
          // 绑定属性
          HP: 106,
          MATK: 40,
          DMG: 14,
        },
      },
    },
  },
}

export default maria
