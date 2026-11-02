// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593613 / entryId: 122333
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const beatrice: characterDataObj = {
  name: 'beatrice',
  cName: '比阿特丽丝',
  star: 3, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 196, // 攻击力
  HP: 1742, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 0, // 暴击率
  CDMG: 0, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 196, // TODO 默认面板，装备/词条加成需要另配
  critical: 0, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 146,
    ATK: 20,
    DEF: 5,
  },
  Awakening: {
    // 觉醒
    PATK: 7,
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
    // 服装：部族大战士 / 技能：打倒！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '部族大战士',
      target: 'enemy',
      sp: -4,
      cd: 7,
      chain: 2,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_514/h_1006/50118/72324/2025/0/22/331830.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/843076.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 125 }, // +0
        1: { sp: 0, cd: -4, multiplying: 125 }, // +1
        2: { sp: 0, cd: -4, multiplying: 150 }, // +2
        3: { sp: 1, cd: -4, multiplying: 150 }, // +3
        4: { sp: 1, cd: -4, multiplying: 175 }, // +4
        5: { sp: 1, cd: -4, multiplying: 225 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 75,
          description: '伤害倍率+75%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 4,
        },
        Bonding: {
          // 绑定属性
          HP: 106,
          ATK: 40,
          DMG: 14,
        },
      },
    },
  },
}

export default beatrice
