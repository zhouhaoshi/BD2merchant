// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 625113 / entryId: 152215
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核
// 手工维护：DJ 潜力3 在 wiki 上是范围扩大图片（无文本），自动生成无法识别

const venaka: characterDataObj = {
  name: 'venaka',
  cName: '贝那卡',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 363, // 魔法力
  HP: 1785, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 363, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：DJ / 技能：站起来，音乐响起！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: 'DJ',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/586749.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/681252.png',
      description:
        '&-effect/deBuff/0/duration-&回合内，敌人魔法抵抗减少&-effect/deBuff/0/MRESReduce-&%。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 500,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 500,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 600,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 700,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 800,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 900,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 100,
          description: '伤害量+100%',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials3: {
          description: '技能范围扩大',
          scope: [
            [0, 2],
            [-2, 0],
            [2, 0],
            [0, -2],
          ],
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '【额外能力】4回合内，自身魔法力强化100%，冷却减2回合。',
          attackAdd: 100, // 魔法力强化
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
          multiplying: 150, // 伤害倍率增加
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
          multiplying: 150, // 伤害倍率增加
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
    // 服装：风之舞姬 / 技能：清风之舞
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '风之舞姬',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/100501.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/411646.png',
      description:
        '4回合内，对敌人应用75%的风属性虚弱效果。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 200 }, // +0
        1: { sp: 1, cd: 0, multiplying: 200 }, // +1
        2: { sp: 1, cd: 0, multiplying: 250 }, // +2
        3: { sp: 1, cd: 0, multiplying: 250 }, // +3
        4: { sp: 1, cd: 0, multiplying: 300 }, // +4
        5: { sp: 1, cd: 0, multiplying: 350 }, // +5
        // TODO 描述里未能识别的效果：，对敌人应用75%的风属性虚弱效果
        // 　　　　　　　　　　　，对敌人应用125%的风属性虚弱效果
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 25,
          description: '伤害量+25%',
        },
        potentials2: {
          multiplying: 25,
          description: '伤害量+25%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '风属性虚弱效果+25%',
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
          PMATK: 52,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
  },
}

export default venaka
