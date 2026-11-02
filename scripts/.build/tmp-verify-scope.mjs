// scripts/tmp-verify-scope.ts
import { readFileSync } from "node:fs";

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

// scripts/tmp-verify-scope.ts
var buf = new Uint8Array(
  readFileSync(
    "C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png"
  )
);
var img = await decodePng(buf);
console.log(`size: ${img.width}x${img.height} channels: ${img.channels} colorType: ${img.colorType}`);
var classify = (x, y) => {
  const [r, g, b] = pixel(img, x, y);
  const max = Math.max(r, g, b);
  if (max < 40) return " ";
  if (r > 150 && g < 80 && b < 80) return "R";
  if (r > 70 && b > 70 && g < 90 && Math.abs(r - b) < 60) return "M";
  if (r > 180 && g > 120 && b > 90) return "F";
  if (r > 120 && g < 60 && b < 60) return "r";
  if (max > 120) return "?";
  if (max > 60) return ".";
  return "+";
};
for (let y = 0; y < img.height; y++) {
  let line = "";
  for (let x = 0; x < img.width; x++) line += classify(x, y);
  console.log(line);
}
var stats = {};
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 5; col++) {
    const key = `row${row} col${col}`;
    stats[key] = {};
    for (let y = 22 + row * 9; y < 22 + (row + 1) * 9; y++) {
      for (let x = 10 + col * 9; x < 10 + (col + 1) * 9; x++) {
        const c = classify(x, y);
        if (c !== " " && c !== "." && c !== "+") stats[key][c] = (stats[key][c] || 0) + 1;
      }
    }
  }
}
for (const [key, value] of Object.entries(stats)) {
  if (Object.keys(value).length) console.log(key, JSON.stringify(value));
}
