// 从 wiki 的「技能范围」小图里还原 scope 坐标。
// 图的构成：底色 31,35,41；空格子 49,53,60；高亮格子是彩色（红/蓝/绿/紫/橙）；
// 自己的位置画在带深色箭头的那个高亮格里（不一定在图的正中间）。
// 另外两种特殊图：
//   - 只有文字「自己」：没有任何高亮像素 -> [[0,0]]
//   - 文字「全部」压在网格上：拼不出规则网格，但有空格子 -> []（skillScope 里空数组表示全场）
import type { PngImage } from './png'
import { pixel } from './png'

export type ScopeKind = 'grid' | 'all' | 'self'

export interface ScopeResult {
  kind: ScopeKind
  /** [x, y]，全部是相对自己位置的偏移；all 是 []，self 是 [[0,0]] */
  cells: [number, number][]
  /** 识别出来的网格边长，便于排查 */
  size: number
}

interface Comp {
  minX: number
  maxX: number
  minY: number
  maxY: number
  area: number
}

const median = (values: number[]): number => {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const components = (mask: boolean[][], width: number, height: number): Comp[] => {
  const seen = Array.from({ length: height }, () => new Array<boolean>(width).fill(false))
  const out: Comp[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (seen[y][x] || !mask[y][x]) continue
      const stack: [number, number][] = [[x, y]]
      seen[y][x] = true
      let minX = x
      let maxX = x
      let minY = y
      let maxY = y
      let area = 0
      while (stack.length) {
        const [cx, cy] = stack.pop()!
        area++
        if (cx < minX) minX = cx
        if (cx > maxX) maxX = cx
        if (cy < minY) minY = cy
        if (cy > maxY) maxY = cy
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ]) {
          const nx = cx + dx
          const ny = cy + dy
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
          if (seen[ny][nx] || !mask[ny][nx]) continue
          seen[ny][nx] = true
          stack.push([nx, ny])
        }
      }
      out.push({ minX, maxX, minY, maxY, area })
    }
  }
  return out
}

/** 把一维中心点合并成一串（间距小于 tol 的算同一个） */
const cluster = (values: number[], tol: number): number[] => {
  const sorted = [...values].sort((a, b) => a - b)
  const groups: number[][] = []
  for (const value of sorted) {
    const last = groups[groups.length - 1]
    if (last && value - last[last.length - 1] <= tol) last.push(value)
    else groups.push([value])
  }
  return groups.map((group) => group.reduce((a, b) => a + b, 0) / group.length)
}

const sizeOf = (comp: Comp): [number, number] => [
  comp.maxX - comp.minX + 1,
  comp.maxY - comp.minY + 1,
]
const midX = (comp: Comp): number => (comp.minX + comp.maxX) / 2
const midY = (comp: Comp): number => (comp.minY + comp.maxY) / 2

interface Axis {
  n: number
  pitch: number
  centers: number[]
}

/** 把列/行中心拟合成等差数列，失败说明不是规则网格（文字图） */
const fitAxis = (centers: number[]): Axis | null => {
  if (centers.length < 2) return null
  const gaps = centers
    .slice(1)
    .map((value, index) => value - centers[index])
    .filter((v) => v > 1)
  if (!gaps.length) return null
  const pitch = Math.min(...gaps)
  if (pitch < 5) return null
  const min = centers[0]
  const n = Math.round((centers[centers.length - 1] - min) / pitch) + 1
  if (n < 3 || n > 30) return null
  const out: number[] = []
  for (const center of centers) {
    const k = Math.round((center - min) / pitch)
    if (k < 0 || k >= n || Math.abs(center - (min + k * pitch)) > pitch * 0.25) return null
    out[k] = center
  }
  for (let i = 0; i < n; i++) if (out[i] === undefined) out[i] = min + i * pitch
  return { n, pitch, centers: out }
}

const isAccent = (r: number, g: number, b: number, a: number): boolean => {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  return a >= 60 && max >= 100 && max - min >= 50
}

/** 从 [0,0] 开始，按顺时针把格子排一排，和手写文件里的顺序一致 */
const sortCells = (cells: [number, number][]): [number, number][] => {
  const angle = (cell: [number, number]) =>
    (360 - (((Math.atan2(cell[1], cell[0]) * 180) / Math.PI + 90 + 360) % 360)) % 360
  const rest = cells
    .filter((cell) => !(cell[0] === 0 && cell[1] === 0))
    .sort((a, b) => angle(a) - angle(b) || Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]))
  const hasOrigin = cells.some((cell) => cell[0] === 0 && cell[1] === 0)
  return hasOrigin ? [[0, 0], ...rest] : rest
}

export const analyzeScope = (img: PngImage): ScopeResult => {
  const { width, height } = img
  const accent: boolean[][] = []
  const cellMask: boolean[][] = []
  for (let y = 0; y < height; y++) {
    accent.push([])
    cellMask.push([])
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixel(img, x, y)
      const hit = isAccent(r, g, b, a)
      accent[y].push(hit)
      // 空格子是固定的 49,53,60，容差收紧一点可以排除外框的装饰色
      cellMask[y].push(
        !hit && Math.abs(r - 49) <= 5 && Math.abs(g - 53) <= 5 && Math.abs(b - 60) <= 5,
      )
    }
  }
  const cellComps = components(cellMask, width, height).filter((comp) => {
    const [cw, ch] = sizeOf(comp)
    return cw >= 5 && ch >= 5 && comp.area >= 20 && cw <= width * 0.6 && ch <= height * 0.6
  })
  const accentComps = components(accent, width, height).filter((comp) => comp.area >= 18)
  const accentPixels = accentComps.reduce((sum, comp) => sum + comp.area, 0)
  if (!accentPixels) return { kind: 'self', cells: [[0, 0]], size: 0 }

  const cw0 =
    median(cellComps.map((comp) => sizeOf(comp)[0])) || median(accentComps.map((c) => sizeOf(c)[0]))
  const ch0 =
    median(cellComps.map((comp) => sizeOf(comp)[1])) || median(accentComps.map((c) => sizeOf(c)[1]))
  // 只有一个格子大小、且基本填满外框的高亮块，才当作网格里的一格
  const shaped = (comp: Comp): boolean => {
    const [cw, ch] = sizeOf(comp)
    return (
      cw >= cw0 * 0.5 &&
      cw <= cw0 * 1.6 &&
      ch >= ch0 * 0.5 &&
      ch <= ch0 * 1.6 &&
      comp.area >= cw * ch * 0.5
    )
  }
  const gridComps = [...cellComps, ...accentComps.filter(shaped)]
  const tol = Math.max(3, Math.min(cw0, ch0) * 0.4)
  const fx = fitAxis(cluster(gridComps.map(midX), tol))
  const fy = fitAxis(cluster(gridComps.map(midY), tol))
  if (!fx || !fy || fx.n !== fy.n) {
    // 拼不出规则网格：有空格子说明是压在网格上的「全部」文字图，否则是「自己」
    return cellComps.length
      ? { kind: 'all', cells: [], size: 0 }
      : { kind: 'self', cells: [[0, 0]], size: 0 }
  }
  const n = fx.n

  const halfW = Math.max(2, fx.pitch * 0.32)
  const halfH = Math.max(2, fy.pitch * 0.32)
  // 每个格子：高亮覆盖率 + 深色像素占比（深色那块就是 [0,0] 的箭头）
  const stats = (col: number, row: number) => {
    const x0 = Math.round(fx.centers[col] - halfW)
    const x1 = Math.round(fx.centers[col] + halfW)
    const y0 = Math.round(fy.centers[row] - halfH)
    const y1 = Math.round(fy.centers[row] + halfH)
    const vals: number[] = []
    let hit = 0
    let total = 0
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const [r, g, b, a] = pixel(img, x, y)
        const max = Math.max(r, g, b)
        total++
        if (isAccent(r, g, b, a)) {
          hit++
          vals.push(max)
        }
      }
    }
    const base = vals.length ? median(vals) : 60
    const darkLimit = Math.max(25, base * 0.55)
    let dark = 0
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const [r, g, b] = pixel(img, x, y)
        if (Math.max(r, g, b) <= darkLimit) dark++
      }
    }
    return { cov: hit / Math.max(1, total), dark: dark / Math.max(1, total) }
  }

  const solid: [number, number][] = []
  let origin: [number, number] | null = null
  let darkest = 0
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const stat = stats(col, row)
      if (stat.cov < 0.5) continue
      solid.push([col, row])
      if (stat.dark > darkest) {
        darkest = stat.dark
        origin = [col, row]
      }
    }
  }
  if (!solid.length) {
    return cellComps.length
      ? { kind: 'all', cells: [], size: n }
      : { kind: 'self', cells: [[0, 0]], size: n }
  }
  if (!origin) {
    // 没有箭头时退化成「离几何中心最近的格子」
    const center = (n - 1) / 2
    origin = [...solid].sort(
      (a, b) => Math.hypot(a[0] - center, a[1] - center) - Math.hypot(b[0] - center, b[1] - center),
    )[0]
  }
  const [ox, oy] = origin
  // 图是旋转 -90° 画的：列向右是 +x，行向下是 -y
  const cells = solid.map(([col, row]) => [col - ox, oy - row] as [number, number])
  return { kind: 'grid', cells: sortCells(cells), size: n }
}
