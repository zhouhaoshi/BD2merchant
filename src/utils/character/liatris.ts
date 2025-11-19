import { dotBuffType } from '@/utils/globals'

const liatris: characterDataObj = {
  name: 'liatris',
  cName: '莉亚特里斯',
  element: 'fire',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  ATK: 352, // 攻击力
  HP: 2016, // 生命值
  DEF: 0, // 防御力
  MRES: 0, // 魔法抵抗
  CR: 10, // 暴击率
  CDMG: 75, // 暴击伤害
  DMG: 50, // 属性伤害
  panel: 2241,
  critical: 657.92,
  attributeDamage: 90,
  engraving: {
    // 刻印
    HP: 243, // 生命值
    ATK: 34, // 攻击力
    DEF: 8, // 防御力
  },
  Awakening: {
    // 觉醒
    PATK: 12, // 百分比攻击力
    DMG: 10, // 属性伤害
  },
  attackType: 'skip', // 攻击类型 front为最前 skip为跳过
  commonSkill: {
    general: {
      name: 'general',
      cName: '普攻',
      target: 'enemy',
      cd: 0,
      sp: 0,
      chain: 1,
      scope: [[0, 0]],
      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',
      skillEffect: {
        multiplying: 100,
      },
    },
  },
  // 服装技能
  Skill: {
    rodevStar: {
      name: 'rodevStar',
      cName: '罗戴夫之星',
      target: 'enemy',
      sp: -6,
      cd: 3,
      chain: 5,
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
      image: 'Liatris_1_large', // 图片形象
      qimage: 'Liatris_1_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用每层叠加造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&%物理伤害的灼伤叠加效果。并且最多可赋予叠加至&-effect/dotBuff/0/maxNumber-&。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 18,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 25,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 31,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 31,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 36,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 30,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 41,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 15,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials2: {
          dotBuff: {
            index: 0,
            dotMultiplying: 4,
          },
          description: '每回合技能伤害增加4%',
        },
        potentials3: {
          description: 'SP消耗减少1',
          sp: -1,
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 17, // 百分比生命值
          PATK: 52, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    neonStalker: {
      name: 'neonStalker',
      cName: '霓虹跟踪狂',
      target: 'enemy',
      sp: -4,
      cd: 3,
      chain: 5,
      scope: [
        [0, 0],
        [0, -1],
        [0, -2],
        [0, -3],
        [0, 1],
        [0, 2],
        [0, 3],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Liatris_2_large', // 图片形象
      qimage: 'Liatris_2_idle', // q版形象
      description:
        '攻击敌人&-chain-&次，每次攻击时，造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。&-effect/dotBuff/0/duration-&回合内，对敌人应用每层叠加造成相当于自身攻击力&-effect/dotBuff/0/dotMultiplying-&%物理伤害的灼伤叠加效果。并且最多可赋予叠加至&-effect/dotBuff/0/maxNumber-&。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 35,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 20,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 35,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 28,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 47,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 28,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        3: {
          sp: 1,
          cd: 0,
          multiplying: 47,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 28,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        4: {
          sp: 1,
          cd: 0,
          multiplying: 28,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 35,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
        5: {
          sp: 1,
          cd: 0,
          multiplying: 55,
          dotBuff: [
            {
              type: dotBuffType.burn,
              scope: [],
              duration: 5,
              dotMultiplying: 35,
              dotbuffNumber: 1,
              maxNumber: 10,
            },
          ],
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          multiplying: 10,
          description: '每次攻击的技能伤害增加15%',
        },
        potentials2: {
          dotBuff: {
            index: 0,
            dotMultiplying: 5,
          },
          description: '每回合技能伤害增加5%',
        },
        potentials3: {
          dotBuff: {
            index: 0,
            duration: 2,
          },
          description: '增加2回合造成伤害',
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 17, // 百分比生命值
          PATK: 52, // 百分比攻击力
          DMG: 30, // 百分比攻击力
        },
      },
    },
    maidNameR: {
      name: 'maidNameR',
      cName: '女仆代号R',
      target: 'enemy',
      sp: -4,
      cd: 5,
      chain: 1,
      scope: [
        [0, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
      ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
      image: 'Liatris_3_large', // 图片形象
      qimage: 'Liatris_3_idle', // q版形象
      description:
        '对敌人造成相当于自身攻击力&-effect/multiplying-&%的物理伤害。若敌人处于持续伤害状态，则改为造成相当于自身攻击力&-effect/conditionMultiplying-&%的物理伤害。',
      effect: {
        // 技能效果
        0: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          condition: [dotBuffType.burn],
          conditionMultiplying: 550,
        },
        1: {
          sp: 0,
          cd: 0,
          multiplying: 400,
          condition: [dotBuffType.burn],
          conditionMultiplying: 600,
        },
        2: {
          sp: 0,
          cd: 0,
          multiplying: 475,
          condition: [dotBuffType.burn],
          conditionMultiplying: 675,
        },
        3: {
          sp: 0,
          cd: 0,
          multiplying: 475,
          condition: [dotBuffType.burn],
          conditionMultiplying: 725,
        },
        4: {
          sp: 0,
          cd: 0,
          multiplying: 550,
          condition: [dotBuffType.burn],
          conditionMultiplying: 800,
        },
        5: {
          sp: 0,
          cd: 0,
          multiplying: 550,
          condition: [dotBuffType.burn],
          conditionMultiplying: 850,
        },
      },
      // 技能觉醒效果
      skillPotentials: {
        potentials1: {
          sp: 1,
          description: 'SP消耗减少1',
        },
        potentials2: {
          cd: -2,
          description: '冷却时间减少2次',
        },
        potentials3: {
          description: '范围增加',
          scope: [
            [-1, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
          ], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]
        },
      },
      // 服装能力
      ability: {
        Permanent: {
          // 通用属性
          PATK: 5.2, // 百分比攻击力
        },
        Bonding: {
          // 绑定属性
          PHP: 17, // 百分比生命值
          CDMG: 47.2, // 百分比攻击力
          DEF: 5, // 百分比攻击力
        },
      },
    },
  },
}

export default liatris
