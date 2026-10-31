<template>
  <!-- 角色管理：按元素 / 攻击属性 / 攻击类型 / 名称筛选 -->
  <div class="page_header">
    <div>
      <div class="page_title">角色管理</div>
      <div class="page_subtitle">共收录 {{ characterArray.length }} 位角色</div>
    </div>
  </div>

  <div class="filter_card">
    <div class="filter_body">
      <div class="filter_group">
        <el-input
          v-model="filter.keyword"
          class="search_input"
          placeholder="搜索角色名 / 英文名"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="filter_group">
        <span class="filter_label">元素</span>
        <el-segmented v-model="filter.element" :options="elementOptions" />
      </div>
      <div class="filter_group">
        <span class="filter_label">攻击属性</span>
        <el-segmented v-model="filter.attackAttribute" :options="attributeOptions" />
      </div>
      <div class="filter_group">
        <span class="filter_label">攻击类型</span>
        <el-segmented v-model="filter.attackType" :options="typeOptions" />
      </div>
      <div class="filter_group">
        <span class="filter_label">星级</span>
        <el-segmented v-model="filter.star" :options="starOptions" />
      </div>
      <div class="filter_count">
        显示 <b>{{ filteredList.length }}</b> / {{ characterArray.length }} 位
      </div>
      <el-button link type="primary" @click="resetFilter">重置</el-button>
    </div>
  </div>

  <el-card class="charactar_list">
    <div
      v-for="value in filteredList"
      :key="value.name"
      @click="clickCharacter(value)"
      class="character_box"
    >
      <div class="img_box">
        <img
          :src="splicingqImage(value.Skill[Object.keys(value.Skill)[0]].qimage, 'qimage')"
          alt=""
        />
      </div>
      <div v-if="value.star" class="star_line">{{ '★'.repeat(value.star) }}</div>
      <div class="c_name">{{ value.cName }}</div>
      <div class="e_name">{{ value.name }}</div>
      <div class="tag_row">
        <span class="tag" :style="tagStyle(elementMeta[value.element])">
          {{ elementMeta[value.element]?.label || value.element }}
        </span>
        <span
          v-if="attributeMeta[value.attackAttribute ?? '']"
          class="tag"
          :style="tagStyle(attributeMeta[value.attackAttribute ?? ''])"
        >
          {{ attributeMeta[value.attackAttribute ?? ''].label }}
        </span>
        <span
          v-if="typeMeta[value.attackType]"
          class="tag"
          :style="tagStyle(typeMeta[value.attackType])"
        >
          {{ typeMeta[value.attackType].label }}
        </span>
      </div>
    </div>
    <el-empty
      v-if="!filteredList.length"
      class="empty_box"
      :image="emptyImage"
      :image-size="200"
      description="没有符合条件的角色，试试调整筛选条件"
    />
    <CharactarDetails
      :data="charactarData"
      :dialogVisible="dialogVisible"
      ref="charactarDetails"
      @close="charactarDetailsClose()"
    />
  </el-card>
</template>

<script lang="ts" setup>
import CharactarDetails from './charactarDetails.vue'
import { splicingqImage, isEmpty } from '@/utils/utils'
import { setCharacterList } from '@/utils/allCharacter'
import { useCharacterStore } from '@/stores/character'
import emptyImage from '@/assets/img/empty-characters.png'

const store = useCharacterStore()

const characterArray = computed(() => Object.values(store.characterList))

/* ===== 筛选 ===== */
const filter = reactive({
  keyword: '',
  element: 'all',
  attackAttribute: 'all',
  attackType: 'all',
  star: 'all',
})

const elementOptions = [
  { label: '全部', value: 'all' },
  { label: '光', value: 'light' },
  { label: '暗', value: 'dark' },
  { label: '火', value: 'fire' },
  { label: '风', value: 'wind' },
  { label: '水', value: 'water' },
]
const attributeOptions = [
  { label: '全部', value: 'all' },
  { label: '物理', value: 'atk' },
  { label: '魔法', value: 'matk' },
]
const typeOptions = [
  { label: '全部', value: 'all' },
  { label: '前卫', value: 'front' },
  { label: '跳跃', value: 'skip' },
]
const starOptions = [
  { label: '全部', value: 'all' },
  { label: '5★', value: '5' },
  { label: '4★', value: '4' },
  { label: '3★', value: '3' },
]

/** 元素 / 攻击属性 / 攻击类型 的展示元数据 */
const elementMeta: Record<string, { label: string; color: string }> = {
  light: { label: '光', color: 'var(--element-light)' },
  dark: { label: '暗', color: 'var(--element-dark)' },
  fire: { label: '火', color: 'var(--element-fire)' },
  wind: { label: '风', color: 'var(--element-wind)' },
  water: { label: '水', color: 'var(--element-water)' },
}
const attributeMeta: Record<string, { label: string; color: string }> = {
  atk: { label: '物理', color: '#b45309' },
  matk: { label: '魔法', color: 'var(--app-primary)' },
}
const typeMeta: Record<string, { label: string; color: string }> = {
  front: { label: '前卫', color: '#0e7490' },
  skip: { label: '跳跃', color: '#9a3412' },
}

/** 生成标签色（通过 CSS 变量 --tag-color 传递） */
const tagStyle = (meta?: { label: string; color: string }) =>
  `--tag-color: ${meta?.color || 'var(--app-text-weak)'}`

const filteredList = computed(() => {
  const keyword = filter.keyword.trim().toLowerCase()
  return characterArray.value.filter((item) => {
    if (filter.element !== 'all' && item.element !== filter.element) return false
    if (filter.attackAttribute !== 'all' && item.attackAttribute !== filter.attackAttribute)
      return false
    if (filter.attackType !== 'all' && item.attackType !== filter.attackType) return false
    if (filter.star !== 'all' && String(item.star ?? '') !== filter.star) return false
    if (keyword && !`${item.cName}${item.name}`.toLowerCase().includes(keyword)) return false
    return true
  })
})

const resetFilter = () => {
  filter.keyword = ''
  filter.element = 'all'
  filter.attackAttribute = 'all'
  filter.attackType = 'all'
  filter.star = 'all'
}

/* ===== 详情弹窗 ===== */
const charactarData = ref<characterDataObj>()
const dialogVisible = ref<boolean>(false)
const clickCharacter = (value: characterDataObj) => {
  charactarData.value = value
  dialogVisible.value = true
}
const charactarDetailsClose = () => {
  dialogVisible.value = false
  charactarData.value = undefined
}
onMounted(async () => {
  if (isEmpty(store.characterList)) {
    const characterList = await setCharacterList()
    store.setCharacterList(characterList)
  }
})
</script>

<style lang="less" scoped>
.search_input {
  width: 220px;
}
.charactar_list {
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
.character_box {
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
    & > img {
      width: 110px;
    }
  }
  .star_line {
    font-size: 12px;
    letter-spacing: 2px;
    color: var(--app-gold);
    margin-bottom: 2px;
  }
  .c_name {
    font-size: 16px;
    font-weight: 600;
    color: var(--app-text);
  }
  .e_name {
    margin-top: 2px;
    font-size: 12px;
    color: var(--app-text-weak);
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
}
</style>
