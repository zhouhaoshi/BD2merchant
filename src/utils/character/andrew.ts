// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593635 / entryId: 122335
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const andrew: characterDataObj = {
  name: 'andrew',
  cName: '安德鲁',
  star: 4, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 198, // 攻击力
  HP: 2788, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 198, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 195,
    ATK: 27,
    DEF: 6,
  },
  Awakening: {
    // 觉醒
    DEF: 3,
    PHP: 11,
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
    // 服装：忠直管家 / 技能：窃取生命
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '忠直管家',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 2,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/138837.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/713721.png',
      description:
        '恢复自身相当于自身最大生命力12%的生命力。每次攻击命中敌人时，敌人的SP减少5点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 75 }, // +0
        1: { sp: 0, cd: -4, multiplying: 75 }, // +1
        2: { sp: 0, cd: -4, multiplying: 100 }, // +2
        3: { sp: 1, cd: -4, multiplying: 100 }, // +3
        4: { sp: 1, cd: -4, multiplying: 150 }, // +4
        5: { sp: 1, cd: -4, multiplying: 225 }, // +5
        // TODO 描述里识别到的效果：SP变化（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害倍率+50%',
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
          CR: 3.6,
          DMG: 20,
        },
      },
    },
    // 服装：专家 / 技能：你在看哪里？
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '专家',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_544/h_1308/50118/43637/2025/0/21/100815.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/526943.png',
      description:
        '2回合内，自身有35%的概率闪避敌人的攻击。每次成功闪避攻击时，成功闪避后续攻击的概率将减少5%。2回合内，对自己应用挑衅效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 0 }, // +0
        1: { sp: 0, cd: -4, multiplying: 0 }, // +1
        2: { sp: 0, cd: -4, multiplying: 0 }, // +2
        3: { sp: 1, cd: -4, multiplying: 0 }, // +3
        4: { sp: 1, cd: -4, multiplying: 0 }, // +4
        5: { sp: 1, cd: -4, multiplying: 0 }, // +5
        // TODO 描述里识别到的效果：闪避（2回合） | 挑衅（2回合）
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
          HP: 44,
        },
        Bonding: {
          // 绑定属性
          HP: 448,
          DEF: 10.8,
        },
      },
    },
  },
}

export default andrew
