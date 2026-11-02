// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593588 / entryId: 122349
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const sylvia: characterDataObj = {
  name: 'sylvia',
  cName: '席比雅',
  star: 5, // 星级
  element: 'water', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  ATK: 352, // 攻击力
  HP: 1911, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 352, // TODO 默认面板，装备/词条加成需要另配
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
    PATK: 12,
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
    // 服装：沙漠之花 / 技能：利剑要塞
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '沙漠之花',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [[0, 0]], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_1041/h_1411/50118/43758/2025/0/22/376807.webp',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/440035.png',
      description:
        '4回合内，自身遭受攻击时，将进行反击。每次反击时，对敌人造成相当于自身攻击力&-effect/hitBuff/0/hitMultiplying-&%的物理伤害。&-effect/buff/1/duration-&回合内，对自己应用&-effect/buff/1/damageReduction-&%的防护罩效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 400,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 465,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 530,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 530,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 595,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          hitBuff: [
            {
              scope: [],
              target: 'enemy',
              hitMultiplying: 660,
            },
          ],
          buff: [
            {
              duration: 4,
              hit: 1,
              scope: [[0, 0]],
            },
            {
              duration: 4,
              damageReduction: 50,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 待人工复核：没有解析到技能倍率 | 没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害倍率+50%',
        },
        potentials2: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '防护罩倍率+25%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          PHP: 17,
          PATK: 52,
          DEF: 8.4,
        },
      },
    },
    // 服装：海军队长 / 技能：制裁者
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '海军队长',
      target: 'enemy',
      sp: -4,
      cd: 9,
      chain: 5,
      scope: [
        [0, 0],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/489689.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/631581.png',
      description:
        '对自己应用相当于攻击力&-effect/buff/0/shield-&%的能量护盾效果。此效果在遭受3次攻击后将消失。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 45,
          buff: [
            {
              duration: 99,
              shield: 400,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 67,
          buff: [
            {
              duration: 99,
              shield: 400,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 67,
          buff: [
            {
              duration: 99,
              shield: 550,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 67,
          buff: [
            {
              duration: 99,
              shield: 550,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 85,
          buff: [
            {
              duration: 99,
              shield: 550,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 85,
          buff: [
            {
              duration: 99,
              shield: 700,
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '伤害倍率+15%',
        },
        potentials2: {
          cd: -4,
          description: '冷却时间-4回合',
        },
        potentials3: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '遭受攻击次数+2次',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          DEF: 5,
          CDMG: 47.2,
        },
      },
    },
    // 服装：剑后 / 技能：莲花飞剑
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '剑后',
      target: 'enemy',
      sp: -1,
      cd: 5,
      chain: 4,
      scope: [
        [0, 0],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/399840.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/991476.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身攻击力增加&-effect/buff/0/attackAdd-&%。攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 25,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          buff: [
            {
              duration: 2,
              attribute: 'atk',
              attackAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 35,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 40,
          buff: [
            {
              duration: 4,
              attribute: 'atk',
              attackAdd: 150,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 40,
          buff: [
            {
              duration: 6,
              attribute: 'atk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 2,
          description: '伤害倍率+2%',
        },
        potentials2: {
          multiplying: 2,
          description: '伤害倍率+2%',
        },
        potentials3: {
          attackAdd: 25,
          description: '攻击力增加倍率+25%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          CDMG: 28.4,
          DMG: 30,
        },
      },
    },
    // 服装：比基尼特工 / 技能：比基尼爆破手
    skill4: {
      name: 'skill4', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '比基尼特工',
      target: 'enemy',
      sp: -5,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [-1, 0],
        [-2, 0],
        [-1, 1],
        [0, 1],
        [0, 2],
        [1, 1],
        [1, 0],
        [2, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/800636/2026/3/1/985585.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/322616.png',
      description:
        '自身持有的所有增益效果的持续回合数2回合延长。对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 400 }, // +0
        1: { sp: 1, cd: 0, multiplying: 400 }, // +1
        2: { sp: 1, cd: 0, multiplying: 475 }, // +2
        3: { sp: 1, cd: 0, multiplying: 550 }, // +3
        4: { sp: 1, cd: 0, multiplying: 625 }, // +4
        5: { sp: 1, cd: 0, multiplying: 700 }, // +5
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          cd: -2,
          description: '冷却时间-2回合',
        },
        potentials2: {
          multiplying: 25,
          description: '伤害倍率+25%',
        },
        potentials3: {
          multiplying: 25,
          description: '伤害倍率+25%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 2, // 消耗SP
          description: '伤害量+300%',
          multiplying: 300,
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
          multiplying: 150,
        },
        burst3: {
          sp: 1, // 消耗SP
          description:
            '【额外能力】【前置效果】拥有的增益效果数量为10个以上时，致命伤害增加200%的效果。',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2,
        },
        Bonding: {
          // 绑定属性
          ATK: 80,
          CR: 4.6,
          CDMG: 47.2,
        },
      },
    },
  },
}

export default sylvia
