import { isUse } from '@/utils/localService'

/** wiki 装备图鉴接口需要的请求头，缺了会返回 403 */
const GAME_ALIAS = 'zsca2'

/** 装备列表接口（CORS 允许跨域直连，无需代理） */
export const EQUIPMENT_LIST_URL = 'https://www.gamekee.com/v1/entry/tj-eq-list'

/** sessionStorage 缓存 key */
const CACHE_KEY = 'bd2-eq-raw'

/** 装备图片转换：cdnimg-v2 校验 Referer，dev 走 /gk-img 代理；生产无代理，直连失败由 el-image error 槽兜底 */
export function equipmentImageUrl(url?: string): string {
  if (!url) return ''
  const absolute = url.startsWith('//') ? `https:${url}` : url
  if (isUse()) return absolute
  const matched = absolute.match(/^https?:\/\/cdnimg-v2\.gamekee\.com(\/.*)$/)
  return matched ? `/gk-img${matched[1]}` : absolute
}

/** 解析属性 JSON 字符串：空串/非法 JSON 返回 null，值统一 String() 归一化 */
function parseAttrJson<T extends object>(raw: string): T | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const result: Record<string, string> = {}
    for (const key of Object.keys(parsed)) result[key] = String(parsed[key] ?? '')
    return result as T
  } catch {
    return null
  }
}

/** 解析等级属性 JSON：sr/ur1/ur2/ur3 的值是嵌套的主属性结构 {zynl, jbnl1, jbnl2} */
function parseOtherAttr(raw: string): equipmentOtherAttrObj | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const result: equipmentOtherAttrObj = {}
    for (const key of ['sr', 'ur1', 'ur2', 'ur3'] as const) {
      const value = parsed[key]
      if (value && typeof value === 'object') {
        const attr = value as Record<string, unknown>
        result[key] = {
          zynl: String(attr.zynl ?? ''),
          jbnl1: String(attr.jbnl1 ?? ''),
          jbnl2: String(attr.jbnl2 ?? ''),
        }
      }
    }
    return Object.keys(result).length ? result : null
  } catch {
    return null
  }
}

/** 解析装备列表：兼容裸数组与 {code,msg,data} 信封两种形态 */
export function parseEquipmentList(raw: unknown): equipmentDataObj[] {
  const list: equipmentRawItem[] = Array.isArray(raw)
    ? (raw as equipmentRawItem[])
    : Array.isArray((raw as { data?: unknown })?.data)
      ? (raw as { data: equipmentRawItem[] }).data
      : []
  return list.map((item) => ({
    content_id: Number(item.content_id ?? 0),
    name: String(item.name ?? '').trim(),
    icon: String(item.icon ?? ''),
    icon1: String(item.icon1 ?? ''),
    part: String(item.part ?? ''),
    type: String(item.type ?? ''),
    roleName: String(item.role_name ?? '').trim(),
    roleAvatar: String(item.role_avatar ?? ''),
    mainAttr: parseAttrJson<equipmentMainAttrObj>(String(item.main_attr ?? '')),
    otherAttr: parseOtherAttr(String(item.other_attr ?? '')),
  }))
}

/** 从本地装备数据文件加载：glob ./equipmentData/*.ts，每个文件 export default 装备数组 */
async function loadLocalEquipment(): Promise<equipmentDataObj[]> {
  const modules = import.meta.glob('./equipmentData/*.ts') as Record<
    string,
    () => Promise<{ default: unknown }>
  >
  const list: equipmentDataObj[] = []
  for (const importer of Object.values(modules)) {
    try {
      const module = await importer()
      const data = module.default as equipmentDataObj | equipmentDataObj[]
      if (Array.isArray(data)) list.push(...data)
      else list.push(data)
    } catch (error) {
      console.warn('[装备] 本地装备文件加载失败', error)
    }
  }
  return list
}

/** 拉取装备列表：优先本地文件，其次 sessionStorage 缓存，force 时强制在线重新请求 */
export async function fetchEquipmentList(
  force = false,
): Promise<{ list: equipmentDataObj[]; updateTime: string; fromLocal: boolean }> {
  // 本地文件优先
  if (!force) {
    const local = await loadLocalEquipment()
    if (local.length) {
      return { list: local, updateTime: '本地', fromLocal: true }
    }
  }
  let raw: unknown
  let time = Date.now()
  if (!force) {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached) as { time: number; raw: unknown }
        raw = parsed.raw
        time = parsed.time
      }
    } catch {
      /* 缓存损坏则忽略，走网络 */
    }
  }
  if (raw === undefined) {
    const response = await fetch(EQUIPMENT_LIST_URL, {
      headers: { 'game-alias': GAME_ALIAS },
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`装备接口请求失败：${response.status}`)
    raw = await response.json()
    time = Date.now()
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time, raw }))
    } catch {
      /* 配额/隐私模式异常不影响首次展示 */
    }
  }
  const d = new Date(time)
  const pad = (n: number) => String(n).padStart(2, '0')
  return {
    list: parseEquipmentList(raw),
    updateTime: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
    fromLocal: false,
  }
}
