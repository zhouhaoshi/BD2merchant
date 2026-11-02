// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593667 / entryId: 122342
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const lisianne: characterDataObj = {
  name: 'lisianne',
  cName: '莉西安',
  star: 4, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 234, // 魔法力
  HP: 2091, // 生命值
  DEF: 0, // 防御力
  MRES: 20, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 234, // TODO 默认面板，装备/词条加成需要另配
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
    MRES: 3,
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
    // 服装：流浪神职者 / 技能：治愈祈祷
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '流浪神职者',
      target: 'friendly',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/57562.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/6858.png',
      description:
        '恢复友军相当于自身魔法力&-effect/buff/0/HPAdd-&%的生命力。解除应用于友军的持续伤害效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 50,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 50,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 70,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 70,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 100,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 0,
              HPAdd: 150,
              scope: [],
            },
          ],
        },
        // TODO 描述里未能识别的效果：解除应用于友军的持续伤害效果
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '【额外能力】4回合内，对友军应用相当于自身魔法力150%的能量护盾效果。',
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
          MATK: 88,
        },
      },
    },
  },
}

export default lisianne
