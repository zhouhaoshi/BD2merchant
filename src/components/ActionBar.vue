<template>
  <div ref="ActionBarBox" class="action_bar_box">
    <el-popover
      placement="right"
      width="400"
      trigger="click"
      v-for="item in charactarList"
      :key="item.name"
    >
      <div>
        <div v-if="selectCharactarData">
          面板：{{ selectCharactarData.panel }} 爆伤：{{
            selectCharactarData.critical
          }}
          属性伤害：{{ selectCharactarData.attributeDamage }}
        </div>
        <!-- 展示面板 选择头像当技能用。可以选择普攻 展示技能访问计算cd 展示预期伤害 -->
        <div
          v-for="valueSkill in item.skill"
          :key="valueSkill.name"
          style="display: inline-block; margin-right: 10px"
        >
          <div
            :key="item.name"
            class="team_character_box"
            @click="clickSelectSikll(item, valueSkill)"
            style="background-color: black"
            :class="{ select_charactar: selectSikll === valueSkill.name }"
          >
            <img
              :src="
                valueSkill.name === 'general'
                  ? valueSkill.image
                  : splicingqImage(valueSkill.qimage, 'qimage')
              "
              alt=""
            />
          </div>
        </div>
        <div v-if="selectCharactarData.skill">
          {{ selectCharactarData.skill[selectSikll].cName }}
        </div>
        <div v-if="selectCharactarData.skill && selectSikll !== 'general'">
          cd:{{ selectCharactarData.skill[selectSikll].cd }} sp:{{
            selectCharactarData.skill[selectSikll].sp
          }}
        </div>
        <div v-if="selectCharactarData.skill">
          {{ selectCharactarData.skill[selectSikll].description }}
        </div>
        <div v-if="selectCharactarData.skill">
          <skillScope :scopeList="selectCharactarData.skill[selectSikll].scope" />
        </div>
      </div>
      <template v-slot:reference>
        <div
          :key="item.name"
          class="team_character_box character_box"
          @click="selectCharactar(item)"
        >
          <img
            :src="
              splicingqImage(
                item.skill[item.selectSikll || Object.keys(item.skill)[0]].qimage,
                'qimage',
              )
            "
            alt=""
          />
          <div class="general_box" v-if="item.selectSikll === 'general' || !item.selectSikll">
            普攻
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { splicingqImage, debounce } from '@/utils/utils'
import skillScope from '@/components/skillScope.vue'
import Sortable from 'sortablejs'
const props = defineProps({
  charactarList: {
    type: Object || Array,
    default: () => [],
  },
  turnNumber: {
    // 回合数。用来处理buff
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['change'])
// 选择角色皮肤
const clickSelectSikll = (data: editableCharactar, skill: editableCharactarSkill) => {
  selectSikll.value = skill.name || ''
  data.selectSikll = skill.name
  emit('change')
}
// 选中角色
const selectCharactar = (data: editableCharactar) => {
  selectCharactarData.value = data
  selectSikll.value = data.selectSikll || Object.keys(data.skill as object)[0]
}
const selectCharactarData = ref<editableCharactar>({}) // 当前选择的角色
const selectSikll = ref<string>('') // 当前选中的技能
const ActionBarBox = ref()
// 初始化拖动
const initDropTable = () => {
  const el = document.querySelectorAll('.action_bar_box')
  interface evtObj {
    newIndex: number
    oldIndex: number
  }
  // 给所有都绑定一下
  el.forEach((item) => {
    Sortable.create(item, {
      handle: '.character_box', //设置指定列作为拖拽
      onEnd(evt: evtObj) {
        const { newIndex, oldIndex } = evt
        const dataList = props.charactarList
        const currRow = dataList?.splice(oldIndex, 1)[0] as editableCharactar
        dataList?.splice(newIndex, 0, currRow)
        debouncedUpdate()
        // 重新绑定拖动
        nextTick(() => {
          initDropTable()
        })
      },
    })
  })
}
// 创建防抖函数
const debouncedUpdate = debounce(() => {
  emit('change')
}, 500)
defineExpose({ initDropTable })
onMounted(() => {
  initDropTable()
})
</script>
<style lang="less" scoped>
.action_bar_box {
  background-color: #000;
  width: 70px;
  text-align: center;
  padding: 10px;
  .team_character_box {
    display: block;
  }
}
.team_character_box {
  width: 60px;
  height: 60px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  box-shadow: var(--el-box-shadow-light);
  transition: transform 0.2s;
  border-radius: 5px;
  position: relative;
  background-color: #fff;
  & > img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
  }
  .general_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.team_character_box + .team_character_box {
  margin-top: 10px;
}
.select_charactar {
  border: 2px solid red;
  scale: 0.98;
  transition: 0.1s;
}
</style>
