import { readFile, writeFile } from '../server.js';

/**
 * 查询并更新对象数组 B 中与 A 的 id 匹配的项
 * @param {Array} arrayA - 源数据数组（包含要复制的值）
 * @param {Array} arrayB - 目标数组（需要被更新）
 * @param {String} sourceKey - 要从 A 中复制的字段名
 * @param {String} targetKey - 要更新到 B 中的字段名
 * @param {String} key - 用于判断的值，默认id
 * @returns {Array} 返回更新后的 B 数组
 */
export function updateMatchingItems(arrayA, arrayB, sourceKey, targetKey, key="id") {
  const mapA = Object.fromEntries(
    arrayA.map(item => [item[key], item])
  )
  return arrayB.map(item => {
    if (mapA[item.id]) {
      return {
        ...item,
        [targetKey]: mapA[item[key]][sourceKey]
      };
    }
    return item;
  })
}

function q(m, t, d) {
  let e = BigInt(m)
    , n = e ^ e + 1170n ^ e << 16n ^ e + 1170n << 15n
    , b = e + 810n ^ e + 810n >> 11n
    , p = n ^ b ^ (n ^ b) << 5n & 3661901092n
    , l = e + 1350n ^ n ^ p ^ e + 1350n << 2n ^ n << 18n ^ b << 28n;
  return t + Number(BigInt.asUintN(64, l) % BigInt(d - t))
}

/**
 * 获取商店折扣
 * @param {object} m - 商品信息
 * @param {String} t - 商店id
 * @returns {Array} 返回更新后的 B 数组
 */

export function K(m, t, time) {
    const n = Number(m.bdx_type)
      , b = Number(m.bdx_id)
      , p = Number(m.base)
      , l = Number(m.minRate)
      , Y = Number(m.maxRate)
      , J = Number(t);
    const now = time ? new Date(time) : new Date();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const D = +`${month}${day}0`
    let Q = D + 2 + n + b + J
      , N = q(Q, l, Y)
      , X = Math.trunc(p * N / 100);
    return {
      ratio: N,
      finalPrice: X
    }
}

const deduplicate = (arr, key = 'id') =>{
  const map = new Map();
  arr.forEach(item => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
}

// 获取商品购买列表
export const buyList = async (req, res) => {
  const { shopId, type, time } = req.query
  if(shopId && type) {
    if(type === 'buy') {
      // 查询该地图商店下的商品
      const data = await readFile(`./data/buyAll.json`)
      if (data) {
        // 查询对应的物资表
        const mData = await readFile(`./data/material.json`)
        let shopList = data.data.map(item => {
          if(+item.shopId === +shopId) {
            return {
              id: item.id,
              url: mData.data[item.id].url,
              name: mData.data[item.id].name,
              maxPrice: mData.data[item.id].maxPrice,
              price: item.price,
              type: item.type
            }
          }
        }).filter(Boolean)
        res.send({ code: 200, message: "success", data: shopList })
      } else {
        res.send({ code: 2022, message: "error", data: '文件不存在！' })
      }
    } else {
      const dataList = []
      let shopList
      // 查询所有商店售卖情况
      if(shopId === '-1') {
        shopList = await readFile(`./data/map.json`)
      }
      // 查询对应的物资表
      const mData = await readFile(`./data/material.json`)
      if(shopId === '-1') {
        shopList.data.forEach(shopItem => {
          for (let key in mData.data) {
            const l = K(mData.data[key], shopItem.shopId, time)
            // 添加最高价格商品
            if(l.finalPrice >= mData.data[key].maxPrice) {
              dataList.push({
                ...mData.data[key],
                price: mData.data[key].maxPrice
              })
            }
          }
        });
      } else {
        for (let key in mData.data) {
          const l = K(mData.data[key], shopId, time)
          // 添加最高价格商品
          if(l.finalPrice >= mData.data[key].maxPrice) {
            dataList.push({
              ...mData.data[key],
              price: mData.data[key].maxPrice
            })
          }
        }
      }
      // 对 dataList 去重
      const uniqueDataList = deduplicate(dataList, 'bdx_id');
      if(shopId === '-1') {
        uniqueDataList.sort((a, b) => +b.price - +a.price)
      }
      res.send({ code: 200, message: 'success', data: uniqueDataList })
    }
  } else {
    res.send(
      {
        code: 2002,
        message: 'success',
        data: `shopId或type为空`
      }
    )
  }
}

// 修改商品购买列表
export const buyUpdata = async (req, res) => {
  const saveShop = req.body.data.map(item => (
    {"id": item.id, "price": item.price, "type": item.type, "shopId": req.body.shopId}
  ))
  const buyAllList = await readFile(`./data/buyAll.json`)
  const saveData = buyAllList.data.filter(item => +item.shopId !== +saveShop[0].shopId && !!item.shopId)
  const data = await writeFile(`./data/buyAll.json`, JSON.stringify([...saveData, ...saveShop]))
  res.send(data || { code: 2022, message: "error", data: '修改失败！' })
}