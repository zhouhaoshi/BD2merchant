// utils/loadPlugins.js
async function getAllWarcraft() {
  // 使用 Vite 的 import.meta.glob 动态匹配所有 .js 文件
  const modules = import.meta.glob('@/utils/warcraft/*.ts') as Record<
    string,
    () => Promise<{ default: unknown }>
  >
  const warcraftList = {} as Record<string, characterDataObj>
  // 遍历每个匹配到的模块路径
  for (const [filePath, importer] of Object.entries(modules)) {
    try {
      const module = await importer() // 动态加载模块
      // 假设每个文件都导出了 default，或者整个 module 作为内容
      const characterData = (module.default || module) as characterDataObj // 获取ts中内容
      const characterKey = filePath.split('/').pop()?.replace('.ts', '') as string // 获取文件名作为键
      warcraftList[characterKey] = characterData
    } catch (err) {
      console.warn(`Failed to load plugin: ${filePath}`, err)
    }
  }
  return warcraftList // 返回一个包含所有插件的数组
}

const warcraftList = await getAllWarcraft()
export default warcraftList
