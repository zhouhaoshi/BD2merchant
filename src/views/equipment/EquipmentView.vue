<template>
  <!-- 装备管理：按部位 / 类型 / 专属角色 / 名称筛选 -->
  <div class="page_header">
    <div>
      <div class="page_title">装备管理</div>
      <div class="page_subtitle">
        共收录 {{ store.equipmentList.length }} 件装备<span v-if="store.updateTime">
          · 数据来源：{{ store.fromLocal ? '本地文件' : '在线（' + store.updateTime + '）' }}</span
        >
      </div>
    </div>
    <div class="header_actions">
      <el-button v-if="!isUse()" type="primary" :loading="savingLocal" @click="saveToLocal">
        抓取并保存到本地
      </el-button>
      <el-button :icon="Refresh" :loading="store.loading" @click="store.loadEquipment(true)">
        刷新
      </el-button>
    </div>
  </div>

  <div class="filter_card">
    <div class="filter_body">
      <div class="filter_group">
        <el-input
          v-model="filter.keyword"
          class="search_input"
          placeholder="搜索装备名 / 专属角色"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="filter_group">
        <span class="filter_label">部位</span>
        <el-segmented v-model="filter.part" :options="partOptions" />
      </div>
      <div class="filter_group">
        <span class="filter_label">类型</span>
        <el-segmented v-model="filter.type" :options="typeOptions" />
      </div>
      <div class="filter_group">
        <span class="filter_label">专属</span>
        <el-segmented v-model="filter.exclusive" :options="exclusiveOptions" />
      </div>
      <div class="filter_count">
        显示 <b>{{ filteredList.length }}</b> / {{ store.equipmentList.length }} 件
      </div>
      <el-button link type="primary" @click="resetFilter">重置</el-button>
    </div>
  </div>

  <el-card v-loading="store.loading" class="equipment_list">
    <div
      v-for="value in filteredList"
      :key="value.content_id"
      @click="clickEquipment(value)"
      class="equipment_box"
    >
      <div class="img_box">
        <el-image :src="equipmentImageUrl(value.icon1)" fit="contain" lazy>
          <template #error>
            <div class="img_placeholder"><img :src="placeholderImg" alt="" /></div>
          </template>
        </el-image>
      </div>
      <div class="eq_name">{{ value.name }}</div>
      <div class="tag_row">
        <span class="tag" :style="tagStyle(partMeta[value.part])">
          {{ partMeta[value.part]?.label || value.part }}
        </span>
        <span class="tag" :style="tagStyle(typeMeta[value.type])">
          {{ typeMeta[value.type]?.label || value.type }}
        </span>
        <span v-if="value.roleName" class="tag role_tag">{{ value.roleName }} 专属</span>
      </div>
    </div>

    <!-- 加载失败空态 -->
    <el-empty
      v-if="!store.loading && store.error && !store.equipmentList.length"
      class="empty_box"
      :image="emptyImage"
      :image-size="200"
      :description="`装备数据加载失败：${store.error}`"
    >
      <el-button type="primary" @click="store.loadEquipment(true)">重新加载</el-button>
    </el-empty>

    <!-- 筛选无结果空态 -->
    <el-empty
      v-if="!store.loading && !store.error && !filteredList.length"
      class="empty_box"
      :image="emptyImage"
      :image-size="200"
      description="没有符合条件的装备，试试调整筛选条件"
    />

    <EquipmentDetails
      :data="selectedEquipment"
      :dialogVisible="dialogVisible"
      @close="detailsClose()"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import EquipmentDetails from './EquipmentDetails.vue'
import api from '@/api/api'
import { equipmentImageUrl, fetchEquipmentList } from '@/utils/equipment'
import { isUse } from '@/utils/localService'
import { useEquipmentStore } from '@/stores/equipment'
import emptyImage from '@/assets/img/empty-characters.png'
import placeholderImg from '@/assets/img/icon_resource60005_88.webp'

const store = useEquipmentStore()

/* ===== 抓取 wiki 并保存到本地（和角色抓取一致） ===== */
/** 部位 -> 本地文件名（src/utils/equipmentData/*.ts） */
const PART_FILE_MAP: Record<string, string> = {
  武器: 'weapon',
  盔甲: 'armor',
  头盔: 'helmet',
  饰品: 'accessory',
  手套: 'glove',
}
const savingLocal = ref(false)
const saveToLocal = async () => {
  savingLocal.value = true
  try {
    // 直接请求 wiki 装备接口，跳过本地文件与缓存
    const { list } = await fetchEquipmentList(true)
    const saved: string[] = []
    for (const [part, fileName] of Object.entries(PART_FILE_MAP)) {
      const items = list.filter((item) => item.part === part)
      const header = [
        '// 本文件由「装备管理」页面自动生成，数据源：gamekee wiki（zsca2 图鉴）',
        `// 部位：${part}　共 ${items.length} 件`,
        '',
      ].join('\n')
      const content = `${header}export default ${JSON.stringify(items, null, 2)} as equipmentDataObj[]
`
      const res = await api.equipmentSave({ fileName, content })
      if (res?.code !== 200) throw new Error(res?.message || '保存失败')
      saved.push(`${fileName} ${items.length} 件`)
    }
    // 保存完成后重新加载，页面切换到本地文件数据
    await store.loadEquipment()
    ElMessage.success(`已从 wiki 抓取并保存到 src/utils/equipmentData：${saved.join('，')}`)
  } catch (error) {
    ElMessage.error(`抓取保存失败：${(error as Error).message}`)
  } finally {
    savingLocal.value = false
  }
}

/* ===== 筛选 ===== */
const filter = reactive({
  keyword: '',
  part: 'all',
  type: 'all',
  exclusive: 'all',
})

const partOptions = [
  { label: '全部', value: 'all' },
  { label: '武器', value: '武器' },
  { label: '盔甲', value: '盔甲' },
  { label: '头盔', value: '头盔' },
  { label: '饰品', value: '饰品' },
  { label: '手套', value: '手套' },
]
const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '制作', value: '制作' },
  { label: '专用', value: '专用' },
  { label: '魔兽', value: '魔兽' },
]
const exclusiveOptions = [
  { label: '全部', value: 'all' },
  { label: '专属', value: 'dedicated' },
  { label: '通用', value: 'general' },
]

/** 部位 / 类型的展示元数据 */
const partMeta: Record<string, { label: string; color: string }> = {
  武器: { label: '武器', color: '#b45309' },
  盔甲: { label: '盔甲', color: '#334155' },
  头盔: { label: '头盔', color: '#0e7490' },
  饰品: { label: '饰品', color: '#c9a45c' },
  手套: { label: '手套', color: '#4d7c0f' },
}
const typeMeta: Record<string, { label: string; color: string }> = {
  制作: { label: '制作', color: 'var(--app-primary)' },
  专用: { label: '专用', color: 'var(--app-gold)' },
  魔兽: { label: '魔兽', color: '#7c3aed' },
}

/** 生成标签色（通过 CSS 变量 --tag-color 传递） */
const tagStyle = (meta?: { label: string; color: string }) =>
  `--tag-color: ${meta?.color || 'var(--app-text-weak)'}`

const filteredList = computed(() => {
  const keyword = filter.keyword.trim().toLowerCase()
  return store.equipmentList.filter((item) => {
    if (filter.part !== 'all' && item.part !== filter.part) return false
    if (filter.type !== 'all' && item.type !== filter.type) return false
    if (filter.exclusive === 'dedicated' && !item.roleName) return false
    if (filter.exclusive === 'general' && item.roleName) return false
    if (keyword && !`${item.name}${item.roleName}`.toLowerCase().includes(keyword)) return false
    return true
  })
})

const resetFilter = () => {
  filter.keyword = ''
  filter.part = 'all'
  filter.type = 'all'
  filter.exclusive = 'all'
}

/* ===== 详情弹窗 ===== */
const selectedEquipment = ref<equipmentDataObj>()
const dialogVisible = ref<boolean>(false)
const clickEquipment = (value: equipmentDataObj) => {
  selectedEquipment.value = value
  dialogVisible.value = true
}
const detailsClose = () => {
  dialogVisible.value = false
  selectedEquipment.value = undefined
}

onMounted(() => {
  if (!store.equipmentList.length) store.loadEquipment()
})
</script>

<style lang="less" scoped>
.header_actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.search_input {
  width: 220px;
}
.equipment_list {
  :deep(.el-card__body) {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    min-height: 200px;
  }
  .empty_box {
    width: 100%;
  }
}
.equipment_box {
  width: 168px;
  padding: 16px 12px 12px;
  text-align: center;
  cursor: pointer;
  background: var(--app-card);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  transition: var(--app-transition);
  &:hover {
    transform: translateY(-4px);
    border-color: var(--el-color-primary-light-7);
    box-shadow: var(--app-shadow-hover);
  }
  .img_box {
    width: 110px;
    height: 110px;
    margin: 0 auto 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(160deg, var(--el-color-primary-light-9), #f6f8ff);
    border-radius: var(--app-radius-sm);
    overflow: hidden;
    :deep(.el-image) {
      width: 110px;
      height: 110px;
    }
  }
  .eq_name {
    font-size: 15px;
    font-weight: 600;
    color: var(--app-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tag_row {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }
  .tag {
    --tag-color: var(--app-text-weak);
    display: inline-block;
    padding: 2px 8px;
    font-size: 11px;
    line-height: 16px;
    border-radius: 999px;
    color: var(--tag-color);
    background: color-mix(in srgb, var(--tag-color) 12%, transparent);
  }
  .role_tag {
    --tag-color: var(--app-navy);
  }
}
.img_placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 56px;
    opacity: 0.5;
  }
}
</style>
