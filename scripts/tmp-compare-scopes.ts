// 临时脚本：下载 wiki 战场猛兽 +0~满破 的 7 张范围图，与用户上传图逐像素对比
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { decodePng, pixel } from '../src/utils/gamekee/png'

const HEADERS = {
  'game-alias': 'zsca2',
  Origin: 'https://www.gamekee.com/',
  Referer: 'https://www.gamekee.com/',
}

const WIKI_IMAGES = [
  ['+0', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/63042813mtb4ntyv.png'],
  ['+1', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/22396325mtb4nujo.png'],
  ['+2', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/22191951mtb4nv2n.png'],
  ['+3', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/04550725mtb4nvxo.png'],
  ['+4', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/12463032mtb4nx1i.png'],
  ['+5', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/43719448mtb4nxxf.png'],
  ['满破', 'https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/46523328mtb4nyeo.png'],
]

const uploadBuf = new Uint8Array(
  readFileSync(
    'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png',
  ),
)
const upload = await decodePng(uploadBuf)
console.log(`upload: ${upload.width}x${upload.height}`)

mkdirSync('scripts/.build/ancilla-scopes', { recursive: true })

const diff = (a: typeof upload, b: typeof upload): number => {
  if (a.width !== b.width || a.height !== b.height) return -1
  let count = 0
  for (let y = 0; y < a.height; y++) {
    for (let x = 0; x < a.width; x++) {
      const [ar, ag, ab] = pixel(a, x, y)
      const [br, bg, bb] = pixel(b, x, y)
      if (ar !== br || ag !== bg || ab !== bb) count++
    }
  }
  return count
}

for (const [label, url] of WIKI_IMAGES) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    console.log(`${label}: HTTP ${res.status}`)
    continue
  }
  const buf = new Uint8Array(await res.arrayBuffer())
  const file = join('scripts/.build/ancilla-scopes', `wiki-${label}.png`)
  writeFileSync(file, buf)
  const img = await decodePng(buf)
  const d = diff(upload, img)
  console.log(`${label}: ${img.width}x${img.height} 与上传图差异像素: ${d === -1 ? '尺寸不同' : d}`)
}
