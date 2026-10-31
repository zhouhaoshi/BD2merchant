// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 597740 / entryId: 124911
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const angelica: characterDataObj = {
  name: 'angelica',
  cName: '安洁莉卡',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 242, // 魔法力
  HP: 3297, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 14, // 暴击率
  CDMG: 169, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 242, // TODO 默认面板，装备/词条加成需要另配
  critical: 169, // 默认爆伤
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
    // 服装：堕落之星 / 技能：堕落神罚
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '堕落之星',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 1],
        [-2, 2],
        [1, -1],
        [2, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/599387.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/160779.png',
      description:
        '【生命力最多计算50000】。2回合内，对自己应用50%的防护罩效果。对敌人造成相当于敌人最大生命力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 45 }, // +0
        1: { sp: 0, cd: 0, multiplying: 55 }, // +1
        2: { sp: 0, cd: 0, multiplying: 64 }, // +2
        3: { sp: 1, cd: 0, multiplying: 64 }, // +3
        4: { sp: 1, cd: 0, multiplying: 72 }, // +4
        5: { sp: 1, cd: 0, multiplying: 80 }, // +5
        // TODO 描述里识别到的效果：护盾（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials2: {
          multiplying: 5,
          description: '伤害倍率+5%',
        },
        potentials3: {
          multiplying: 5,
          description: '伤害倍率+5%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '攻击次数+1【额外能力】4回合期间，对自身赋予属性伤害增加100%的效果',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+20%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+20%',
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
          PHP: 62.4,
          MRES: 5,
          DMG: 30,
        },
      },
    },
    // 服装：泳池派对 / 技能：神圣挥击
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '泳池派对',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/295954.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/17225.png',
      description:
        '【生命力最多计算50000】。2回合内，对自己应用75%的防护罩效果。攻击敌人&-chain-&次，每次攻击时，造成相当于敌人最大生命力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 15 }, // +0
        1: { sp: 0, cd: 0, multiplying: 18 }, // +1
        2: { sp: 0, cd: 0, multiplying: 21 }, // +2
        3: { sp: 1, cd: 0, multiplying: 21 }, // +3
        4: { sp: 1, cd: 0, multiplying: 23 }, // +4
        5: { sp: 1, cd: 0, multiplying: 25 }, // +5
        // TODO 描述里识别到的效果：护盾（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 2,
          description: '伤害倍率+2%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials3: {
          multiplying: 2,
          description: '伤害倍率+2%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          CR: 1.6,
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4,
          CR: 4.6,
          CDMG: 47.2,
        },
      },
    },
    // 服装：霓虹救星 / 技能：约尔门逆转模式
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '霓虹救星',
      target: 'enemy',
      sp: -6,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_693/h_986/50118/43637/2025/0/22/96616.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/264548.png',
      description:
        '【生命力最多计算50000】。2回合内，对自己应用75%的防护罩效果。对敌人造成相当于敌人最大生命力&-effect/multiplying-&%的魔法伤害。8回合内，对敌人应用相当于敌人最大生命力14%的魔法伤害的腐败效果。最多可赋予叠加至3。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 5 }, // +0
        1: { sp: 0, cd: 0, multiplying: 5 }, // +1
        2: { sp: 0, cd: 0, multiplying: 5 }, // +2
        3: { sp: 1, cd: 0, multiplying: 5 }, // +3
        4: { sp: 1, cd: 0, multiplying: 5 }, // +4
        5: { sp: 1, cd: 0, multiplying: 5 }, // +5
        // TODO 描述里识别到的效果：护盾（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '腐败效果倍率+12%',
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
          PHP: 6.4,
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
  },
}

export default angelica
