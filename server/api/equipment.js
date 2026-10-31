import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
// server/api -> ../../src/utils/equipmentData
const equipmentDir = path.resolve(currentDir, '../../src/utils/equipmentData')

/** 保存装备数据文件：POST /equipment/save  body { fileName, content } */
export const saveEquipment = async (req, res) => {
  try {
    const { fileName, content } = req.body || {}
    if (typeof fileName !== 'string' || !/^[a-zA-Z][a-zA-Z0-9]*\.ts$/.test(fileName)) {
      return res.send({ code: 400, message: '文件名不合法，只能是英文数字加 .ts' })
    }
    if (typeof content !== 'string' || !content.includes('export default')) {
      return res.send({ code: 400, message: '内容不合法，缺少 export default' })
    }
    const target = path.resolve(equipmentDir, fileName)
    if (!target.startsWith(equipmentDir + path.sep)) {
      return res.send({ code: 400, message: '目标路径越界' })
    }
    if (!fs.existsSync(equipmentDir)) fs.mkdirSync(equipmentDir, { recursive: true })
    fs.writeFileSync(target, content, 'utf8')
    res.send({ code: 200, message: '保存成功', data: { path: target } })
  } catch (error) {
    res.send({ code: 500, message: `保存失败：${error.message}` })
  }
}

/** 列出已经存在的装备数据文件：GET /equipment/list */
export const equipmentList = async (_req, res) => {
  try {
    if (!fs.existsSync(equipmentDir)) return res.send({ code: 200, message: '成功', data: [] })
    const files = fs
      .readdirSync(equipmentDir)
      .filter((file) => file.endsWith('.ts'))
      .map((file) => {
        const content = fs.readFileSync(path.join(equipmentDir, file), 'utf8')
        const count = (content.match(/["']?content_id["']?\s*:/g) || []).length
        return { fileName: file.replace(/\.ts$/, ''), count }
      })
    res.send({ code: 200, message: '成功', data: files })
  } catch (error) {
    res.send({ code: 500, message: `读取失败：${error.message}` })
  }
}
