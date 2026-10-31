// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 689646 / entryId: 202985
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const granadair: characterDataObj = {
  name: 'granadair',
  cName: '葛拉娜德',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 176, // 魔法力
  HP: 4011, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 176, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    MATK: 34,
    MRES: 8,
  },
  Awakening: {
    // 觉醒
    MRES: 4,
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
    // 服装：葛洛堤的女王 / 技能：法力凝聚
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '葛洛堤的女王',
      target: 'friendly',
      sp: -2,
      cd: 3,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/799715.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/26270.png',
      description:
        '4回合内，每回合结束时，恢复友军SP1点。4回合内，友军的魔法力增加50%。2回合内，友军的魔法力增加45%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：友军攻击/魔法力50%（4回合） | 友军攻击/魔法力60%（4回合） | 友军攻击/魔法力70%（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '4回合内，友军的魔法力增加倍率+5%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '4回合内，友军的魔法力增加倍率+5%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '2回合内，友军的魔法力增加倍率+5%',
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
          HP: 564,
          DEF: 13.4,
        },
      },
    },
    // 服装：净化巫女 / 技能：净化祝福
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '净化巫女',
      target: 'friendly',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [0, -3],
        [-1, -2],
        [-1, -1],
        [-2, -1],
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-2, 1],
        [-1, 1],
        [-1, 2],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 1],
        [2, 1],
        [1, 0],
        [2, 0],
        [3, 0],
        [2, -1],
        [1, -1],
        [1, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/291007.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/807151.png',
      description:
        '对友军应用在4回合内，施加伤害增加75%的增强效果。吸收应用于友军的减益效果。此时，4回合内，对友军应用10%的增强效果，每吸收1个效果，可叠加1层。最多可叠加15层。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '施加伤害增加倍率+5%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '施加增强效果+2回合',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '应用增强效果+2回合',
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
  },
}

export default granadair
