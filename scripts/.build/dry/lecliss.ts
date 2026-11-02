// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593624 / entryId: 122358
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const lecliss: characterDataObj = {
  name: 'lecliss',
  cName: '莱克莉斯',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 132, // 攻击力
  HP: 4515, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 132, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 243,
    ATK: 34,
    DEF: 8,
  },
  Awakening: {
    // 觉醒
    DEF: 4,
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
    // 服装：杀人娃娃 / 技能：诅咒复制品
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '杀人娃娃',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_988/h_1224/50118/4408/2025/0/22/936422.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/605794.png',
      description:
        '&-effect/buff/0/duration-&回合内，对自己应用&-effect/buff/0/damageReduction-&%的防护罩效果。2回合内，对自己应用挑衅效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              damageReduction: 45,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              provocation: 1,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              damageReduction: 55,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              provocation: 1,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              damageReduction: 65,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              provocation: 1,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              damageReduction: 65,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              provocation: 1,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 2,
              damageReduction: 75,
              scope: [[0, 0]],
            },
            {
              duration: 2,
              provocation: 1,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 4,
              damageReduction: 75,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              provocation: 1,
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
          description: '防护罩倍率+10%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
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
          PHP: 6.4,
        },
        Bonding: {
          // 绑定属性
          PHP: 62.4,
          MRES: 13.4,
        },
      },
    },
    // 服装：机械人女王 / 技能：自动防御模式
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '机械人女王',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_870/h_1439/50118/4408/2025/0/22/550225.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/272668.png',
      description:
        '4回合内，自身遭受攻击时，将进行反击。每次反击时，对敌人造成相当于自身最大生命力&-effect/multiplying-&%的物理伤害。&-effect/buff/1/duration-&回合内，对自己应用相当于最大生命力&-effect/buff/1/shield-&%的能量护盾效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 15,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 65,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 15,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 100,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 25,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 100,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 25,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 100,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 35,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 100,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 35,
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              shield: 125,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：每次反击时，对敌人
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '反击倍率+5%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '能量护盾倍率+20%',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '能量护盾倍率+15%',
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
          DEF: 13.4,
        },
      },
    },
  },
}

export default lecliss
