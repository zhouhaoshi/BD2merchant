import { readFile, writeFile } from '../server.js'
// 获取素材列表
export const materialList = async (req, res) => {
  const data = await readFile(`./data/sellAll.json`)
  if (data) {
    const list = []
    for (let key in data.data) {
      list.push({
        ...data.data[key],
        id: key,
      })
    }
    res.send({ code: 200, message: 'success', data: list })
  } else {
    res.send({ code: 2022, message: 'error', data: '文件不存在！' })
  }
}
// 修改素材列表
export const update = async (req, res) => {
  const data = await writeFile(`./data/sellAll.json`, JSON.stringify(req.body))
  res.send(data || { code: 2022, message: 'error', data: '修改失败！' })
}

// 获取素材价格与商店售卖列表
export const sellList = async (req, res) => {
  const data = await readFile(`./data/sellAll.json`)
  res.send(data || { code: 2022, message: 'error', data: '文件不存在！' })
}

// 修改素材价格与商店售卖列表
export const sellUpdate = async (req, res) => {
  const data = await writeFile(`./data/sellAll.json`, JSON.stringify(req.body))
  res.send(data || { code: 2022, message: 'error', data: '修改失败！' })
}
