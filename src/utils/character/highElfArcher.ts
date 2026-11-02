// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 660211 / entryId: 185515
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const highElfArcher: characterDataObj = {
  name: 'highElfArcher',
  cName: '妖精弓手',
  star: 5, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'skip', // 攻击目标 front 最前 skip 跳过
  ATK: 374, // 攻击力
  HP: 2058, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 0, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 374, // TODO 默认面板，装备/词条加成需要另配
  critical: 100, // 默认爆伤
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
    // 服装：星风之女 / 技能：上森人式弓术
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '星风之女',
      target: 'enemy',
      sp: -4,
      cd: 1,
      chain: 4,
      scope: [
        [0, 0],
        [-1, 0],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/601825.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/539099.png',
      description:
        '&-effect/buff/0/duration-&回合内，自身暴击率增加&-effect/buff/0/CRAdd-&%。 攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 75,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 75,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 87,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 100,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 112,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 125,
          buff: [
            {
              duration: 2,
              CRAdd: 100,
              scope: [[0, 0]],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '每次攻击的技能伤害增加5%',
        },
        potentials2: {
          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补
          description: '每次攻击的技能伤害增加5%',
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
          PATK: 37.8,
          CDMG: 104,
        },
      },
    },
  },
}

export default highElfArcher
