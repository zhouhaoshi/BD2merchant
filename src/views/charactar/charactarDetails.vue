<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="
      data
        ? `${data.cName} - ${data.Skill[selectSkill || Object.keys(data.Skill)[select]].cName}`
        : '角色详情'
    "
    :before-close="BeforeClose"
  >
    <div
      v-for="value in data ? data.Skill : []"
      :key="value.name"
      class="skill_box"
      @click="clickSelectSkill(value.name)"
    >
      <div class="img_box">
        <img :src="splicingqImage(value.qimage, 'qimage')" alt="" />
      </div>
      <div>
        {{ value.cName }}
      </div>
    </div>
    <div class="skill_details">
      <!-- 皮肤破度 -->
      <div>
        <div class="title">皮肤破度</div>
        <span
          v-for="value in 6"
          :key="value"
          @click="breakthrough = value - 1"
          class="breakthrough_level"
          :class="breakthrough === value - 1 ? 'active' : ''"
        >
          +{{ value - 1 }}
        </span>
      </div>
      <!-- 觉醒值 -->
      <div v-if="data && data.Skill">
        <div class="title">皮肤觉醒</div>
        <el-checkbox-group v-model="checkList" @change="changeSkillPotentials">
          <el-checkbox
            v-for="(value, index) in data.Skill[selectSkill || Object.keys(data.Skill)[select]]
              .skillPotentials"
            :key="index"
            :label="value.description"
            :value="index"
          />
        </el-checkbox-group>
      </div>
      <!-- 技能描述 -->
      <div v-if="data && data.Skill">
        {{
          conversionDescription(
            data.Skill[selectSkill || Object.keys(data.Skill)[select]],
            breakthrough,
            potentials,
          )
        }}
      </div>
      <!-- cd sp -->
      <div v-if="data && data.Skill">
        冷却时间:
        {{
          conversionCommon(
            data.Skill[selectSkill || Object.keys(data.Skill)[select]],
            'cd',
            breakthrough,
            potentials,
          )
        }}
        回合 | 消耗:
        {{
          conversionCommon(
            data.Skill[selectSkill || Object.keys(data.Skill)[select]],
            'sp',
            breakthrough,
            potentials,
          )
        }}
        SP
      </div>
      <!-- 范围 -->
      <div v-if="data && data.Skill" style="overflow: hidden">
        <skillScope
          :scopeList="
            conversionScopeCommon(
              data.Skill[selectSkill || Object.keys(data.Skill)[select]],
              'scope',
              breakthrough,
              potentials,
            ) as number[][]
          "
        />
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  splicingqImage,
  conversionDescription,
  conversionCommon,
  conversionScopeCommon,
  setPotentials,
} from '@/utils/utils'
import skillScope from '@/components/skillScope.vue'
const props = defineProps(['dialogVisible', 'data'])
const emit = defineEmits(['close'])
const select = ref<number>(0) // 先默认选中第一个技能，后续可扩展选择技能查看详情
const selectSkill = ref<string>() // 先默认选中第一个技能，后续可扩展选择技能查看详情
const breakthrough = ref<number>(0) // 突破等级

const checkList = ref([])
const potentials = ref()
const changeSkillPotentials = () => {
  const skillPotentials =
    props.data.Skill[selectSkill.value || Object.keys(props.data.Skill)[select.value]]
      .skillPotentials
  potentials.value = setPotentials(checkList.value, skillPotentials)
}
const clickSelectSkill = (value: string) => {
  selectSkill.value = value
  resetData()
}
const resetData = () => {
  checkList.value = []
  breakthrough.value = 0
  potentials.value = undefined
}
const BeforeClose = () => {
  select.value = 0
  selectSkill.value = undefined
  resetData()
  emit('close')
}
</script>

<style lang="less" scoped>
.skill_box {
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
.skill_box + .skill_box {
  margin-left: 10px;
}
.skill_details {
  & > div {
    margin-top: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .breakthrough_level {
    margin-right: 10px;
    cursor: pointer;
    font-size: 24px;
  }
  .active {
    color: red;
  }
}
</style>
