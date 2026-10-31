// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593657 / entryId: 122340
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const layla: characterDataObj = {
  name: 'layla',
  cName: '蕾拉',
  star: 4, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 288, // 攻击力
  HP: 1717, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 0, // 属性伤害
  panel: 288, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 0, // 默认属伤
  engraving: {
    // 刻印
    HP: 195,
    ATK: 27,
    DEF: 6,
  },
  Awakening: {
    // 觉醒
    PATK: 10,
    DMG: 8,
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
    // 服装：创造铁砧 / 技能：毁灭铁砧
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '创造铁砧',
      target: 'friendly',
      sp: -6,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [-1, -1],
        [-1, 1],
        [1, 1],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/92757.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/520171.png',
      description:
        '每次攻击命中敌人时，友军的SP恢复1点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 60 }, // +0
        1: { sp: 0, cd: -4, multiplying: 60 }, // +1
        2: { sp: 0, cd: -4, multiplying: 80 }, // +2
        3: { sp: 1, cd: -4, multiplying: 80 }, // +3
        4: { sp: 1, cd: -4, multiplying: 120 }, // +4
        5: { sp: 1, cd: -4, multiplying: 180 }, // +5
        // TODO 描述里识别到的效果：SP变化（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 12,
        },
        Bonding: {
          // 绑定属性
          ATK: 60,
          CDMG: 22.6,
          DMG: 20,
        },
      },
    },
  },
}

export default layla
