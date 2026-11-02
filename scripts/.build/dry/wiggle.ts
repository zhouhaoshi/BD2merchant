// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593602 / entryId: 122334
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核


import { dotBuffType } from '@/utils/globals'

const wiggle: characterDataObj = {
  name: 'wiggle',
  cName: '威格',
  star: 3, // 星级
  element: 'fire', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 329, // 攻击力
  HP: 78, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 329, // TODO 默认面板，装备/词条加成需要另配
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
    PATK: 7,
    DMG: 6,
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
    // 服装：炸弹狂 / 技能：威格？爆炸！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '炸弹狂',
      target: 'enemy',
      sp: -5,
      cd: 1,
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_824/h_986/50118/103682/2025/0/21/524852.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/502981.png',
      description:
        '对敌人自爆，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。自爆攻击无法闪避。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 300 }, // +0
        1: { sp: 1, cd: 0, multiplying: 300 }, // +1
        2: { sp: 1, cd: 0, multiplying: 335 }, // +2
        3: { sp: 2, cd: 0, multiplying: 335 }, // +3
        4: { sp: 2, cd: 0, multiplying: 400 }, // +4
        5: { sp: 2, cd: 0, multiplying: 500 }, // +5
        // TODO 描述里未能识别的效果：对敌人自爆， | 自爆攻击无法闪避
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
          PATK: 1.4,
        },
        Bonding: {
          // 绑定属性
          PATK: 37.5,
          CDMG: 32.6,
        },
      },
    },
    // 服装：炸弹帽衫 / 技能：与炸弹共舞
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '炸弹帽衫',
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
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_909/h_1079/50118/103682/2025/0/21/525104.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/374799.png',
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&的物理伤害的灼伤效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 75,
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 75,
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 90,
            },
          ],
        },
        3: {
          sp: 1,
          cd: -4,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 90,
            },
          ],
        },
        4: {
          sp: 1,
          cd: -4,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 115,
            },
          ],
        },
        5: {
          sp: 1,
          cd: -4,
          multiplying: 20,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 3,
              dotMultiplying: 155,
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
          PATK: 1.4,
        },
        Bonding: {
          // 绑定属性
          PATK: 27.7,
          CR: 3.2,
          DMG: 14,
        },
      },
    },
  },
}

export default wiggle
