// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 678097 / entryId: 194976
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const tyr: characterDataObj = {
  name: 'tyr',
  cName: '提尔',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 396, // 攻击力
  HP: 1575, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 396, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：星光守护者 / 技能：义无反顾
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '星光守护者',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 1],
        [-2, 2],
        [-1, 2],
        [0, 1],
        [0, 2],
        [1, 2],
        [1, 1],
        [2, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/130807.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/345084.png',
      description:
        '6回合内，对自己应用SP消耗增加2的效果。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 700 }, // +0
        1: { sp: 1, cd: 0, multiplying: 700 }, // +1
        2: { sp: 1, cd: 0, multiplying: 825 }, // +2
        3: { sp: 1, cd: 0, multiplying: 950 }, // +3
        4: { sp: 1, cd: 0, multiplying: 1075 }, // +4
        5: { sp: 1, cd: 0, multiplying: 1200 }, // +5
        // TODO 描述里未能识别的效果：，对自己应用SP消耗增加2的效果
        // TODO 待人工复核：没有解析到连锁次数 | 描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
        potentials3: {
          multiplying: 100,
          description: '伤害倍率+100%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '伤害量+560%',
          multiplying: 560,
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '[额外能力][前置效果]每次攻击命中时，恢复1SP',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+280%',
          multiplying: 280,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 16,
        },
        Bonding: {
          // 绑定属性
          PHP: 45.4,
          ATK: 80,
        },
      },
    },
    // 服装：澄心无邪兔女郎 / 技能：勇往直前！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '澄心无邪兔女郎',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/410877.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/262624.png',
      description:
        '8回合期间，对自身应用SP消耗增加2的效果。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。技能释放时每消耗SP1点，伤害提高100%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 125 }, // +0
        1: { sp: 0, cd: 0, multiplying: 175 }, // +1
        2: { sp: 0, cd: 0, multiplying: 175 }, // +2
        3: { sp: 0, cd: 0, multiplying: 225 }, // +3
        4: { sp: 0, cd: 0, multiplying: 225 }, // +4
        5: { sp: 0, cd: 0, multiplying: 275 }, // +5
        // TODO 描述里未能识别的效果：期间，对自身应用SP消耗增加2的效果
        // TODO 待人工复核：没有解析到连锁次数 | 描述里有增益/减益关键词，但没解析成 buff
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 25,
          description: '伤害量+25%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '伤害提高倍率+10%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '伤害提高倍率+10%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 16,
        },
        Bonding: {
          // 绑定属性
          ATK: 36,
          PATK: 28.4,
          DEF: 13.4,
        },
      },
    },
  },
}

export default tyr
