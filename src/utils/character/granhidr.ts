// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 611786 / entryId: 139655
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const granhidr: characterDataObj = {
  name: 'granhidr',
  cName: '格兰希特',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 132, // 攻击力
  HP: 4767, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 132, // TODO 默认面板，装备/词条加成需要另配
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
    DEF: 4,
    PHP: 14,
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
    // 服装：回归偶像 / 技能：回归聚光灯
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '回归偶像',
      target: 'enemy',
      sp: -6,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/325312.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/451703.png',
      description:
        '【先发制人】2回合内，对自己应用挑衅效果。4回合内，对自己应用相当于最大生命力100%的能量护盾效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: 0, multiplying: 0 }, // +1
        2: { sp: 0, cd: -2, multiplying: 0 }, // +2
        3: { sp: 0, cd: -2, multiplying: 0 }, // +3
        4: { sp: 0, cd: -2, multiplying: 0 }, // +4
        5: { sp: 0, cd: -2, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：挑衅（2回合） | 护盾（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '能量护盾+25%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '能量护盾+25%',
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
          MRES: 13.4,
        },
      },
    },
    // 服装：虚无之星 / 技能：女神庇护
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '虚无之星',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/74072.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/403074.png',
      description:
        '【先发制人】自身遭受攻击时，将进行反击。每次反击时，对敌人造成相当于承受伤害200%的物理伤害。此效果在遭受3次攻击后将消失。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: 0, multiplying: 0 }, // +1
        2: { sp: 0, cd: 0, multiplying: 0 }, // +2
        3: { sp: 0, cd: 0, multiplying: 0 }, // +3
        4: { sp: 0, cd: 0, multiplying: 0 }, // +4
        5: { sp: 0, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：反击（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '遭受攻击次数+2次',
        },
        potentials2: {
          multiplying: 15,
          description: '伤害量+15%',
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
          DEF: 5,
          CR: 7.8,
        },
      },
    },
    // 服装：恶作剧幽灵 / 技能：呀吼，吓到了吧？
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '恶作剧幽灵',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 8,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/896372.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/797399.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身最大生命力6%的物理伤害。此时，还会额外造成等同于自身拥有的能量护盾的7%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：护盾（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '相当于自身最大生命力的物理伤害量+2%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '等同于自身拥有的能量护盾的物理伤害量+1%',
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
          DMG: 45.6,
        },
      },
    },
    // 服装：战地医疗兵 / 技能：猛药处方
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '战地医疗兵',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_497/h_1180/497891/2026/5/17/32449662mqhgsbf5.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/5/17/84795554mqhgs3f4.png',
      description:
        '2回合内，自身致命伤害增加100%。拥有的增益效果数量达到5个及以上时，所有增益效果的持续回合数2回合延长。对敌人造成相当于自身最大生命力50%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：自身爆伤100%（2回合） | 自身爆伤150%（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          critical: 50,
          description: '致命伤害+50%',
        },
        potentials3: {
          multiplying: 10,
          description: '伤害量+10%',
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
          DEF: 13.4,
        },
      },
    },
  },
}

export default granhidr
