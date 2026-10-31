// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 637922 / entryId: 167129
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const yozakura: characterDataObj = {
  name: 'yozakura',
  cName: '夜樱',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 374, // 魔法力
  HP: 1848, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 5, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 374, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：信念之拳 / 技能：地狱极乐万手拳
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '信念之拳',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/285481.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/722961.png',
      description:
        '对自己应用使普通攻击的施加伤害增加400%的增强效果。此效果将在接下来1次普通攻击中维持。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 150 }, // +0
        1: { sp: 1, cd: 0, multiplying: 150 }, // +1
        2: { sp: 1, cd: 0, multiplying: 195 }, // +2
        3: { sp: 1, cd: 0, multiplying: 150 }, // +3
        4: { sp: 1, cd: 0, multiplying: 240 }, // +4
        5: { sp: 1, cd: 0, multiplying: 240 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '增强效果倍率+150%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '增强效果倍率+150%',
        },
        potentials3: {
          multiplying: 45,
          description: '伤害倍率+45%',
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
          PMATK: 52,
          DEF: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default yozakura
