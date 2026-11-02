// scripts/tmp-scope.ts
import { readFileSync, writeFileSync } from "node:fs";

// src/utils/gamekee/png.ts
var readU32 = (data, pos) => (data[pos] << 24 | data[pos + 1] << 16 | data[pos + 2] << 8 | data[pos + 3]) >>> 0;
var concat = (chunks) => {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
};
var inflate = async (data) => {
  const stream = new DecompressionStream("deflate");
  const done = new Response(stream.readable).arrayBuffer();
  const writer = stream.writable.getWriter();
  await writer.write(data);
  await writer.close();
  return new Uint8Array(await done);
};
var CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
var decodePng = async (buf2) => {
  if (buf2.length < 8 || buf2[0] !== 137 || buf2[1] !== 80) throw new Error("\u4E0D\u662F PNG \u6570\u636E");
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 8;
  let colorType = 6;
  const idat = [];
  let palette;
  let trns;
  while (pos + 8 <= buf2.length) {
    const len = readU32(buf2, pos);
    const type = String.fromCharCode(buf2[pos + 4], buf2[pos + 5], buf2[pos + 6], buf2[pos + 7]);
    const data = buf2.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = readU32(data, 0);
      height = readU32(data, 4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "PLTE") {
      palette = data;
    } else if (type === "tRNS") {
      trns = data;
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") break;
    pos += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`\u6682\u4E0D\u652F\u6301\u7684 PNG \u4F4D\u6DF1\uFF1A${bitDepth}`);
  const channels = CHANNELS[colorType];
  if (!channels) throw new Error(`\u6682\u4E0D\u652F\u6301\u7684 PNG \u989C\u8272\u7C7B\u578B\uFF1A${colorType}`);
  const raw = await inflate(concat(idat));
  const stride = width * channels;
  const out = new Uint8Array(height * stride);
  let readPos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[readPos++];
    const rowStart = y * stride;
    const prevStart = (y - 1) * stride;
    for (let x = 0; x < stride; x++) {
      const value = raw[readPos + x];
      const left = x >= channels ? out[rowStart + x - channels] : 0;
      const up = y > 0 ? out[prevStart + x] : 0;
      const upLeft = y > 0 && x >= channels ? out[prevStart + x - channels] : 0;
      let result = value;
      if (filter === 1) result += left;
      else if (filter === 2) result += up;
      else if (filter === 3) result += left + up >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        result += pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
      }
      out[rowStart + x] = result & 255;
    }
    readPos += stride;
  }
  return { width, height, channels, data: out, colorType, palette, trns };
};
var pixel = (img2, x, y) => {
  if (x < 0 || y < 0 || x >= img2.width || y >= img2.height) return [0, 0, 0, 0];
  const i = (y * img2.width + x) * img2.channels;
  if (img2.colorType === 3) {
    if (!img2.palette) return [0, 0, 0, 0];
    const index = img2.data[i];
    const alpha = img2.trns && index < img2.trns.length ? img2.trns[index] : 255;
    return [img2.palette[index * 3], img2.palette[index * 3 + 1], img2.palette[index * 3 + 2], alpha];
  }
  if (img2.channels === 1) return [img2.data[i], img2.data[i], img2.data[i], 255];
  if (img2.channels === 2) return [img2.data[i], img2.data[i], img2.data[i], img2.data[i + 1]];
  if (img2.channels === 3) return [img2.data[i], img2.data[i + 1], img2.data[i + 2], 255];
  return [img2.data[i], img2.data[i + 1], img2.data[i + 2], img2.data[i + 3]];
};

// src/utils/gamekee/scope.ts
var median = (values) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};
var components = (mask, width, height) => {
  const seen = Array.from({ length: height }, () => new Array(width).fill(false));
  const out = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (seen[y][x] || !mask[y][x]) continue;
      const stack = [[x, y]];
      seen[y][x] = true;
      let minX = x;
      let maxX = x;
      let minY = y;
      let maxY = y;
      let area = 0;
      while (stack.length) {
        const [cx, cy] = stack.pop();
        area++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        for (const [dx, dy] of [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1]
        ]) {
          const nx = cx + dx;
          const ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          if (seen[ny][nx] || !mask[ny][nx]) continue;
          seen[ny][nx] = true;
          stack.push([nx, ny]);
        }
      }
      out.push({ minX, maxX, minY, maxY, area });
    }
  }
  return out;
};
var cluster = (values, tol) => {
  const sorted = [...values].sort((a, b) => a - b);
  const groups = [];
  for (const value of sorted) {
    const last = groups[groups.length - 1];
    if (last && value - last[last.length - 1] <= tol) last.push(value);
    else groups.push([value]);
  }
  return groups.map((group) => group.reduce((a, b) => a + b, 0) / group.length);
};
var sizeOf = (comp) => [
  comp.maxX - comp.minX + 1,
  comp.maxY - comp.minY + 1
];
var midX = (comp) => (comp.minX + comp.maxX) / 2;
var midY = (comp) => (comp.minY + comp.maxY) / 2;
var fitAxis = (centers) => {
  if (centers.length < 2) return null;
  const gaps = centers.slice(1).map((value, index) => value - centers[index]).filter((v) => v > 1);
  if (!gaps.length) return null;
  const pitch = Math.min(...gaps);
  if (pitch < 5) return null;
  const min = centers[0];
  const n = Math.round((centers[centers.length - 1] - min) / pitch) + 1;
  if (n < 3 || n > 30) return null;
  const out = [];
  for (const center of centers) {
    const k = Math.round((center - min) / pitch);
    if (k < 0 || k >= n || Math.abs(center - (min + k * pitch)) > pitch * 0.25) return null;
    out[k] = center;
  }
  for (let i = 0; i < n; i++) if (out[i] === void 0) out[i] = min + i * pitch;
  return { n, pitch, centers: out };
};
var isAccent = (r, g, b, a) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return a >= 60 && max >= 100 && max - min >= 50;
};
var sortCells = (cells) => {
  const angle = (cell) => (360 - (Math.atan2(cell[1], cell[0]) * 180 / Math.PI + 90 + 360) % 360) % 360;
  const rest = cells.filter((cell) => !(cell[0] === 0 && cell[1] === 0)).sort((a, b) => angle(a) - angle(b) || Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));
  const hasOrigin = cells.some((cell) => cell[0] === 0 && cell[1] === 0);
  return hasOrigin ? [[0, 0], ...rest] : rest;
};
var analyzeScope = (img2) => {
  const { width, height } = img2;
  const accent = [];
  const cellMask = [];
  for (let y = 0; y < height; y++) {
    accent.push([]);
    cellMask.push([]);
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixel(img2, x, y);
      const hit = isAccent(r, g, b, a);
      accent[y].push(hit);
      cellMask[y].push(
        !hit && Math.abs(r - 49) <= 5 && Math.abs(g - 53) <= 5 && Math.abs(b - 60) <= 5
      );
    }
  }
  const cellComps = components(cellMask, width, height).filter((comp) => {
    const [cw, ch] = sizeOf(comp);
    return cw >= 5 && ch >= 5 && comp.area >= 20 && cw <= width * 0.6 && ch <= height * 0.6;
  });
  const accentComps = components(accent, width, height).filter((comp) => comp.area >= 18);
  const accentPixels = accentComps.reduce((sum, comp) => sum + comp.area, 0);
  if (!accentPixels) return { kind: "self", cells: [[0, 0]], size: 0 };
  const cw0 = median(cellComps.map((comp) => sizeOf(comp)[0])) || median(accentComps.map((c) => sizeOf(c)[0]));
  const ch0 = median(cellComps.map((comp) => sizeOf(comp)[1])) || median(accentComps.map((c) => sizeOf(c)[1]));
  const shaped = (comp) => {
    const [cw, ch] = sizeOf(comp);
    return cw >= cw0 * 0.5 && cw <= cw0 * 1.6 && ch >= ch0 * 0.5 && ch <= ch0 * 1.6 && comp.area >= cw * ch * 0.5;
  };
  const gridComps = [...cellComps, ...accentComps.filter(shaped)];
  const tol = Math.max(3, Math.min(cw0, ch0) * 0.4);
  const fx = fitAxis(cluster(gridComps.map(midX), tol));
  const fy = fitAxis(cluster(gridComps.map(midY), tol));
  if (!fx || !fy || fx.n !== fy.n) {
    return cellComps.length ? { kind: "all", cells: [], size: 0 } : { kind: "self", cells: [[0, 0]], size: 0 };
  }
  const n = fx.n;
  const halfW = Math.max(2, fx.pitch * 0.32);
  const halfH = Math.max(2, fy.pitch * 0.32);
  const stats = (col, row) => {
    const x0 = Math.round(fx.centers[col] - halfW);
    const x1 = Math.round(fx.centers[col] + halfW);
    const y0 = Math.round(fy.centers[row] - halfH);
    const y1 = Math.round(fy.centers[row] + halfH);
    const vals = [];
    let hit = 0;
    let total = 0;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const [r, g, b, a] = pixel(img2, x, y);
        const max = Math.max(r, g, b);
        total++;
        if (isAccent(r, g, b, a)) {
          hit++;
          vals.push(max);
        }
      }
    }
    const base = vals.length ? median(vals) : 60;
    const darkLimit = Math.max(25, base * 0.55);
    let dark = 0;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const [r, g, b] = pixel(img2, x, y);
        if (Math.max(r, g, b) <= darkLimit) dark++;
      }
    }
    return { cov: hit / Math.max(1, total), dark: dark / Math.max(1, total) };
  };
  const solid = [];
  let origin = null;
  let darkest = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const stat = stats(col, row);
      if (stat.cov < 0.5) continue;
      solid.push([col, row]);
      if (stat.dark > darkest) {
        darkest = stat.dark;
        origin = [col, row];
      }
    }
  }
  if (!solid.length) {
    return cellComps.length ? { kind: "all", cells: [], size: n } : { kind: "self", cells: [[0, 0]], size: n };
  }
  if (!origin) {
    const center = (n - 1) / 2;
    origin = [...solid].sort(
      (a, b) => Math.hypot(a[0] - center, a[1] - center) - Math.hypot(b[0] - center, b[1] - center)
    )[0];
  }
  const [ox, oy] = origin;
  const cells = solid.map(([col, row]) => [col - ox, oy - row]);
  return { kind: "grid", cells: sortCells(cells), size: n };
};

// scripts/tmp-scope.ts
var headers = {
  "game-alias": "zsca2",
  Origin: "https://www.gamekee.com/",
  Referer: "https://www.gamekee.com/"
};
var url = "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_67/h_66/497891/2026/9/20/00945209mvgfqoiw.png";
var res = await fetch(url, { headers });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
var buf = new Uint8Array(await res.arrayBuffer());
writeFileSync("scripts/.build/wiki-skill2-0.png", buf);
var img = await decodePng(buf);
console.log("skill2 wiki +0 analyzeScope:", JSON.stringify(analyzeScope(img)));
var isMark = (r, g, b) => b > r + 8 && g > r + 3 && b > 40;
for (const [name, path] of [
  ["uploaded", "C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png"],
  ["wiki-skill1-0", "scripts/.build/wiki-skill1-0.png"],
  ["wiki-skill2-0", "scripts/.build/wiki-skill2-0.png"]
]) {
  const im = await decodePng(new Uint8Array(readFileSync(path)));
  const marks = [];
  for (let y = 0; y < im.height; y++) {
    for (let x = 0; x < im.width; x++) {
      const [r, g, b] = pixel(im, x, y);
      if (isMark(r, g, b)) marks.push(`${x},${y}`);
    }
  }
  console.log(`${name} mark pixels:`, marks.join(" ") || "(none)");
}
