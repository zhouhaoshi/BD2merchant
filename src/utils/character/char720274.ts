// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 720274 / entryId: 224650
// TODO wiki 上没有英文名，文件名和 name 暂时用 contentId，请改成游戏里的角色 key
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const char720274: characterDataObj = {
  name: 'char720274',
  cName: '羽前京香',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 374, // 攻击力
  HP: 1806, // 生命值
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
    // 服装：无穷之锁 / 技能：受死吧！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '无穷之锁',
      target: 'enemy',
      sp: -5,
      cd: 9,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_718/h_1631/497891/2026/8/8/91118444mtsjdun7.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/8/10/31453269mtv90j6o.png',
      description:
        '攻击敌人1次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 300 }, // +0
        1: { sp: 1, cd: 0, multiplying: 300 }, // +1
        2: { sp: 1, cd: -2, multiplying: 300 }, // +2
        3: { sp: 1, cd: -2, multiplying: 350 }, // +3
        4: { sp: 1, cd: -2, multiplying: 400 }, // +4
        5: { sp: 1, cd: -2, multiplying: 450 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害量+50%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害量+50%',
        },
        potentials3: {
          multiplying: 50,
          description: '伤害量+50%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '[额外能力]每有1个目标，该技能冷却时间减少2',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
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
          ATK: 80,
          DMG: 45.6,
        },
      },
    },
  },
}

export default char720274
