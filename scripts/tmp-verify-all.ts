// 临时验证：扫描规则 + 占位符解析 + 爆发合并 + 范围合并
import { extractSkillEffect } from '../src/utils/gamekee/generate'
import { conversionDescription, conversionScopeCommon, setPotentials, setBursts } from '../src/utils/utils'
import ancilla from '../src/utils/character/ancilla'
import venaka from '../src/utils/character/venaka'
import blade from '../src/utils/character/blade'
import type { effectObj, burstObj } from '../src/utils/character.d'

// 1. 新扫描规则：ancilla wiki +0 描述
const wikiDesc =
  '4回合内，自身受到攻击时，为自己附加持续4回合攻击力增加15%的效果。此效果叠加至1。最多可叠加至99。2回合内，自身受到攻击时，当前服装的冷却时间减少2。攻击敌人3次，每次攻击时，造成相当于自身攻击力200%的物理伤害。'
const e = extractSkillEffect(wikiDesc)
console.log('===== 1. ancilla wiki 描述扫描 =====')
console.log('chain:', e.chain, 'multiplying:', e.multiplying)
console.log('buffs:', JSON.stringify(e.buffs))
console.log('hitBuffs:', JSON.stringify(e.hitBuffs))
console.log('notes:', JSON.stringify(e.notes), 'uncertain:', JSON.stringify(e.uncertain))

// 2. ancilla.ts 占位符解析：+0 无觉醒无爆发 / +5 全觉醒全爆发
const ancillaSkill = ancilla.Skill.skill1
const pots = setPotentials(['potentials1', 'potentials2', 'potentials3'], ancillaSkill.skillPotentials)
const bursts = setBursts(['burst1', 'burst2', 'burst3'], ancillaSkill.burst as Record<string, burstObj>)
console.log('\n===== 2. ancilla 战场狂喜解析 =====')
console.log('+0 无爆发:', conversionDescription(ancillaSkill, 0, {}))
console.log('+5 满觉醒满爆发:', conversionDescription(ancillaSkill, 5, pots, bursts))
console.log('+5 只选爆发1:', conversionDescription(ancillaSkill, 5, pots, setBursts(['burst1'], ancillaSkill.burst as Record<string, burstObj>)))
console.log('scope:', JSON.stringify(ancillaSkill.scope))

// 3. venaka DJ 潜力3 范围合并
const venakaSkill = venaka.Skill.skill1
const venakaPots = setPotentials(['potentials3'], venakaSkill.skillPotentials)
console.log('\n===== 3. venaka DJ 范围合并 =====')
console.log('基础:', JSON.stringify(conversionScopeCommon(venakaSkill, 'scope', 0, {})))
console.log('+潜力3:', JSON.stringify(conversionScopeCommon(venakaSkill, 'scope', 0, venakaPots)))

// 4. blade 温泉剑客解析
const bladeSkill = blade.Skill.moonlight
const bladePots = setPotentials(['potentials1', 'potentials2', 'potentials3'], bladeSkill.skillPotentials)
console.log('\n===== 4. blade 温泉剑客 =====')
console.log('+0:', conversionDescription(bladeSkill, 0, {}))
console.log('+5 满觉醒:', conversionDescription(bladeSkill, 5, bladePots))
console.log('sp/cd +5:', -(5 - 1), '/', 5, '| scope:', JSON.stringify(bladeSkill.scope))
