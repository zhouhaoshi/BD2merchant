// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593623 / entryId: 122357
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const anastasia: characterDataObj = {
  name: 'anastasia',
  cName: '安娜塔西亚',
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
    DEF: 8,
  },
  Awakening: {
    // 觉醒
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
    // 服装：和善女仆 / 技能：集中炮击
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '和善女仆',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/836374.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/791880.png',
      description:
        '1回合内，自身致命伤害增加350%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人为主要目标，则改为造成相当于自身攻击力250%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 110 }, // +0
        1: { sp: 0, cd: 0, multiplying: 110 }, // +1
        2: { sp: 0, cd: 0, multiplying: 160 }, // +2
        3: { sp: 1, cd: 0, multiplying: 160 }, // +3
        4: { sp: 1, cd: 0, multiplying: 210 }, // +4
        5: { sp: 1, cd: 0, multiplying: 210 }, // +5
        // TODO 描述里识别到的效果：自身爆伤350%（1回合） | 自身爆伤450%（1回合） | 自身爆伤600%（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为主要目标，伤害量+100%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
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
    // 服装：热火涂鸦 / 技能：扫射，扫射，扫射！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '热火涂鸦',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 10,
      scope: [
        [0, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_568/h_1218/50118/4408/2025/0/21/698931.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/9059.png',
      description:
        '1回合内，自身致命伤害增加350%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人为主要目标，则改为造成相当于自身攻击力55%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 30 }, // +0
        1: { sp: 0, cd: 0, multiplying: 30 }, // +1
        2: { sp: 0, cd: 0, multiplying: 35 }, // +2
        3: { sp: 1, cd: 0, multiplying: 35 }, // +3
        4: { sp: 1, cd: 0, multiplying: 40 }, // +4
        5: { sp: 1, cd: 0, multiplying: 40 }, // +5
        // TODO 描述里识别到的效果：自身爆伤350%（1回合） | 自身爆伤450%（1回合） | 自身爆伤600%（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 5,
          description: '伤害量+5%；若敌人为主要目标，伤害量+5%',
        },
        potentials2: {
          multiplying: 5,
          description: '伤害量+5%；若敌人为主要目标，伤害量+5%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '主要目标伤害量+45%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '主要目标伤害量+45%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '致命伤害强化+2回合',
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
          ATK: 102,
          DMG: 30,
        },
      },
    },
  },
}

export default anastasia
