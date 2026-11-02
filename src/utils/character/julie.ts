// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 593604 / entryId: 122329
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const julie: characterDataObj = {
  name: 'julie',
  cName: '茱莉',
  star: 3, // 星级
  element: 'wind', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 224, // 魔法力
  HP: 1209, // 生命值
  DEF: 0, // 防御力
  MRES: 15, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 50, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 224, // TODO 默认面板，装备/词条加成需要另配
  critical: 50, // 默认爆伤
  attributeDamage: 50, // 默认属伤
  engraving: {
    // 刻印
    HP: 146,
    MATK: 20,
    MRES: 5,
  },
  Awakening: {
    // 觉醒
    MRES: 2,
    PHP: 8,
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
    // 服装：恢复师 / 技能：赋予再生
    // TODO: wiki 只给了满破数据，+0~+5 暂用满破值填充，需要人工核对
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '恢复师',
      target: 'friendly',
      sp: -2,
      cd: 3,
      chain: 1,
      scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_421/h_1024/50118/497891/2026/1/4/994926.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_120/h_127/50118/497891/2026/1/3/461135.png',
      description:
        '&-effect/buff/0/duration-&回合内，每回合结束时，恢复友军相当于自身魔法力&-effect/buff/0/HPAdd-&%的生命力。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              HPAdd: 155,
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
              HPAdd: 155,
              scope: [],
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              HPAdd: 155,
              scope: [],
            },
          ],
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              HPAdd: 155,
              scope: [],
            },
          ],
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              HPAdd: 155,
              scope: [],
            },
          ],
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 0,
          buff: [
            {
              duration: 6,
              HPAdd: 155,
              scope: [],
            },
          ],
        },
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          HPAdd: 100,
          description: '恢复倍率+100%',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          MATK: 4,
        },
        Bonding: {
          // 绑定属性
          MATK: 64,
          MRES: 3.4,
        },
      },
    },
  },
}

export default julie
