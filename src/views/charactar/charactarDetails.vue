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
    <el-tabs class="demo-tabs" v-model="activeName">
      <el-tab-pane label="技能信息" name="skill" class="skill_list">
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
      </el-tab-pane>
      <el-tab-pane label="面板展示" name="panel">
        <h1>服装提供</h1>
        {{ props.data.Skill[selectSkill || Object.keys(data.Skill)[select]].ability.Bonding }}
        <h1>基础面板值</h1>
        {{ getBasicPanel() }}
        <h1>额外数值提供</h1>
        <el-form :model="additionalAttributes" label-width="auto" :inline="true">
          <el-form-item label="攻击：" prop="atk">
            <el-input-number placeholder="请输入百分比攻击" v-model="additionalAttributes.patk" />
          </el-form-item>
          <el-form-item label="爆伤：" prop="critical">
            <el-input-number placeholder="请输入爆伤" v-model="additionalAttributes.critical" />
          </el-form-item>
          <el-form-item label="属伤：" prop="attributeDamage">
            <el-input-number
              placeholder="请输入属伤"
              v-model="additionalAttributes.attributeDamage"
            />
          </el-form-item>
        </el-form>
        <h1>装备提供值</h1>
        <span class="tps">
          武器选择
          <el-dropdown>
            <div class="el-dropdown-link enhancement_box">
              <div>{{ equipmentSelection.weapon.label }}</div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in weaponList"
                  :key="item.value"
                  @click="changeWeapon(item)"
                  ><span
                    :style="{
                      color: equipmentSelection.weapon.value === item.value ? 'red' : '',
                    }"
                    >{{ item.label }}</span
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          饰品选择
          <el-dropdown>
            <div class="el-dropdown-link enhancement_box">
              <div>{{ equipmentSelection.ornament.label }}</div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in ornamentList"
                  :key="item.value"
                  @click="changeOrnament(item)"
                  ><span
                    :style="{
                      color: equipmentSelection.ornament.value === item.value ? 'red' : '',
                    }"
                    >{{ item.label }}</span
                  ></el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          精炼值
          <el-dropdown>
            <div class="el-dropdown-link enhancement_box">
              <div>{{ enhancement }}c</div>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-scrollbar height="200px">
                  <el-dropdown-item
                    v-for="(value, index) in 19"
                    @click="changeEnhancement(index)"
                    :key="value"
                    ><span :style="{ color: enhancement === index + 6 ? 'red' : '' }">{{
                      index + 6
                    }}</span></el-dropdown-item
                  >
                </el-scrollbar>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          固定手固定攻击
          <span @click="copyTextToClipboard(exampleData.atk)">{{ exampleData.atk }}</span
          >, 百分比手提供攻击
          <span @click="copyTextToClipboard(exampleData.patk)">{{ exampleData.patk }}</span
          >, 暴击伤害为
          <span @click="copyTextToClipboard(exampleData.critical)">{{ exampleData.critical }}</span>
        </span>
        <el-form :model="entriesNumber" label-width="auto" :inline="true">
          <el-form-item label="atk：" prop="atk">
            <el-input-number :min="1" placeholder="请输入固定面板" v-model="entriesNumber.atk" />
          </el-form-item>
          <el-form-item label="patk：" prop="patk">
            <el-input-number :min="1" placeholder="请输入百分比攻击" v-model="entriesNumber.patk" />
          </el-form-item>
          <el-form-item label="critical：" prop="critical">
            <el-input-number :min="2" placeholder="请输入爆伤" v-model="entriesNumber.critical" />
          </el-form-item>
        </el-form>
        <h1>专武额外值</h1>
        <div>
          <el-radio-group v-model="radio1">
            <el-radio value="0" size="large">无</el-radio>
            <el-radio value="1" size="large">45攻击</el-radio>
            <el-radio value="2" size="large">67固定值</el-radio>
            <el-radio value="3" size="large">90爆伤</el-radio>
          </el-radio-group>
        </div>
        {{ getCharacterPanel() }}
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  splicingqImage,
  conversionDescription,
  conversionCommon,
  conversionScopeCommon,
  setPotentials,
  calculateMaxValueWithAllocation,
  copyTextToClipboard,
  setEnhancementValue,
} from '@/utils/utils'
import skillScope from '@/components/skillScope.vue'
const props = defineProps(['dialogVisible', 'data'])
const emit = defineEmits(['close'])
const select = ref<number>(0) // 先默认选中第一个技能，后续可扩展选择技能查看详情
const selectSkill = ref<string>() // 先默认选中第一个技能，后续可扩展选择技能查看详情
const breakthrough = ref<number>(0) // 突破等级

const enhancement = ref<number>(18)

// 示例值
const exampleData = ref({
  atk: 0,
  critical: 0,
  patk: 0,
})

const additionalAttributes = ref({
  attributeDamage: 0,
  patk: 0,
  critical: 0,
})

// 词条数量
const entriesNumber = ref({
  atk: 2,
  patk: 1,
  critical: 3,
})

const setEntriesNumber = () => {
  const temp = {
    atk: 1,
    patk: 1,
    critical: 2,
  }
  switch (equipmentSelection.value.weapon.value) {
    case 1:
      temp.critical += 1
      break
    case 2:
      temp.atk += 1
      break
    case 3:
      temp.patk += 1
      break
    default:
      break
  }
  switch (equipmentSelection.value.ornament.value) {
    case 1:
      temp.atk += 1
      break
    case 2:
      temp.patk += 1
      break
    default:
      break
  }
  entriesNumber.value = temp
}

interface labelObj {
  label: string
  value: number
}

const changeOrnament = (item: labelObj) => {
  equipmentSelection.value.ornament = item
  setEntriesNumber()
}

const changeWeapon = (item: labelObj) => {
  equipmentSelection.value.weapon = item
  setEntriesNumber()
}
const equipmentSelection = ref({
  weapon: {
    label: '爆伤武器',
    value: 1,
  },
  ornament: {
    label: '固定值饰品',
    value: 1,
  },
})

const weaponList = [
  {
    label: '爆伤武器',
    value: 1,
  },
  {
    label: '固定值武器',
    value: 2,
  },
  {
    label: '百分比武器',
    value: 3,
  },
]

const ornamentList = [
  {
    label: '固定值饰品',
    value: 1,
  },
  {
    label: '百分比饰品',
    value: 2,
  },
]

// 专武额外值
const radio1 = ref('0')

const activeName = ref('skill')
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

const dynamicValue = ref({
  collectionBonus: 80, // 收藏加成 百分比值
  engravingValue: 34, // 固定值
  awakeningValue: 12, // 觉醒值
  clothingFixed: {
    // 服装固定值
    atk: 0,
    patk: 0,
    critical: 0,
  },
  clothingDynamic: {
    // 服装固定值
    atk: 0,
    patk: 0,
    critical: 0,
  },
})
const calculateData = ref({
  atk: 0,
  patk: 0,
  critical: 0,
  attributeDamage: 0,
})
const getBasicPanel = () => {
  let string = `攻击：0 爆伤：0`
  if (!!props.data) {
    // // 选中绑定的衣服
    const selectSkillString =
      selectSkill.value || selectSkill.value || Object.keys(props.data.Skill)[select.value]
    const basicPanel = JSON.parse(JSON.stringify(props.data.MATK || props.data.ATK)) // 基础攻击面板，满级固定值
    const basicCdmg = JSON.parse(JSON.stringify(props.data.CDMG)) // 基础爆伤面板，满级固定值
    dynamicValue.value.engravingValue = JSON.parse(
      JSON.stringify(props.data.engraving.MATK || props.data.engraving.ATK || 0),
    )
    dynamicValue.value.awakeningValue = JSON.parse(
      JSON.stringify(props.data.Awakening.PMATK || props.data.Awakening.PATK || 0),
    )
    const tempSkill = JSON.parse(JSON.stringify(props.data.Skill))
    let attributeDamage = JSON.parse(JSON.stringify(props.data.DMG))
    // 衣服提供的固定值
    const clothingFixed = {
      atk: 0,
      patk: 0,
      critical: 0,
    }
    for (const skillTemp in tempSkill) {
      if (tempSkill.hasOwnProperty(skillTemp)) {
        // 固定值
        for (const skillAbility in tempSkill[skillTemp].ability.Permanent) {
          if (skillAbility === 'MATK' || skillAbility === 'ATK') {
            clothingFixed.atk += tempSkill[skillTemp].ability.Permanent[skillAbility]
          }
          if (skillAbility === 'PMATK' || skillAbility === 'PATK') {
            clothingFixed.patk += tempSkill[skillTemp].ability.Permanent[skillAbility]
          }
          if (skillAbility === 'CDMG') {
            clothingFixed.critical += tempSkill[skillTemp].ability.Permanent[skillAbility]
          }
          if (skillAbility === 'DMG') {
            attributeDamage += tempSkill[selectSkillString].ability.Permanent[skillAbility]
          }
        }
      }
    }
    dynamicValue.value.clothingFixed = clothingFixed
    // 衣服绑定后提供的数值
    const clothingDynamic = {
      atk: 0,
      patk: 0,
      critical: 0,
    }
    for (const skillBonding in tempSkill[selectSkillString].ability.Bonding) {
      if (skillBonding === 'MATK' || skillBonding === 'ATK') {
        clothingDynamic.atk = tempSkill[selectSkillString].ability.Bonding[skillBonding]
      }
      if (skillBonding === 'PMATK' || skillBonding === 'PATK') {
        clothingDynamic.patk = tempSkill[selectSkillString].ability.Bonding[skillBonding]
      }
      if (skillBonding === 'CDMG') {
        clothingDynamic.critical = tempSkill[selectSkillString].ability.Bonding[skillBonding]
      }
      if (skillBonding === 'DMG') {
        attributeDamage += tempSkill[selectSkillString].ability.Bonding[skillBonding]
      }
    }
    dynamicValue.value.clothingDynamic = clothingDynamic
    const critical = basicCdmg + clothingFixed.critical + clothingDynamic.critical

    setCalculateData(basicPanel, basicCdmg, attributeDamage)
    // 固定值角色自身提供的爆伤
    const panel = Math.floor(
      (basicPanel + dynamicValue.value.engravingValue + clothingFixed.atk + clothingDynamic.atk) *
        (1 +
          (clothingFixed.patk +
            clothingDynamic.patk +
            dynamicValue.value.awakeningValue +
            dynamicValue.value.collectionBonus) /
            100),
    ) // 百分比

    string = `面板：${Math.floor(panel)} (基础面板：${basicPanel}) 爆伤：${critical} 属性伤害:${attributeDamage}`
  }
  return string
}

const setCalculateData = (basicPanel: number, basicCdmg: number, attributeDamage: number) => {
  // 固定值角色自身提供的固定值
  calculateData.value.atk =
    basicPanel +
    dynamicValue.value.engravingValue +
    dynamicValue.value.clothingFixed.atk +
    dynamicValue.value.clothingDynamic.atk

  // 固定值角色自身提供的百分比值
  calculateData.value.patk =
    dynamicValue.value.clothingFixed.patk +
    dynamicValue.value.clothingDynamic.patk +
    dynamicValue.value.awakeningValue +
    dynamicValue.value.collectionBonus

  // 角色爆伤
  calculateData.value.critical =
    basicCdmg +
    dynamicValue.value.clothingFixed.critical +
    dynamicValue.value.clothingDynamic.critical +
    additionalAttributes.value.critical

  // 角色属性伤害
  calculateData.value.attributeDamage = attributeDamage + additionalAttributes.value.attributeDamage
}
// 强化值计算
const changeEnhancement = (index: number) => {
  enhancement.value = index + 6
  exampleData.value = setEnhancementValue(enhancement.value)
}
// 默认执行一次
changeEnhancement(12)
// 计算最后的面板
const getCharacterPanel = () => {
  let atk = calculateData.value.atk + (exampleData.value.atk + 37) * entriesNumber.value.atk
  let patk = calculateData.value.patk + (exampleData.value.patk + 25) * entriesNumber.value.patk
  let critical =
    calculateData.value.critical + (exampleData.value.critical + 50) * entriesNumber.value.critical
  if (radio1.value === '1') {
    patk += 45
  }
  if (radio1.value === '2') {
    atk += 67
  }
  if (radio1.value === '3') {
    critical += 90
  }
  console.log(atk, patk, '计算值')
  return calculateMaxValueWithAllocation(
    atk,
    patk,
    critical,
    calculateData.value.attributeDamage,
    additionalAttributes.value.patk,
  )
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
.tps {
  display: inline-block;
  color: gray;
  margin: 20px 0;
  font-size: 12px;
  & > span {
    color: rgb(56, 56, 255);
    cursor: pointer;
  }
}
.enhancement_box {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #3838ff;
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
