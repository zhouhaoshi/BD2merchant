export function isUse() {
  const serverUrl = window.location.href || ''
  return serverUrl.includes('https://zhouhaoshi.github.io')
}
const baseUrl = 'https://zhouhaoshi.github.io/BD2merchant/json/'

export interface ShopMapItem {
  shopId: string
  label: string
  value: string
}

let mapListCache: ShopMapItem[] | null = null
let buyAllCache: Record<string, number | string>[] = []
let sellAllCache: Record<string, Record<string, number | string>> | null = null
export function getLocalMapList(): Promise<ShopMapItem[]> {
  return new Promise(async (resolve) => {
    if (mapListCache) {
      resolve(mapListCache)
      return
    }
    const data = await fetch(baseUrl + 'map.json').then(
      (response) => response.json() as Promise<ShopMapItem[]>,
    )
    mapListCache = data
    resolve(mapListCache)
  })
}
export function getBuyAllList(): Promise<Record<string, number | string>[]> {
  return new Promise(async (resolve) => {
    if (buyAllCache.length > 0) {
      resolve(buyAllCache)
      return
    }
    const data = await fetch(baseUrl + 'buyAll.json').then(
      (response) => response.json() as Promise<Record<string, number | string>[]>,
    )
    buyAllCache = data
    resolve(buyAllCache)
  })
}
export function getSellAllCache(): Promise<Record<string, Record<string, number | string>>> {
  return new Promise(async (resolve) => {
    if (sellAllCache) {
      resolve(sellAllCache)
      return
    }
    const data = await fetch(baseUrl + 'sellAll.json').then(
      (response) => response.json() as Promise<Record<string, Record<string, number | string>>>,
    )
    sellAllCache = data
    resolve(sellAllCache)
  })
}
/**
 * 根据 shopId 数组，从 data 中查找对应项，并返回 label_value 格式的字符串数组
 * @param {string[]} shopIdList - 要查询的 shopId 字符串数组（注意：原始数据中 shopId 是字符串）
 * @returns {string[]} - 形如 ["S1_血骑士", "C3_不可能的美丽", ...] 的数组
 */
async function getLabelValueByShopIds(shopIdList: string[]): Promise<string[]> {
  const shopList: ShopMapItem[] = await getLocalMapList()
  const shopIdSet = new Set(shopIdList) // 提升查找效率
  return shopList
    .filter((item: ShopMapItem) => shopIdSet.has(item.shopId))
    .map((item: ShopMapItem) => `${item.label}_${item.value}`)
}

export function getLocalShopList(param: Record<string, number | string>) {
  return new Promise(async (resolve) => {
    if (param.type === 'buy') {
      // 获取商店商品信息
      const buyAll = await getBuyAllList()
      let result = buyAll.filter(
        (item: Record<string, number | string>) => +item.shopId === +param.shopId,
      )
      // 解析数据
      const sellAll = await getSellAllCache()
      result = result.map((shopItem: Record<string, number | string>) => {
        const sellItem = sellAll[shopItem.id]
        const base = Number(sellItem.base)
        const maxRate = Number(sellItem.maxRate)
        return {
          id: shopItem.id,
          url: sellItem.url,
          name: sellItem.name,
          maxPrice: Math.floor((base * maxRate) / 100), // 最大购买价为 120% 的最终价格
          price: shopItem.price,
          type: shopItem.type,
        }
      })
      resolve(result)
    } else {
      const sellAll = await getSellAllCache()
      const dataList = []
      const now = param.time ? new Date(param.time) : new Date()
      const day = +now.getDate()
      for (const key in sellAll) {
        // 添加最高价格商品
        if (sellAll[key].date === day) {
          const base = Number(sellAll[key].base)
          const maxRate = Number(sellAll[key].maxRate)
          const shopId = sellAll[key].shopId as unknown as string[]
          dataList.push({
            url: sellAll[key].url,
            name: sellAll[key].name,
            shopName: await getLabelValueByShopIds(shopId),
            price: Math.floor((base * maxRate) / 100),
          })
        }
      }
      dataList.sort((a, b) => +b.price - +a.price)
      resolve(dataList)
    }
  })
}
