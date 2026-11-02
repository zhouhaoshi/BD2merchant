// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）
// contentId: 721512 / entryId: 225782
// TODO wiki 上没有英文名，文件名和 name 暂时用 contentId，请改成游戏里的角色 key
// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核

const char721512: characterDataObj = {
  name: 'char721512',
  cName: '山城恋',
  star: 5, // 星级
  element: 'light', // 元素属性 light/dark/fire/wind/water
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk 物理
  attackType: 'front', // 攻击目标 front 最前 skip 跳过
  MATK: 341, // 魔法力
  HP: 1575, // 生命值
  DEF: 10, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 20, // 暴击率
  CDMG: 100, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 341, // TODO 默认面板，装备/词条加成需要另配
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
    // 服装：无限宇宙之全一 / 技能：让我好好管教你
    skill1: {
      name: 'skill1', // TODO: wiki 只有中文名，英文 key 需要人工命名
      cName: '无限宇宙之全一',
      target: 'enemy',
      sp: -5,
      cd: 1,
      chain: 1,
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      // 服装立绘（wiki 原图）
      image:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_703/h_1578/497891/2026/8/18/03298536mu6qngqw.png',
      // Q版形象（wiki 原图）
      qimage:
        'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_360/h_381/497891/2026/8/18/60144766mu6qn8bh.png',
      description:
        '自身成功闪避敌人&-effect/buff/0/sidestep-&次前，以100%的概率闪避敌人的攻击。对敌人造成相当于自身魔法力&-effect/multiplying-&%的魔法伤害。',
      effect: {
        0: {
          sp: 0,
          cd: 0,
          multiplying: 600,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        1: {
          sp: 1,
          cd: 0,
          multiplying: 600,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        2: {
          sp: 1,
          cd: 0,
          multiplying: 680,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 760,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 840,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 920,
          buff: [
            {
              duration: 99,
              sidestep: 1,
              scope: [[0, 0]],
            },
          ],
        },
        // TODO 描述里未能识别的效果：，以100%的概率闪避敌人的攻击
        // TODO 待人工复核：没有解析到连锁次数
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗-1',
        },
        potentials2: {
          multiplying: 40,
          description: '伤害量+40%',
        },
        potentials3: {
          multiplying: 40,
          description: '伤害量+40%',
        },
      },
      // 爆发技能
      burst: {
        burst1: {
          sp: 1, // 消耗SP
          description: '技能范围扩大',
          scope: [[0, 0]], // TODO: 范围图没解析出来，请人工确认命中范围
        },
        burst2: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
          multiplying: 150,
        },
        burst3: {
          sp: 1, // 消耗SP
          description: '伤害量+150%',
          multiplying: 150,
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
          MATK: 80,
          CR: 12.4,
        },
      },
    },
  },
}

export default char721512
