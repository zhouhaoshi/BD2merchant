// 伤害计算 面板 -> 攻击加成 -> 倍率 -> 易伤 -> 爆伤 -> 属伤 -> 弱点加伤 -> 连锁 // 普攻结算位置
// 游戏里的乘除计算都是每步乘除后都抹零，顺序不同，每步抹的零也不同，结果也不同。
// 面板攻击力/魔法力*(1+攻击力/魔法力加成)*(1+爆伤)*倍率*(1+易伤/脆弱+增伤)*(1-防御/魔抗)*(1+属性伤害)*(1-减伤)*(1+当前连锁数*(10%+连锁伤害加成))*(1-属性抵抗)*(1+弱点加伤)
const calculateDamage = (data: damageObj) => {
  let damage = data.panel || 0 // 面板攻击力/魔法力
  damage = getAttackAdd(damage, data)
  damage = getMultiplier(damage, data) // 倍率
  damage = getEnemyWeakness(damage, data, false) // 易伤/脆弱 + 增伤
  damage = getCritical(damage, data) // 爆伤
  damage = getAttributeDamage(damage, data) // 属伤
  damage = getWeakPointDamageAdd(damage, data) // 最后弱点加伤
  damage = getEnemyDefence(damage, data) // 抗性
  damage = getAttributeResistance(damage, data) // 属性抵抗
  damage = getAamageReduction(damage, data) // 减伤护盾
  damage = getChain(damage, data) // 连锁伤害
  return damage
}
// 连锁伤害计算函数
const getChain = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 + (data.chainCount || 0) * (0.1 + (data.chainDamageAdd || 0) / 100)) // 连锁伤害
  return integer ? Math.floor(damage) : damage
}
// 倍率伤害计算函数
const getMultiplier = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = (damage * (data.multiplier || 100)) / 100 // 倍率
  return integer ? Math.floor(damage) : damage
}
// 易伤/脆弱 + 增伤伤害计算函数
const getEnemyWeakness = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 + (data.enemyWeakness || 0) / 100 + (data.increasedDamage || 0) / 100) // 易伤/脆弱 + 增伤
  return integer ? Math.floor(damage) : damage
}
// 属伤伤害计算函数
const getAttributeDamage = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = Math.floor(damage * (1 + (data.attributeDamage || 0) / 100)) // 属伤
  return integer ? Math.floor(damage) : damage
}
// 属伤伤害计算函数
const getCritical = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 + (data.critical || 0) / 100) // 爆伤
  return integer ? Math.floor(damage) : damage
}
// 弱点加伤计算函数
const getWeakPointDamageAdd = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 + (data.weakPointDamageAdd || 0) / 100) // 最后弱点加伤
  return integer ? Math.floor(damage) : damage
}
// 弱点加伤计算函数
const getAttackAdd = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 + (data.attackAdd || 0) / 100) // 攻击力/魔法力加成
  return integer ? Math.floor(damage) : damage
}
// 减伤计算函数
const getAamageReduction = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 - (data.damageReduction || 0) / 100) // 减伤护盾
  return integer ? Math.floor(damage) : damage
}
// 护甲计算函数
const getEnemyDefence = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 - (data.enemyDefence || 0) / 100) // 抗性
  return integer ? Math.floor(damage) : damage
}
// 属性抵抗计算函数
const getAttributeResistance = (damage: number, data: damageObj, integer: boolean = true) => {
  damage = damage * (1 - (data.attributeResistance || 0) / 100) // 属性抵抗
  return integer ? Math.floor(damage) : damage
}

export default calculateDamage
