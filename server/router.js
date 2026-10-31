import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const express = require('express') // 线程
export const router = express.Router()
import { list, update } from './api/map.js'
import { materialList, sellList, sellUpdate } from './api/material.js'
import { buyList, buyUpdata } from './api/shop.js'
import { senceList, senceUpdate } from './api/sence.js'
import { characterList, saveCharacter } from './api/character.js'
import { equipmentList, saveEquipment } from './api/equipment.js'

// // 配置接口地址
router.get('/map/list', list) // 地图列表
router.post('/map/update', update) // 更新地图列表

router.get('/material/list', materialList) // 素材列表

router.get('/sell/list', sellList) // 获取商品列表
router.post('/sell/update', sellUpdate) // 修改商品列表

router.get('/shop/list', buyList) // 商品列表
router.post('/shop/updata', buyUpdata) // 商品列表

router.get('/sence/list', senceList) // 场景列表
router.post('/sence/updata', senceUpdate) // 更新场景列表

router.get('/character/list', characterList) // 已有角色文件列表
router.post('/character/save', saveCharacter) // 保存抓取到的角色文件

router.get('/equipment/list', equipmentList) // 已有装备数据文件列表
router.post('/equipment/save', saveEquipment) // 保存装备数据文件
