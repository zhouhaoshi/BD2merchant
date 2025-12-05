export function getHoursAgo(hour: number = 8) {
  // 获取当前时间
  const now = new Date()
  // 当前时间减去 8 小时（单位是毫秒）
  const eightHoursAgo = new Date(now.getTime() - hour * 60 * 60 * 1000)
  return formatDate(eightHoursAgo)
}

export function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从0开始
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

// 需要特殊处理的对象key
export const specialKey = [
  'buff',
  'special',
  'aureole',
  'deBuff',
  'specialInjuryBuff',
  'hitBuff',
  'dotBuff',
]

// 需要特殊处理的数组key
export const scopeKey = ['scope', 'repellingDirection', 'removeBuffList', 'condition']

// 不需要处理的key
export const ignoreKey = ['cd', 'sp']

// provocation 嘲讽 silence 沉默
export const specialBuff = ['provocation', 'silence']

export function whetherIncludedSpecialBuff(obj: deBuffObj) {
  return specialBuff.some((key) => obj.hasOwnProperty(key))
}
/**
 * 查询并更新对象数组 B 中与 A 的 id 匹配的项
 * @param {Array} urlId - 源数据数组（包含要复制的值）
 * @param {Array} support - 目标数组（需要被更新）
 * @returns {Array} 返回更新后的 B 数组
 */

export function getSenceList(urlId?: string, support?: Array<string>) {
  const supportList = support?.map((item) => splicingImage(urlId, item)) || []
  return [splicingImage(urlId), ...supportList]
}

export function splicingImage(id?: string, type?: string) {
  return `https://www.souseihaku.com/maps/map_${id}${type ? `_${type}` : ''}.webp`
}

export function splicingqImage(url?: string, value: string = 'qimage') {
  return value === 'qimage'
    ? `https://www.souseihaku.com/characters/${url}.webp`
    : `https://www.souseihaku.com/characters-large/${url}.webp`
}
export function isEmpty(obj: Record<string, unknown> | warcraftData = {}) {
  return Object.keys(obj).length === 0
}
/**
 * 替换字符串中由特定分隔符包裹的路径占位符
 * @param {string} str - 需要处理的原始字符串
 * @param {object} data - 包含数据的对象，用于查找路径对应的值
 * @param {string} [prefix='&-'] - 路径占位符的前缀分隔符
 * @param {string} [suffix='-&'] - 路径占位符的后缀分隔符
 * @returns {string} - 替换后的字符串
 */
function replacePathPlaceholders(
  str: string,
  data: skillObj,
  breakthrough: number,
  potentials: effectObj = {},
  prefix = '&-',
  suffix = '-&',
) {
  // 构造正则表达式，匹配被 prefix 和 suffix 包裹的内容
  // 使用转义字符确保特殊字符在正则中能正确匹配
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`${escapedPrefix}(.*?)${escapedSuffix}`, 'g')
  // 使用 replace 方法进行全局替换
  return str.replace(regex, (match: string, path: string) => {
    // match 是完整的匹配项，例如 "&-buff/duration-&"
    // path 是括号捕获组的内容，即 "buff/duration"
    // 根据路径从 data 对象中获取值
    const value = getValueByPath(data, path.trim(), breakthrough, potentials)
    // 如果找不到对应的值，可以选择保留原占位符或替换成空字符串
    // 这里选择保留原占位符，以便于调试
    return value !== undefined ? String(Math.abs(Number(value))) : match
  })
}

/**
 * 根据路径字符串从对象中获取值
 * @param {object} obj - 源对象
 * @param {string} path - 路径，例如 "buff/duration" 或 "a.b.c"
 * @param {string} [separator='/'] - 路径分隔符
 * @returns {*} - 找到的值，如果路径不存在则返回 undefined
 */
function getValueByPath(
  obj: skillObj, // 技能对象
  path: string, // 路径字符串
  breakthrough: number = 0, // 突破等级
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  potentials: effectObj & { [key: string]: any } = {}, // 觉醒加成
  separator = '/',
) {
  if (!obj || typeof obj !== 'object' || !path) {
    return undefined
  }
  // console.log(obj, '-----------------------', path)
  const pathList = path.split(separator)
  let current: undefined | number = undefined // 用于替换的值
  let potentialsCurrent: undefined | number = undefined // 觉醒属性
  pathList.forEach((item, index) => {
    if (item in potentials) {
      if (specialKey.includes(item)) {
        // 有就处理，突破没提升就不处理
        if (potentials[item][pathList[index + 1]]) {
          const buff = potentials[item][pathList[index + 1]][pathList[pathList.length - 1]]
          potentialsCurrent = buff || 0
        }
      } else {
        potentialsCurrent = potentials[item]
      }
    }
    if (item === 'effect') {
      // 只在 effect[breakthrough] 是对象且 pathList 最后一个 key 存在时取 number
      const effectObj = obj[item]?.[breakthrough]
      current = effectObj as unknown as number | undefined
    } else if (current && typeof current === 'object' && item in current) {
      // item in current 代替 current.hasOwnProperty(item)
      current = (current as Record<string, undefined | number>)[item]
    } else if (item in obj) {
      type keys = keyof skillObj
      const keyString = item as keys
      current = obj[keyString] as number | undefined
    } else {
      current = undefined
    }
  })
  return (current || 0) + (potentialsCurrent || 0)
}

export function conversionDescription(
  skillData: skillObj, // 技能对象
  breakthrough: number = 0, // 突破等级
  potentials: effectObj = {}, // 觉醒加成
) {
  let description = skillData.description
  const potentialsObj = JSON.parse(JSON.stringify(potentials))
  // 额外能力处理
  for (const extra in potentials) {
    if (Array.isArray(potentialsObj[extra])) {
      potentialsObj[extra].forEach((item) => {
        if (!!item && item.extra === 1) {
          description = description + item.extraDescription
        }
      })
    }
  }
  return replacePathPlaceholders(description, skillData, breakthrough, potentials)
}

/**
 * 根据路径字符串从对象中获取值
 * @param {skillObj} data - 源对象
 * @param {skillObjKeys} key -
 * @param {string} potentials 觉醒值
 * @returns {*} - 找到的值，如果路径不存在则返回 undefined
 */
export function conversionCommon(
  data: skillObj,
  key: skillObjKeys,
  breakthrough: number = 0, // 突破等级
  potentials: effectObj = {},
) {
  // Ensure numeric result and use safe indexing with assertions to avoid TS index errors
  let result: number = 0
  const base = (data as never)[key] ?? 0
  const pot = (potentials as never)[key] ?? 0
  const eff = (data['effect'] as never)?.[breakthrough]?.[key] ?? 0
  result = Number(base) + Number(pot) + Number(eff)
  return Math.abs(result)
}

/**
 * 根据路径字符串从对象中获取值
 * @param {skillObj} data - 源对象
 * @param {skillObjKeys} key -
 * @param {string} potentials 觉醒值
 * @returns {*} - 找到的值，如果路径不存在则返回 undefined
 */
export function conversionScopeCommon(
  data: skillObj,
  key: skillObjKeys,
  breakthrough: number = 0, // 突破等级
  potentials: effectObj = {},
) {
  const toArray = (v: unknown) => (Array.isArray(v) ? v : v !== undefined && v !== null ? [v] : [])
  const baseArr = toArray((data as unknown as Record<string, unknown>)[key as string])
  const potArr = toArray((potentials as unknown as Record<string, unknown>)[key as string])
  // 先安全地取出 effect[breakthrough]（作为对象），再按 key 取值并传入 toArray
  const effectByBreak = (
    (data as unknown as Record<string, unknown>)['effect'] as unknown as
      | Record<number, unknown>
      | undefined
  )?.[breakthrough] as unknown as Record<string, unknown> | undefined
  const effArr = toArray(effectByBreak?.[key as string])
  return [...baseArr, ...potArr, ...(effArr || [])]
}

export function transformationCoordinates(number: number, row: number = 4) {
  return `${Math.floor(number / row)} , ${number % row}`
}

export function transformationIndex(coordinates: string | number[], row: number = 4) {
  const inexList = coordinates instanceof Array ? coordinates : coordinates.split(',')
  return +inexList[0] * row + +inexList[1]
}

export function setCharacterLocation(
  characterList: editableCharactar[],
  battleGroundList: editableCharactar[],
  column: number = 4,
  row: number = 3,
) {
  let setNumber = 0 // 已经设置的角色数量
  // 场地已有角色信息
  const groundCharacterList = battleGroundList.map((item) => (item ? `${item.name}` : undefined))
  // 0 4 8 1 5 9 2 6 10 3 7 11
  // 0 1 2 3 4 5 6 7 8 9 10 11
  characterList.forEach((item) => {
    // 队列开始位置
    let index = (setNumber % row) * column + Math.floor(setNumber / row)
    // 如果场地上没有指定角色，就新增
    if (groundCharacterList.indexOf(item.name) === -1) {
      // 如果有值则位置往后位移
      while (!!battleGroundList[index]) {
        setNumber++
        // 重新设置位置
        index = (setNumber % row) * column + Math.floor(setNumber / row)
      }
    } else {
      // 如果有指定角色就直接覆盖掉角色
      setNumber++
      index = groundCharacterList.indexOf(item.name)
    }
    battleGroundList[index] = item
    setNumber++
  })
  return battleGroundList
}
type ValueOf<T> = T[keyof T]
type warcraftBuffObjValues = ValueOf<warcraftBuffObj>

export function upsertObjectByKey(
  arr: warcraftBuffObjValues = [],
  newObj: Record<string, unknown>,
  key: userBuffObjKeys | chainDamageAddBuffObjKeys | enemyWeaknessBuffObjKeys = 'key',
) {
  const arrList = JSON.parse(JSON.stringify(arr))
  const k = String(key)
  const index = (arr as unknown as Array<Record<string, unknown>>).findIndex(
    (item) => (item as Record<string, unknown>)[k] === (newObj as Record<string, unknown>)[k],
  )
  if (index !== -1) {
    // 如果有层数
    if (!!newObj.dotbuffNumber) {
      const tempDotbuffNumber = arrList[index].dotbuffNumber || 0
      // 找到了，覆盖
      arrList[index] = newObj // 可选：合并旧值和新值；如果要完全替换，直接 arr[index] = newObj;
      arrList[index].dotbuffNumber += tempDotbuffNumber
      console.log(tempDotbuffNumber, arrList[index].dotbuffNumber, arrList)
      // 最大值
      if (!!newObj.maxNumber) {
        arrList[index].dotbuffNumber =
          arrList[index].dotbuffNumber > newObj.maxNumber
            ? newObj.maxNumber
            : arrList[index].dotbuffNumber
      }
    } else {
      // 找到了，覆盖
      arrList[index] = newObj // 可选：合并旧值和新值；如果要完全替换，直接 arr[index] = newObj;
    }
  } else {
    // 没找到，新增
    arrList.push(newObj)
  }
  return arrList // 可选：返回修改后的数组（注意这是原地修改）
}

// 处理选中的觉醒
export function setPotentials(checkList: unknown[], skillPotentials: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tempPotentials: Record<string, any> = {}
  checkList.forEach((item) => {
    const itemKey = String(item)
    const potItem = skillPotentials[itemKey]
    if (potItem && typeof potItem === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const potRecord = potItem as Record<string, any>
      for (const value in potRecord) {
        const val = potRecord[value]
        if (value !== 'description' && !scopeKey.includes(value) && !specialKey.includes(value)) {
          tempPotentials[value] = (tempPotentials[value] || 0) + (Number(val) || 0)
        } else if (specialKey.includes(value)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const keyList = Object.keys(val as Record<string, any>)
          if (!keyList.includes('extra')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            for (const buffValue in val as Record<string, any>) {
              if (buffValue !== 'index') {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const index = (val as Record<string, any>).index
                // 如果不存在则赋值
                if (!tempPotentials[value]) {
                  tempPotentials[value] = []
                }
                if (!tempPotentials[value][index]) {
                  tempPotentials[value][index] = {}
                }
                tempPotentials[value][index][buffValue] =
                  (tempPotentials[value][index][buffValue] || 0) +
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (val as Record<string, any>)[buffValue]

                if (tempPotentials[value].length === 0) {
                  delete tempPotentials[value]
                }
              }
            }
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const index = (val as Record<string, any>).index
            const tempData = JSON.parse(JSON.stringify(val))
            delete tempData.index
            if (!!tempPotentials[value]) {
              tempPotentials[value][index] = tempData
            } else {
              Reflect.set(tempPotentials, value, [])
              tempPotentials[value][index] = tempData
            }
          }
        } else if (scopeKey.includes(value)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tempPotentials[value] = [...(tempPotentials[value] || []), ...((val as any) || [])]
        }
      }
    }
  })
  return tempPotentials
}

export function sumMaxNumbersByType(arr: enemyWeaknessBuffObj[]) {
  const maxMap = new Map()
  // 遍历数组，记录每个 type 对应的最大 number
  for (const item of arr) {
    const { type, enemyWeakness } = item
    if (!maxMap.has(type) || enemyWeakness > maxMap.get(type)) {
      maxMap.set(type, enemyWeakness)
    }
  }
  // 对所有最大值求和
  let sum = 0
  for (const maxNumber of maxMap.values()) {
    sum += maxNumber
  }

  return sum
}
// 防止抖动
// utils/debounce.ts
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
/**
 * 根据新公式计算最大伤害组合，并返回格式化字符串。
 *
 * 公式：(x1 * (1 + (x2 + 9 * n) / 100)) * (y + 18 * m)
 * 约束：n + m = 15，n, m 为非负整数
 *
 * @param x1 - 基础攻击力
 * @param x2 - 基础攻击百分比（如 50 表示 50%）
 * @param y  - 基础爆伤
 * @returns 格式化结果字符串
 */
export function calculateMaxValueWithAllocation(
  x1: number = 0,
  x2: number = 0,
  y: number = 0,
  d: number = 0,
): string {
  if (!Number.isFinite(x1) || !Number.isFinite(x2) || !Number.isFinite(y)) {
    throw new Error('All inputs must be finite numbers.')
  }

  const k = 9 // 每个攻击词条加成
  const j = 18 // 每个爆伤词条加成
  const total = 15

  let maxDamage = -Infinity
  let bestPart1 = 0
  let bestPart2 = 0
  let bestN = 0
  let bestM = total

  for (let n = 0; n <= total; n++) {
    const m = total - n

    const part1 = Math.floor(x1 * (1 + (x2 + k * n) / 100))
    const part2 = y + j * m
    const damage = part1 * (1 + part2 / 100) * (1 + d / 100)

    if (damage > maxDamage) {
      maxDamage = damage
      bestPart1 = part1
      bestPart2 = part2
      bestN = n
      bestM = m
    }
  }

  // 可选：对显示值进行四舍五入（例如保留2位小数）
  const attackStr = Math.floor(bestPart1)
  const critDmgStr = bestPart2.toFixed(2)
  const damage = Math.floor(Math.floor(attackStr * (1 + bestPart2 / 100)) * (1 + d / 100))

  return `攻击：${attackStr}, 爆伤：${critDmgStr}, 伤害为(${damage.toLocaleString()})其中攻击词条${bestN}个, 爆伤词条${bestM}个`
}
// 点击文本复制
export async function copyTextToClipboard(text: number) {
  try {
    await navigator.clipboard.writeText(text.toString())
    console.log('Text copied to clipboard')
  } catch (err) {
    console.error('Could not copy text: ', err)
  }
}

export function setEnhancementValue(value: number = 6) {
  const calculate = value + 6
  return {
    atk: Math.floor(calculate * 2.5),
    patk: calculate * 1.68,
    critical: calculate * 3.36,
  }
}
