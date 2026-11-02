// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 622875 / entryId: 150306
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const roxy: characterDataObj = {
  name: 'roxy',
  cName: '洛琪希',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 407, // 魔法力
  HP: 1449, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 5, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 407, // TODO 默认面板，装备/词条加成需要另配
  critical: 100, // 默认爆伤
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
    // 服装：受尊敬的师傅 / 技能：豪雷积层云
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '受尊敬的师傅',
      target: 'enemy',
      sp: -7,
      cd: 3,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [-1, -1],
        [-1, 0],
        [-2, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1],
        [1, 0],
        [2, 0],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/350861.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/566599.png',
      description:
        '对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。若敌人为主要目标，则改为造成相当于自身魔法力300%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 140 }, // +0
        1: { sp: 1, cd: 0, multiplying: 140 }, // +1
        2: { sp: 1, cd: 0, multiplying: 210 }, // +2
        3: { sp: 1, cd: 0, multiplying: 280 }, // +3
        4: { sp: 1, cd: 0, multiplying: 280 }, // +4
        5: { sp: 1, cd: 0, multiplying: 350 }, // +5
        // TODO 描述里未能识别的效果：
        // 　　　　　　　　　　　条件效果未结构化：若敌人为主要目标，则改为造成相当于自身魔法力300%的魔法伤害
        // 　　　　　　　　　　　条件效果未结构化：若敌人为主要目标，则改为造成相当于自身魔法力450%的魔法伤害
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为主要目标，伤害倍率+75%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '若敌人为主要目标，伤害倍率+75%',
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
          HP: 154,
          PMATK: 52,
          CDMG: 47.2,
        },
      },
    },
    // 服装：泄露的欲望 / 技能：寂静的夜晚
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '泄露的欲望',
      target: 'enemy',
      sp: -2,
      cd: 3,
      chain: 3,
      scope: [
        [0, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/602526.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/655319.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。2回合内，对敌人应用沉默效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 37,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 44,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 51,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 58,
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 6,
          description: '伤害倍率+6%',
        },
        potentials2: {
          multiplying: 6,
          description: '伤害倍率+6%',
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
          MATK: 80,
          MRES: 5,
          DMG: 30,
        },
      },
    },
  },
}

export default roxy
