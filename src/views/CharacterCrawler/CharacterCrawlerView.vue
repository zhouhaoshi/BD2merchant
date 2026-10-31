<template>
  <div class="page_header">
    <div>
      <div class="page_title">角色抓取</div>
      <div class="page_subtitle">从 gamekee 图鉴抓取角色数据并生成角色文件</div>
    </div>
  </div>
  <el-card class="crawler_page">
    <div class="toolbar">
      <el-input v-model="keyword" class="search" placeholder="搜索角色名 / 英文名" clearable />
      <el-checkbox-group v-model="stars">
        <el-checkbox :value="5">5★</el-checkbox>
        <el-checkbox :value="4">4★</el-checkbox>
        <el-checkbox :value="3">3★</el-checkbox>
      </el-checkbox-group>
      <el-checkbox v-model="hideExisting">隐藏已有文件</el-checkbox>
      <el-button :loading="loadingList" @click="loadList">刷新列表</el-button>
      <el-button
        :disabled="!selection.length || running"
        :loading="running"
        @click="grabSelected(false)"
      >
        抓取所选（{{ selection.length }}）
      </el-button>
      <el-button
        type="primary"
        :disabled="!selection.length || running"
        :loading="running"
        @click="grabSelected(true)"
      >
        抓取并保存
      </el-button>
    </div>

    <el-alert
      class="tip"
      type="info"
      :closable="false"
      show-icon
      title="数据来源：gamekee 图鉴（zsca2）。技能范围坐标由范围图自动识别；技能英文 key wiki 里没有，生成的文件里会留 TODO 注释，需要人工补。"
    />
    <el-progress v-if="progress.total" class="progress" :percentage="progressPercent">
      <span class="progress_text"
        >{{ progress.done }} / {{ progress.total }}　{{ progress.current }}</span
      >
    </el-progress>

    <el-table
      ref="tableRef"
      :data="filteredList"
      height="calc(100vh - 330px)"
      row-key="contentId"
      border
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="44" reserve-selection />
      <el-table-column label="头像" width="80">
        <template #default="{ row }">
          <el-image :src="row.icon" fit="contain" class="avatar" lazy>
            <template #error>
              <span class="avatar_empty">无图</span>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="cName" label="角色" width="140" />
      <el-table-column label="英文名" width="140">
        <template #default="{ row }">{{ row.alias || '—' }}</template>
      </el-table-column>
      <el-table-column label="星级" width="90">
        <template #default="{ row }">{{ row.star }}★</template>
      </el-table-column>
      <el-table-column label="分组" width="110">
        <template #default="{ row }">{{ row.group }}</template>
      </el-table-column>
      <el-table-column label="状态" width="170">
        <template #default="{ row }">
          <el-tag
            v-if="drafts[row.contentId]"
            :type="drafts[row.contentId].saved ? 'success' : 'warning'"
            size="small"
          >
            {{ drafts[row.contentId].saved ? '已保存' : '已生成待保存' }}
          </el-tag>
          <el-tag v-else-if="isExisting(row)" type="info" size="small">本地已有</el-tag>
          <span v-else class="empty">未抓取</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            :loading="busyId === row.contentId"
            @click="grab(row, false)"
          >
            抓取
          </el-button>
          <el-button link type="primary" @click="preview(row)">预览</el-button>
          <el-button link type="success" @click="previewAndSave(row)">生成并保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" :title="`预览：${currentName}`" width="76%" top="4vh">
    <div v-if="currentDraft" class="preview">
      <div class="preview_head">
        <span>文件名：</span>
        <el-input v-model="currentDraft.fileName" class="file_name" />
        <span class="suffix">.ts</span>
        <el-tag v-if="currentDraft.saved" type="success" size="small">已保存</el-tag>
      </div>
      <el-alert
        v-if="currentDraft.warnings.length"
        type="warning"
        :closable="false"
        show-icon
        class="warn"
        :title="`需要人工确认 ${currentDraft.warnings.length} 处`"
      >
        <div v-for="(warning, index) in currentDraft.warnings" :key="index" class="warn_item">
          {{ warning }}
        </div>
      </el-alert>
      <pre class="code">{{ currentDraft.code }}</pre>
      <div class="preview_desc">{{ currentDraft.summary }}</div>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" :loading="saving" @click="saveCurrent"
        >保存到 src/utils/character</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import api from '@/api/api'
import {
  fetchCharacter,
  fetchCharacterList,
  generateCharacterFile,
  summarizeCharacter,
  toFileName,
} from '@/utils/gamekee'
import type { CharacterEntry, ParsedCharacter } from '@/utils/gamekee'

interface Draft {
  fileName: string
  code: string
  summary: string
  warnings: string[]
  saved: boolean
}

/** 本地已有的角色文件 */
interface ExistingFile {
  fileName: string
  contentId: number | null
  cName: string
}

type Row = CharacterEntry

const allList = ref<Row[]>([])
const keyword = ref('')
const stars = ref<number[]>([5, 4, 3])
const hideExisting = ref(false)
const loadingList = ref(false)
const running = ref(false)
const saving = ref(false)
const busyId = ref<number | null>(null)
const existing = ref<ExistingFile[]>([])
const selection = ref<Row[]>([])
const tableRef = ref()
const drafts = reactive<Record<number, Draft>>({})
const progress = reactive({ total: 0, done: 0, current: '' })

const dialogVisible = ref(false)
const currentId = ref<number | null>(null)
const currentName = ref('')

const currentDraft = computed(() =>
  currentId.value === null ? undefined : drafts[currentId.value],
)

const progressPercent = computed(() =>
  progress.total ? Math.round((progress.done / progress.total) * 100) : 0,
)

/** 文件名统一小驼峰，和 generate.ts 的 toFileName 保持同一套规则 */
const toKey = (row: Row) => {
  const words = (row.alias || '')
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
  if (!words.length) return `char${row.contentId}`
  const camel = words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1)
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '')
  return /^[a-zA-Z]/.test(camel) ? camel : `char${row.contentId}`
}

/** 本地是否已有该角色：contentId / 中文名 / 文件名 任一命中都算 */
const isExisting = (row: Row) =>
  existing.value.some(
    (file) =>
      (file.contentId !== null && file.contentId === row.contentId) ||
      file.cName === row.cName ||
      file.fileName === toKey(row),
  )

const filteredList = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  return allList.value.filter((row) => {
    if (!stars.value.includes(row.star)) return false
    if (hideExisting.value && isExisting(row)) return false
    if (!text) return true
    return `${row.cName}${row.alias ?? ''}`.toLowerCase().includes(text)
  })
})

const onSelectionChange = (rows: Row[]) => {
  selection.value = rows
}

const loadExisting = async () => {
  try {
    const res = await api.characterList()
    existing.value = (res?.data as ExistingFile[]) ?? []
  } catch {
    existing.value = []
  }
}

const loadList = async () => {
  loadingList.value = true
  try {
    const [list] = await Promise.all([fetchCharacterList(), loadExisting()])
    allList.value = list
    ElMessage.success(`读到 ${allList.value.length} 个角色`)
  } catch (error) {
    ElMessage.error(`拉取角色列表失败：${(error as Error).message}`)
  } finally {
    loadingList.value = false
  }
}

/** 抓一个角色并生成文件内容 */
const build = async (row: Row): Promise<Draft> => {
  const parsed: ParsedCharacter = await fetchCharacter(row)
  const fileName = toFileName(parsed)
  const code = generateCharacterFile(parsed, fileName)
  return {
    fileName,
    code,
    summary: summarizeCharacter(parsed),
    warnings: parsed.warnings,
    saved: false,
  }
}

const grab = async (row: Row, saveAfter = false) => {
  busyId.value = row.contentId
  try {
    const draft = await build(row)
    drafts[row.contentId] = draft
    if (saveAfter) await save(row.contentId)
  } catch (error) {
    ElMessage.error(`${row.cName} 抓取失败：${(error as Error).message}`)
  } finally {
    busyId.value = null
  }
}

const grabSelected = async (saveAfter: boolean) => {
  if (!selection.value.length) return
  running.value = true
  progress.total = selection.value.length
  progress.done = 0
  progress.current = ''
  const failed: string[] = []
  for (const row of selection.value) {
    progress.current = row.cName
    try {
      const draft = await build(row)
      drafts[row.contentId] = draft
      progress.done += 1
      if (saveAfter) await save(row.contentId)
    } catch (error) {
      failed.push(`${row.cName}：${(error as Error).message}`)
    }
  }
  running.value = false
  progress.current = ''
  if (failed.length) {
    ElMessage.warning(`完成，但 ${failed.length} 个失败（见控制台）`)
    console.warn('[角色抓取] 失败列表', failed)
  } else {
    ElMessage.success(`完成 ${progress.done} 个角色`)
  }
  await loadExisting()
}

const save = async (contentId: number) => {
  const draft = drafts[contentId]
  if (!draft) return
  const fileName = draft.fileName.endsWith('.ts') ? draft.fileName : `${draft.fileName}.ts`
  saving.value = true
  try {
    const res = await api.characterSave({ fileName, content: draft.code })
    if (res?.code === 200) {
      draft.saved = true
      const key = fileName.replace(/\.ts$/, '')
      const row = allList.value.find((item) => item.contentId === contentId)
      const record: ExistingFile = {
        fileName: key,
        contentId,
        cName: row?.cName ?? '',
      }
      const rest = existing.value.filter(
        (item) => item.contentId !== contentId && item.fileName !== key,
      )
      existing.value = [...rest, record]
      ElMessage.success(`已保存 src/utils/character/${fileName}`)
    }
  } catch (error) {
    ElMessage.error(`保存失败：${(error as Error).message}`)
  } finally {
    saving.value = false
  }
}

const preview = async (row: Row) => {
  if (!drafts[row.contentId]) await grab(row)
  if (!drafts[row.contentId]) return
  currentId.value = row.contentId
  currentName.value = `${row.cName}（${drafts[row.contentId].fileName}）`
  dialogVisible.value = true
}

const previewAndSave = async (row: Row) => {
  await grab(row, true)
  if (drafts[row.contentId]) {
    currentId.value = row.contentId
    currentName.value = `${row.cName}（${drafts[row.contentId].fileName}）`
    dialogVisible.value = true
  }
}

const saveCurrent = async () => {
  if (currentId.value === null) return
  await save(currentId.value)
}

onMounted(async () => {
  await loadList()
})
</script>

<style lang="less" scoped>
.crawler_page {
  :deep(.el-card__body) {
    padding: 16px;
  }
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  .search {
    width: 220px;
  }
}
.tip {
  margin-bottom: 10px;
}
.progress {
  margin-bottom: 10px;
  .progress_text {
    font-size: 12px;
    color: var(--el-text-color-regular);
  }
}
.avatar {
  width: 48px;
  height: 48px;
  .avatar_empty {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
  }
}
.empty {
  color: var(--el-text-color-placeholder);
  font-size: 12px;
}
.preview {
  .preview_head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    .file_name {
      width: 220px;
    }
    .suffix {
      color: var(--el-text-color-secondary);
    }
  }
  .warn {
    margin-bottom: 10px;
    .warn_item {
      font-size: 12px;
      line-height: 1.7;
    }
  }
  .code {
    max-height: 54vh;
    overflow: auto;
    margin: 0;
    padding: 12px;
    border-radius: 8px;
    background: #1f2430;
    color: #d6deeb;
    font-size: 12px;
    line-height: 1.6;
  }
  .preview_desc {
    margin-top: 10px;
    white-space: pre-wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
  }
}
</style>
