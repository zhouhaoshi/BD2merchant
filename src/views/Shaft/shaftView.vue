<template>
  <div class="page_header">
    <div>
      <div class="page_title">排轴</div>
      <div class="page_subtitle">配置出战队伍 · 按回合规划技能释放与伤害预估</div>
    </div>
  </div>
  <el-card>
    <!-- 排轴模式 + boss选择 + 开始模拟 -->
    <div class="mode_bar">
      <el-radio-group v-model="mode" @change="onModeChange">
        <el-radio-button value="warcraft">魔兽战</el-radio-button>
        <el-radio-button value="guild">公会战</el-radio-button>
      </el-radio-group>
      <el-select
        v-model="warcraftKey"
        placeholder="选择boss"
        class="boss_select"
        @change="onBossChange"
      >
        <el-option
          v-for="(item, key) in store.warcraftList"
          :key="key"
          :label="item.cName || key"
          :value="key"
        />
      </el-select>
      <el-select v-model="bossLevel" placeholder="boss等级" class="boss_select">
        <el-option v-for="item in bossLevelList" :key="item" :label="`Lv.${item}`" :value="item" />
      </el-select>
      <el-button type="primary" @click="startSimulation">开始模拟</el-button>
    </div>
    <!-- 队伍角色配置 从角色管理中获取角色 -- 展示队伍中角色头像-->
    <div v-for="teamIndex in shaftConfig.teamNumber" :key="teamIndex" class="team_box">
      <div class="team_box_title">
        <div class="team_list">队伍{{ teamIndex }}</div>
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
          </div>
        </div>
      </div>
    </div>
    <div class="select_btn" @click="dialogVisible = true">选择角色</div>
  </el-card>
  <el-card class="tab_card">
    <el-tabs v-model="currentTeamTab" type="border-card">
      <el-tab-pane
        v-for="teamIndex in shaftConfig.teamNumber"
        :key="teamIndex"
        :label="`队伍${teamIndex}`"
        :name="teamIndex - 1"
      >
        <el-tabs
          v-model="editableTabsValue[teamIndex - 1]"
          type="card"
          editable
          @tab-change="handleTabChange"
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in teamTabs(teamIndex - 1)"
            :label="`T${index * 2 + 1}`"
            :name="item.name"
          >
            <div class="shaft_box" v-if="!isEmpty(warcraftData)">
              <ActionBar
                :key="`ActionBar_${teamIndex}_${index}`"
                :charactarList="item.charactarList"
                :turnNumber="editableTabsValue[teamIndex - 1]"
                v-if="item.charactarList.length"
                @change="changeCharactarList"
              />
              <ActionBattleGroundBar
                :ref="(el) => setGroundRef(el, teamIndex - 1, item.name)"
                :key="`actionBattleGroundBar_${teamIndex}_${index}`"
                :turnNumber="editableTabsValue[teamIndex - 1]"
                :attackSequence="item.charactarList"
                :battleGroundList="item.battleGroundList"
                :beforeBuffList="index === 0 ? {} : teamTabs(teamIndex - 1)[index - 1].buffList"
                :beforeWarcraftBuffList="
                  index === 0 ? {} : teamTabs(teamIndex - 1)[index - 1].warcraftBuffList
                "
                :warcraftCanUseSkill="item.warcraftCanUseSkill"
                :alldamageList="alldamageList"
                :warcraftData="warcraftData"
                :canUseSp="index === 0 ? startSp : item.canUseSp"
                :spLimit="shaftConfig.maxSp"
                :groundColumn="shaftConfig.column"
                :groundRow="shaftConfig.row"
                @changeSkill="changeSkill"
                @set-turm-damage="setTurmDamage"
                @changeBuff="changeBuff"
                @nextTrunSp="nextTrunSp"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <charactarSelect
    :dialog-visible="dialogVisible"
    :mode="mode"
    :team-number="shaftConfig.teamNumber"
    :team-limit="shaftConfig.teamLimit"
    :select-charactar-list="selectCharactarList"
    :default-team="currentTeamTab"
    @close="charactarSelectClose"
  />
  <SimulationResult
    :dialog-visible="simulationVisible"
    :result="simulationResult"
    @close="simulationVisible = false"
  />
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

import ActionBar from '@/components/ActionBar.vue'
import ActionBattleGroundBar from '@/components/BattleGround.vue'
import charactarSelect from './charactarSelect.vue'
import SimulationResult from '@/components/SimulationResult.vue'
import { setCharacterList } from '@/utils/allCharacter'
import { setWarcraftList } from '@/utils/warcraft'
import {
  splicingqImage,
  conversionDescription,
  conversionCommon,
  setCharacterLocation,
  specialKey,
  ignoreKey,
  scopeKey,
  conversionScopeCommon,
  isEmpty,
} from '@/utils/utils'
import { computeCharacterFinalStats } from '@/utils/equipmentEnhance'
import { runBattleSimulation } from '@/utils/battleSimulator'
import { useWarcraftListStore } from '@/stores/warcraft'
import { useCharacterStore } from '@/stores/character'
import { useEquipmentStore } from '@/stores/equipment'

const store = useWarcraftListStore()
const characterStore = useCharacterStore()
const equipmentStore = useEquipmentStore()

// 排轴模式
const mode = ref<shaftMode>('warcraft')
const shaftConfigMap: Record<shaftMode, shaftConfigObj> = {
  guild: { column: 5, row: 5, teamNumber: 1, teamLimit: 7, maxSp: 30 },
  warcraft: { column: 4, row: 3, teamNumber: 3, teamLimit: 5, maxSp: 20 },
}
const shaftConfig = computed(() => shaftConfigMap[mode.value])
// 起始SP
const startSp = 14

// boss选择
const warcraftKey = ref<string>('pumpkin')
const bossLevel = ref<number>()
const warcraftData = computed<warcraftData | undefined>(() => {
  const data = store.warcraftList[warcraftKey.value]
  return (data as unknown as warcraftData) || undefined
})
const bossLevelList = computed(() => {
  const data = warcraftData.value
  return data ? Object.keys(data.levelData).map((item) => +item) : []
})
watch(
  bossLevelList,
  (list) => {
    if (list.length && (!bossLevel.value || !list.includes(bossLevel.value))) {
      bossLevel.value = list[0]
    }
  },
  { immediate: true },
)
const onBossChange = () => {
  bossLevel.value = undefined
}
// 模式切换：重置队伍并预选对应模式的boss
const onModeChange = () => {
  const presetKey = mode.value === 'guild' ? 'guildDemo' : 'pumpkin'
  if (store.warcraftList[presetKey]) {
    warcraftKey.value = presetKey
  }
  selectCharactarList.value = {}
  setEditableTabs()
}

// 角色选择弹窗
const dialogVisible = ref<boolean>(false)
const selectCharactarList = ref<Record<number, Record<string, selectCharacterDataObj>>>({})
const teamCharactarList = (teamIndex: number) =>
  Object.values(selectCharactarList.value[teamIndex] || {}) as selectCharacterDataObj[]

// 队伍tab
const currentTeamTab = ref(0)
// 每队的回合tab
const editableTabsValue = ref<number[]>([])
const tabIndex = ref<number[]>([])
const editableTabs = ref<Record<number, editableTabsObj[]>>({})
const teamTabs = (teamIndex: number) => editableTabs.value[teamIndex] || []

const alldamageList = ref<Record<string, number>[]>([])

// 场地组件实例
const groundRefs = ref<Record<string, { initialization: () => void }>>({})
const setGroundRef = (el: unknown, teamIndex: number, tabName: number) => {
  const key = `${teamIndex}_${tabName}`
  if (el) {
    groundRefs.value[key] = el as { initialization: () => void }
  } else {
    delete groundRefs.value[key]
  }
}
const activeGround = () => {
  const teamIndex = currentTeamTab.value
  const tabName = editableTabsValue.value[teamIndex]
  return groundRefs.value[`${teamIndex}_${tabName}`]
}

const createTurnTab = (
  name: number,
  charactarList: editableCharactar[],
  battleGroundList: editableCharactar[],
): editableTabsObj => ({
  name,
  charactarList: JSON.parse(JSON.stringify(charactarList)),
  battleGroundList: JSON.parse(JSON.stringify(battleGroundList)),
  buffList: {},
  warcraftBuffList: {},
  warcraftCanUseSkill: {},
  canUseSp: 0,
})

// 构建排轴角色（面板沿用裸面板，装备加成在模拟时计算）
const buildEditableCharactar = (item: selectCharacterDataObj): editableCharactar => ({
  panel: item.panel,
  critical: item.critical,
  name: item.name,
  cName: item.cName,
  attributeDamage: item.attributeDamage,
  element: item.element,
  attackAttribute: item.attackAttribute,
  attackType: item.attackType, // attackType: 'skip', // 攻击类型 front为最前 skip为跳过
  skill: setSkill(item),
})

// 设置轴的初始值（按队伍）
const setEditableTabs = () => {
  const nextTabs: Record<number, editableTabsObj[]> = {}
  const nextTabValues: number[] = []
  const nextTabIndex: number[] = []
  for (let teamIndex = 0; teamIndex < shaftConfig.value.teamNumber; teamIndex++) {
    const dataList = teamCharactarList(teamIndex)
    const teamCharacters = dataList.map(buildEditableCharactar)
    const teamBattleGroundList = setCharacterLocation(
      teamCharacters,
      new Array(shaftConfig.value.column * shaftConfig.value.row),
      shaftConfig.value.column,
      shaftConfig.value.row,
    ) as editableCharactar[]
    nextTabs[teamIndex] = [createTurnTab(1, teamCharacters, teamBattleGroundList)]
    nextTabValues[teamIndex] = 1
    nextTabIndex[teamIndex] = 1
  }
  editableTabs.value = nextTabs
  editableTabsValue.value = nextTabValues
  tabIndex.value = nextTabIndex
  currentTeamTab.value = 0
  alldamageList.value = []
}

// 角色数据发生变化，同步更新场地角色情况
const changeCharactarList = () => {
  const teamIndex = currentTeamTab.value
  const tabName = editableTabsValue.value[teamIndex]
  const tab = (editableTabs.value[teamIndex] || []).find((item) => item.name === tabName)
  if (!tab) return
  tab.battleGroundList = setCharacterLocation(
    tab.charactarList,
    tab.battleGroundList,
    shaftConfig.value.column,
    shaftConfig.value.row,
  ) as editableCharactar[]
  activeGround()?.initialization()
}

const setSkill = (skillData: selectCharacterDataObj) => {
  const skill: Record<string, editableCharactarSkill> = {}
  const skillDataList = Object.values(skillData.Skill).filter((item) =>
    skillData.skillBoxList.includes(item.name),
  )
  const commonSkill = skillData.commonSkill
  commonSkill['general'].qimage = skillDataList[0] ? skillDataList[0].qimage : commonSkill.image
  skillDataList.forEach((item) => {
    const temp: editableCharactarSkill = {
      allBreakthrough: skillData.allBreakthrough,
      allCheckList: skillData.allCheckList,
      allPotentials: skillData.allPotentials,
      skillBoxList: skillData.skillBoxList,
      cName: item.cName,
      name: item.name,
      cd: conversionCommon(
        item,
        'cd',
        skillData.allBreakthrough[item.name],
        skillData.allPotentials[item.name],
      ) as number,
      chain: item.chain,
      sp: conversionCommon(
        item,
        'sp',
        skillData.allBreakthrough[item.name] || 0,
        skillData.allPotentials[item.name],
      ) as number,
      description: conversionDescription(
        item,
        skillData.allBreakthrough[item.name] || 0,
        skillData.allPotentials[item.name],
      ),
      target: item.target as 'friendly' | 'enemy',
      image: item.image,
      qimage: item.qimage,
      scope: conversionScopeCommon(
        item,
        'scope',
        skillData.allBreakthrough[item.name],
        skillData.allPotentials[item.name],
      ) as number[][],
      skillEffect: setSkillEffect(
        item.effect[skillData.allBreakthrough[item.name] || 0],
        skillData.allPotentials[item.name] || {},
      ) as unknown as skillEffectObj,
    }
    Reflect.set(skill, item.name, temp)
  })
  return { ...commonSkill, ...skill }
}

const setSkillEffect = (effect: effectObj, potentials: effectObj) => {
  const skill: Record<string, number> = {}
  for (const value in effect) {
    const effectObjKey = value as keyof effectObj
    if (ignoreKey.includes(value)) {
      // break
    } else if (specialKey.includes(value)) {
      const tempBuff = JSON.parse(JSON.stringify(effect[effectObjKey]))
      const potentialsList = (potentials[effectObjKey] || []) as
        | Record<string, number>[]
        | aureoleObj[]
        | deBuffObj[]
        | specialInjuryBuffSkillObj[]
      potentialsList?.forEach((item, index) => {
        if (!!item) {
          const temp = JSON.parse(JSON.stringify(item))
          const keyList = Object.keys(item)
          if (keyList.includes('extra')) {
            delete temp.extraDescription
            delete temp.extra
            tempBuff[tempBuff.length] = temp
          } else {
            keyList.forEach((keyItem) => {
              if (keyItem !== 'index') {
                ;(tempBuff[index][keyItem] as number) += temp[keyItem] as number
              }
            })
          }
        }
      })
      skill[value] = tempBuff
    } else if (scopeKey.includes(value)) {
      const tempBuff = JSON.parse(JSON.stringify(effect[effectObjKey]))
      skill[value] = tempBuff as unknown as number
    } else {
      const number = effect[effectObjKey] as number
      const potentialsNumber = potentials[effectObjKey] as number
      skill[value] = number + (potentialsNumber || 0)
    }
  }
  return skill
}

const charactarSelectClose = (dataList: Record<number, Record<string, selectCharacterDataObj>>) => {
  dialogVisible.value = false
  selectCharactarList.value = dataList
  setEditableTabs()
}

const handleTabsEdit = (targetName: number, action: string) => {
  const teamIndex = currentTeamTab.value
  const tabs = editableTabs.value[teamIndex] || []
  if (action === 'add') {
    const newTabName = (tabIndex.value[teamIndex] = (tabIndex.value[teamIndex] || 1) + 2)
    const lastTab = tabs[tabs.length - 1]
    tabs.push(
      createTurnTab(newTabName, lastTab?.charactarList || [], lastTab?.battleGroundList || []),
    )
    editableTabsValue.value[teamIndex] = newTabName
  }
  if (action === 'remove') {
    // 删除回合后会出现奇怪的问题。待处理
    ElMessageBox.confirm(`是否删除T${targetName}回合？`)
      .then(() => {
        let activeName = editableTabsValue.value[teamIndex]
        if (activeName === targetName) {
          const index = tabs.findIndex((tab) => tab.name === targetName)
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
        editableTabsValue.value[teamIndex] = activeName
        editableTabs.value[teamIndex] = tabs.filter((tab) => tab.name !== targetName)
      })
      .catch(() => {})
  }
}

// 每次更新都初始化，防止buff遗留问题
const handleTabChange = () => {
  nextTick(() => activeGround()?.initialization())
}

interface allBuffList {
  userBuff: Record<string, userBuffObj[]>
  warcraftBuff: Record<number, warcraftBuffObj>
}

// 当前队伍/回合的tab
const activeTab = () => {
  const teamIndex = currentTeamTab.value
  const tabName = editableTabsValue.value[teamIndex]
  return (editableTabs.value[teamIndex] || []).find((item) => item.name === tabName)
}
// 当前tab在队伍中的下标
const activeTabIndex = () => {
  const teamIndex = currentTeamTab.value
  const tabName = editableTabsValue.value[teamIndex]
  return (editableTabs.value[teamIndex] || []).findIndex((item) => item.name === tabName)
}

const changeBuff = ({ userBuff, warcraftBuff }: allBuffList) => {
  // 回合结束时传递buff向后续回合
  const tab = activeTab()
  if (!tab) return
  if (!!userBuff) {
    tab.buffList = JSON.parse(JSON.stringify(userBuff))
  }
  if (!!warcraftBuff) {
    tab.warcraftBuffList = JSON.parse(JSON.stringify(warcraftBuff))
  }
}
// 设置下个回合可用sp
const nextTrunSp = (sp: number) => {
  const teamIndex = currentTeamTab.value
  const tabs = editableTabs.value[teamIndex] || []
  const index = activeTabIndex()
  if (index + 1 < tabs.length) {
    tabs[index + 1].canUseSp = JSON.parse(JSON.stringify(sp))
  }
}
// 魔兽可使用技能队列
const changeSkill = (warcraftCanUseSkill: warcraftCanUseSkillObj) => {
  const teamIndex = currentTeamTab.value
  const tabs = editableTabs.value[teamIndex] || []
  const index = activeTabIndex()
  // 最后一根回合不需要往下传递
  if (index + 1 < tabs.length) {
    // 下个回合魔兽可以使用的技能
    tabs[index + 1].warcraftCanUseSkill = JSON.parse(JSON.stringify(warcraftCanUseSkill))
  }
}
// 设置指定回合的伤害
const setTurmDamage = (damage: Record<string, number>) => {
  const index = activeTabIndex()
  if (alldamageList.value.length - 1 < index) {
    alldamageList.value.length = index
  }
  alldamageList.value[index] = damage
}

// 战斗模拟
const simulationVisible = ref<boolean>(false)
const simulationResult = ref<battleSimulationResult>()
const startSimulation = () => {
  if (!warcraftData.value) {
    ElMessageBox.alert('请先选择boss', '提示')
    return
  }
  if (bossLevel.value === undefined) {
    ElMessageBox.alert('请先选择boss等级', '提示')
    return
  }
  const equipmentMap = new Map(equipmentStore.equipmentList.map((item) => [item.content_id, item]))
  const teams: battleSimulationTeam[] = []
  for (let teamIndex = 0; teamIndex < shaftConfig.value.teamNumber; teamIndex++) {
    const teamChars = teamCharactarList(teamIndex)
    if (!teamChars.length) {
      ElMessageBox.alert(`请先为队伍${teamIndex + 1}选择出战角色`, '提示')
      return
    }
    const characters: battleSimulationCharacter[] = teamChars.map((charactar) => {
      const stats = computeCharacterFinalStats(charactar, charactar.equipments || [], equipmentMap)
      const bareStats = computeCharacterFinalStats(charactar, [], new Map())
      const editableCharactar = buildEditableCharactar(charactar)
      const maxHp = Math.round(
        charactar.HP * (1 + (stats.php + (charactar.Awakening?.PHP || 0)) / 100) + stats.hp,
      )
      return {
        charactar: editableCharactar,
        stats,
        bareStats,
        skills: Object.values(editableCharactar.skill),
        def: Math.round((charactar.DEF + stats.def) * (1 + stats.pdef / 100)),
        mres: Math.round((charactar.MRES + stats.mdef) * (1 + stats.pmdef / 100)),
        hp: maxHp,
        maxHp,
      }
    })
    const turns: battleSimulationAction[][] = (editableTabs.value[teamIndex] || []).map((tab) =>
      (tab.charactarList || []).map((charactar) => ({
        charactarName: charactar.name,
        skillName: charactar.selectSikll || Object.keys(charactar.skill)[0],
      })),
    )
    teams.push({ index: teamIndex, characters, turns })
  }
  simulationResult.value = runBattleSimulation({
    mode: mode.value,
    groundColumn: shaftConfig.value.column,
    groundRow: shaftConfig.value.row,
    boss: warcraftData.value,
    bossLevel: bossLevel.value,
    teams,
    maxSp: shaftConfig.value.maxSp,
    startSp,
    maxTurn: 300,
  })
  simulationVisible.value = true
}

onMounted(async () => {
  if (isEmpty(characterStore.characterList)) {
    const characterList = await setCharacterList()
    characterStore.setCharacterList(characterList)
  }
  if (isEmpty(store.warcraftList)) {
    const warcraftList = await setWarcraftList()
    store.setWarcraftList(warcraftList)
  }
  if (!equipmentStore.equipmentList.length && !equipmentStore.loading) {
    await equipmentStore.loadEquipment()
  }
  if (!store.warcraftList[warcraftKey.value]) {
    warcraftKey.value = 'pumpkin'
  }
  setEditableTabs()
})
</script>

<style lang="less" scoped>
.tab_card {
  margin-top: 24px;
}
.mode_bar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .boss_select {
    width: 200px;
    margin: 0 12px;
  }
}
.team_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  .team_box_title {
    display: flex;
    align-items: center;
    .team_list {
      margin-left: 20px;
      .team_character_box {
        width: 60px;
        height: 60px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        padding: 5px;
        border: 1px solid var(--app-border);
        border-radius: var(--app-radius-sm);
        transition: var(--app-transition);
        position: relative;
        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--app-shadow-hover);
        }
        & > img {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .team_character_box + .team_character_box {
        margin-left: 10px;
      }
    }
  }
}
.select_btn {
  margin-top: 16px;
  display: inline-block;
  background-color: var(--app-primary);
  color: #fff;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: var(--app-radius-sm);
  cursor: pointer;
  transition: var(--app-transition);
  &:hover {
    background-color: var(--app-primary-hover);
    box-shadow: 0 6px 16px rgba(61, 90, 254, 0.35);
  }
}
.shaft_box {
  display: flex;
  & > div:first-child {
    width: 70px;
    margin-right: 10px;
  }
  & > div:last-child {
    width: calc(100% - 100px);
  }
}
</style>
