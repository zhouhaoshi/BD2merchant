<template>
  <el-dialog
    :model-value="dialogVisible"
    title="角色选择"
    :before-close="BeforeClose"
    style="width: 80%"
    append-to-body
  >
    <div class="team_list">
      <div v-for="value in selectCharactarList" :key="value.name" class="team_character_box">
        <img
          :src="splicingqImage(value.Skill[Object.keys(value.Skill)[0]].qimage, 'qimage')"
          alt=""
        />
        <el-icon class="icon_delete" @click="deleteCharactar(value.name)"><Delete /></el-icon>
      </div>
    </div>
    <el-card class="charactar_list">
      <div
        v-for="value in characterList"
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
import CharactarConfiguration from './charactarConfiguration.vue'
import characterList from '@/utils/allCharacter'
import { splicingqImage } from '@/utils/utils'

defineProps(['dialogVisible'])
const emit = defineEmits(['close', 'select'])

const dialogValue = ref<boolean>(false)
const charactarConfiguration = ref()
const clickCharacter = (value: characterDataObj) => {
  dialogValue.value = true
  charactarData.value = value
  charactarConfiguration.value.initEditData(
    selectCharactarList.value[value.name],
    charactarData.value,
  )
}
const charactarDetailsClose = () => {
  dialogValue.value = false
}
const charactarData = ref<characterDataObj>()
const BeforeClose = () => {
  emit('close', selectCharactarList.value)
}
// 选择的队伍角色
const selectCharactarList = ref<Record<string, selectCharacterDataObj>>({})
const primary = (charactarData: selectCharacterDataObj) => {
  console.log(charactarData, '-------charactarData----------')
  if (charactarData.name in selectCharactarList.value) {
    selectCharactarList.value[charactarData.name] = charactarData
  } else {
    Reflect.set(selectCharactarList.value, charactarData.name, charactarData)
  }
}
const deleteCharactar = (key: string) => {
  delete selectCharactarList.value[key]
}
</script>

<style lang="less" scoped>
.team_list {
  margin-bottom: 20px;
  .team_character_box {
    width: 60px;
    height: 60px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    box-shadow: var(--el-box-shadow-light);
    transition: transform 0.2s;
    border-radius: 5px;
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
}
.character_box {
  width: 150px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  box-shadow: var(--el-box-shadow-light);
  transition: transform 0.2s;
  border-radius: 20px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--el-box-shadow);
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
    gap: 20px;
  }
}
</style>
