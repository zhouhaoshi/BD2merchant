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
    <el-tabs class="demo-tabs" v-model="activeName">
      <el-tab-pane label="皮肤选择" name="first">
        <div
          v-for="value in data ? data.Skill : []"
          :key="value.name"
          class="skill_box"
          :class="{ skill_box_select: skillBoxList.includes(value.name) }"
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
              @click="clilckbreakthrough(value - 1)"
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
          <div v-if="data && data.Skill">
            <skillScope
              :scopeList="
                conversionCommon(
                  data.Skill[selectSkill || Object.keys(data.Skill)[select]],
                  'scope',
                  breakthrough,
                  potentials,
                )
              "
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="面板设置" name="second">
        <el-form :model="userdata" label-width="auto">
          <el-form-item label="面板" prop="panel">
            <el-input placeholder="请输入面板" v-model="userdata.panel" />
          </el-form-item>
          <el-form-item label="爆伤" prop="critical">
            <el-input placeholder="请输入爆伤" v-model="userdata.critical" />
          </el-form-item>
          <el-form-item label="属性伤害" prop="attributeDamage">
            <el-input placeholder="请输入属性伤害" v-model="userdata.attributeDamage" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="primary"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { splicingqImage, conversionDescription, conversionCommon } from '@/utils/utils'
import skillScope from '@/components/skillScope.vue'
const props = defineProps(['dialogVisible', 'data'])
const emit = defineEmits(['close', 'primary'])
defineExpose({ initEditData })
const select = ref<number>(0) // 先默认选中第一个技能，后续可扩展选择技能查看详情
const selectSkill = ref<string>() // 先默认选中第一个技能，后续可扩展选择技能查看详情
const breakthrough = ref<number>(0) // 突破等级

const activeName = ref('first')
const userdata = ref<damageObj>({
  panel: 0,
  critical: 0,
  attributeDamage: 0,
})
const checkList = ref([])
const allCheckList = ref({})
const allBreakthrough = ref({})
const allPotentials = ref({})
const potentials = ref()
const changeSkillPotentials = () => {
  const skillPotentials =
    props.data.Skill[selectSkill.value || Object.keys(props.data.Skill)[select.value]]
      .skillPotentials
  const tempPotentials = {
    buff: [],
  }
  setAllCheckList(checkList.value, selectSkill.value || Object.keys(props.data.Skill)[select.value])
  // 处理选中的觉醒
  checkList.value.forEach((item) => {
    if (skillPotentials[item] && typeof skillPotentials[item] === 'object') {
      for (const value in skillPotentials[item]) {
        if (value !== 'description' && value !== 'buff' && value !== 'scope') {
          tempPotentials[value] = (tempPotentials[value] || 0) + skillPotentials[item][value]
        } else if (value === 'buff') {
          for (const buffValue in skillPotentials[item]['buff']) {
            if (buffValue !== 'index') {
              const index = skillPotentials[item]['buff'].index
              // 如果不存在则赋值
              if (!tempPotentials.buff[index]) {
                tempPotentials.buff[index] = {}
              }
              tempPotentials.buff[index][buffValue] =
                (tempPotentials['buff'][index][buffValue] || 0) +
                skillPotentials[item]['buff'][buffValue]
            }
          }
        } else if (value === 'scope') {
          tempPotentials[value] = [
            ...(tempPotentials[value] || []),
            ...skillPotentials[item][value],
          ]
        }
      }
    }
  })
  if (tempPotentials.buff.length === 0) {
    delete tempPotentials.buff
  }
  potentials.value = tempPotentials
  setAllPotentials(
    potentials.value,
    selectSkill.value || Object.keys(props.data.Skill)[select.value],
  )
}
const skillBoxList = ref<string[]>([])
const setAllCheckList = (dataList: never[], key: string) => {
  if (!(key in allCheckList.value)) {
    Reflect.set(allCheckList.value, key, {})
  }
  allCheckList.value[key] = dataList
}

const setAllPotentials = (dataList: never[], key: string) => {
  if (!(key in allPotentials.value)) {
    Reflect.set(allPotentials.value, key, {})
  }
  allPotentials.value[key] = dataList
}
const clilckbreakthrough = (value: number) => {
  breakthrough.value = value
  const key = selectSkill.value || Object.keys(props.data.Skill)[select.value]
  if (!(key in allBreakthrough.value)) {
    Reflect.set(allBreakthrough.value, key, {})
  }
  allBreakthrough.value[key] = value
}

const clickSelectSkill = (value: string, init: boolean) => {
  selectSkill.value = value
  resetData()
  // 初始化的时候不使用
  if (!init) {
    if (skillBoxList.value.indexOf(selectSkill.value) === -1) {
      skillBoxList.value.push(value)
    } else {
      skillBoxList.value.splice(skillBoxList.value.indexOf(selectSkill.value), 1)
    }
  }
  if (value in allBreakthrough.value) {
    breakthrough.value = allBreakthrough.value[value]
  }
  if (value in allCheckList.value) {
    checkList.value = allCheckList.value[value]
  }
  if (value in allPotentials.value) {
    potentials.value = allPotentials.value[value]
  }
}
const resetData = () => {
  checkList.value = []
  breakthrough.value = 0
  potentials.value = undefined
}
const BeforeClose = () => {
  select.value = 0
  selectSkill.value = undefined
  skillBoxList.value = []
  allBreakthrough.value = []
  allCheckList.value = []
  allPotentials.value = []
  activeName.value = 'first'
  userdata.value = {
    panel: 0,
    critical: 0,
    attributeDamage: 0,
  }
  resetData()
  emit('close')
}

const selectData = ref() // 选中的角色属性

const primary = () => {
  selectData.value = {
    ...props.data,
    ...userdata.value,
    skillBoxList: skillBoxList.value,
    allBreakthrough: allBreakthrough.value,
    allCheckList: allCheckList.value,
    allPotentials: allPotentials.value,
  }
  emit('primary', selectData.value)
  BeforeClose()
}

function initEditData(data: selectCharacterDataObj, charactarData: characterDataObj) {
  if (data) {
    skillBoxList.value = data.skillBoxList as string[]
    allBreakthrough.value = data.allBreakthrough
    allCheckList.value = data.allCheckList
    allPotentials.value = data.allPotentials
    userdata.value = {
      panel: data.panel,
      critical: data.critical,
      attributeDamage: data.attributeDamage,
    }
    clickSelectSkill(skillBoxList.value[0], true)
  } else {
    // 使用默认面板
    userdata.value = {
      panel: charactarData.panel,
      critical: charactarData.critical,
      attributeDamage: charactarData.attributeDamage,
    }
  }
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
.skill_box_select {
  position: relative;
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    right: 15px;
    top: 15px;
    width: 12px;
    height: 6px;
    display: inline-block;
    border: 1px solid red;
    border-width: 0 0 2px 2px;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    vertical-align: baseline;
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
