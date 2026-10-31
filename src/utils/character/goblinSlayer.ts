// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 660204 / entryId: 185514
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const goblinSlayer: characterDataObj = {
  name: 'goblinSlayer',
  cName: '哥布林杀手',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 286, // 攻击力
  HP: 2751, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 286, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：小鬼杀手 / 技能：杀尽世间哥布林
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '小鬼杀手',
      target: 'friendly',
      sp: -5,
      cd: 1,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/803549.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/941282.png',
      description:
        '2回合内，对自己应用50%的防护罩效果。友军的SP恢复6点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 125, special: [{ spAdd: 6 }] }, // +0
        1: { sp: 1, cd: 0, multiplying: 125, special: [{ spAdd: 6 }] }, // +1
        2: { sp: 1, cd: 0, multiplying: 150, special: [{ spAdd: 6 }] }, // +2
        3: { sp: 1, cd: 0, multiplying: 175, special: [{ spAdd: 6 }] }, // +3
        4: { sp: 1, cd: 0, multiplying: 200, special: [{ spAdd: 6 }] }, // +4
        5: { sp: 1, cd: 0, multiplying: 225, special: [{ spAdd: 6 }] }, // +5
        // TODO 描述里识别到的效果：护盾（2回合） | SP变化（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '伤害倍率+15%',
        },
        potentials2: {
          multiplying: 15,
          description: '伤害倍率+15%',
        },
        potentials3: {
          multiplying: 15,
          description: '伤害倍率+15%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PHP: 6.4,
        },
        Bonding: {
          // 绑定属性
          ATK: 58,
          DEF: 18.4,
        },
      },
    },
  },
}

export default goblinSlayer
