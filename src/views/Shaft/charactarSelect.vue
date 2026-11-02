<template>
  <el-dialog
    :model-value="dialogVisible"
    title="角色选择"
    :before-close="BeforeClose"
    style="width: 80%"
    append-to-body
  >
    <el-tabs v-model="currentTeam" class="team_tabs">
      <el-tab-pane
        v-for="teamIndex in teamNumber"
        :key="teamIndex"
        :label="`队伍${teamIndex} (${teamCharactarList(teamIndex - 1).length})`"
        :name="teamIndex - 1"
      >
        <div class="team_list">
          <div
            v-for="value in teamCharactarList(teamIndex - 1)"
            :key="value.name"
            class="team_character_box"
          >
            <img
              :src="splicingqImage(value.Skill[Object.keys(value.Skill)[0]].qimage, 'qimage')"
              alt=""
            />
            <el-icon class="icon_delete" @click="deleteCharactar(value.name)"><Delete /></el-icon>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 筛选：和角色管理一致 -->
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
          可选 <b>{{ filteredList.length }}</b> 位
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
      <CharactarConfiguration
        :data="charactarData"
        :dialogVisible="dialogValue"
        ref="charactarConfiguration"
        @close="charactarDetailsClose()"
        @primary="primary"
      />
    </el-card>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import CharactarConfiguration from './charactarConfiguration.vue'
import { splicingqImage } from '@/utils/utils'
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()
const props = defineProps<{
  dialogVisible: boolean
  mode: shaftMode // 轴类型
  teamNumber: number // 队伍数量
  teamLimit: number // 每队人数上限
  selectCharactarList?: Record<number, Record<string, selectCharacterDataObj>> // 已选队伍回显
  defaultTeam?: number // 主页面当前选中的队伍tab（0起）
}>()
const emit = defineEmits(['close'])

/* ===== 展示元数据（和角色管理一致） ===== */
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

/* ===== 筛选（和角色管理一致） ===== */
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

// 已被选入队伍的角色（所有队伍），从可选择列表中移除
const selectedNames = computed(() => {
  const names = new Set<string>()
  Object.values(teamList.value).forEach((team) => {
    Object.keys(team || {}).forEach((name) => names.add(name))
  })
  return names
})
const filteredList = computed(() => {
  const keyword = filter.keyword.trim().toLowerCase()
  return Object.values(store.characterList).filter((item) => {
    if (selectedNames.value.has(item.name)) return false
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

const dialogValue = ref<boolean>(false)
const charactarConfiguration = ref()
const currentTeam = ref(0) // 当前队伍（0 起）
// 多队角色数据
const teamList = ref<Record<number, Record<string, selectCharacterDataObj>>>(
  JSON.parse(JSON.stringify(props.selectCharactarList || {})),
)
// 弹窗打开时从主页面回显队伍数据，并同步主页面选中的队伍tab
watch(
  () => props.dialogVisible,
  (visible) => {
    if (!visible) return
    teamList.value = JSON.parse(JSON.stringify(props.selectCharactarList || {}))
    const team = props.defaultTeam ?? 0
    currentTeam.value = team >= 0 && team < props.teamNumber ? team : 0
  },
)
// 当前队伍的角色
const teamCharactarList = (teamIndex: number) =>
  Object.values(teamList.value[teamIndex] || {}) as selectCharacterDataObj[]

const clickCharacter = (value: characterDataObj) => {
  if (teamCharactarList(currentTeam.value).length >= props.teamLimit) {
    ElMessage.warning(`队伍${currentTeam.value + 1}已满（上限${props.teamLimit}人）`)
    return
  }
  dialogValue.value = true
  charactarData.value = value
  charactarConfiguration.value.initEditData(
    teamList.value[currentTeam.value]?.[value.name],
    charactarData.value,
  )
}
const charactarDetailsClose = () => {
  dialogValue.value = false
}
const charactarData = ref<characterDataObj>()
const BeforeClose = () => {
  emit('close', teamList.value)
}
// 配置弹窗确定后加入当前队伍
const primary = (charactarData: selectCharacterDataObj) => {
  if (!teamList.value[currentTeam.value]) {
    teamList.value[currentTeam.value] = {}
  }
  teamList.value[currentTeam.value][charactarData.name] = charactarData
}
const deleteCharactar = (key: string) => {
  delete teamList.value[currentTeam.value][key]
}
</script>

<style lang="less" scoped>
.search_input {
  width: 220px;
}
.team_tabs {
  margin-bottom: 20px;
  .team_list {
    margin-bottom: 12px;
  }
}
.team_character_box {
  width: 60px;
  height: 60px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  border: 1px solid var(--app-border);
  transition: var(--app-transition);
  border-radius: var(--app-radius-sm);
  position: relative;
  & > img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .icon_delete {
    position: absolute;
    right: 3px;
    top: 3px;
    color: #fff;
    background: rgba(245, 63, 63, 0.85);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
  }
}
.team_character_box + .team_character_box {
  margin-left: 10px;
}
.character_box {
  width: 168px;
  padding: 16px 12px 12px;
  text-align: center;
  cursor: pointer;
  background: var(--app-card);
  border: 1px solid var(--app-border);
  transition: var(--app-transition);
  border-radius: var(--app-radius);
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
.charactar_list {
  :deep(.el-card__body) {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
