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
      <el-tab-pane label="皮肤选择" name="first" class="skill_list">
        <div class="skill_box_list">
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
      <el-tab-pane label="装备" name="second">
        <div class="equipment_box">
          <div v-for="(wear, slotIndex) in wears" :key="slotIndex" class="equipment_slot">
            <div class="slot_header">
              <span class="slot_title">{{ EQUIPMENT_SLOT_PARTS[slotIndex] }}</span>
              <el-select
                v-model="wear.contentId"
                placeholder="选择装备"
                clearable
                class="slot_select"
                @change="onEquipmentChange(slotIndex)"
              >
                <el-option
                  v-for="item in wearableListByPart(slotIndex)"
                  :key="item.content_id"
                  :label="item.name"
                  :value="item.content_id"
                />
              </el-select>
            </div>
            <div v-if="currentEquipment(slotIndex)" class="slot_config">
              <div class="config_row">
                <span>评分：</span>
                <el-slider
                  v-model="wear.score"
                  :min="6"
                  :max="24"
                  :step="1"
                  show-input
                  :show-input-controls="false"
                  size="small"
                />
              </div>
              <!-- 专武词条选择 -->
              <template
                v-for="(choiceKey, choiceIndex) in ['jbnl1Choice', 'jbnl2Choice']"
                :key="choiceKey"
              >
                <div v-if="currentEquipment(slotIndex)?.type === '专用'" class="config_row">
                  <span class="row_label">基本能力{{ choiceIndex + 1 }}：</span>
                  <el-select
                    v-model="wear[choiceKey as 'jbnl1Choice']"
                    placeholder="选择词条"
                    size="small"
                    class="choice_select"
                  >
                    <el-option
                      v-for="(entry, entryIndex) in jbnlEntryList(slotIndex, choiceIndex)"
                      :key="entryIndex"
                      :label="entry.text"
                      :value="entryIndex"
                    />
                  </el-select>
                </div>
              </template>
              <!-- 3条副属性 -->
              <div class="config_row">
                <span class="row_label">副属性：</span>
                <el-select
                  v-for="(_, subIndex) in wear.subAttrs"
                  :key="subIndex"
                  v-model="wear.subAttrs[subIndex]"
                  placeholder="副属性"
                  size="small"
                  class="sub_select"
                >
                  <el-option
                    v-for="opt in EQUIPMENT_SUB_ATTR_OPTIONS"
                    :key="opt.key"
                    :label="opt.name"
                    :value="opt.key"
                  />
                </el-select>
              </div>
              <!-- 属性拆解展示 -->
              <div class="stat_parts">
                <div class="stat_part">
                  <div class="part_title">基础属性</div>
                  <div v-for="value in formatPanel(slotStatParts(slotIndex)?.base)" :key="value[0]">
                    {{ value[0] }}：<span>{{ value[1] }}</span>
                  </div>
                </div>
                <div class="stat_part">
                  <div class="part_title">评分加成</div>
                  <div
                    v-for="value in formatPanel(slotStatParts(slotIndex)?.scoreBonus)"
                    :key="value[0]"
                  >
                    {{ value[0] }}：<span>{{ value[1] }}</span>
                  </div>
                </div>
                <div class="stat_part">
                  <div class="part_title">副属性</div>
                  <div v-for="value in formatPanel(slotStatParts(slotIndex)?.sub)" :key="value[0]">
                    {{ value[0] }}：<span>{{ value[1] }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 合并后最终面板 -->
          <div class="final_stats">
            <div class="slot_title">合并后最终面板</div>
            <div v-for="value in formatFinalStats()" :key="value[0]">
              {{ value[0] }}：<span>{{ value[1] }}</span>
            </div>
          </div>
        </div>
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
import {
  splicingqImage,
  conversionDescription,
  conversionCommon,
  conversionScopeCommon,
  setPotentials,
} from '@/utils/utils'
import skillScope from '@/components/skillScope.vue'
import { useEquipmentStore } from '@/stores/equipment'
import {
  EQUIPMENT_SUB_ATTR_OPTIONS,
  parseEquipmentAttrEntry,
  computeEquipmentStatParts,
  computeCharacterFinalStats,
  getWearableEquipmentList,
} from '@/utils/equipmentEnhance'
const props = defineProps(['dialogVisible', 'data'])
const emit = defineEmits(['close', 'primary'])
defineExpose({ initEditData })

const equipmentStore = useEquipmentStore()

// 5个装备部位
const EQUIPMENT_SLOT_PARTS = ['武器', '盔甲', '头盔', '饰品', '手套']
const createEmptyWear = (slot: number): equipmentWearObj => ({
  contentId: 0,
  slot,
  score: 6,
  subAttrs: ['atk', 'atk', 'atk'],
})
const wears = ref<equipmentWearObj[]>(EQUIPMENT_SLOT_PARTS.map((_, index) => createEmptyWear(index)))

// 可穿戴装备列表（UR专武 + UR4制作），按部位过滤
const wearableListByPart = (slotIndex: number) => {
  const part = EQUIPMENT_SLOT_PARTS[slotIndex]
  return getWearableEquipmentList(equipmentStore.equipmentList).filter((item) => item.part === part)
}
// 当前槽位装备
const currentEquipment = (slotIndex: number) => {
  const wear = wears.value[slotIndex]
  if (!wear || !wear.contentId) return undefined
  return equipmentStore.equipmentList.find((item) => item.content_id === wear.contentId)
}
// 切换装备时重置专武词条选择
const onEquipmentChange = (slotIndex: number) => {
  const wear = wears.value[slotIndex]
  if (!wear) return
  wear.jbnl1Choice = undefined
  wear.jbnl2Choice = undefined
}
// 专武基本能力词条选项
const jbnlEntryList = (slotIndex: number, choiceIndex: number) => {
  const equipment = currentEquipment(slotIndex)
  if (!equipment || equipment.type !== '专用') return []
  const attrSource = equipment.mainAttr
  if (!attrSource) return []
  const str = choiceIndex === 0 ? attrSource.jbnl1 : attrSource.jbnl2
  return parseEquipmentAttrEntry(str)
}
// 槽位属性拆解（基础/评分加成/副属性）
const slotStatParts = (slotIndex: number) => {
  const equipment = currentEquipment(slotIndex)
  const wear = wears.value[slotIndex]
  if (!equipment || !wear) return null
  return computeEquipmentStatParts(equipment, wear)
}
// 属性键展示名
const PANEL_NAME_MAP: Record<equipmentAttrKey, string> = {
  atk: '攻击力',
  matk: '魔法力',
  patk: '攻击力%',
  pmatk: '魔法力%',
  def: '防御力',
  mdef: '魔法抵抗',
  pdef: '防御力%',
  pmdef: '魔法抵抗%',
  hp: '生命力',
  php: '生命力%',
  critical: '致命伤害',
  criticalRate: '致命率',
}
const formatPanel = (panel?: equipmentStatPanel) => {
  if (!panel) return []
  return (Object.keys(panel) as (keyof equipmentStatPanel)[])
    .filter((key) => panel[key] !== 0)
    .map((key) => [PANEL_NAME_MAP[key], panel[key]] as [string, number])
}
// 合并后最终面板
const formatFinalStats = () => {
  if (!props.data) return []
  const equipmentMap = new Map(
    equipmentStore.equipmentList.map((item) => [item.content_id, item]),
  )
  const stats = computeCharacterFinalStats(
    props.data as selectCharacterDataObj,
    wears.value,
    equipmentMap,
  )
  return [
    ['面板', stats.panel],
    ['攻击加成%', stats.attackAdd],
    ['爆伤', stats.critical],
    ['属性伤害', stats.attributeDamage],
    ['生命力', stats.hp],
    ['生命力%', stats.php],
    ['防御力', stats.def],
    ['魔法抵抗', stats.mdef],
    ['致命率', stats.criticalRate],
  ] as [string, number][]
}
const select = ref<number>(0) // 先默认选中第一个技能，后续可扩展选择技能查看详情
const selectSkill = ref<string>() // 先默认选中第一个技能，后续可扩展选择技能查看详情
const breakthrough = ref<number>(0) // 突破等级

const activeName = ref('first')
const userdata = ref<damageObj>({
  panel: 0,
  critical: 0,
  attributeDamage: 0,
})
const checkList = ref<never[]>([])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allCheckList = ref<Record<string, any>>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allBreakthrough = ref<Record<string, any>>({})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allPotentials = ref<Record<string, any>>({})
const potentials = ref()
const changeSkillPotentials = () => {
  const skillPotentials =
    props.data.Skill[selectSkill.value || Object.keys(props.data.Skill)[select.value]]
      .skillPotentials
  setAllCheckList(checkList.value, selectSkill.value || Object.keys(props.data.Skill)[select.value])
  potentials.value = setPotentials(checkList.value, skillPotentials)
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

const clickSelectSkill = (value: string, init?: boolean) => {
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
  wears.value = EQUIPMENT_SLOT_PARTS.map((_, index) => createEmptyWear(index))
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
    equipments: JSON.parse(JSON.stringify(wears.value)) as equipmentWearObj[],
  }
  emit('primary', selectData.value)
  BeforeClose()
}

function initEditData(data: selectCharacterDataObj, charactarData: characterDataObj) {
  // 确保装备列表已加载
  if (!equipmentStore.equipmentList.length && !equipmentStore.loading) {
    equipmentStore.loadEquipment()
  }
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
  // 回显已佩戴装备
  wears.value = EQUIPMENT_SLOT_PARTS.map((_, index) => {
    const exist = (data?.equipments || []).find((item) => item.slot === index)
    return exist ? JSON.parse(JSON.stringify(exist)) : createEmptyWear(index)
  })
}
</script>

<style lang="less" scoped>
.skill_list {
  padding-left: 20px;
  .skill_box_list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .skill_box {
      width: 150px;
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
