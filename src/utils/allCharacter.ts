// utils/loadPlugins.js
async function getAllCharacter() {
  // 使用 Vite 的 import.meta.glob 动态匹配所有 .js 文件
  const modules = import.meta.glob('@/utils/character/*.ts') as Record<
    string,
    () => Promise<{ default: unknown }>
  >
  const characterList = {} as Record<string, characterDataObj>
  // 遍历每个匹配到的模块路径
  for (const [filePath, importer] of Object.entries(modules)) {
    try {
      const module = await importer() // 动态加载模块
      // 假设每个文件都导出了 default，或者整个 module 作为内容
      const characterData = (module.default || module) as characterDataObj // 获取ts中内容
      const characterKey = filePath.split('/').pop()?.replace('.ts', '') as string // 获取文件名作为键
      characterList[characterKey] = characterData
    } catch (err) {
      console.warn(`Failed to load plugin: ${filePath}`, err)
    }
  }
  return characterList // 返回一个包含所有插件的数组
}
export let characterList: Record<string, characterDataObj> = {}
;(async () => {
  // 直接导出方法会导致页面卡死。只能导出数据
  characterList = await getAllCharacter()
})()
