// 临时脚本：对比 venaka（觉醒遗漏）与 blade（皮肤遗漏）
import { parseCharacterDetail, parseCharacterTree } from '../src/utils/gamekee/index'
import type { GamekeeTreeResponse, WikiDetailResponse } from '../src/utils/gamekee/types'
import { cellText } from '../src/utils/gamekee/parse'

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

// 1. venaka（contentId 625113）
const venakaRaw = await requestJson<WikiDetailResponse>(
  'https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/625113.json',
)
const venaka = parseCharacterDetail(venakaRaw, { entryId: 152215, contentId: 625113 })
console.log('===== venaka =====')
venaka.skills.forEach((skill, index) => {
  console.log(`[skin${index + 1}] 服装: ${skill.costume} | 技能: ${skill.skillName}`)
  console.log(`  潜力(${skill.potentials.length}):`)
  skill.potentials.forEach((p, i) => console.log(`    潜力${i + 1}: ${p}`))
  console.log(`  爆发(${skill.burst.length}):`)
  skill.burst.forEach((b) => console.log(`    ${b.label}: sp=${b.sp} ${b.description}${b.scopeUrl ? ' [有范围图]' : ''}`))
})

// 2. blade（先找 tree 里的条目）
const tree = await requestJson<GamekeeTreeResponse>('https://www.gamekee.com/v1/entry/treesByPidV1?pid=194491')
const entries = parseCharacterTree(tree)
const bladeEntry = entries.find((e) => e.cName === '布莱德' || e.cName.includes('布莱德'))
console.log('\n===== blade =====')
console.log('tree 条目:', bladeEntry ? `${bladeEntry.cName} contentId=${bladeEntry.contentId} entryId=${bladeEntry.entryId} ${bladeEntry.star}星` : '未找到')
if (bladeEntry) {
  const bladeRaw = await requestJson<WikiDetailResponse>(
    `https://api-cdn.gamekee.com/wiki2.0/pro/50118/content/${bladeEntry.contentId}.json`,
  )
  const blade = parseCharacterDetail(bladeRaw, { entryId: bladeEntry.entryId, contentId: bladeEntry.contentId })
  blade.skills.forEach((skill, index) => {
    console.log(`[skin${index + 1}] 服装: ${skill.costume} | 技能: ${skill.skillName}`)
    console.log(`  +0 描述: ${(skill.levels[0]?.description || '').slice(0, 120)}`)
    console.log(`  sp=${skill.levels[0]?.sp} cd=${skill.levels[0]?.cd}`)
    console.log(`  潜力(${skill.potentials.length}):`)
    skill.potentials.forEach((p, i) => console.log(`    潜力${i + 1}: ${p}`))
    console.log(`  爆发(${skill.burst.length}):`)
    skill.burst.forEach((b) => console.log(`    ${b.label}: sp=${b.sp} ${b.description}`))
  })
  // 原始行 dump（看是否有解析遗漏的列）
  console.log('\n  styleData 原始行（前 60 行）:')
  bladeRaw && JSON.parse(bladeRaw.content).styleData.forEach((skin: { data: { value?: string | number }[][] }, si: number) => {
    console.log(`  --- style${si} ---`)
    skin.data.slice(0, 60).forEach((row) => {
      console.log('    ' + row.map((c) => cellText(c)).join(' | '))
    })
  })
}
