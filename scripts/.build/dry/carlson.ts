// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593599 / entryId: 122330
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const carlson: characterDataObj = {
  name: 'carlson',
  cName: '卡森',
  star: 3, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 70, // 攻击力
  HP: 2860, // 生命值
  DEF: 15, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 70, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 146,
    ATK: 20,
    DEF: 5,
  },
  Awakening: {
    // 觉醒
    DEF: 2,
    PHP: 8,
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
    // 服装：佣兵骑士 / 技能：坚定意志
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '佣兵骑士',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_510/h_999/50118/72324/2025/0/22/258516.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/254281.png',
      description: '2回合内，对自己应用35%的物理防护罩效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: -4, multiplying: 0 }, // +1
        2: { sp: 0, cd: -4, multiplying: 0 }, // +2
        3: { sp: 1, cd: -4, multiplying: 0 }, // +3
        4: { sp: 1, cd: -4, multiplying: 0 }, // +4
        5: { sp: 1, cd: -4, multiplying: 0 }, // +5
        // TODO 描述里未能识别的效果：，对自己应用35%的物理防护罩效果
        // 　　　　　　　　　　　，对自己应用45%的物理防护罩效果
        // 　　　　　　　　　　　，对自己应用65%的物理防护罩效果
        // TODO 待人工复核：没有解析到连锁次数
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
          PHP: 1.8,
        },
        Bonding: {
          // 绑定属性
          PHP: 31.2,
          DEF: 9.7,
        },
      },
    },
  },
}

export default carlson
