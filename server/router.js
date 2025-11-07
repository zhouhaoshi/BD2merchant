import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express'); // 线程
export const router = express.Router()
import { list, update } from './api/map.js'
import { materialList } from './api/material.js'
import { buyList, buyUpdata } from './api/shop.js'
import { senceList, senceUpdate } from './api/sence.js'

// // 配置接口地址
router.get('/map/list', list)       // 地图列表
router.post('/map/update', update)       // 更新地图列表

router.get('/material/list', materialList)       // 素材列表

router.get('/shop/list', buyList)       // 商品列表
router.post('/shop/updata', buyUpdata)       // 商品列表

router.get('/sence/list', senceList)       // 场景列表
router.post('/sence/updata', senceUpdate)       // 更新场景列表