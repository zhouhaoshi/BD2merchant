// 临时脚本：ancilla 战场狂喜原始行
import type { WikiDetailResponse } from '../src/utils/gamekee/types'
import { cellText } from '../src/utils/gamekee/parse'

const HEADERS = {
  'game-alias': 'zsca2',
  Origin: 'https://www.gamekee.com/',
  Referer: 'https://www.gamekee.com/',
}
const raw = await (await fetch('https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/718485.json', { headers: HEADERS })).json() as WikiDetailResponse
const content = JSON.parse(raw.content)
content.styleData.forEach((skin: { data: { value?: string | number }[][] }, i: number) => {
  console.log(`===== skin ${i} =====`)
  skin.data.forEach((row) => {
    console.log('  ' + row.map((c) => cellText(c)).join(' | '))
  })
})
