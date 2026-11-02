// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593638 / entryId: 122336
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const jayden: characterDataObj = {
  name: 'jayden',
  cName: '杰登',
  star: 4, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 180, // 魔法力
  HP: 3094, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 0, // 暴击率
  CDMG: 0, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 180, // TODO 默认面板，装备/词条加成需要另配
  critical: 0, // 默认爆伤
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
    // 服装：美少女信奉者 / 技能：美少女之力
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '美少女信奉者',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_701/h_998/50118/103682/2025/0/21/811155.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/712094.png',
      description:
        '&-effect/buff/0/duration-&回合内，每回合结束时，恢复自身相当于自身最大生命力&-effect/buff/0/HPAdd-&%的生命力。4回合内，对自己应用50%的魔法防护罩效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 4,
              HPAdd: 5,
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
              duration: 4,
              HPAdd: 5,
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
              duration: 4,
              HPAdd: 9,
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
              duration: 4,
              HPAdd: 9,
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
              duration: 4,
              HPAdd: 17,
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
              duration: 6,
              HPAdd: 17,
              scope: [],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，对自己应用50%的魔法防护罩效果
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '魔法防护罩倍率+25%',
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
          MATK: 16,
          MRES: 6.8,
        },
      },
    },
    // 服装：漫画研究社 / 技能：流星落下
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '漫画研究社',
      target: 'enemy',
      sp: -6,
      cd: 7,
      chain: 3,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_978/h_997/50118/103682/2025/0/21/168167.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/488719.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 50 }, // +0
        1: { sp: 0, cd: -4, multiplying: 50 }, // +1
        2: { sp: 0, cd: -4, multiplying: 70 }, // +2
        3: { sp: 1, cd: -4, multiplying: 70 }, // +3
        4: { sp: 1, cd: -4, multiplying: 110 }, // +4
        5: { sp: 1, cd: -4, multiplying: 170 }, // +5
      },
      // 技能觉醒效果
      skillPotentials: {
        // TODO: wiki 没有技能潜力数据
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 12,
        },
        Bonding: {
          // 绑定属性
          MATK: 60,
          CR: 3.6,
          CDMG: 20,
        },
      },
    },
  },
}

export default jayden
