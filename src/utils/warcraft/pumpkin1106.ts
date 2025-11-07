const pumpkin1106 = {
  name: 'pumpkin1106',
  cName: '南瓜幽灵塔尼亚',
  element: 'light',
  attributeResistance: 0,
  sp: 4, // 魔兽每回合回复sp
  // 魔兽坐标位置
  scope: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  // 弱点位置
  scopeWeaknesses: [
    {
      weaknesses: 100, // 弱点倍率
      scope: [
        //弱点范围
        [1, 2],
        [1, 3],
      ],
    },
  ],
  // 魔兽技能
  Skill: {},
  // 魔兽特殊技能
  specialSkill: {},
}

export default pumpkin1106
