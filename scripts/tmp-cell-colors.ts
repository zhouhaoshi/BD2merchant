// 临时脚本：查看上传图各格子区域的实际颜色分布
import { readFileSync } from 'node:fs'
import { decodePng, pixel } from '../src/utils/gamekee/png'

const img = await decodePng(
  new Uint8Array(
    readFileSync(
      'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png',
    ),
  ),
)

const regionColors = (x0: number, y0: number, x1: number, y1: number): Map<string, number> => {
  const counts = new Map<string, number>()
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const [r, g, b] = pixel(img, x, y)
      const key = `${r},${g},${b}`
      counts.set(key, (counts.get(key) || 0) + 1)
    }
  }
  return counts
}

const show = (label: string, x0: number, y0: number, x1: number, y1: number) => {
  const counts = regionColors(x0, y0, x1, y1)
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
  console.log(`${label}: ${top.map(([c, n]) => `${c}x${n}`).join(' | ')}`)
}

show('r0c1', 19, 22, 27, 30)
show('r0c3', 37, 22, 45, 30)
show('r1c0', 10, 31, 18, 39)
show('r1c1', 19, 31, 27, 39)
show('r1c2', 28, 31, 36, 39)
show('r1c3', 37, 31, 45, 39)
show('r1c4', 46, 31, 54, 39)
show('r2c1', 19, 40, 27, 48)
show('r2c3', 37, 40, 45, 48)
show('r0c0 空格', 10, 22, 18, 30)
show('r0c2 标记', 28, 22, 36, 30)
show('r2c0 空格', 10, 40, 18, 48)
