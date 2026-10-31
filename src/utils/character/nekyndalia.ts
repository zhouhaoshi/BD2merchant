// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 707171 / entryId: 216930
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const nekyndalia: characterDataObj = {
  name: 'nekyndalia',
  cName: '内肯达莉亚',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 407, // 魔法力
  HP: 1323, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 407, // TODO 默认面板，装备/词条加成需要另配
  critical: 75, // 默认爆伤
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
    // 服装：神枪手 / 技能：致命战线
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '神枪手',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_697/h_1241/497891/2026/6/6/22113100mr8mjz7r.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/50118/497891/2026/5/4/1780553207759_1780553195764_tuukbw014m_wj78xz3a8q.png',
      description:
        '4回合内，对敌人应用【标记】。对敌人进行10次攻击，每次攻击时造成自身魔法力45%的魔法伤害。 【标记】：无视目标的闪避效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：闪避（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '+2回合',
        },
        potentials2: {
          multiplying: 5,
          description: '伤害量+5%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '[额外能力]4回合内，对敌人套用受到的连锁伤害+3%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '攻击次数+2',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+30%',
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
          PMATK: 52,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
    // 服装：白缕轻缠木乃伊 / 技能：清扫工作，现在开始
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '白缕轻缠木乃伊',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 10,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_886/h_1225/497891/2026/9/7/31969729muxsqhtt.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/9/8/43343728muz4r16i.png',
      description:
        '与战场上处于印记状态的目标共鸣，并为自身施加持续2回合、2%的造成的连携伤害增加效果，每1名目标施加1。最多可叠加至10。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 60 }, // +0
        1: { sp: 1, cd: 0, multiplying: 60 }, // +1
        2: { sp: 1, cd: 0, multiplying: 65 }, // +2
        3: { sp: 1, cd: 0, multiplying: 70 }, // +3
        4: { sp: 1, cd: 0, multiplying: 75 }, // +4
        5: { sp: 1, cd: 0, multiplying: 80 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 5,
          description: '伤害量+5%',
        },
        potentials2: {
          multiplying: 5,
          description: '伤害量+5%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '攻击次数+2',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+10%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '冷却时间-2回合',
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
          MATK: 80,
          CR: 12.4,
        },
      },
    },
  },
}

export default nekyndalia
