// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 698749 / entryId: 211476
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const mamonir: characterDataObj = {
  name: 'mamonir',
  cName: '马莫尼勒',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 99, // 魔法力
  HP: 5145, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 99, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：玄夜 / 技能：去吧，奥克托比乌斯！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '玄夜',
      target: 'enemy',
      sp: -4,
      cd: 7,
      chain: 8,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_872/h_831/50118/497891/2026/2/24/838327.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/2/31/986696.png',
      description:
        '6回合内，释放奥克托比乌斯之力，并进行变身。6回合内，自身致命伤害增加200%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身最大生命值9%的魔法伤害。 【变身】：改变目标的外形并获得追加效果。在变身过程中，该技能的消耗SP和冷却时间为0。变身效果不会被解除效果解除。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：自身爆伤200%（6回合） | 自身爆伤220%（6回合） | 自身爆伤240%（6回合） | 自身爆伤260%（6回合） | 自身爆伤280%（6回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          critical: 20,
          description: '致命伤害+20%',
        },
        potentials2: {
          multiplying: 1,
          description: '伤害量+1%',
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
    // 服装：奇迹海洋 / 技能：海洋☆深度意志
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '奇迹海洋',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_867/h_1350/50118/497891/2026/4/19/1779176101823_1776657723119_68kxbxzflw_p8yerei46d.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/50118/497891/2026/4/28/1779950625882_1779950607284_33vi7gj21r_e8up99ydqo.png',
      description:
        '自身遭受攻击时，对敌人应用30%虚弱效果。此效果在遭受8次攻击后将消失。2回合内，虚弱效果将持续，每被攻击1次时，叠加至1，最多可赋予叠加至8。6回合内，对自己应用50%的防护罩效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 1, cd: 0, multiplying: 0 }, // +1
        2: { sp: 1, cd: 0, multiplying: 0 }, // +2
        3: { sp: 1, cd: 0, multiplying: 0 }, // +3
        4: { sp: 1, cd: 0, multiplying: 0 }, // +4
        5: { sp: 1, cd: 0, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：护盾（6回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '虚弱+2回合',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '防护罩+10%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '防护罩+10%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '虚弱+15%',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '虚弱+15%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '虚弱+2回合',
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
          MRES: 13.4,
        },
      },
    },
  },
}

export default mamonir
