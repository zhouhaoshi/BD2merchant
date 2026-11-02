// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593580 / entryId: 122326
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核


import { dotBuffType } from '@/utils/globals'

const emma: characterDataObj = {
  name: 'emma',
  cName: '艾玛',
  star: 3, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 245, // 攻击力
  HP: 1196, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 0, // 暴击率
  CDMG: 0, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 245, // TODO 默认面板，装备/词条加成需要另配
  critical: 0, // 默认爆伤
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
    // 服装：麻烦问题儿童 / 技能：我最棒！
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '麻烦问题儿童',
      target: 'enemy',
      sp: -2,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_564/h_992/50118/72324/2025/0/21/948470.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/442153.png',
      description: '6回合期内，自身攻击力增加&-effect/buff/0/attackAdd-&%。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 250,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 250,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 350,
              scope: [[0, 0]],
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
              attribute: 'atk',
              attackAdd: 500,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '【额外能力】6回合内，自身致命率增加30%。',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          ATK: 4,
        },
        Bonding: {
          // 绑定属性
          HP: 106,
          ATK: 40,
          CR: 5.4,
        },
      },
    },
    // 服装：校园女王 / 技能：我很忙，快让开！
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '校园女王',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_546/h_1056/50118/72324/2025/0/21/279456.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/160265.png',
      description:
        '友军的SP恢复&-effect/special/0/spAdd-&点。对敌人造成1的物理伤害，并将目标向左侧击退2格。对被撞击的敌人造成相当于被推开目标最大生命力&-effect/repellingMultiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&的物理伤害的出血效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          repellingMultiplying: 50,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 50,
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          repellingMultiplying: 50,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 50,
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 0,
          repellingMultiplying: 75,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 50,
            },
          ],
        },
        3: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          repellingMultiplying: 75,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 50,
            },
          ],
        },
        4: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          repellingMultiplying: 125,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 50,
            },
          ],
        },
        5: {
          sp: 1,
          cd: -4,
          multiplying: 0,
          repellingMultiplying: 125,
          special: [
            {
              spAdd: 3,
            },
            {
              spAdd: 3,
            },
          ],
          dotBuff: [
            {
              type: dotBuffType.bleed,
              scope: [],
              duration: 6,
              dotMultiplying: 100,
            },
          ],
        },
        // TODO 描述里未能识别的效果：对敌人造成1的物理伤害，并将目标向左侧击退2格
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
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
          ATK: 4,
        },
        Bonding: {
          // 绑定属性
          HP: 106,
          CR: 9.1,
          DMG: 14,
        },
      },
    },
  },
}

export default emma
