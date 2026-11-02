// 临时脚本：下载 ancilla 技能2 wiki 范围图，用 analyzeScope 校准原点约定
import { readFileSync, writeFileSync } from 'node:fs'
import { decodePng, pixel } from '../src/utils/gamekee/png'
import { analyzeScope } from '../src/utils/gamekee/scope'

const headers = {
  'game-alias': 'zsca2',
  Origin: 'https://www.gamekee.com/',
  Referer: 'https://www.gamekee.com/',
}
// skill2 +0 的 wiki 图（文件里 scope 是 3x3 方块，[0,0] 居中）
const url = 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_67/h_66/497891/2026/9/20/00945209mvgfqoiw.png'
const res = await fetch(url, { headers })
if (!res.ok) throw new Error(`HTTP ${res.status}`)
const buf = new Uint8Array(await res.arrayBuffer())
writeFileSync('scripts/.build/wiki-skill2-0.png', buf)
const img = await decodePng(buf)
console.log('skill2 wiki +0 analyzeScope:', JSON.stringify(analyzeScope(img)))

// 同样校准：上传图对应的技能1 各等级 wiki 图 + 上传图，检查是否有紫红/蓝色标记像素
const isMark = (r: number, g: number, b: number) => b > r + 8 && g > r + 3 && b > 40
for (const [name, path] of [
  ['uploaded', 'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png'],
  ['wiki-skill1-0', 'scripts/.build/wiki-skill1-0.png'],
  ['wiki-skill2-0', 'scripts/.build/wiki-skill2-0.png'],
] as const) {
  const im = await decodePng(new Uint8Array(readFileSync(path)))
  const marks: string[] = []
  for (let y = 0; y < im.height; y++) {
    for (let x = 0; x < im.width; x++) {
      const [r, g, b] = pixel(im, x, y)
      if (isMark(r, g, b)) marks.push(`${x},${y}`)
    }
  }
  console.log(`${name} mark pixels:`, marks.join(' ') || '(none)')
}
