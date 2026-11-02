// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 607899 / entryId: 135956
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const nartas: characterDataObj = {
  name: 'nartas',
  cName: '纳罗达斯',
  star: 5, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 396, // 魔法力
  HP: 1470, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 396, // TODO 默认面板，装备/词条加成需要另配
  critical: 75, // 默认爆伤
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
    // 服装：无名道士 / 技能：半妖神掌
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '无名道士',
      target: 'enemy',
      sp: -5,
      cd: 1,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/119563.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/742762.png',
      description:
        '4回合内，对自己应用75%的魔法防护罩效果。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。若敌人为物理类型，则改为造成相当于自身魔法力400%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 300 }, // +0
        1: { sp: 0, cd: 0, multiplying: 350 }, // +1
        2: { sp: 0, cd: 0, multiplying: 350 }, // +2
        3: { sp: 0, cd: 0, multiplying: 400 }, // +3
        4: { sp: 0, cd: 0, multiplying: 400 }, // +4
        5: { sp: 0, cd: 0, multiplying: 450 }, // +5
        // TODO 描述里未能识别的效果：
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力400%的魔法伤害
        // 　　　　　　　　　　　，对自己应用75%的魔法防护罩效果
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力450%的魔法伤害
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力600%的魔法伤害
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力650%的魔法伤害
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力800%的魔法伤害
        // 　　　　　　　　　　　条件效果未结构化：若敌人为物理类型，则改为造成相当于自身魔法力850%的魔法伤害
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为物理属性，伤害倍率+100%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为物理属性，伤害倍率+100%',
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
          PMATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PMATK: 14.2,
          CDMG: 104,
          DMG: 30,
        },
      },
    },
  },
}

export default nartas
