// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593582 / entryId: 122346
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const gray: characterDataObj = {
  name: 'gray',
  cName: '格雷',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  ATK: 330, // 攻击力
  HP: 2184, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 330, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：迷雾神射手 / 技能：三重射击
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '迷雾神射手',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 3,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_742/h_1613/50118/157597/2025/0/21/784729.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/156503.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，对敌人应用造成相当于敌人攻击力125%的物理伤害的中毒效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 65 }, // +0
        1: { sp: 0, cd: 0, multiplying: 65 }, // +1
        2: { sp: 0, cd: 0, multiplying: 65 }, // +2
        3: { sp: 1, cd: 0, multiplying: 65 }, // +3
        4: { sp: 1, cd: 0, multiplying: 65 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 30,
          description: '伤害倍率+30%',
        },
        potentials2: {
          multiplying: 30,
          description: '伤害倍率+30%',
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
          PATK: 75.6,
          DEF: 5,
        },
      },
    },
    // 服装：B级老板 / 技能：狂粉驱散腿
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: 'B级老板',
      target: 'enemy',
      sp: -3,
      cd: 5,
      chain: 5,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_574/h_1259/50118/157597/2025/0/21/366289.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/404125.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。2回合内，敌人防御力减少50%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 35 }, // +0
        1: { sp: 0, cd: 0, multiplying: 50 }, // +1
        2: { sp: 0, cd: 0, multiplying: 65 }, // +2
        3: { sp: 1, cd: 0, multiplying: 65 }, // +3
        4: { sp: 1, cd: 0, multiplying: 75 }, // +4
        5: { sp: 1, cd: 0, multiplying: 85 }, // +5
        // TODO 描述里识别到的效果：减防50%（2回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 7,
          description: '伤害倍率+7%',
        },
        potentials2: {
          multiplying: 8,
          description: '伤害倍率+8%',
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
          CR: 1.6,
        },
        Bonding: {
          // 绑定属性
          PATK: 52,
          DEF: 5,
          DMG: 30,
        },
      },
    },
    // 服装：先锋大将 / 技能：光荣旗帜
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '先锋大将',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 5,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_1035/h_1626/50118/157597/2025/0/22/668871.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/967160.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，对敌人应用造成相当于敌人魔法力125%的物理伤害的中毒效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 25 }, // +0
        1: { sp: 0, cd: 0, multiplying: 25 }, // +1
        2: { sp: 0, cd: 0, multiplying: 25 }, // +2
        3: { sp: 1, cd: 0, multiplying: 25 }, // +3
        4: { sp: 1, cd: 0, multiplying: 25 }, // +4
        5: { sp: 1, cd: 0, multiplying: 25 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
        },
        potentials2: {
          multiplying: 20,
          description: '伤害倍率+20%',
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
          ATK: 116,
        },
      },
    },
    // 服装：泳池派对 / 技能：水弹发射！
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '泳池派对',
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_625/h_995/50118/157597/2025/0/22/614067.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/450165.png',
      description:
        '4回合内，自身致命率增加50%。4回合内，自身致命伤害增加50%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 100 }, // +0
        1: { sp: 0, cd: 0, multiplying: 114 }, // +1
        2: { sp: 0, cd: 0, multiplying: 127 }, // +2
        3: { sp: 1, cd: 0, multiplying: 127 }, // +3
        4: { sp: 1, cd: 0, multiplying: 139 }, // +4
        5: { sp: 1, cd: 0, multiplying: 150 }, // +5
        // TODO 描述里识别到的效果：自身致命率50%（4回合） | 自身爆伤50%（4回合）
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
          ATK: 80,
          DMG: 30,
        },
      },
    },
  },
}

export default gray
