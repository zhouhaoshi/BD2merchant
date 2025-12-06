export function isUse() {
  const serverUrl = window.location.href || ''
  return serverUrl.includes('https://zhouhaoshi.github.io')
}
const baseUrl = 'https://zhouhaoshi.github.io/BD2merchant/json/'

export function getLocalMapList() {
  return fetch(baseUrl + 'map.json').then((response) => response.json())
}

export function getLocalShopList(param: Record<string, unknown>) {
  return new Promise((resolve) => {
    fetch(baseUrl + 'buyAll.json')
      .then((response) => response.json())
      .then((data) => {
        let result = data.filter((item: Record<string, unknown>) => item.shopId === param.shopId)
        fetch(baseUrl + 'sellAll.json')
          .then((response) => response.json())
          .then((sdata) => {
            result = result.map((shopItem: Record<string, string>) => {
              return {
                id: shopItem.id,
                url: sdata[shopItem.id].url,
                name: sdata[shopItem.id].name,
                maxPrice: Math.floor((sdata[shopItem.id].base * sdata[shopItem.id].maxRate) / 100), // 最大购买价为 120% 的最终价格
                price: shopItem.price,
                type: shopItem.type,
              }
            })
            resolve(result)
          })
      })
  })
}
