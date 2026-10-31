// 技能范围图要带 gamekee 的 Referer 才能下载，浏览器只能走 /gk-cdn 代理。
// 代理后是同源图片，但 canvas 会按色彩管理改写像素值，而范围识别依赖 49,53,60 这类精确颜色，
// 所以这里直接解 PNG 原始数据，不经过 canvas。
// 只支持 8bit 非隔行（wiki 的范围图都是这种），遇到别的格式直接抛错。

export interface PngImage {
  width: number
  height: number
  channels: number
  data: Uint8Array
  colorType: number
  palette?: Uint8Array
  trns?: Uint8Array
}

export type Rgba = [number, number, number, number]

const readU32 = (data: Uint8Array, pos: number): number =>
  ((data[pos] << 24) | (data[pos + 1] << 16) | (data[pos + 2] << 8) | data[pos + 3]) >>> 0

const concat = (chunks: Uint8Array[]): Uint8Array => {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    out.set(chunk, offset)
    offset += chunk.length
  }
  return out
}

/** zlib 解压（PNG 的 IDAT 就是 zlib 流），用浏览器内置的 DecompressionStream */
const inflate = async (data: Uint8Array): Promise<Uint8Array> => {
  const stream = new DecompressionStream('deflate')
  const done = new Response(stream.readable).arrayBuffer()
  const writer = stream.writable.getWriter()
  await writer.write(data)
  await writer.close()
  return new Uint8Array(await done)
}

const CHANNELS: Record<number, number> = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }

export const decodePng = async (buf: Uint8Array): Promise<PngImage> => {
  if (buf.length < 8 || buf[0] !== 0x89 || buf[1] !== 0x50) throw new Error('不是 PNG 数据')
  let pos = 8
  let width = 0
  let height = 0
  let bitDepth = 8
  let colorType = 6
  const idat: Uint8Array[] = []
  let palette: Uint8Array | undefined
  let trns: Uint8Array | undefined
  while (pos + 8 <= buf.length) {
    const len = readU32(buf, pos)
    const type = String.fromCharCode(buf[pos + 4], buf[pos + 5], buf[pos + 6], buf[pos + 7])
    const data = buf.subarray(pos + 8, pos + 8 + len)
    if (type === 'IHDR') {
      width = readU32(data, 0)
      height = readU32(data, 4)
      bitDepth = data[8]
      colorType = data[9]
    } else if (type === 'PLTE') {
      palette = data
    } else if (type === 'tRNS') {
      trns = data
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') break
    pos += 12 + len
  }
  if (bitDepth !== 8) throw new Error(`暂不支持的 PNG 位深：${bitDepth}`)
  const channels = CHANNELS[colorType]
  if (!channels) throw new Error(`暂不支持的 PNG 颜色类型：${colorType}`)

  const raw = await inflate(concat(idat))
  const stride = width * channels
  const out = new Uint8Array(height * stride)
  let readPos = 0
  for (let y = 0; y < height; y++) {
    const filter = raw[readPos++]
    const rowStart = y * stride
    const prevStart = (y - 1) * stride
    for (let x = 0; x < stride; x++) {
      const value = raw[readPos + x]
      const left = x >= channels ? out[rowStart + x - channels] : 0
      const up = y > 0 ? out[prevStart + x] : 0
      const upLeft = y > 0 && x >= channels ? out[prevStart + x - channels] : 0
      let result = value
      if (filter === 1) result += left
      else if (filter === 2) result += up
      else if (filter === 3) result += (left + up) >> 1
      else if (filter === 4) {
        const p = left + up - upLeft
        const pa = Math.abs(p - left)
        const pb = Math.abs(p - up)
        const pc = Math.abs(p - upLeft)
        result += pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft
      }
      out[rowStart + x] = result & 0xff
    }
    readPos += stride
  }
  return { width, height, channels, data: out, colorType, palette, trns }
}

export const pixel = (img: PngImage, x: number, y: number): Rgba => {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return [0, 0, 0, 0]
  const i = (y * img.width + x) * img.channels
  if (img.colorType === 3) {
    if (!img.palette) return [0, 0, 0, 0]
    const index = img.data[i]
    const alpha = img.trns && index < img.trns.length ? img.trns[index] : 255
    return [img.palette[index * 3], img.palette[index * 3 + 1], img.palette[index * 3 + 2], alpha]
  }
  if (img.channels === 1) return [img.data[i], img.data[i], img.data[i], 255]
  if (img.channels === 2) return [img.data[i], img.data[i], img.data[i], img.data[i + 1]]
  if (img.channels === 3) return [img.data[i], img.data[i + 1], img.data[i + 2], 255]
  return [img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3]]
}
