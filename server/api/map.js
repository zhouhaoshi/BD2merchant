import { readFile, writeFile } from '../server.js'
// 获取地图列表
export const list = async (req, res) => {
  const data = await readFile(`./data/map.json`)
  res.send(data || { code: 2022, message: 'error', data: '文件不存在！' })
}
// 更新地图列表
export const update = async (req, res) => {
  const { data } = await readFile(`./data/map.json`)
  const mapList = data.map((item) => {
    if (item.shopId === req.body.shopId) {
      return req.body.data
    } else {
      return item
    }
  })
  const result = await writeFile(`./data/map.json`, JSON.stringify(mapList))
  res.send(result || { code: 2022, message: 'error', data: '修改失败！' })
}
