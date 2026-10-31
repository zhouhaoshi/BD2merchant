// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593587 / entryId: 122348
// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐

const olstein: characterDataObj = {
  name: 'olstein',
  cName: '奥尔施塔因',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 264, // 魔法力
  HP: 3003, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 264, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：魔物学家 / 技能：沉默之怒
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '魔物学家',
      target: 'friendly',
      sp: -4,
      cd: 5,
      chain: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/525924.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/915393.png',
      description:
        '每次攻击命中敌人时，友军的SP恢复1点，敌人的SP减少1点。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。4回合内，对敌人应用沉默效果。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 25 }, // +0
        1: { sp: 0, cd: 0, multiplying: 25 }, // +1
        2: { sp: 0, cd: 0, multiplying: 25 }, // +2
        3: { sp: 1, cd: 0, multiplying: 25 }, // +3
        4: { sp: 1, cd: 0, multiplying: 25 }, // +4
        5: { sp: 1, cd: 0, multiplying: 25 }, // +5
        // TODO 描述里识别到的效果：SP变化（1回合） | 沉默（4回合）
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 125,
          description: '伤害倍率+125%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '友军的SP恢复+1',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '敌人的SP减少+1',
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
          MATK: 80,
          MRES: 5,
          PHP: 28.4,
        },
      },
    },
    // 服装：青云道士 / 技能：云龙到来
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '青云道士',
      target: 'enemy',
      sp: -2,
      cd: 5,
      chain: 7,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/668489.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/419052.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。解除应用于敌人的能力值强化效果。2回合内，敌人攻击力减少35%。若敌人为魔法类型，则改为在2回合内，魔法力减少35%。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 25 }, // +0
        1: { sp: 0, cd: 0, multiplying: 25 }, // +1
        2: { sp: 0, cd: 0, multiplying: 25 }, // +2
        3: { sp: 1, cd: 0, multiplying: 25 }, // +3
        4: { sp: 1, cd: 0, multiplying: 25 }, // +4
        5: { sp: 1, cd: 0, multiplying: 25 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '+2回合',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
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
          DEF: 5,
          MRES: 8.4,
        },
      },
    },
  },
}

export default olstein
