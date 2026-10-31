// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 660218 / entryId: 185516
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const priestess: characterDataObj = {
  name: 'priestess',
  cName: '女神官',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 341, // 魔法力
  HP: 1575, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 341, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：地母神的祭司 / 技能：圣光
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '地母神的祭司',
      target: 'enemy',
      sp: -4,
      cd: 1,
      chain: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/695525.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/580558.png',
      description:
        '2回合内，对敌人应用50%的魔法脆弱效果。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 250 }, // +0
        1: { sp: 1, cd: 0, multiplying: 250 }, // +1
        2: { sp: 1, cd: 0, multiplying: 250 }, // +2
        3: { sp: 1, cd: 0, multiplying: 300 }, // +3
        4: { sp: 1, cd: 0, multiplying: 300 }, // +4
        5: { sp: 1, cd: 0, multiplying: 350 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '魔法脆弱效果倍率+5%',
        },
        potentials2: {
          multiplying: 25,
          description: '伤害倍率+25%',
        },
        potentials3: {
          multiplying: 25,
          description: '伤害倍率+25%',
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
          PHP: 28.4,
          MATK: 44,
          CDMG: 75.6,
        },
      },
    },
  },
}

export default priestess
