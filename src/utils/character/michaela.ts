// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 633685 / entryId: 162490
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const michaela: characterDataObj = {
  name: 'michaela',
  cName: '米卡艾拉',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  MATK: 330, // 魔法力
  HP: 1953, // 生命值
  DEF: 0, // 防御力
  MRES: 5, // 魔法抵抗
  CR: 15, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 330, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：海滨正义 / 技能：暴露即是正义
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '海滨正义',
      target: 'enemy',
      sp: -5,
      cd: 1,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [0, 1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/448538.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/790776.png',
      description:
        '使用相当于自身当前生命力的80%，并在&-effect/buff/0/duration-&回合内，自身魔法力增加&-effect/buff/0/attackAdd-&%。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 350,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 350,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 400,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 450,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 500,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 550,
          buff: [
            {
              duration: 2,
              attribute: 'matk',
              attackAdd: 200,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：使用相当于自身当前生命力的80%，并在
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 50,
          description: '伤害量+50%',
        },
        potentials2: {
          multiplying: 50,
          description: '伤害量+50%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '魔法力增加+2回合',
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '魔法力增加+50%',
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '魔法力增加+50%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PMATK: 18,
        },
        Bonding: {
          // 绑定属性
          MATK: 80,
          MRES: 5,
          CDMG: 47.2,
        },
      },
    },
    // 服装：签名女王 / 技能：火力赞美
    skill2: {
      name: 'skill2', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '签名女王',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 3,
      scope: [
        [0, 0],
        [-1, -1],
        [-2, -2],
        [-1, 1],
        [-2, 2],
        [1, 1],
        [2, 2],
        [1, -1],
        [2, -2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/172002.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/96753.png',
      description:
        '友军的SP减少6点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: { sp: 0, cd: 0, multiplying: 210 }, // +0
        1: { sp: 1, cd: 0, multiplying: 210 }, // +1
        2: { sp: 1, cd: 0, multiplying: 250 }, // +2
        3: { sp: 1, cd: 0, multiplying: 290 }, // +3
        4: { sp: 1, cd: 0, multiplying: 330 }, // +4
        5: { sp: 1, cd: 0, multiplying: 370 }, // +5
        // TODO 描述里未能识别的效果：友军的SP减少6点
        // TODO 待人工复核：描述里有增益/减益关键词，但没解析成 buff
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
          cd: -4,
          description: '冷却时间-4回合',
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
    // 服装：神圣者 / 技能：流血的圣痕
    skill3: {
      name: 'skill3', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '神圣者',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/358101.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/923107.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身致命伤害增加&-effect/buff/0/critical-&%。4回合内，自身防御力和魔法抵抗减少90%。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 80,
          buff: [
            {
              duration: 4,
              critical: 300,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 80,
          buff: [
            {
              duration: 4,
              critical: 300,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 120,
          buff: [
            {
              duration: 4,
              critical: 300,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 120,
          buff: [
            {
              duration: 6,
              critical: 300,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 120,
          buff: [
            {
              duration: 6,
              critical: 400,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 160,
          buff: [
            {
              duration: 6,
              critical: 400,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，自身防御力和魔法抵抗减少90%
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 40,
          description: '伤害量+40%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '致命伤害增加+100%',
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
          CDMG: 10.8,
        },
        Bonding: {
          // 绑定属性
          PMATK: 52,
          CR: 4.6,
          DMG: 30,
        },
      },
    },
  },
}

export default michaela
