// 公会战 boss 示例数据（5×5 场地）
// 结构对齐 warcraftData，技能队列 3 个，skill_3 为必杀技（kill: true）
const guildDemo: warcraftData = {
  name: 'guildDemo',
  cName: '公会战boss示例',
  element: 'dark',
  attackAttribute: 'atk', // 攻击属性 matk 魔法 atk为物理
  attackType: 'front', // 攻击类型 front为最前 skip为跳过
  attributeResistance: 0,
  sp: 4, // 魔兽每回合回复sp
  // boss 场地坐标位置（5×5 场地）
  scope: [
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  // 弱点位置
  scopeWeaknesses: [
    {
      weaknesses: 200, // 弱点倍率
      scope: [
        // 弱点范围
        [0, 2],
      ],
    },
    {
      weaknesses: 300, // 弱点倍率
      scope: [
        // 弱点范围
        [2, 2],
      ],
    },
  ],
  // boss 技能（3种，按队列顺序循环施放）
  Skill: [
    {
      name: 'skill_1',
      cname: '暗影突袭',
      scope: [[0, 0]],
      description: '攻擊敵人6次·每次攻擊時·造成相當於自身攻擊力50%的物理傷害',
      multiplying: 50,
      chain: 6,
    },
    {
      name: 'skill_2',
      cname: '黑暗斩击',
      scope: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      fixed: 1,
      description: '對敵人造成相當於自身攻擊力500%的物理傷害·2回合期間·對敵人套用連鎖強化1。',
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
      cname: '灭世审判',
      scope: [],
      description: '解除套用於敵人的有益效果·使敵人立即死亡',
      multiplying: 0,
      chain: 1,
      kill: true, // 必杀技标记：释放后当前队伍全灭，boss 技能队列重置
    },
  ],
  // boss 特殊技能
  specialSkill: [
    {
      name: 'special_1',
      cname: '黑暗降临',
      scope: [],
      chain: 1,
      condition: {
        minChainCount: 7,
      },
      description:
        '在任何部位疊加7以上連鎖時發動該技能。該技能每個出戰隊伍最多可發動1次。對敵人造成相當於自身攻擊力200%的物理傷害。10回合期間·敵人的攻擊力或魔法力將根據敵人的攻擊類型增加100%。10回合期間·敵人的致命率增加50%。',
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

export default guildDemo
