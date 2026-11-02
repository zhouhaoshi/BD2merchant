// scripts/tmp-compare-scopes.ts
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

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
var decodePng = async (buf) => {
  if (buf.length < 8 || buf[0] !== 137 || buf[1] !== 80) throw new Error("\u4E0D\u662F PNG \u6570\u636E");
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 8;
  let colorType = 6;
  const idat = [];
  let palette;
  let trns;
  while (pos + 8 <= buf.length) {
    const len = readU32(buf, pos);
    const type = String.fromCharCode(buf[pos + 4], buf[pos + 5], buf[pos + 6], buf[pos + 7]);
    const data = buf.subarray(pos + 8, pos + 8 + len);
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
var pixel = (img, x, y) => {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return [0, 0, 0, 0];
  const i = (y * img.width + x) * img.channels;
  if (img.colorType === 3) {
    if (!img.palette) return [0, 0, 0, 0];
    const index = img.data[i];
    const alpha = img.trns && index < img.trns.length ? img.trns[index] : 255;
    return [img.palette[index * 3], img.palette[index * 3 + 1], img.palette[index * 3 + 2], alpha];
  }
  if (img.channels === 1) return [img.data[i], img.data[i], img.data[i], 255];
  if (img.channels === 2) return [img.data[i], img.data[i], img.data[i], img.data[i + 1]];
  if (img.channels === 3) return [img.data[i], img.data[i + 1], img.data[i + 2], 255];
  return [img.data[i], img.data[i + 1], img.data[i + 2], img.data[i + 3]];
};

// scripts/tmp-compare-scopes.ts
var HEADERS = {
  "game-alias": "zsca2",
  Origin: "https://www.gamekee.com/",
  Referer: "https://www.gamekee.com/"
};
var WIKI_IMAGES = [
  ["+0", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/63042813mtb4ntyv.png"],
  ["+1", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/22396325mtb4nujo.png"],
  ["+2", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/22191951mtb4nv2n.png"],
  ["+3", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/04550725mtb4nvxo.png"],
  ["+4", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/12463032mtb4nx1i.png"],
  ["+5", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/43719448mtb4nxxf.png"],
  ["\u6EE1\u7834", "https://cdnimg-v2.gamekee.com/wiki2.0/pro/50118/images/w_64/h_70/497891/2026/7/27/46523328mtb4nyeo.png"]
];
var uploadBuf = new Uint8Array(
  readFileSync(
    "C:/Users/11707/.qoder/tmp/e--Browndust2Mod-BD2merchant/images/ebe7a7b4-ac19-44b0-9bad-15ad9ff6f7aa/f7f30a48-b64a-4670-88b3-135311100a71.png"
  )
);
var upload = await decodePng(uploadBuf);
console.log(`upload: ${upload.width}x${upload.height}`);
mkdirSync("scripts/.build/ancilla-scopes", { recursive: true });
var diff = (a, b) => {
  if (a.width !== b.width || a.height !== b.height) return -1;
  let count = 0;
  for (let y = 0; y < a.height; y++) {
    for (let x = 0; x < a.width; x++) {
      const [ar, ag, ab] = pixel(a, x, y);
      const [br, bg, bb] = pixel(b, x, y);
      if (ar !== br || ag !== bg || ab !== bb) count++;
    }
  }
  return count;
};
for (const [label, url] of WIKI_IMAGES) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    console.log(`${label}: HTTP ${res.status}`);
    continue;
  }
  const buf = new Uint8Array(await res.arrayBuffer());
  const file = join("scripts/.build/ancilla-scopes", `wiki-${label}.png`);
  writeFileSync(file, buf);
  const img = await decodePng(buf);
  const d = diff(upload, img);
  console.log(`${label}: ${img.width}x${img.height} \u4E0E\u4E0A\u4F20\u56FE\u5DEE\u5F02\u50CF\u7D20: ${d === -1 ? "\u5C3A\u5BF8\u4E0D\u540C" : d}`);
}
