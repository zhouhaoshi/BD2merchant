<template>
  <!-- 属性筛选  ----- 新增角色 ---- 新增角色皮肤 ---- 皮肤填写数据（?待定） --- 技能访问用二维坐标记录，攻击点为原点（0，0）左x-1右x+1 前y+1后y-1 -->
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

const store = useCharacterStore()

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
