import type { ParsedCharacter, ParsedSkill, ParsedSkillLevel } from './types'

/** 解析出来的技能数值 */
interface SkillEffectData {
  chain: number
  multiplying: number
  /** 描述里识别到的效果说明，生成时写成 TODO 注释 */
  notes: string[]
  /** 描述里出现但没被规则吃掉的关键词，提示人工复核 */
  uncertain: string[]
}

interface BuffRule {
  re: RegExp
  note: string
}

/** 描述 -> 效果说明的识别规则（只做提示，不直接生成 buff 对象） */
const BUFF_RULES: BuffRule[] = [
  { re: /自身攻击力(?:增加|提升|上升)(\d+(?:\.\d+)?)%/, note: '自身攻击力' },
  { re: /自身魔法力(?:增加|提升|上升)(\d+(?:\.\d+)?)%/, note: '自身魔法力' },
  { re: /(?:友军|我军)的?(?:攻击力|魔法力)(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '友军攻击/魔法力' },
  { re: /自身(?:爆伤|暴击伤害|致命伤害)(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '自身爆伤' },
  { re: /自身(?:致命率|暴击率)(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '自身致命率' },
  { re: /自身(?:[火水风光暗])?属性伤害(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '自身属性伤害' },
  { re: /自身(?:造成的)?伤害(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '自身增伤' },
  { re: /(?:敌人|目标)的?防御力(?:减少|降低)(\d+(?:\.\d+)?)%/, note: '减防' },
  { re: /(?:敌人|目标)的?魔法抵抗(?:减少|降低)(\d+(?:\.\d+)?)%/, note: '减魔抗' },
  { re: /(?:受到|承受)的伤害(?:增加|提升)(\d+(?:\.\d+)?)%/, note: '易伤' },
  { re: /(?:连携|连锁)强化/, note: '连携强化' },
  { re: /(?:防护罩|护盾)/, note: '护盾' },
  { re: /(?:挑衅|嘲讽)/, note: '挑衅' },
  { re: /沉默/, note: '沉默' },
  { re: /闪避/, note: '闪避' },
  { re: /反击/, note: '反击' },
  { re: /持续(?:性)?(?:伤害|烧伤|出血|中毒)/, note: '持续伤害' },
  { re: /(?:SP|sp)(?:恢复|回复|减少)/, note: 'SP变化' },
]

/** 从技能描述里抽取倍率、连锁数、可识别的效果说明 */
export const extractSkillEffect = (description: string): SkillEffectData => {
  const result: SkillEffectData = { chain: 0, multiplying: 0, notes: [], uncertain: [] }
  if (!description) return result

  const chainMatched =
    description.match(/攻击敌人(\d+)次/) || description.match(/攻击(?:敌人)?(\d+)次/)
  if (chainMatched) result.chain = Number(chainMatched[1])

  const multiplyingMatched = description.match(
    /造成相当于(?:自身(?:攻击力|魔法力|生命力|当前生命力)|敌人最大生命力)(\d+(?:\.\d+)?)%/,
  )
  if (multiplyingMatched) result.multiplying = Number(multiplyingMatched[1])

  let carriedDuration = 1
  const seen = new Set<string>()
  for (const clause of description.split(/[。；;\n]/)) {
    const trimmed = clause.trim()
    if (!trimmed) continue
    const durationMatched = trimmed.match(/(\d+)回合/)
    if (durationMatched) carriedDuration = Number(durationMatched[1])

    for (const rule of BUFF_RULES) {
      const matched = trimmed.match(rule.re)
      if (!matched || seen.has(rule.note)) continue
      seen.add(rule.note)
      const value = matched[1] ? `${matched[1]}%` : ''
      result.notes.push(`${rule.note}${value}（${carriedDuration}回合）`)
    }
  }

  if (!result.multiplying && /伤害/.test(description)) result.uncertain.push('没有解析到技能倍率')
  if (!result.chain) result.uncertain.push('没有解析到连锁次数')
  if (!result.notes.length && /(增加|减少|恢复|免疫|解除|刷新|叠加)/.test(description)) {
    result.uncertain.push('描述里有增益/减益关键词，但没解析成 buff')
  }
  return result
}

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

/** 把描述里会随突破变化的数字换成占位符，和现有角色文件保持一致 */
const toDescriptionTemplate = (description: string, effect: SkillEffectData): string => {
  let text = description
  if (effect.chain > 1) {
    text = text.replace(`攻击敌人${effect.chain}次`, '攻击敌人&-chain-&次')
  }
  if (effect.multiplying > 0) {
    text = text.replace(
      new RegExp(
        `((?:自身(?:攻击力|魔法力|生命力|当前生命力)|敌人最大生命力))${effect.multiplying}%`,
      ),
      '$1&-effect/multiplying-&%',
    )
  }
  return text
}

/** 技能潜力 -> 可以直接写进 skillPotentials 的字段 */
const parsePotentialField = (description: string): { key: string; value: number } | null => {
  // 带【】的、或者明确指向某个 buff 的效果，这里判断不了是第几个 buff，留 TODO
  if (/【|虚弱|噩梦|护盾|反击|连携|持续|范围增加/.test(description)) return null
  const match = description.match(/(.+?)\s*([+-])\s*(\d+(?:\.\d+)?)\s*%?/)
  if (!match) return null
  const label = match[1].trim()
  const value = Number(match[3]) * (match[2] === '-' ? -1 : 1)
  // 只认描述非常明确的潜力，其余交给人工补 buff/deBuff
  if (/^SP消耗$/.test(label)) return { key: 'sp', value: Math.abs(value) }
  if (/^冷却时间$/.test(label)) return { key: 'cd', value: -Math.abs(value) }
  if (/^攻击力$/.test(label)) return { key: 'attackAdd', value }
  if (/^致命伤害$|^爆伤$/.test(label)) return { key: 'critical', value }
  if (/^致命率$|^暴击率$/.test(label)) return { key: 'CRAdd', value }
  if (/^(伤害倍率|技能伤害|技能伤害倍率|每次攻击技能伤害|每次攻击的技能伤害|伤害量)$/.test(label)) {
    return { key: 'multiplying', value }
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

/** 目标类型：wiki 只给图片，默认敌人 */
const targetOf = (skill: ParsedSkill): 'friendly' | 'enemy' =>
  /友军|我军/.test(skill.levels[0]?.description || '') ? 'friendly' : 'enemy'

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

/** 把解析结果拼成 .ts 源码 */
export const generateCharacterFile = (ch: ParsedCharacter, fileName: string): string => {
  const key = fileName.replace(/\.ts$/, '')
  const lines: string[] = []

  lines.push('// 本文件由「角色抓取」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）')
  lines.push(`// contentId: ${ch.contentId}${ch.entryId ? ` / entryId: ${ch.entryId}` : ''}`)
  if (/^char\d+$/.test(key)) {
    lines.push('// TODO wiki 上没有英文名，文件名和 name 暂时用 contentId，请改成游戏里的角色 key')
  }
  lines.push(
    '// 注意：技能范围 scope 由 wiki 范围图自动识别，buff/deBuff 需要人工复核，标 TODO 的地方请补齐',
  )
  lines.push('')
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
  ch.skills.forEach((skill, index) => {
    const skillKey = `skill${index + 1}`
    const first: ParsedSkillLevel | undefined = skill.levels[0]
    const firstEffect = extractSkillEffect(first?.description || '')
    const baseSp = first?.sp || 0
    const baseCd = first?.cd || 0
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
    lines.push(
      ...longProp(
        '      ',
        'description',
        quote(toDescriptionTemplate(first?.description || '', firstEffect)),
      ),
    )
    lines.push('      effect: {')
    const levels = onlyMax
      ? Array.from({ length: 6 }, (_, levelIndex) => ({
          ...skill.levels[0],
          label: `+${levelIndex}`,
        }))
      : skill.levels
    levels.forEach((level, levelIndex) => {
      const levelEffect = extractSkillEffect(level.description)
      const spDelta = baseSp - level.sp
      const cdDelta = level.cd - baseCd
      const parts = [
        `sp: ${numberText(spDelta)}`,
        `cd: ${numberText(cdDelta)}`,
        `multiplying: ${numberText(levelEffect.multiplying)}`,
      ]
      if (level.spRecover) parts.push(`special: [{ spAdd: ${numberText(level.spRecover)} }]`)
      lines.push(`        ${levelIndex}: { ${parts.join(', ')} }, // ${level.label}`)
    })
    // 识别到的效果先写成注释，方便人工补 buff/deBuff
    const noteSet = new Set<string>()
    for (const level of levels) {
      for (const note of extractSkillEffect(level.description).notes) noteSet.add(note)
    }
    if (noteSet.size) {
      lines.push(`        // TODO 描述里识别到的效果：${[...noteSet].join(' | ')}`)
    }
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
