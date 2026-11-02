// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593648 / entryId: 122338
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const samay: characterDataObj = {
  name: 'samay',
  cName: '莎美',
  star: 4, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 252, // 魔法力
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
    MATK: 27,
    MRES: 6,
  },
  Awakening: {
    // 觉醒
    PMATK: 10,
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
    // 服装：深情解放者 / 技能：犹豫之刃
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '深情解放者',
      target: 'enemy',
      sp: -5,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_832/h_1126/50118/72324/2025/0/21/574795.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/530592.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。&-effect/deBuff/0/duration-&回合内，敌人魔法抵抗减少&-effect/deBuff/0/MRESReduce-&%。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 80,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 80,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 100,
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
          cd: -4,
          multiplying: 100,
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
          cd: -4,
          multiplying: 140,
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
          cd: -4,
          multiplying: 200,
          deBuff: [
            {
              duration: 4,
              MRESReduce: 50,
              scope: [],
            },
          ],
        },
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
          MATK: 12,
        },
        Bonding: {
          // 绑定属性
          HP: 122,
          MATK: 60,
          CDMG: 37.8,
        },
      },
    },
    // 服装：和善学生 / 技能：靠你了！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '和善学生',
      target: 'friendly',
      sp: -5,
      cd: 5,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_610/h_1004/50118/72324/2025/0/21/644445.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/654593.png',
      description:
        '&-effect/buff/0/duration-&回合内，友军的攻击力增加&-effect/buff/0/attackAdd-&%。&-effect/buff/1/duration-&回合内，友军的魔法力增加&-effect/buff/1/attackAdd-&%。&-effect/buff/2/duration-&回合内，每回合结束时，恢复友军相当于自身魔法力&-effect/buff/2/HPAdd-&%的生命力。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 20,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 20,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
        1: {
          sp: 3,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 20,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 20,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
        2: {
          sp: 3,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 25,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 25,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
        3: {
          sp: 4,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 25,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 25,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
        4: {
          sp: 4,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 35,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 35,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
        5: {
          sp: 4,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 50,
              scope: [],
            },
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 50,
              scope: [],
            },
            {
              duration: 2,
              HPAdd: 25,
              scope: [],
            },
          ],
        },
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
          MATK: 12,
        },
        Bonding: {
          // 绑定属性
          HP: 122,
          PMATK: 60,
        },
      },
    },
  },
}

export default samay
