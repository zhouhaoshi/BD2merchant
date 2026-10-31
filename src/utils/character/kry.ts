// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593645 / entryId: 122337
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const kry: characterDataObj = {
  name: 'kry',
  cName: '克莱',
  star: 4, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 252, // 攻击力
  HP: 2142, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 252, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：解放掠夺者 / 技能：铁甲袭击
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '解放掠夺者',
      target: 'enemy',
      sp: -5,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_953/h_1005/50118/72324/2025/0/21/196574.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/592278.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。4回合内，敌人防御力减少50%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 80 }, // +0
        1: { sp: 0, cd: -4, multiplying: 80 }, // +1
        2: { sp: 0, cd: -4, multiplying: 100 }, // +2
        3: { sp: 1, cd: -4, multiplying: 100 }, // +3
        4: { sp: 1, cd: -4, multiplying: 140 }, // +4
        5: { sp: 1, cd: -4, multiplying: 200 }, // +5
        // TODO 描述里识别到的效果：减防50%（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '伤害倍率+15%',
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
          PATK: 41.2,
          CR: 3.6,
          DMG: 20,
        },
      },
    },
    // 服装：粗暴学生 / 技能：相信我
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '粗暴学生',
      target: 'friendly',
      sp: -2,
      cd: 7,
      chain: 1,
      scope: [
        [0, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_640/h_986/50118/72324/2025/0/22/479916.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/197654.png',
      description:
        '友军的SP恢复3。对敌人造成1的物理伤害，并将目标向后方击退2格。对被撞击的敌人造成相当于目标最大生命力100%的物理伤害。6回合内，对敌人应用造成相当于自身攻击力&-effect/multiplying-&%的物理伤害的出血效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 50, special: [{ spAdd: 3 }] }, // +0
        1: { sp: 0, cd: -4, multiplying: 50, special: [{ spAdd: 3 }] }, // +1
        2: { sp: 0, cd: -4, multiplying: 65, special: [{ spAdd: 3 }] }, // +2
        3: { sp: 1, cd: -4, multiplying: 65, special: [{ spAdd: 3 }] }, // +3
        4: { sp: 1, cd: -4, multiplying: 90, special: [{ spAdd: 3 }] }, // +4
        5: { sp: 1, cd: -4, multiplying: 130, special: [{ spAdd: 3 }] }, // +5
        // TODO 描述里识别到的效果：SP变化（1回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        // TODO: wiki 没有技能潜力数据
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 12,
        },
        Bonding: {
          // 绑定属性
          ATK: 88,
        },
      },
    },
  },
}

export default kry
