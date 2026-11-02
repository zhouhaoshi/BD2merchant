// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 637920 / entryId: 167128
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const hikage: characterDataObj = {
  name: 'hikage',
  cName: '日影',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 352, // 攻击力
  HP: 1911, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 352, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：和蔼的无情 / 技能：切割
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '和蔼的无情',
      target: 'enemy',
      sp: -5,
      cd: 3,
      chain: 12,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/737321.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/373591.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 40 }, // +0
        1: { sp: 1, cd: 0, multiplying: 40 }, // +1
        2: { sp: 1, cd: 0, multiplying: 50 }, // +2
        3: { sp: 1, cd: 0, multiplying: 60 }, // +3
        4: { sp: 1, cd: -2, multiplying: 60 }, // +4
        5: { sp: 1, cd: -2, multiplying: 70 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '伤害倍率+10%',
        },
        potentials2: {
          multiplying: 10,
          description: '伤害倍率+10%',
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
          CDMG: 10.8,
        },
        Bonding: {
          // 绑定属性
          PHP: 17,
          PATK: 52,
          CDMG: 47.2,
        },
      },
    },
  },
}

export default hikage
