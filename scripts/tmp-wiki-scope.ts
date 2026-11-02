// 临时脚本：dump wiki 阿奇拉 style0（战场猛兽）的原始表格
const url = 'https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/718485.json'
const res = await fetch(url, {
  headers: {
    'game-alias': 'zsca2',
    Origin: 'https://www.gamekee.com/',
    Referer: 'https://www.gamekee.com/',
  },
})
const raw = await res.json()
const content = JSON.parse(raw.content)
const skin = (content.styleData || [])[0]
for (const [i, row] of (skin.data || []).entries()) {
  console.log(
    `row${i}:`,
    row.map((c) => JSON.stringify(c?.value ?? '')).join(' | '),
  )
}
