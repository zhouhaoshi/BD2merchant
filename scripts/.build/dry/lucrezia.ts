// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593653 / entryId: 122339
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const lucrezia: characterDataObj = {
  name: 'lucrezia',
  cName: '卢克雷齐亚',
  star: 4, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 306, // 魔法力
  HP: 1428, // 生命值
  DEF: 0, // 防御力
  MRES: 10, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 306, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：诱惑之翼 / 技能：魅惑之手
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '诱惑之翼',
      target: 'enemy',
      sp: -3,
      cd: 7,
      chain: 2,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/492490.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/443009.png',
      description:
        '每次攻击命中敌人时，友军的SP恢复&-effect/hitBuff/0/spAdd-&点。攻击敌人&-chain-&次，每次攻击时，造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。2回合内，对敌人应用沉默效果。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: -4,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 1,
            },
          ],
          deBuff: [
            {
              duration: 2,
              silence: 1,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: -4,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 2,
            },
          ],
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
          cd: -4,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 2,
            },
          ],
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
          cd: -4,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 3,
            },
          ],
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
          cd: -4,
          multiplying: 20,
          hitBuff: [
            {
              scope: [],
              target: 'friendly',
              spAdd: 3,
            },
          ],
          deBuff: [
            {
              duration: 6,
              silence: 1,
              scope: [],
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 20,
          description: '伤害倍率+20%',
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
  },
}

export default lucrezia
