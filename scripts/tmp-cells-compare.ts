// 临时脚本：并排对比上传图与 wiki +0 图的 5x3 格子结构
import { readFileSync } from 'node:fs'
import { decodePng, pixel } from '../src/utils/gamekee/png'

const classify = (r: number, g: number, b: number): string => {
  const max = Math.max(r, g, b)
  if (max < 40) return 'bg'
  if (r > 150 && g < 80 && b < 80) return 'R'
  if (r > 70 && b > 70 && g < 90 && Math.abs(r - b) < 60) return 'M'
  if (r > 180 && g > 120 && b > 90) return 'F'
  if (r > 120 && g < 60 && b < 60) return 'r'
  if (max > 120) return '?'
  return 'cell'
}

const cellStats = async (path: string) => {
  const img = await decodePng(new Uint8Array(readFileSync(path)))
  const out: Record<string, Record<string, number>> = {}
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      const key = `r${row}c${col}`
      out[key] = {}
      for (let y = 22 + row * 9; y < 22 + (row + 1) * 9; y++) {
        for (let x = 10 + col * 9; x < 10 + (col + 1) * 9; x++) {
          const c = classify(...pixel(img, x, y))
          if (c !== 'bg' && c !== 'cell') out[key][c] = (out[key][c] || 0) + 1
        }
      }
    }
  }
  return out
}

const uploadStats = await cellStats(
  'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png',
)
const wikiStats = await cellStats('scripts/.build/ancilla-scopes/wiki-+0.png')

for (const key of Object.keys(uploadStats)) {
  const up = uploadStats[key]
  const wk = wikiStats[key]
  const upStr = JSON.stringify(up)
  const wkStr = JSON.stringify(wk)
  console.log(`${key}\n  upload: ${upStr}\n  wiki:   ${wkStr}${upStr === wkStr ? '' : '   <<< 不同'}`)
}
