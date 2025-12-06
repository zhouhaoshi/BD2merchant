import { get, post } from './config'
import { getLocalMapList, isUse, getLocalShopList } from '@/utils/localService'

export default {
  mapList: (params = {}) => {
    if (isUse()) {
      return getLocalMapList().then((res) => {
        return { code: 200, data: res, message: '成功' }
      })
    } else {
      return get('/map/list', params)
    }
  }, // 地图列表
  mapUpdata: (data = {}) => {
    return post('/map/update', data)
  }, // 更新地图列表

  senceList: (params = {}) => {
    return get('/sence/list', params)
  }, // 场景列表
  senceUpdata: (data = {}) => {
    return post('/sence/updata', data)
  }, // 更新场景列表

  shopList: (params = {}) => {
    if (isUse()) {
      return getLocalShopList(params).then((res) => {
        return { code: 200, data: res, message: '成功' }
      })
    } else {
      return get('/shop/list', params)
    }
  }, // 获取商品列表
  shopBuyUpdata: (data = {}) => {
    return post('/shop/updata', data)
  }, // 商店商品更新

  materialList: (params = {}) => {
    return get('/material/list', params)
  }, // 获取素材列表
  sellList: (params = {}) => {
    return get('/sell/list', params)
  }, // 商品列表
  sellUpdate: (data = {}) => {
    return post('/sell/update', data)
  }, // 修改商品信息
}
