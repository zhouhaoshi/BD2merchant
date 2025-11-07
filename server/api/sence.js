import { readFile, writeFile } from '../server.js';
// json 结构
//  {
//   shopId: item.shopId, // 所属地图id
//   url: item.url, // 自身id，用来拼接基础地图图片
//   name: item.name, // 场景名称
//   support: item.support // 场景的额外图片
// }
// 获取场景列表
export const senceList = async (req, res) => {
  const { data } = await readFile(`./data/sence.json`)
  let senceList = data.map(item => {
    if(+item.shopId === +req.query.shopId) {
      return item
    }
  }).filter(Boolean)
  res.send({ code: 200, message: "success", data: senceList } || { code: 2022, message: "error", data: '文件不存在！' })
}
// 更新场景列表
export const senceUpdate = async (req, res) => {
  // 获取当前数据
  const { data } = await readFile(`./data/sence.json`)
  // 去除当前要保存的旧数据 直接覆盖
  let shopList = data.filter(item => item.shopId !== req.body.shopId)
  const saveData = req.body.data.map(item => ({
    ...item, 
    shopId: req.body.shopId
  }))
  const result = await writeFile(`./data/sence.json`, JSON.stringify([...shopList, ...saveData]))
  res.send(result || { code: 2022, message: "error", data: '修改失败！' })
}
