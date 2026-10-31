// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 720262 / entryId: 224651
// TODO wiki 上没有英文名，文件名和 name 暂时用 contentId，请改成游戏里的角色 key
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const char720262: characterDataObj = {
  name: 'char720262',
  cName: '出云天花',
  star: 5, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 319, // 魔法力
  HP: 2373, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 319, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：天御鸟命 / 技能：位置，刚刚好
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '天御鸟命',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 3,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_693/h_1572/497891/2026/8/8/17961085mtsht0om.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/8/10/13593285mtv8q8fr.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 240 }, // +0
        1: { sp: 1, cd: 0, multiplying: 240 }, // +1
        2: { sp: 1, cd: 0, multiplying: 260 }, // +2
        3: { sp: 1, cd: 0, multiplying: 280 }, // +3
        4: { sp: 1, cd: 0, multiplying: 300 }, // +4
        5: { sp: 1, cd: 0, multiplying: 320 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '伤害量+10%',
        },
        potentials2: {
          multiplying: 10,
          description: '伤害量+10%',
        },
        potentials3: {
          multiplying: 10,
          description: '伤害量+10%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '伤害量+100% 技能范围扩大',
          scope: [
            [0, 0],
            [0, -1],
            [0, -2],
            [-1, -1],
            [-1, 0],
            [-2, 0],
            [-1, 1],
            [0, 1],
            [0, 2],
            [1, 1],
            [1, 0],
            [2, 0],
            [1, -1],
          ], // 爆发后的攻击范围，二维坐标系存储。直接命中目标为[0,0]
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+50%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+50%',
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
          MATK: 60,
          DMG: 45.6,
        },
      },
    },
  },
}

export default char720262
