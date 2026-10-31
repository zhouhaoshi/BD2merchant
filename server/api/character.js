import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const fs = require('fs')
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
// server/api -> ../../src/utils/character
const characterDir = path.resolve(currentDir, '../../src/utils/character')

/** 保存抓取到的角色文件：POST /character/save  body { fileName, content } */
export const saveCharacter = async (req, res) => {
  try {
    const { fileName, content } = req.body || {}
    if (typeof fileName !== 'string' || !/^[a-zA-Z][a-zA-Z0-9]*\.ts$/.test(fileName)) {
      return res.send({ code: 400, message: '文件名不合法，只能是英文数字加 .ts' })
    }
    if (typeof content !== 'string' || !content.includes('export default')) {
      return res.send({ code: 400, message: '内容不合法，缺少 export default' })
    }
    const target = path.resolve(characterDir, fileName)
    if (!target.startsWith(characterDir + path.sep)) {
      return res.send({ code: 400, message: '目标路径越界' })
    }
    if (!fs.existsSync(characterDir)) fs.mkdirSync(characterDir, { recursive: true })
    fs.writeFileSync(target, content, 'utf8')
    res.send({ code: 200, message: '保存成功', data: { path: target } })
  } catch (error) {
    res.send({ code: 500, message: `保存失败：${error.message}` })
  }
}

/** 列出已经存在的角色文件：GET /character/list */
export const characterList = async (_req, res) => {
  try {
    if (!fs.existsSync(characterDir)) return res.send({ code: 200, message: '成功', data: [] })
    const files = fs
      .readdirSync(characterDir)
      .filter((file) => file.endsWith('.ts'))
      .map((file) => {
        const content = fs.readFileSync(path.join(characterDir, file), 'utf8')
        // 自动生成的文件头部有 contentId，手写文件没有；两种都用 cName 兜底匹配
        const contentId = content.match(/contentId:\s*(\d+)/)
        const cName = content.match(/^\s*cName:\s*'([^']*)'/m)
        return {
          fileName: file.replace(/\.ts$/, ''),
          contentId: contentId ? Number(contentId[1]) : null,
          cName: cName ? cName[1] : '',
        }
      })
    res.send({ code: 200, message: '成功', data: files })
  } catch (error) {
    res.send({ code: 500, message: `读取失败：${error.message}` })
  }
}
