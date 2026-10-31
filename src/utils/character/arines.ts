// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593578 / entryId: 122325
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const arines: characterDataObj = {
  name: 'arines',
  cName: '阿里内斯',
  star: 3, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 196, // 魔法力
  HP: 1508, // 生命值
  DEF: 0, // 防御力
  MRES: 15, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 196, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 146,
    MATK: 20,
    MRES: 5,
  },
  Awakening: {
    // 觉醒
    MRES: 2,
    PHP: 8,
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
    // 服装：活力祭司 / 技能：堂堂正正
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '活力祭司',
      target: 'friendly',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/738927.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/833019.png',
      description: '6回合内，友军的攻击力增加25%。6回合内，友军的致命率增加30%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: -4, multiplying: 0 }, // +1
        2: { sp: 0, cd: -4, multiplying: 0 }, // +2
        3: { sp: 1, cd: -4, multiplying: 0 }, // +3
        4: { sp: 1, cd: -4, multiplying: 0 }, // +4
        5: { sp: 1, cd: -4, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：友军攻击/魔法力25%（6回合） | 友军攻击/魔法力35%（6回合） | 友军攻击/魔法力50%（6回合） | 友军攻击/魔法力70%（6回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '攻击力增加倍率+10%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          HP: 16,
        },
        Bonding: {
          // 绑定属性
          HP: 300,
          MRES: 9.2,
        },
      },
    },
  },
}

export default arines
