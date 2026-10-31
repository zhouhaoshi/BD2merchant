// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 701014 / entryId: 213004
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const ikaruga: characterDataObj = {
  name: 'ikaruga',
  cName: '斑鸠',
  star: 5, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 363, // 攻击力
  HP: 1722, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 363, // TODO 默认面板，装备/词条加成需要另配
  critical: 100, // 默认爆伤
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
    // 服装：纯净之焰 / 技能：特级飞燕凤闪·一式
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '纯净之焰',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 6,
      scope: [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1],
        [1, 0],
        [2, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_796/h_1290/50118/497891/2026/3/8/867233.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_128/h_128/50118/497891/2026/3/9/208689.png',
      description:
        '对自身应用攻击力增加60%的效果。此效果叠加至1。最多可赋予叠加至3。此效果在遭受1次攻击后将消失。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 40 }, // +0
        1: { sp: 1, cd: 0, multiplying: 40 }, // +1
        2: { sp: 1, cd: 0, multiplying: 40 }, // +2
        3: { sp: 1, cd: 0, multiplying: 60 }, // +3
        4: { sp: 1, cd: 0, multiplying: 60 }, // +4
        5: { sp: 1, cd: 0, multiplying: 80 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 5,
          description: '伤害倍率+5%',
        },
        potentials2: {
          multiplying: 5,
          description: '伤害倍率+5%',
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
          PHP: 17,
          PATK: 52,
          DMG: 30,
        },
      },
    },
  },
}

export default ikaruga
