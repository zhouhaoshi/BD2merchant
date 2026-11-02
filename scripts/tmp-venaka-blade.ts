// 临时脚本：venaka DJ 原始行 + blade 温泉剑客范围图解析
import { parseCharacterDetail } from '../src/utils/gamekee/index'
import type { WikiDetailResponse } from '../src/utils/gamekee/types'
import { cellText } from '../src/utils/gamekee/parse'
import { analyzeScope } from '../src/utils/gamekee/scope'
import { decodePng } from '../src/utils/gamekee/png'

const HEADERS = {
  'game-alias': 'zsca2',
  Origin: 'https://www.gamekee.com/',
  Referer: 'https://www.gamekee.com/',
}

const requestJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return (await res.json()) as T
}

// venaka DJ 原始行（技能效果表 + 技能潜力区）
const venakaRaw = await requestJson<WikiDetailResponse>(
  'https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/625113.json',
)
const venakaContent = JSON.parse(venakaRaw.content)
console.log('===== venaka style0 (DJ) 原始行 =====')
venakaContent.styleData[0].data.forEach((row: { value?: string | number }[]) => {
  console.log('  ' + row.map((c) => cellText(c)).join(' | '))
})

// blade 温泉剑客 +0 范围图
console.log('\n===== blade 温泉剑客 范围图 =====')
const scopeUrls = [
  'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_58/h_60/50118/497891/2026/0/29/178200.png',
  'https://cdnimg-v2.gamekee.com/wiki2.0/images/w_58/h_60/50118/497891/2026/0/29/931232.png',
]
for (const [i, url] of scopeUrls.entries()) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    console.log(`图${i}: HTTP ${res.status}`)
    continue
  }
  const img = await decodePng(new Uint8Array(await res.arrayBuffer()))
  const result = analyzeScope(img)
  console.log(`图${i} (${img.width}x${img.height}): kind=${result.kind} size=${result.size}`)
  console.log(`  cells: ${JSON.stringify(result.cells)}`)
}
