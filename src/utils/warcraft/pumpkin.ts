const pumpkin1106: warcraftData = {
  name: 'pumpkin1106',
  cName: '南瓜幽灵塔尼亚',
  element: 'light',
  attackAttribute: 'matk', // 攻击属性 matk 魔法 atk为物理
  attackType: 'front', // 攻击类型 front为最前 skip为跳过
  attributeResistance: 0,
  sp: 4, // 魔兽每回合回复sp
  // 魔兽坐标位置
  scope: [
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 2],
  ],
  // 弱点位置
  scopeWeaknesses: [
    {
      weaknesses: 200, // 弱点倍率
      scope: [
        //弱点范围
        [1, 0],
      ],
    },
    {
      weaknesses: 300, // 弱点倍率
      scope: [
        //弱点范围
        [1, 2],
      ],
    },
  ],
  // 魔兽技能
  Skill: [
    {
      name: 'skill_1',
      cname: '邪焰',
      scope: [[0, 0]],
      description: '攻擊敵人6次·每次攻擊時·造成相當於自身魔法力50%的魔法傷害',
      multiplying: 50,
      chain: 6,
    },
    {
      name: 'skill_2',
      cname: '暗影斩',
      scope: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      fixed: 1,
      description:
        '對敵人造成相當於自身魔法力500%的魔法傷害·2回合期間·對敵人套用連鎖強化1。若敵人處於連鎖強化狀態·則不會再次套用連鎖強化效果.2回合期間·敵人的屬性傷害增加100%。',
      multiplying: 500,
      chain: 1,
      buff: [
        {
          duration: 2,
          scope: [],
          maxchainAddNumber: 0,
          chainAddNumber: 1,
        },
        {
          duration: 2,
          scope: [],
          attributeDamage: 100,
        },
      ],
    },
    {
      name: 'skill_3',
      cname: '渡鸦风暴',
      scope: [[0, 0]],
      description: '攻擊敵人6次·每次攻擊時·造成相當於自身魔法力50%的魔法傷害',
      multiplying: 50,
      chain: 6,
    },
    {
      name: 'skill_4',
      cname: '長袍華爾滋',
      scope: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 1],
        [2, 0],
      ],
      fixed: 1,
      description:
        '對敵人造成相當於自身魔法力500%的魔法傷害·2回合期間·對敵人套用連鎖強化1。若敵人處於連鎖強化狀態·則不會再次套用連鎖強化效果.2回合期間·敵人的屬性傷害增加100%。',
      multiplying: 500,
      chain: 1,
      buff: [
        {
          duration: 2,
          scope: [],
          maxchainAddNumber: 0,
          chainAddNumber: 1,
        },
        {
          duration: 2,
          scope: [],
          attributeDamage: 100,
        },
      ],
    },
    {
      name: 'skill_5',
      cname: '南瓜岩浆',
      scope: [],
      description: '解除套用於敵人的有益效果·使敵人立即死亡',
      multiplying: 0,
      chain: 1,
    },
  ],
  // 魔兽特殊技能
  specialSkill: [
    {
      name: 'special_1',
      cname: '不给糖就捣乱',
      scope: [],
      chain: 1,
      condition: {
        minChainCount: 6,
      },
      description:
        '在任何部位疊加7以上連鎖時發動該技能。該技能每個出戰隊伍最多可發動1次。對敵人造成相當於自身魔法力200%的魔法傷害。10回合期間·敵人的攻擊力或魔法力將根據敵人的攻擊類型增加100%。10回合期間·敵人的致命率增加50%。',
      multiplying: 200,
      buff: [
        {
          duration: 10,
          CRAdd: 50,
          scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
        },
        {
          duration: 10,
          attackAdd: 100,
          scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部
        },
      ],
    },
  ],
  levelData: {
    7: {
      hp: 939000000,
      panel: 690,
    },
    10: {
      hp: 3200000000,
      panel: 1493,
    },
    11: {
      hp: 3540000000,
      panel: 1501,
    },
    15: {
      hp: 10700000000,
      panel: 3207,
    },
  },
}

export default pumpkin1106
