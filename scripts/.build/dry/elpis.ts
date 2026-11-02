// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 619702 / entryId: 147432
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const elpis: characterDataObj = {
  name: 'elpis',
  cName: '厄尔比斯',
  star: 4, // 星级
  element: 'dark', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 225, // 魔法力
  HP: 2465, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 225, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：救赎之手 / 技能：圣殿祈祷
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '救赎之手',
      target: 'friendly',
      sp: -3,
      cd: 5,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/687934.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/491888.png',
      description:
        '&-effect/buff/0/duration-&回合内，友军的魔法力增加&-effect/buff/0/attackAdd-&%。&-effect/buff/1/duration-&回合内，友军的致命率增加&-effect/buff/1/CRAdd-&%。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 25,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 30,
              scope: [],
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 40,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 30,
              scope: [],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 40,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 30,
              scope: [],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 55,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 30,
              scope: [],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 55,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 35,
              scope: [],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              attribute: 'matk',
              attackAdd: 70,
              scope: [],
            },
            {
              duration: 6,
              CRAdd: 35,
              scope: [],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          attackAdd: 10,
          description: '魔法力增加倍率+10%',
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
          MRES: 10.8,
        },
      },
    },
  },
}

export default elpis
