// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593614 / entryId: 122354
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const alec: characterDataObj = {
  name: 'alec',
  cName: '艾瑞克',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 418, // 攻击力
  HP: 1554, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 0, // 暴击率
  CDMG: 0, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 418, // TODO 默认面板，装备/词条加成需要另配
  critical: 0, // 默认爆伤
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
    // 服装：毁灭之星 / 技能：激愤一击
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '毁灭之星',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/638868.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/743729.png',
      description: '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 400 }, // +0
        1: { sp: 0, cd: 0, multiplying: 525 }, // +1
        2: { sp: 0, cd: 0, multiplying: 625 }, // +2
        3: { sp: 1, cd: 0, multiplying: 625 }, // +3
        4: { sp: 1, cd: 0, multiplying: 725 }, // +4
        5: { sp: 1, cd: 0, multiplying: 800 }, // +5
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
        potentials2: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
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
          DEF: 8.4,
        },
      },
    },
    // 服装：破剑士 / 技能：破剑攻击
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '破剑士',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [1, 1],
        [2, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_731/h_993/50118/4408/2025/0/21/970889.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/520000.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理固定伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 100 }, // +0
        1: { sp: 0, cd: 0, multiplying: 140 }, // +1
        2: { sp: 0, cd: 0, multiplying: 175 }, // +2
        3: { sp: 1, cd: 0, multiplying: 175 }, // +3
        4: { sp: 1, cd: 0, multiplying: 210 }, // +4
        5: { sp: 1, cd: 0, multiplying: 240 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 60,
          description: '伤害倍率+60%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials3: {
          cd: -2,
          description: '冷却时间-2回合',
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
          PATK: 52,
          DEF: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default alec
