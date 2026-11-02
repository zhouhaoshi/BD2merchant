// 临时脚本：查看上传图关键区域的确切像素颜色
import { readFileSync } from 'node:fs'
import { decodePng, pixel } from '../src/utils/gamekee/png'

const img = await decodePng(
  new Uint8Array(
    readFileSync(
      'C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png',
    ),
  ),
)

const dumpRegion = (label: string, x0: number, y0: number, x1: number, y1: number) => {
  console.log(`--- ${label} (x${x0}-${x1}, y${y0}-${y1}) ---`)
  for (let y = y0; y <= y1; y++) {
    const row: string[] = []
    for (let x = x0; x <= x1; x++) {
      row.push(`(${pixel(img, x, y).join(',')})`)
    }
    console.log(`y${y}: ${row.join(' ')}`)
  }
}

// 品红标记区域 r0c2
dumpRegion('顶部品红标记', 28, 22, 36, 30)
// 底部疑似品红 r2c2
dumpRegion('底部品红?', 28, 40, 36, 44)
// y48 的 M 像素
dumpRegion('y48文字区', 22, 48, 48, 50)
// 人脸特征
dumpRegion('人脸', 28, 31, 36, 39)
