<template>
  <el-dialog
    :model-value="dialogVisible"
    title="角色选择"
    :before-close="BeforeClose"
    style="width: 80%"
    append-to-body
  >
    <el-tabs v-model="currentTeam" class="team_tabs">
      <el-tab-pane v-for="teamIndex in teamNumber" :key="teamIndex" :label="`队伍${teamIndex}`">
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
    <el-card class="charactar_list">
      <div
        v-for="value in store.characterList"
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
        <div>
          {{ value.cName }}
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
}>()
const emit = defineEmits(['close'])

const dialogValue = ref<boolean>(false)
const charactarConfiguration = ref()
const currentTeam = ref(1) // 当前队伍（1 起）
// 多队角色数据
const teamList = ref<Record<number, Record<string, selectCharacterDataObj>>>(
  JSON.parse(JSON.stringify(props.selectCharactarList || {})),
)
// 当前队伍的角色
const teamCharactarList = (teamIndex: number) =>
  Object.values(teamList.value[teamIndex] || {}) as selectCharacterDataObj[]

const clickCharacter = (value: characterDataObj) => {
  if (teamCharactarList(currentTeam.value - 1).length >= props.teamLimit) {
    ElMessage.warning(`队伍${currentTeam.value}已满（上限${props.teamLimit}人）`)
    return
  }
  dialogValue.value = true
  charactarData.value = value
  charactarConfiguration.value.initEditData(
    teamList.value[currentTeam.value - 1]?.[value.name],
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
  if (!teamList.value[currentTeam.value - 1]) {
    teamList.value[currentTeam.value - 1] = {}
  }
  teamList.value[currentTeam.value - 1][charactarData.name] = charactarData
}
const deleteCharactar = (key: string) => {
  delete teamList.value[currentTeam.value - 1][key]
}
</script>

<style lang="less" scoped>
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
  &:hover {
    .icon_delete {
      opacity: 1;
    }
  }
  .icon_delete {
    position: absolute;
    right: 5px;
    top: 5px;
    color: red;
    opacity: 0;
    transition: opacity 0.3s;
  }
}
.team_character_box + .team_character_box {
  margin-left: 10px;
}
.character_box {
  width: 150px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid var(--app-border);
  transition: var(--app-transition);
  border-radius: var(--app-radius);
  &:hover {
    transform: translateY(-4px);
    border-color: var(--el-color-primary-light-7);
    box-shadow: var(--app-shadow-hover);
  }
  .img_box {
    width: 118px;
    height: 118px;
    margin: auto;
    position: relative;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 118px;
      transform: translate(-50%, -50%);
    }
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
