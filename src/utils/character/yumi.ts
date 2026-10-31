// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 638795 / entryId: 167966
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const yumi: characterDataObj = {
  name: 'yumi',
  cName: '雪泉',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 330, // 魔法力
  HP: 2016, // 生命值
  DEF: 0, // 防御力
  MRES: 15, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 330, // TODO 默认面板，装备/词条加成需要另配
  critical: 100, // 默认爆伤
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
    // 服装：雪花之舞 / 技能：树冰扇
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '雪花之舞',
      target: 'enemy',
      sp: -5,
      cd: 1,
      chain: 5,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/450291.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/206343.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。3回合内，对敌人应用每层叠加造成相当于自身魔法力10%的魔法伤害的出血叠加效果。最多可应用叠加至99层。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 30 }, // +0
        1: { sp: 1, cd: 0, multiplying: 30 }, // +1
        2: { sp: 1, cd: 0, multiplying: 60 }, // +2
        3: { sp: 1, cd: 0, multiplying: 60 }, // +3
        4: { sp: 1, cd: 0, multiplying: 90 }, // +4
        5: { sp: 1, cd: 0, multiplying: 90 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 30,
          description: '伤害倍率+30%',
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
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          HP: 154,
          PMATK: 52,
          DMG: 30,
        },
      },
    },
  },
}

export default yumi
