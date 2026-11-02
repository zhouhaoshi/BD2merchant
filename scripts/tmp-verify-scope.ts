// 临时脚本：验证上传的范围图结构（5x3 网格、红色格子、品红标记、人脸位置）
import { readFileSync } from 'node:fs'
import { decodePng, pixel } from '../src/utils/gamekee/png'

const buf = new Uint8Array(
  readFileSync(
    'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa//wiki-+0.png',
  ),
)
const img = await decodePng(buf)
console.log(`size: ${img.width}x${img.height} channels: ${img.channels} colorType: ${img.colorType}`)

const classify = (x: number, y: number): string => {
  const [r, g, b] = pixel(img, x, y)
  const max = Math.max(r, g, b)
  if (max < 40) return ' ' // 底色
  if (r > 150 && g < 80 && b < 80) return 'R' // 红色格子
  if (r > 70 && b > 70 && g < 90 && Math.abs(r - b) < 60) return 'M' // 品红标记
  if (r > 180 && g > 120 && b > 90) return 'F' // 肤色（人脸）
  if (r > 120 && g < 60 && b < 60) return 'r' // 深红（五官）
  if (max > 120) return '?'
  if (max > 60) return '.' // 空格子 49,53,60
  return '+'
}

for (let y = 0; y < img.height; y++) {
  let line = ''
  for (let x = 0; x < img.width; x++) line += classify(x, y)
  console.log(line)
}

// 每 9px 网格（x10 起, y22 起）统计每个格子里的类别
const stats: Record<string, Record<string, number>> = {}
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 5; col++) {
    const key = `row${row} col${col}`
    stats[key] = {}
    for (let y = 22 + row * 9; y < 22 + (row + 1) * 9; y++) {
      for (let x = 10 + col * 9; x < 10 + (col + 1) * 9; x++) {
        const c = classify(x, y)
        if (c !== ' ' && c !== '.' && c !== '+') stats[key][c] = (stats[key][c] || 0) + 1
      }
    }
  }
}
for (const [key, value] of Object.entries(stats)) {
  if (Object.keys(value).length) console.log(key, JSON.stringify(value))
}
