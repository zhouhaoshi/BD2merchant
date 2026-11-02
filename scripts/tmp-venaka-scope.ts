import { analyzeScope } from '../src/utils/gamekee/scope'
import { readFileSync } from 'node:fs'

for (const [name, path] of [
  ['base', 'scripts/.build/venaka-dj-scope.png'],
  ['pot3', 'scripts/.build/venaka-pot3.png'],
] as const) {
  const buf = readFileSync(path)
  const result = analyzeScope(buf)
  console.log(`===== ${name} (${path}) =====`)
  console.log(JSON.stringify(result, null, 2))
}
