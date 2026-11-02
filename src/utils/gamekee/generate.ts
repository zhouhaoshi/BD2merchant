import type { ParsedCharacter, ParsedSkill, ParsedSkillLevel } from './types'

// ==================== 描述扫描（loen.ts 风格占位符 + 分级 effect） ====================

type BuffScope = 'self' | 'allies'
type DotKind = 'bleed' | 'burn' | 'poison' | 'rot'
type WeaknessType = 'weakness' | 'fragility'

/** 解析出来的技能数值 */
interface SkillEffectData {
  chain: number
  multiplying: number
  extraMultiplying: number
  mainMultiplying: number
  threeMultiplying: number
  lifemanship: number
  spNumber: number
  spExtraMultiplying: number
  repelling?: { direction?: number[]; distance: number; multiplying: number }
  buffs: ExtractedBuff[]
  deBuffs: ExtractedDeBuff[]
  dotBuffs: ExtractedDotBuff[]
  hitBuffs: ExtractedHitBuff[]
  spAdds: number[]
  /** 描述里识别到但无法结构化的效果说明，生成时写成 TODO 注释 */
  notes: string[]
  /** 结构存疑的提示，人工复核 */
  uncertain: string[]
}

interface ExtractedBuff {
  fields: Record<string, number>
  attribute?: 'atk' | 'matk'
  duration: number
  scope: BuffScope
}

interface ExtractedDeBuff {
  fields: Record<string, number>
  attribute?: 'atk' | 'matk'
  attributeElement?: 'light' | 'dark' | 'fire' | 'wind' | 'water'
  type?: WeaknessType
  duration: number
}

interface ExtractedDotBuff {
  type: DotKind
  fields: Record<string, number>
  duration: number
}

interface ExtractedHitBuff {
  target: 'friendly' | 'enemy'
  fields: Record<string, number>
}

interface ScanContext {
  effect: SkillEffectData
  /** 表里有 SP恢复 列时 special[0] 已被占用 */
  spOffset: number
  /** 最近一次出现的「N回合」时长，规则没抓到自身持续回合时兜底用 */
  carriedDuration: number
  newBuff(fields: Record<string, number>, duration: number, scope: BuffScope, attribute?: 'atk' | 'matk'): number
  newDeBuff(
    fields: Record<string, number>,
    duration: number,
    attribute?: 'atk' | 'matk',
    attributeElement?: 'light' | 'dark' | 'fire' | 'wind' | 'water',
    type?: WeaknessType,
  ): number
  newDotBuff(type: DotKind, fields: Record<string, number>, duration: number): number
  newHitBuff(target: 'friendly' | 'enemy', fields: Record<string, number>): number
}

const DOT_KIND: Record<string, DotKind> = {
  出血: 'bleed',
  灼伤: 'burn',
  烧伤: 'burn',
  中毒: 'poison',
  腐烂: 'rot',
}

const REPELLING_DIRECTION: Record<string, number[]> = {
  后方: [0, -1],
  前方: [0, 1],
  左方: [-1, 0],
  右方: [1, 0],
}

const ELEMENT: Record<string, 'light' | 'dark' | 'fire' | 'wind' | 'water'> = {
  光属性: 'light',
  暗属性: 'dark',
  火属性: 'fire',
  水属性: 'water',
  风属性: 'wind',
}

const createContext = (level: ParsedSkillLevel): ScanContext => {
  const effect: SkillEffectData = {
    chain: 0,
    multiplying: 0,
    extraMultiplying: 0,
    mainMultiplying: 0,
    threeMultiplying: 0,
    lifemanship: 0,
    spNumber: 0,
    spExtraMultiplying: 0,
    buffs: [],
    deBuffs: [],
    dotBuffs: [],
    hitBuffs: [],
    spAdds: [],
    notes: [],
    uncertain: [],
  }
  return {
    effect,
    spOffset: level.spRecover ? 1 : 0,
    carriedDuration: 0,
    newBuff: (fields, duration, scope, attribute) => {
      effect.buffs.push({ fields, duration, scope, attribute })
      return effect.buffs.length - 1
    },
    newDeBuff: (fields, duration, attribute, attributeElement, type) => {
      effect.deBuffs.push({ fields, duration, attribute, attributeElement, type })
      return effect.deBuffs.length - 1
    },
    newDotBuff: (type, fields, duration) => {
      effect.dotBuffs.push({ type, fields, duration })
      return effect.dotBuffs.length - 1
    },
    newHitBuff: (target, fields) => {
      effect.hitBuffs.push({ target, fields })
      return effect.hitBuffs.length - 1
    },
  }
}

interface ScanRule {
  re: RegExp
  apply: (m: RegExpExecArray, ctx: ScanContext) => string
}

/** 匹配里带「N回合内，」时拼出 duration 占位符，path 形如 'buff/0/' */
const durPrefix = (m: RegExpExecArray, group: number, ctx: ScanContext, path: string): string =>
  m[group] ? `&-effect/${path}duration-&回合内，` : ''

const num = (text: string | undefined): number => (text ? Number(text) : 0)

/** 描述 -> 结构化 effect 的扫描规则，命中时把数值换成 &-effect/...-& 占位符 */
const SCAN_RULES: ScanRule[] = [
  // 先发制人标记：本身不是数值，命中后保留原文
  {
    re: /【?先发制人】?/g,
    apply: (m, ctx) => {
      ctx.effect.lifemanship = 1
      return m[0]
    },
  },
  // 条件伤害（若…则改为…）：整句保留原文，数值不结构化，交给人工
  {
    re: /若[^。；\n]{0,70}?(?:则改为|则在|，则|则)[^。；\n]{0,50}/g,
    apply: (m, ctx) => {
      ctx.effect.notes.push(`条件效果未结构化：${m[0]}`)
      return m[0]
    },
  },
  // 每层叠加的持续伤害（必须在倍率规则之前，句子里也有「造成相当于」）
  {
    re: /(?:(\d+)回合内，)?对敌人应用每层叠加造成相当于(自身(?:攻击力|魔法力)|敌人(?:攻击力|魔法力))(\d+(?:\.\d+)?)%(的)?((?:物理|魔法))?伤害的(出血|灼伤|烧伤|中毒)叠加效果/g,
    apply: (m, ctx) => {
      const kind = DOT_KIND[m[6]] || 'poison'
      const i = ctx.newDotBuff(kind, { dotMultiplying: num(m[3]), dotbuffNumber: 1 }, num(m[1]) || ctx.carriedDuration || 99)
      return `${durPrefix(m, 1, ctx, `dotBuff/${i}/`)}对敌人应用每层叠加造成相当于${m[2]}&-effect/dotBuff/${i}/dotMultiplying-&${m[4]}${m[5]}伤害的${m[6]}叠加效果`
    },
  },
  // 普通持续伤害
  {
    re: /(?:(\d+)回合内，)?对敌人应用造成相当于(自身(?:攻击力|魔法力)|敌人(?:攻击力|魔法力))(\d+(?:\.\d+)?)%(的)?((?:物理|魔法))?伤害的(出血|灼伤|烧伤|中毒)效果/g,
    apply: (m, ctx) => {
      const kind = DOT_KIND[m[6]] || 'poison'
      const i = ctx.newDotBuff(kind, { dotMultiplying: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99)
      return `${durPrefix(m, 1, ctx, `dotBuff/${i}/`)}对敌人应用造成相当于${m[2]}&-effect/dotBuff/${i}/dotMultiplying-&${m[4]}${m[5]}伤害的${m[6]}效果`
    },
  },
  // 「N回合期间，每回合根据目标攻击力…」的中毒式持续伤害
  {
    re: /(\d+)回合期间，每回合根据目标攻击力的(\d+(?:\.\d+)?)%对其造成物理伤害/g,
    apply: (m, ctx) => {
      const i = ctx.newDotBuff('poison', { dotMultiplying: num(m[2]) }, num(m[1]))
      return `&-effect/dotBuff/${i}/duration-&回合期间，每回合根据目标攻击力的&-effect/dotBuff/${i}/dotMultiplying-&%对其造成物理伤害`
    },
  },
  // 最多可叠加层数（挂在最近一个持续伤害上）
  {
    re: /((?:并且)?最多可(?:赋予)?叠加(?:至)?)(\d+)(层?[^。；]{0,4})/g,
    apply: (m, ctx) => {
      const last = ctx.effect.dotBuffs[ctx.effect.dotBuffs.length - 1]
      if (!last) return m[0]
      last.fields.maxNumber = num(m[2])
      return `${m[1]}&-effect/dotBuff/${ctx.effect.dotBuffs.length - 1}/maxNumber-&${m[3]}`
    },
  },
  // 技能倍率：造成相当于自身攻击力X%…
  {
    re: /(造成相当于)(自身(?:攻击力|魔法力|最大生命力|当前生命力|生命力)|敌人最大生命力)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[3])
      return `${m[1]}${m[2]}&-effect/multiplying-&${m[4]}`
    },
  },
  // 技能倍率：根据自己攻击力的X%造成伤害
  {
    re: /(根据自己(?:攻击力|魔法力)的)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[2])
      return `${m[1]}&-effect/multiplying-&${m[3]}`
    },
  },
  // 技能倍率：每次攻击时造成自身魔法力X%的魔法伤害（无「相当于」）
  {
    re: /(每次攻击时造成)(自身(?:攻击力|魔法力))(?:的)?(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.multiplying = num(m[3])
      return `${m[1]}${m[2]}&-effect/multiplying-&${m[4]}`
    },
  },
  // 每命中一个目标，伤害量增加X%
  {
    re: /(每命中一个目标，伤害量增加)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.extraMultiplying = num(m[2])
      return `${m[1]}&-effect/extraMultiplying-&${m[3]}`
    },
  },
  // 每额外消耗N点SP，伤害提升X%
  {
    re: /(每额外消耗)(\d+)(点SP，伤害提升)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      ctx.effect.spNumber = num(m[2])
      ctx.effect.spExtraMultiplying = num(m[4])
      return `${m[1]}&-effect/spNumber-&${m[3]}&-effect/spExtraMultiplying-&${m[5]}`
    },
  },
  // 连锁次数
  {
    re: /(攻击敌人)(\d+)(次)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2])
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0]
    },
  },
  {
    re: /(对敌人进行)(\d+)(次攻击)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2])
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0]
    },
  },
  {
    re: /(攻击)(\d+)(次)/g,
    apply: (m, ctx) => {
      ctx.effect.chain = num(m[2])
      return ctx.effect.chain > 1 ? `${m[1]}&-chain-&${m[3]}` : m[0]
    },
  },
  // 受击触发：为自己附加攻击力增加（阿奇拉战场狂喜式）
  {
    re: /(?:(\d+)回合内，)?自身受到攻击时，为自己附加持续(\d+)回合攻击力增加(\d+(?:\.\d+)?)%的效果/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ hit: 1 }, num(m[1]) || ctx.carriedDuration || 99, 'self')
      const j = ctx.newHitBuff('friendly', { duration: num(m[2]), attackAdd: num(m[3]) })
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}自身受到攻击时，为自己附加持续&-effect/hitBuff/${j}/duration-&回合攻击力增加&-effect/hitBuff/${j}/attackAdd-&%的效果`
    },
  },
  // 叠加层数（挂在最近一个受击 buff 上）
  {
    re: /(此效果叠加至)(\d+)(。最多可叠加至)(\d+)(。)/g,
    apply: (m, ctx) => {
      const last = ctx.effect.hitBuffs[ctx.effect.hitBuffs.length - 1]
      if (!last) return m[0]
      const index = ctx.effect.hitBuffs.length - 1
      last.fields.increasingNumber = num(m[2])
      last.fields.maxNumber = num(m[4])
      return `${m[1]}&-effect/hitBuff/${index}/increasingNumber-&${m[3]}&-effect/hitBuff/${index}/maxNumber-&${m[5]}`
    },
  },
  // 受击触发：当前服装冷却时间减少
  {
    re: /(?:(\d+)回合内，)?自身受到攻击时，当前服装的冷却时间减少(\d+)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ hit: 1 }, num(m[1]) || ctx.carriedDuration || 99, 'self')
      const j = ctx.newHitBuff('friendly', { cdReduce: num(m[2]) })
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}自身受到攻击时，当前服装的冷却时间减少&-effect/hitBuff/${j}/cdReduce-&`
    },
  },
  // 反击：开启 / 反击伤害 / 反击次数
  {
    re: /(?:(\d+)回合内，)?(自身遭受攻击时，将进行反击)/g,
    apply: (m, ctx) => {
      ctx.newBuff({ hit: 1 }, num(m[1]) || 99, 'self')
      return m[0]
    },
  },
  {
    re: /(每次反击时，对敌人(?:全体)?造成相当于)(自身攻击力|承受伤害)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newHitBuff('enemy', { hitMultiplying: num(m[3]) })
      return `${m[1]}${m[2]}&-effect/hitBuff/${i}/hitMultiplying-&${m[4]}`
    },
  },
  {
    re: /(此效果在遭受)(\d+)(次攻击后将消失)/g,
    apply: (m, ctx) => {
      const last = ctx.effect.hitBuffs[ctx.effect.hitBuffs.length - 1]
      if (!last) return m[0]
      last.fields.triggerCount = num(m[2])
      return `${m[1]}&-effect/hitBuff/${ctx.effect.hitBuffs.length - 1}/triggerCount-&${m[3]}`
    },
  },
  // 击退与碰撞伤害
  {
    re: /((?:并将目标|将目标)向(后方|前方|左方|右方)击退)(\d+)(格)/g,
    apply: (m, ctx) => {
      const repelling = (ctx.effect.repelling ||= { distance: 0, multiplying: 0 })
      repelling.direction = REPELLING_DIRECTION[m[2]]
      repelling.distance = num(m[3])
      return `${m[1]}&-effect/repellingDistance-&${m[4]}`
    },
  },
  {
    re: /(向(后方|前方|左方|右方)击退)(\d+)(格)/g,
    apply: (m, ctx) => {
      const repelling = (ctx.effect.repelling ||= { distance: 0, multiplying: 0 })
      repelling.direction = REPELLING_DIRECTION[m[2]]
      repelling.distance = num(m[3])
      return `${m[1]}&-effect/repellingDistance-&${m[4]}`
    },
  },
  {
    re: /(对被撞击的敌人造成相当于(?:被推开)?目标最大生命力)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const repelling = (ctx.effect.repelling ||= { distance: 0, multiplying: 0 })
      repelling.multiplying = num(m[2])
      return `${m[1]}&-effect/repellingMultiplying-&${m[3]}`
    },
  },
  // 自身攻击/魔法力增加
  {
    re: /(?:(\d+)回合内，)?自身(攻击力|魔法力)(增加|提升|上升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'self', m[2] === '魔法力' ? 'matk' : 'atk')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}自身${m[2]}${m[3]}&-effect/buff/${i}/attackAdd-&%`
    },
  },
  // 友军攻击/魔法力增加
  {
    re: /(?:(\d+)回合内，)?友军的(攻击力|魔法力)(增加|提升|上升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies', m[2] === '魔法力' ? 'matk' : 'atk')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}友军的${m[2]}${m[3]}&-effect/buff/${i}/attackAdd-&%`
    },
  },
  // 友军的攻击力或魔法力将根据各自攻击类型增加X%
  {
    re: /(?:(\d+)回合内，)?友军的攻击力或魔法力将根据各自攻击类型(增加|提升|提高)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attackAdd: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}友军的攻击力或魔法力将根据各自攻击类型${m[2]}&-effect/buff/${i}/attackAdd-&%`
    },
  },
  // 对自身应用攻击力增加X%的效果
  {
    re: /(对自身应用)(攻击力|魔法力|爆伤|暴击伤害|致命伤害|致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)(%的效果)/g,
    apply: (m, ctx) => {
      const kind = m[2]
      let fields: Record<string, number>
      let attribute: 'atk' | 'matk' | undefined
      if (kind === '攻击力' || kind === '魔法力') {
        fields = { attackAdd: num(m[4]) }
        attribute = kind === '魔法力' ? 'matk' : 'atk'
      } else if (kind === '致命率' || kind === '暴击率') {
        fields = { CRAdd: num(m[4]) }
      } else {
        fields = { critical: num(m[4]) }
      }
      const i = ctx.newBuff(fields, ctx.carriedDuration || 99, 'self', attribute)
      return `${m[1]}${m[2]}${m[3]}&-effect/buff/${i}/${Object.keys(fields)[0]}-&${m[5]}`
    },
  },
  // 友军/自身致命率（暴击率）
  {
    re: /(?:(\d+)回合内，)?友军的(致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ CRAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}友军的${m[2]}${m[3]}&-effect/buff/${i}/CRAdd-&%`
    },
  },
  {
    re: /(?:(\d+)回合内，)?自身(致命率|暴击率)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ CRAdd: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'self')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}自身${m[2]}${m[3]}&-effect/buff/${i}/CRAdd-&%`
    },
  },
  // 致命伤害（爆伤）
  {
    re: /(?:(\d+)回合内，)?友军的(爆伤|暴击伤害|致命伤害)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ critical: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}友军的${m[2]}${m[3]}&-effect/buff/${i}/critical-&%`
    },
  },
  {
    re: /(?:(\d+)回合内，)?自身(爆伤|暴击伤害|致命伤害)(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ critical: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, 'self')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}自身${m[2]}${m[3]}&-effect/buff/${i}/critical-&%`
    },
  },
  // 属性伤害
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)([火水风光暗])?属性伤害(增加|提升)(\d+(?:\.\d+)?)%/g,
    apply: (m, ctx) => {
      const field = m[3] === '光' ? 'lightAttributeDamage' : 'attributeDamage'
      const i = ctx.newBuff({ [field]: num(m[5]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === '自身' ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3] || ''}属性伤害${m[4]}&-effect/buff/${i}/${field}-&%`
    },
  },
  // 使自身属性伤害在N回合内增加X%
  {
    re: /((?:使自身属性伤害|自身属性伤害)在)(\d+)(回合内(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ attributeDamage: num(m[4]) }, num(m[2]), 'self')
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/attributeDamage-&${m[5]}`
    },
  },
  // 伤害增加 / 伤害减少
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)((?:造成的)?伤害(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === '自身' ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`
    },
  },
  {
    re: /(?:(\d+)回合内，)?(自身|友军的)((?:受到的)?伤害(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ damageReduction: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2] === '自身' ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3]}&-effect/buff/${i}/damageReduction-&${m[5]}`
    },
  },
  // 增强效果（伤害增加）的各种句式
  {
    re: /(为下一名攻击的友军施加增强效果，持续)(\d+)(回合，使其造成的伤害增加)(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), 'allies')
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`
    },
  },
  {
    re: /(对友军应用在)(\d+)(回合内，施加伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), 'allies')
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`
    },
  },
  {
    re: /(对自己在)(\d+)(回合内，应用施加伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[4]) }, num(m[2]), 'self')
      return `${m[1]}&-effect/buff/${i}/duration-&${m[3]}&-effect/buff/${i}/increasedDamage-&${m[5]}`
    },
  },
  {
    re: /(\d+)(回合内，对友军应用攻击连携叠加\d+或以上的敌人时，施加的伤害增加)(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[3]) }, num(m[1]), 'allies')
      return `&-effect/buff/${i}/duration-&${m[2]}&-effect/buff/${i}/increasedDamage-&${m[4]}`
    },
  },
  {
    re: /(?:(\d+)回合内，)?对友军应用(\d+(?:\.\d+)?)(%的增强效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ increasedDamage: num(m[2]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}对友军应用&-effect/buff/${i}/increasedDamage-&${m[3]}`
    },
  },
  // 能量护盾
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用相当于|光环效果内友军应用相当于)(?:各自自身)?(?:最大生命力|攻击力|魔法力))(\d+(?:\.\d+)?)(%的能量护盾效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ shield: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes('自己') ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/shield-&${m[4]}`
    },
  },
  // 防护罩
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用|对光环效果内友军应用))((?:物理|魔法))?(\d+(?:\.\d+)?)(%的防护罩(?:效果)?)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ damageReduction: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes('自己') ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}${m[3] || ''}&-effect/buff/${i}/damageReduction-&${m[5]}`
    },
  },
  // 挑衅（自己/友军身上，值恒为 1 不占位）
  {
    re: /(?:(\d+)回合内，)?((?:对(?:自己|友军)应用|对自身应用))(?:挑衅|嘲讽)(?:效果)?/g,
    apply: (m, ctx) => {
      ctx.newBuff({ provocation: 1 }, num(m[1]) || ctx.carriedDuration || 99, m[2].includes('自己') || m[2].includes('自身') ? 'self' : 'allies')
      return m[0]
    },
  },
  // 先发制人闪避次数
  {
    re: /(自身成功闪避敌人)(\d+)(次前)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ sidestep: num(m[2]) }, 99, 'self')
      return `${m[1]}&-effect/buff/${i}/sidestep-&${m[3]}`
    },
  },
  // SP消耗减少
  {
    re: /(?:(\d+)回合内，)?(对友军应用SP消耗减少)(\d+)(的效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ spReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99, 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/spReduce-&${m[4]}`
    },
  },
  // 恢复生命力（持续回合结束时恢复 / 立即恢复）
  {
    re: /(?:(\d+)回合内，)?((?:每回合结束时，)?恢复(?:自身|友军)相当于(?:自身|友军)?(?:各自自身)?(?:当前生命力|最大生命力|攻击力|魔法力)(?:的)?)(\d+(?:\.\d+)?)(%的生命力)/g,
    apply: (m, ctx) => {
      const i = ctx.newBuff({ HPAdd: num(m[3]) }, num(m[1]) || 0, m[2].startsWith('恢复自身') ? 'self' : 'allies')
      return `${durPrefix(m, 1, ctx, `buff/${i}/`)}${m[2]}&-effect/buff/${i}/HPAdd-&${m[4]}`
    },
  },
  // 命中触发：友军 SP 恢复
  {
    re: /(每次攻击命中敌人时，友军的SP恢复)(\d+)(点)/g,
    apply: (m, ctx) => {
      const i = ctx.newHitBuff('friendly', { spAdd: num(m[2]) })
      return `${m[1]}&-effect/hitBuff/${i}/spAdd-&${m[3]}`
    },
  },
  // 直接 SP 恢复（表里已有 SP恢复 列时指向 special[0]）
  {
    re: /((?:友军|自身)的SP恢复)(\d+)(点)/g,
    apply: (m, ctx) => {
      let index: number
      if (ctx.spOffset) {
        index = 0
      } else {
        ctx.effect.spAdds.push(num(m[2]))
        index = ctx.effect.spAdds.length - 1
      }
      return `${m[1]}&-effect/special/${index}/spAdd-&${m[3]}`
    },
  },
  // 防御/魔抗/攻击力降低
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?防御力(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ DEFReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99)
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/DEFReduce-&${m[4]}`
    },
  },
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?(?:魔法抵抗|魔抗)(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ MRESReduce: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99)
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/MRESReduce-&${m[4]}`
    },
  },
  {
    re: /(?:(\d+)回合内，)?((?:敌人|目标)的?(攻击力|魔法力)(?:减少|降低))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ attackReduce: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, m[3] === '魔法力' ? 'matk' : 'atk')
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/attackReduce-&${m[5]}`
    },
  },
  // 虚弱（物理/魔法前缀是脆弱类，属性前缀是属性虚弱）
  {
    re: /(?:(\d+)回合内，)?((?:对(?:主要目标)?敌人应用|应用))((?:物理|魔法|光属性|暗属性|火属性|水属性|风属性)?)(\d+(?:\.\d+)?)(%的?(?:虚弱|虚弱效果)(?:效果)?)/g,
    apply: (m, ctx) => {
      const main = m[2].includes('主要目标')
      const attrPrefix = m[3] === '物理' || m[3] === '魔法' ? m[3] : ''
      const field = main ? 'mainEnemyWeakness' : 'enemyWeakness'
      const i = ctx.newDeBuff(
        { [field]: num(m[4]) },
        num(m[1]) || ctx.carriedDuration || 99,
        attrPrefix === '魔法' ? 'matk' : attrPrefix === '物理' ? 'atk' : undefined,
        ELEMENT[m[3]],
        attrPrefix ? 'fragility' : 'weakness',
      )
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/${field}-&${m[5]}`
    },
  },
  // 脆弱
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用|应用))((?:物理|魔法)?)(\d+(?:\.\d+)?)(%的?脆弱(?:效果)?)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff(
        { enemyWeakness: num(m[4]) },
        num(m[1]) || ctx.carriedDuration || 99,
        m[3] === '魔法' ? 'matk' : m[3] === '物理' ? 'atk' : undefined,
        undefined,
        'fragility',
      )
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/enemyWeakness-&${m[5]}`
    },
  },
  // 受到的伤害增加（易伤）
  {
    re: /(?:(\d+)回合内，)?([^。；\n]{0,10}?)((?:受到|承受)(?:的)?伤害(?:增加|提升))(\d+(?:\.\d+)?)(%)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ enemyWeakness: num(m[4]) }, num(m[1]) || ctx.carriedDuration || 99, undefined, undefined, 'weakness')
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}${m[3]}&-effect/deBuff/${i}/enemyWeakness-&${m[5]}`
    },
  },
  // 受到的连携伤害增加
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用)受到的连携伤害增加)(\d+(?:\.\d+)?)(%的效果)/g,
    apply: (m, ctx) => {
      const i = ctx.newDeBuff({ chainDamageAdd: num(m[3]) }, num(m[1]) || ctx.carriedDuration || 99)
      return `${durPrefix(m, 1, ctx, `deBuff/${i}/`)}${m[2]}&-effect/deBuff/${i}/chainDamageAdd-&${m[4]}`
    },
  },
  // 沉默
  {
    re: /(?:(\d+)回合内，)?((?:对敌人应用)沉默(?:效果)?)/g,
    apply: (m, ctx) => {
      ctx.newDeBuff({ silence: 1 }, num(m[1]) || ctx.carriedDuration || 99)
      return m[0]
    },
  },
  // 兜底：任何「N回合」，更新持续回合记录
  {
    re: /(\d+)回合内?/g,
    apply: (m, ctx) => {
      ctx.carriedDuration = num(m[1])
      return m[0]
    },
  },
]

/** 未匹配段落里出现这些关键词时写进 TODO 注释 */
const NOTE_KEYWORDS = [
  '召唤',
  '标记',
  '集中射击',
  '复活',
  '免疫',
  '解除',
  '叠加',
  '连携',
  'SP减少',
  '冻伤',
  '领域',
  '光环',
  '印记',
  '暴走',
  '吸收',
  '冷却时间',
  '攻击顺序',
  '受到攻击',
  '遭受攻击',
  '变身',
  '概率',
  '嘲讽',
  '挑衅',
  '反击',
  '使用相当于',
  '消耗自身',
  '生命值',
  '虚弱',
  '持续伤害',
  '击退',
  '正在冷却',
  '自爆',
  '噩梦',
  '额外造成',
]

/** 扫描一段描述：数值结构化进 ctx.effect，文本换成 loen 式占位符 */
const scanDescription = (description: string, ctx: ScanContext): string => {
  const matches: { rule: ScanRule; m: RegExpExecArray; start: number; end: number }[] = []
  for (const rule of SCAN_RULES) {
    rule.re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = rule.re.exec(description))) {
      if (!m[0]) {
        rule.re.lastIndex++
        continue
      }
      matches.push({ rule, m, start: m.index, end: m.index + m[0].length })
    }
  }
  matches.sort((a, b) => a.start - b.start || b.end - a.end)

  let out = ''
  let pos = 0
  const unmatched: string[] = []
  for (const item of matches) {
    if (item.start < pos) continue
    if (item.start > pos) {
      const segment = description.slice(pos, item.start)
      unmatched.push(segment)
      out += segment
    }
    out += item.rule.apply(item.m, ctx)
    pos = item.end
  }
  const tail = description.slice(pos)
  unmatched.push(tail)
  out += tail

  for (const segment of unmatched) {
    for (const clause of segment.split(/[。；\n]/)) {
      const trimmed = clause.trim()
      if (!trimmed) continue
      const matched = NOTE_KEYWORDS.some((keyword) => trimmed.includes(keyword))
      if (matched || /(增加|减少|提升|降低|恢复|赋予|施加|应用)/.test(trimmed)) {
        ctx.effect.notes.push(trimmed.length > 40 ? `${trimmed.slice(0, 40)}…` : trimmed)
      }
    }
  }
  return out
}

/** 从技能描述里抽取数值结构（页面预览用，无 SP恢复 列上下文） */
export const extractSkillEffect = (description: string): SkillEffectData => {
  const ctx = createContext({ label: '+0', sp: 0, cd: 0, description })
  scanDescription(description, ctx)
  if (!ctx.effect.multiplying && /伤害/.test(description)) {
    ctx.effect.uncertain.push('没有解析到技能倍率')
  }
  if (!ctx.effect.chain) ctx.effect.uncertain.push('没有解析到连锁次数')
  if (!ctx.effect.buffs.length && !ctx.effect.deBuffs.length && !ctx.effect.dotBuffs.length && /(增加|减少|恢复|免疫|解除|刷新|叠加)/.test(description)) {
    ctx.effect.uncertain.push('描述里有增益/减益关键词，但没解析成 buff')
  }
  return ctx.effect
}

// ==================== 文件生成 ====================

/** 输出成项目里的角色文件名（英文名小驼峰，没有英文名就用 char + contentId） */
export const toFileName = (ch: ParsedCharacter): string => {
  const english = (ch.name || '').trim()
  const words = english.split(/[\s_-]+/).filter(Boolean)
  if (!words.length) return `char${ch.contentId}`
  const camel = words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
  const cleaned = camel.replace(/[^a-zA-Z0-9]/g, '')
  return /^[a-zA-Z]/.test(cleaned) ? cleaned : `char${ch.contentId}`
}

const numberText = (value: number): string => {
  if (!Number.isFinite(value)) return '0'
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)))
}

const quote = (text: string): string =>
  `'${(text || '')
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/'/g, "\\'")}'`

/** prettier 按显示宽度算列数：中日韩全角字符占 2 列 */
const FULL_WIDTH =
  /[\u1100-\u115f\u2e80-\u303e\u3041-\u33ff\u3400-\u4dbf\u4e00-\u9fff\ua000-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe6f\uff00-\uff60\uffe0-\uffe6]/

const displayWidth = (text: string): number =>
  [...text].reduce((sum, char) => sum + (FULL_WIDTH.test(char) ? 2 : 1), 0)

/** 长字符串属性：整行超过 100 列就按 prettier 的习惯把值换到下一行 */
const longProp = (indent: string, key: string, value: string): string[] => {
  const line = `${indent}${key}: ${value},`
  return displayWidth(line) <= 100 ? [line] : [`${indent}${key}:`, `${indent}  ${value},`]
}

/** 技能潜力 -> 可以直接写进 skillPotentials 的字段 */
const parsePotentialField = (description: string): { key: string; value: number } | null => {
  // 带【】的、或者明确指向某个 buff 的效果，这里判断不了是第几个 buff，留 TODO
  if (/【|虚弱|噩梦|护盾|反击|连携|持续|范围增加|召唤|标记|吸收/.test(description)) return null
  const match = description.match(/(.+?)\s*([+-])\s*(\d+(?:\.\d+)?)\s*(回合|层|点)?%?/)
  if (!match) return null
  const label = match[1].trim()
  const value = Number(match[3]) * (match[2] === '-' ? -1 : 1)
  if (/^SP消耗$/.test(label)) return { key: 'sp', value: Math.abs(value) }
  if (/^冷却时间$/.test(label)) return { key: 'cd', value: -Math.abs(value) }
  if (/^(攻击力|魔法力|攻击力增加倍率|魔法力增加倍率|攻击力或魔法力增加倍率)$/.test(label)) {
    return { key: 'attackAdd', value }
  }
  if (/^(致命伤害|爆伤)$/.test(label)) return { key: 'critical', value }
  if (/^(致命率|暴击率)$/.test(label)) return { key: 'CRAdd', value }
  if (/^(伤害倍率|技能伤害|技能伤害倍率|每次攻击技能伤害|每次攻击的技能伤害|伤害量|伤害增加|伤害提升)$/.test(label)) {
    return { key: 'multiplying', value }
  }
  if (/^伤害提升倍率$/.test(label)) return { key: 'spExtraMultiplying', value }
  if (/^每命中一个目标，伤害倍率$/.test(label)) return { key: 'extraMultiplying', value }
  if (/^撞击伤害倍率$/.test(label)) return { key: 'repellingMultiplying', value }
  if (/^(增强效果倍率|造成的伤害增加)$/.test(label)) return { key: 'increasedDamage', value }
  if (/^恢复倍率$/.test(label)) return { key: 'HPAdd', value }
  if (/^防护罩$/.test(label)) return { key: 'damageReduction', value }
  if (/^(出血效果倍率|灼伤效果倍率|中毒效果倍率|持续伤害倍率)$/.test(label)) {
    return { key: 'dotMultiplying', value }
  }
  return null
}

/** 拼 skillPotentials */
const potentialsSource = (potentials: string[]): string[] => {
  const lines: string[] = []
  if (!potentials.length) {
    lines.push('        // TODO: wiki 没有技能潜力数据')
    return lines
  }
  potentials.forEach((descText, index) => {
    const linesInCell = descText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    const fields = linesInCell
      .map((line) => parsePotentialField(line))
      .filter((field): field is { key: string; value: number } => !!field)
    lines.push(`        potentials${index + 1}: {`)
    if (fields.length) {
      lines.push(`          ${fields.map((f) => `${f.key}: ${numberText(f.value)}`).join(', ')},`)
    } else {
      lines.push('          // TODO: 该潜力不是通用数值，需要在 buff/deBuff 里手工补')
    }
    lines.push(`          description: ${quote(linesInCell.join(' '))},`)
    lines.push('        },')
  })
  return lines
}

/** 拼 ability（共享能力值 / 绑定能力值） */
const abilitySource = (skill: ParsedSkill): string[] => {
  const lines: string[] = ['      ability: {']
  if (Object.keys(skill.permanent).length) {
    lines.push('        Permanent: {')
    lines.push('          // 通用属性')
    for (const [key, value] of Object.entries(skill.permanent)) {
      lines.push(`          ${key}: ${numberText(value)},`)
    }
    lines.push('        },')
  }
  if (Object.keys(skill.bonding).length) {
    lines.push('        Bonding: {')
    lines.push('          // 绑定属性')
    for (const [key, value] of Object.entries(skill.bonding)) {
      lines.push(`          ${key}: ${numberText(value)},`)
    }
    lines.push('        },')
  }
  if (!Object.keys(skill.permanent).length && !Object.keys(skill.bonding).length) {
    lines.push('        // TODO: wiki 没有填写共享/绑定能力值')
  }
  lines.push('      },')
  return lines
}

/** 目标类型：描述里明确打敌人就是 enemy，只说友军才是 friendly */
const targetOf = (skill: ParsedSkill): 'friendly' | 'enemy' => {
  const description = skill.levels[0]?.description || ''
  if (/对敌人|攻击敌人|击退|撞击|反击/.test(description)) return 'enemy'
  return /友军|我军/.test(description) ? 'friendly' : 'enemy'
}

/** 攻击范围：[] 表示全场，[[0,0]] 表示只有自己，多格时一行一个坐标 */
const scopeSource = (scope?: [number, number][], indent = '      '): string[] => {
  if (!scope) return [`${indent}scope: [[0, 0]], // TODO: 范围图没解析出来，请人工确认命中范围`]
  if (!scope.length) return [`${indent}scope: [], // 攻击访问，二维坐标系存储。范围为空就是全部`]
  if (scope.length === 1) {
    const [x, y] = scope[0]
    return [`${indent}scope: [[${x}, ${y}]], // 攻击访问，二维坐标系存储。范围为空就是全部`]
  }
  return [
    `${indent}scope: [`,
    ...scope.map(([x, y]) => `${indent}  [${x}, ${y}],`),
    `${indent}], // 攻击访问，二维坐标系存储。直接命中目标为[0,0]`,
  ]
}

/** 爆发描述里的数值单独提取（选中爆发后加算到技能数值上） */
const parseBurstFields = (description: string): Record<string, number> => {
  const fields: Record<string, number> = {}
  const damage = description.match(/伤害量\+(\d+(?:\.\d+)?)%/)
  if (damage) fields.multiplying = Number(damage[1])
  const extra = description.match(/额外伤害(?:量|倍率)\+(\d+(?:\.\d+)?)%/)
  if (extra) fields.extraMultiplying = Number(extra[1])
  const attack = description.match(/(?:攻击力|魔法力)(?:强化|增加|提升)(\d+(?:\.\d+)?)%/)
  if (attack) fields.attackAdd = Number(attack[1])
  const shield = description.match(
    /(?:(\d+(?:\.\d+)?)%[^。；]*?(?:能量护盾|护盾)|(?:能量护盾|护盾)[^。；]*?(\d+(?:\.\d+)?)%)/,
  )
  if (shield) fields.shield = Number(shield[1] || shield[2])
  const duration = description.match(/持续(\d+)回合/)
  if (duration) fields.duration = Number(duration[1])
  return fields
}

/** 拼爆发升级（爆发1/2/3），wiki 老角色没有这一区就不输出 */
const burstSource = (skill: ParsedSkill): string[] => {
  const filled = skill.burst.filter((level) => level.sp || level.description || level.scopeUrl)
  if (!filled.length) return []
  const lines: string[] = ['      // 爆发技能', '      burst: {']
  for (const level of filled) {
    lines.push(`        ${level.label.replace('爆发', 'burst')}: {`)
    lines.push(`          sp: ${numberText(level.sp)}, // 消耗SP`)
    if (level.description) {
      lines.push(...longProp('          ', 'description', quote(level.description)))
      lines.push(...emitFields(parseBurstFields(level.description), BURST_FIELD_ORDER, '          '))
    }
    if (level.scopeUrl) {
      lines.push(
        ...scopeSource(level.scope, '          ').map((line) =>
          line.replace('攻击访问', '爆发后的攻击范围'),
        ),
      )
    }
    lines.push('        },')
  }
  lines.push('      },')
  return lines
}

const BUFF_FIELD_ORDER = [
  'attackAdd',
  'critical',
  'CRAdd',
  'attributeDamage',
  'lightAttributeDamage',
  'increasedDamage',
  'damageReduction',
  'shield',
  'HPAdd',
  'hit',
  'provocation',
  'sidestep',
  'spReduce',
  'chainAddNumber',
]

const DEBUFF_FIELD_ORDER = [
  'attackReduce',
  'DEFReduce',
  'MRESReduce',
  'enemyWeakness',
  'mainEnemyWeakness',
  'chainDamageAdd',
  'silence',
  'provocation',
]

const DOT_FIELD_ORDER = ['dotMultiplying', 'dotbuffNumber', 'maxNumber']

const HIT_FIELD_ORDER = [
  'spAdd',
  'HPAdd',
  'hitMultiplying',
  'triggerCount',
  'attackAdd',
  'cdReduce',
  'increasingNumber',
  'maxNumber',
  'duration',
]

const BURST_FIELD_ORDER = ['multiplying', 'extraMultiplying', 'attackAdd', 'shield', 'duration']

const emitFields = (fields: Record<string, number>, order: string[], indent: string): string[] => {
  const lines: string[] = []
  for (const key of order) {
    if (fields[key] !== undefined) lines.push(`${indent}${key}: ${numberText(fields[key])},`)
  }
  for (const [key, value] of Object.entries(fields)) {
    if (!order.includes(key)) lines.push(`${indent}${key}: ${numberText(value)},`)
  }
  return lines
}

const emitBuffArray = (buffs: ExtractedBuff[], needsDot: { value: boolean }, needsWeakness: { value: boolean }): string[] => {
  if (!buffs.length) return []
  const lines: string[] = ['          buff: [']
  for (const buff of buffs) {
    lines.push('            {')
    lines.push(`              duration: ${numberText(buff.duration)},`)
    if (buff.attribute) lines.push(`              attribute: '${buff.attribute}',`)
    lines.push(...emitFields(buff.fields, BUFF_FIELD_ORDER, '              '))
    lines.push(`              scope: ${buff.scope === 'self' ? '[[0, 0]]' : '[]'},`)
    lines.push('            },')
  }
  lines.push('          ],')
  void needsDot
  void needsWeakness
  return lines
}

const emitDeBuffArray = (deBuffs: ExtractedDeBuff[], needsWeakness: { value: boolean }): string[] => {
  if (!deBuffs.length) return []
  const lines: string[] = ['          deBuff: [']
  for (const debuff of deBuffs) {
    lines.push('            {')
    lines.push(`              duration: ${numberText(debuff.duration)},`)
    if (debuff.attribute) lines.push(`              attribute: '${debuff.attribute}',`)
    if (debuff.attributeElement) lines.push(`              attributeElement: '${debuff.attributeElement}',`)
    if (debuff.type) {
      lines.push(`              type: enemyWeaknessDeBuffType.${debuff.type},`)
      needsWeakness.value = true
    }
    lines.push(...emitFields(debuff.fields, DEBUFF_FIELD_ORDER, '              '))
    lines.push('              scope: [],')
    lines.push('            },')
  }
  lines.push('          ],')
  return lines
}

const emitDotArray = (dotBuffs: ExtractedDotBuff[], needsDot: { value: boolean }): string[] => {
  if (!dotBuffs.length) return []
  const lines: string[] = ['          dotBuff: [']
  for (const dot of dotBuffs) {
    lines.push('            {')
    lines.push(`              type: dotBuffType.${dot.type},`)
    needsDot.value = true
    lines.push('              scope: [],')
    lines.push(`              duration: ${numberText(dot.duration)},`)
    lines.push(...emitFields(dot.fields, DOT_FIELD_ORDER, '              '))
    lines.push('            },')
  }
  lines.push('          ],')
  return lines
}

const emitHitArray = (hitBuffs: ExtractedHitBuff[]): string[] => {
  if (!hitBuffs.length) return []
  const lines: string[] = ['          hitBuff: [']
  for (const hit of hitBuffs) {
    lines.push('            {')
    lines.push('              scope: [],')
    lines.push(`              target: '${hit.target}',`)
    lines.push(...emitFields(hit.fields, HIT_FIELD_ORDER, '              '))
    lines.push('            },')
  }
  lines.push('          ],')
  return lines
}

const emitSpecialArray = (spRecover: number | undefined, spAdds: number[]): string[] => {
  const spAddsAll = [...(spRecover ? [spRecover] : []), ...spAdds]
  if (!spAddsAll.length) return []
  const lines: string[] = ['          special: [']
  for (const spAdd of spAddsAll) {
    lines.push('            {')
    lines.push(`              spAdd: ${numberText(spAdd)},`)
    lines.push('            },')
  }
  lines.push('          ],')
  return lines
}

/** 输出某一级 effect：没有数组字段时压成一行 */
const emitEffectLevel = (
  levelIndex: number,
  label: string,
  effect: SkillEffectData,
  spDelta: number,
  cdDelta: number,
  spRecover: number | undefined,
  needsDot: { value: boolean },
  needsWeakness: { value: boolean },
): string[] => {
  const parts = [
    `sp: ${numberText(spDelta)}`,
    `cd: ${numberText(cdDelta)}`,
    `multiplying: ${numberText(effect.multiplying)}`,
  ]
  if (effect.extraMultiplying) parts.push(`extraMultiplying: ${numberText(effect.extraMultiplying)}`)
  if (effect.mainMultiplying) parts.push(`mainMultiplying: ${numberText(effect.mainMultiplying)}`)
  if (effect.threeMultiplying) parts.push(`ThreeMultiplying: ${numberText(effect.threeMultiplying)}`)
  if (effect.lifemanship) parts.push(`lifemanship: ${numberText(effect.lifemanship)}`)
  if (effect.spNumber) parts.push(`spNumber: ${numberText(effect.spNumber)}`)
  if (effect.spExtraMultiplying) parts.push(`spExtraMultiplying: ${numberText(effect.spExtraMultiplying)}`)
  if (effect.repelling?.direction) parts.push(`repellingDirection: [${effect.repelling.direction.join(', ')}]`)
  if (effect.repelling?.distance) parts.push(`repellingDistance: ${numberText(effect.repelling.distance)}`)
  if (effect.repelling?.multiplying) parts.push(`repellingMultiplying: ${numberText(effect.repelling.multiplying)}`)

  const hasArrays =
    effect.buffs.length ||
    effect.deBuffs.length ||
    effect.dotBuffs.length ||
    effect.hitBuffs.length ||
    spRecover ||
    effect.spAdds.length

  if (!hasArrays) {
    return [`        ${levelIndex}: { ${parts.join(', ')} }, // ${label}`]
  }
  const lines: string[] = [`        ${levelIndex}: {`]
  for (const part of parts) lines.push(`          ${part},`)
  lines.push(...emitSpecialArray(spRecover, effect.spAdds))
  lines.push(...emitHitArray(effect.hitBuffs))
  lines.push(...emitBuffArray(effect.buffs, needsDot, needsWeakness))
  lines.push(...emitDeBuffArray(effect.deBuffs, needsWeakness))
  lines.push(...emitDotArray(effect.dotBuffs, needsDot))
  lines.push('        },')
  return lines
}

/** 拆分长 TODO 注释，保持单行不超过 100 列 */
const todoLines = (label: string, items: string[]): string[] => {
  if (!items.length) return []
  const prefix = `        // TODO ${label}：`
  const lines: string[] = []
  let current = prefix
  for (const item of items) {
    if (displayWidth(current + item + ' | ') > 100) {
      lines.push(current.replace(/ \| $/, ''))
      current = `        // ${'　'.repeat(label.length)}　`
    }
    current += `${item} | `
  }
  lines.push(current.replace(/ \| $/, ''))
  return lines
}

/** 把解析结果拼成 .ts 源码 */
export const generateCharacterFile = (ch: ParsedCharacter, fileName: string): string => {
  const key = fileName.replace(/\.ts$/, '')
  const lines: string[] = []

  lines.push('// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）')
  lines.push(`// contentId: ${ch.contentId}${ch.entryId ? ` / entryId: ${ch.entryId}` : ''}`)
  if (/^char\d+$/.test(key)) {
    lines.push('// TODO wiki 上没有英文名，文件名和 name 暂时用 contentId，请改成游戏里的角色 key')
  }
  lines.push('// 注意：技能范围 scope 由 wiki 范围图自动识别，描述与 effect 数值由描述文本解析生成，标 TODO 的地方请人工复核')
  lines.push('')

  // 先解析出全部技能，才能决定要不要 import dotBuffType / enemyWeaknessDeBuffType
  interface SkillRender {
    skill: ParsedSkill
    key: string
    template: string
    levels: { label: string; level: ParsedSkillLevel; effect: SkillEffectData }[]
    baseSp: number
    baseCd: number
  }
  const renders: SkillRender[] = ch.skills.map((skill, index) => {
    const first: ParsedSkillLevel | undefined = skill.levels[0]
    const levels = skill.levels.length === 1 && skill.levels[0].label !== '+0'
      ? Array.from({ length: 6 }, (_, levelIndex) => ({ ...skill.levels[0], label: `+${levelIndex}` }))
      : skill.levels
    const levelData = levels.map((level) => {
      const effect = extractSkillEffect(level.description)
      return { label: level.label, level, effect }
    })
    const template = levelData[0]
      ? scanDescription(levelData[0].level.description, createContext(levelData[0].level))
      : ''
    return {
      skill,
      key: `skill${index + 1}`,
      template,
      levels: levelData,
      baseSp: first?.sp || 0,
      baseCd: first?.cd || 0,
    }
  })

  const needsDot = { value: false }
  const needsWeakness = { value: false }
  for (const render of renders) {
    for (const { effect } of render.levels) {
      if (effect.dotBuffs.length) needsDot.value = true
      if (effect.deBuffs.some((debuff) => debuff.type)) needsWeakness.value = true
    }
  }
  const importParts: string[] = []
  if (needsDot.value) importParts.push('dotBuffType')
  if (needsWeakness.value) importParts.push('enemyWeaknessDeBuffType')
  if (importParts.length) {
    lines.push(`import { ${importParts.join(', ')} } from '@/utils/globals'`)
    lines.push('')
  }

  lines.push(`const ${key}: characterDataObj = {`)
  lines.push(`  name: ${quote(key)},`)
  lines.push(`  cName: ${quote(ch.cName)},`)
  lines.push(`  star: ${ch.star}, // 星级`)
  lines.push(`  element: '${ch.element}', // 元素属性 light/dark/fire/wind/water`)
  lines.push(`  attackAttribute: '${ch.attackAttribute}', // 攻击属性 matk 魔法 atk 物理`)
  lines.push(`  attackType: '${ch.attackType}', // 攻击目标 front 最前 skip 跳过`)
  if (ch.attackAttribute === 'matk') {
    lines.push(`  MATK: ${numberText(ch.MATK)}, // 魔法力`)
  } else {
    lines.push(`  ATK: ${numberText(ch.ATK)}, // 攻击力`)
  }
  lines.push(`  HP: ${numberText(ch.HP)}, // 生命值`)
  lines.push(`  DEF: ${numberText(ch.DEF)}, // 防御力`)
  lines.push(`  MRES: ${numberText(ch.MRES)}, // 魔法抵抗`)
  lines.push(`  CR: ${numberText(ch.CR)}, // 暴击率`)
  lines.push(`  CDMG: ${numberText(ch.CDMG)}, // 暴击伤害`)
  lines.push(`  DMG: ${numberText(ch.DMG)}, // 属性伤害`)
  lines.push(
    `  panel: ${numberText(ch.attackAttribute === 'matk' ? ch.MATK : ch.ATK)}, // TODO 默认面板，装备/词条加成需要另配`,
  )
  lines.push(`  critical: ${numberText(ch.CDMG)}, // 默认爆伤`)
  lines.push(`  attributeDamage: ${numberText(ch.DMG)}, // 默认属伤`)
  lines.push('  engraving: {')
  lines.push('    // 刻印')
  for (const [k, v] of Object.entries(ch.engraving)) lines.push(`    ${k}: ${numberText(v)},`)
  lines.push('  },')
  lines.push('  Awakening: {')
  lines.push('    // 觉醒')
  for (const [k, v] of Object.entries(ch.awakening)) lines.push(`    ${k}: ${numberText(v)},`)
  lines.push('  },')
  lines.push('  commonSkill: {')
  lines.push('    general: {')
  lines.push(`      name: 'general',`)
  lines.push(`      cName: '普攻',`)
  lines.push(`      target: 'enemy',`)
  lines.push(`      sp: 0,`)
  lines.push(`      cd: 0,`)
  lines.push(`      chain: 1,`)
  lines.push(`      scope: [[0, 0]],`)
  lines.push(`      image: 'https://www.souseihaku.com/common/svg/icon_atk.svg',`)
  lines.push(`      skillEffect: { multiplying: 100 },`)
  lines.push('    },')
  lines.push('  },')
  lines.push('  // 服装技能')
  lines.push('  Skill: {')
  renders.forEach(({ skill, key: skillKey, template, levels, baseSp, baseCd }) => {
    const firstEffect = levels[0]?.effect || extractSkillEffect('')
    const onlyMax = skill.levels.length === 1 && skill.levels[0].label !== '+0'

    lines.push(`    // 服装：${skill.costume} / 技能：${skill.skillName || skill.cName}`)
    if (onlyMax) lines.push('    // TODO: wiki 只给了满破数据，+0~+5 暂用满破值填充，需要人工核对')
    lines.push(`    ${skillKey}: {`)
    lines.push(`      name: '${skillKey}', // TODO: wiki 只有中文名，英文 key 需要人工命名`)
    lines.push(`      cName: ${quote(skill.cName)},`)
    lines.push(`      target: '${targetOf(skill)}',`)
    lines.push(`      sp: ${numberText(baseSp ? -baseSp : 0)},`)
    lines.push(`      cd: ${numberText(baseCd)},`)
    lines.push(`      chain: ${firstEffect.chain || 1},`)
    lines.push(...scopeSource(skill.scope))
    if (skill.art) {
      lines.push('      // 服装立绘（wiki 原图）')
      lines.push(...longProp('      ', 'image', quote(skill.art)))
    }
    if (skill.chibi) {
      lines.push('      // Q版形象（wiki 原图）')
      lines.push(...longProp('      ', 'qimage', quote(skill.chibi)))
    }
    lines.push(...longProp('      ', 'description', quote(template)))
    lines.push('      effect: {')
    levels.forEach(({ label, level, effect }, levelIndex) => {
      lines.push(
        ...emitEffectLevel(
          levelIndex,
          label,
          effect,
          baseSp - level.sp,
          level.cd - baseCd,
          level.spRecover,
          needsDot,
          needsWeakness,
        ),
      )
    })

    const noteSet = new Set<string>()
    const uncertainSet = new Set<string>()
    for (const { effect } of levels) {
      effect.notes.forEach((note) => noteSet.add(note))
      effect.uncertain.forEach((item) => uncertainSet.add(item))
    }
    const lengthMismatch = (get: (effect: SkillEffectData) => unknown[], name: string) => {
      const lengths = new Set(levels.map(({ effect }) => get(effect).length))
      if (lengths.size > 1) uncertainSet.add(`各等级 ${name} 数量不一致，请人工核对`)
    }
    lengthMismatch((effect) => effect.buffs, 'buff')
    lengthMismatch((effect) => effect.deBuffs, 'deBuff')
    lengthMismatch((effect) => effect.dotBuffs, 'dotBuff')
    lengthMismatch((effect) => effect.hitBuffs, 'hitBuff')
    lines.push(...todoLines('描述里未能识别的效果', [...noteSet]))
    lines.push(...todoLines('待人工复核', [...uncertainSet]))
    lines.push('      },')
    lines.push('      // 技能觉醒效果')
    lines.push('      skillPotentials: {')
    lines.push(...potentialsSource(skill.potentials))
    lines.push('      },')
    lines.push(...burstSource(skill))
    lines.push('      // 服装能力')
    lines.push(...abilitySource(skill))
    lines.push('    },')
  })
  lines.push('  },')
  lines.push('}')
  lines.push('')
  lines.push(`export default ${key}`)
  lines.push('')
  return lines.join('\n')
}

/** 页面预览用的摘要 */
export const summarizeCharacter = (ch: ParsedCharacter): string => {
  const parsed = extractSkillEffect(ch.skills[0]?.levels[0]?.description || '')
  return [
    `${ch.cName} / ${ch.name || '(无英文名)'}`,
    `${ch.star}星 ${ch.element} ${ch.attackAttribute} ${ch.attackType}`,
    `HP ${ch.HP} ATK ${ch.ATK} MATK ${ch.MATK} DEF ${ch.DEF} CR ${ch.CR} CDMG ${ch.CDMG} DMG ${ch.DMG}`,
    `技能 ${ch.skills.length} 个，首个技能倍率 ${parsed.multiplying}，连锁 ${parsed.chain}`,
  ].join('\n')
}

export type { SkillEffectData }
