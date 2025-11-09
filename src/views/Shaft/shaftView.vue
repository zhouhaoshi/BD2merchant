<template>
  <el-card>
    <!-- 选择其他轴 --- 新增轴  --- 保存只每个轴单独保存，id为当前时间戳-->
    <!-- 队伍角色配置 从角色管理中获取角色 -- 展示队伍中角色头像-->
    <div class="team_box">
      <div class="team_box_title">
        <div class="team_list">配队</div>
        <div class="team_list">
          <div v-for="value in selectCharactarList" :key="value.name" class="team_character_box">
            <img
              :src="splicingqImage(value.Skill[Object.keys(value.Skill)[0]].qimage, 'qimage')"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="select_btn" @click="dialogVisible = true">选择角色</div>
    </div>
    <!-- 具体排轴 tab页选择回合数 --- 可以新增tab --- tab内容为3x4的格子可以拖到和选择角色 左侧为出手列表 --可拖到，默认队伍排序 --- 鼠标经过角色格展示角色buff -->
    <div></div>
    <!-- 列表话展示轴，行线展示回合，列为角色技能-->
    <div></div>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      editable
      @tab-change="handleTabChange"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="`T${index * 2 + 1}`"
        :name="item.name"
      >
        <div class="shaft_box">
          <ActionBar
            ref="actionBar"
            :key="`ActionBar_${index}`"
            :charactarList="item.charactarList"
            :turnNumber="editableTabsValue"
            v-if="item.charactarList.length"
            @change="changeCharactarList"
          />
          <ActionBattleGroundBar
            ref="actionBattleGroundBar"
            :key="`actionBattleGroundBar_${index}`"
            :turnNumber="editableTabsValue"
            :attackSequence="item.charactarList"
            :battleGroundList="item.battleGroundList"
            :beforeBuffList="index === 0 ? {} : editableTabs[index - 1].buffList"
            :warcraftData="warcraftList['pumpkin1106']"
            @changeBuff="changeBuff"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <el-card style="margin-top: 20px">
    <!-- 选择其他轴 --- 新增轴  --- 保存只每个轴单独保存，id为当前时间戳-->
    <!-- 队伍角色配置 从角色管理中获取角色 -- 展示队伍中角色头像-->
    <div></div>
    <!-- 具体排轴 tab页选择回合数 --- 可以新增tab --- tab内容为3x4的格子可以拖到和选择角色 左侧为出手列表 --可拖到，默认队伍排序 --- 鼠标经过角色格展示角色buff -->
    <div></div>
    <!-- 列表话展示轴，行线展示回合，列为角色技能-->
    <div></div>
    <el-form :model="userdata" label-width="auto">
      <el-form-item label="面板" prop="panel">
        <el-input placeholder="请输入面板" v-model="userdata.panel" />
      </el-form-item>
      <el-form-item label="攻击力/魔法力加成" prop="attackAdd">
        <el-input placeholder="请输入攻击力/魔法力加成" v-model="userdata.attackAdd" />
      </el-form-item>
      <el-form-item label="爆伤" prop="critical">
        <el-input placeholder="请输入爆伤" v-model="userdata.critical" />
      </el-form-item>
      <el-form-item label="倍率" prop="multiplier">
        <el-input placeholder="请输入倍率" v-model="userdata.multiplier" />
      </el-form-item>
      <el-form-item label="易伤/脆弱" prop="enemyWeakness">
        <el-input placeholder="请输入易伤/脆弱" v-model="userdata.enemyWeakness" />
      </el-form-item>
      <el-form-item label="增伤" prop="increasedDamage">
        <el-input placeholder="请输入增伤" v-model="userdata.increasedDamage" />
      </el-form-item>
      <el-form-item label="属性伤害" prop="attributeDamage">
        <el-input placeholder="请输入属性伤害" v-model="userdata.attributeDamage" />
      </el-form-item>
      <el-form-item label="当前连锁数" prop="chainCount">
        <el-input placeholder="请输入当前连锁数" v-model="userdata.chainCount" />
      </el-form-item>
      <el-form-item label="连锁伤害加成" prop="chainDamageAdd">
        <el-input placeholder="请输入连锁伤害加成" v-model="userdata.chainDamageAdd" />
      </el-form-item>
      <el-form-item label="弱点加伤" prop="weakPointDamageAdd">
        <el-input placeholder="请输入弱点加伤" v-model="userdata.weakPointDamageAdd" />
      </el-form-item>
      <el-form-item label="防御/魔抗" prop="enemyDefence">
        <el-input placeholder="请输入防御/魔抗" v-model="userdata.enemyDefence" />
      </el-form-item>
      <el-form-item label="减伤" prop="damageReduction">
        <el-input placeholder="请输入减伤" v-model="userdata.damageReduction" />
      </el-form-item>
      <el-form-item label="属性抵抗" prop="attributeResistance">
        <el-input placeholder="请输入属性抵抗" v-model="userdata.attributeResistance" />
      </el-form-item>
    </el-form>
    <div class="damge">
      <!-- .toLocaleString() 三三展示 -->
      期望伤害：<span>{{ calculateDamage(userdata).toLocaleString() }}</span>
    </div>
  </el-card>
  <charactarSelect :dialog-visible="dialogVisible" @close="charactarSelectClose" />
</template>

<script lang="ts" setup>
import warcraftList from '@/utils/warcraft'
import calculateDamage from '@/utils/damage'
import ActionBar from '@/components/ActionBar.vue'
import ActionBattleGroundBar from '@/components/BattleGround.vue'
import charactarSelect from './charactarSelect.vue'
import {
  splicingqImage,
  conversionDescription,
  conversionCommon,
  setCharacterLocation,
} from '@/utils/utils'
const editableTabsValue = ref(1)
const tabIndex = ref(1)
const dialogVisible = ref<boolean>(false)
const selectCharactarList = ref<Record<string, selectCharacterDataObj>>({})
const editableTabs = ref<editableTabsObj[]>([
  {
    name: 1,
    charactarList: [],
    battleGroundList: [],
    buffList: {},
  },
])
const editableCharactarList = ref<editableCharactar[]>([])
const editableBattleGroundList = ref()
const userdata = ref<damageObj>({
  panel: 0,
  attackAdd: 0,
  critical: 0,
  multiplier: 0,
  enemyWeakness: 0,
  increasedDamage: 0,
  enemyDefence: 0,
  attributeDamage: 0,
  damageReduction: 0,
  chainCount: 0,
  chainDamageAdd: 0,
  attributeResistance: 0,
  weakPointDamageAdd: 0,
})

const actionBar = ref()
const actionBattleGroundBar = ref()

// 设置轴的初始值
const setEditableTabs = (data: Record<string, selectCharacterDataObj>) => {
  editableCharactarList.value = []
  const dataList = Object.values(data)
  dataList.forEach((item) => {
    const editableCharactar: editableCharactar = {
      panel: item.panel,
      critical: item.critical,
      name: item.name,
      cName: item.cName,
      attributeDamage: item.attributeDamage,
      element: item.element,
      attackAttribute: item.attackAttribute,
      attackType: item.attackType, // attackType: 'skip', // 攻击类型 front为最前 skip为跳过
      skill: setSkill(item),
    }
    editableCharactarList.value?.push(editableCharactar)
  })
  editableBattleGroundList.value = new Array(12)
  editableBattleGroundList.value = setCharacterLocation(
    editableCharactarList.value,
    editableBattleGroundList.value,
  )
  console.log(editableCharactarList.value, 'editableCharactarList')
  editableTabs.value = editableTabs.value.map((item) => ({
    name: item.name,
    charactarList: JSON.parse(JSON.stringify(editableCharactarList.value)),
    battleGroundList: JSON.parse(JSON.stringify(editableBattleGroundList.value)),
    buffList: {},
  }))
}
// 角色数据发生变化，同步更新场地角色情况
const changeCharactarList = () => {
  const editableBattleGroundList = new Array(12)
  const index = (editableTabsValue.value - 1) / 2
  editableTabs.value[index].battleGroundList = setCharacterLocation(
    editableTabs.value[index].charactarList,
    editableBattleGroundList,
  ) as editableCharactar[]
  actionBattleGroundBar.value[index].initialization()
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
      scope: conversionCommon(
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
    if (value === 'cd' || value === 'sp') {
      // break
    } else if (value === 'buff' || value === 'special') {
      const tempBuff = JSON.parse(JSON.stringify(effect[value]))
      const potentialsList = potentials[value] || []
      potentialsList?.forEach((item, index) => {
        Object.keys(item).forEach((keyItem) => {
          ;(tempBuff[index][keyItem] as number) += item[keyItem] as number
        })
      })
      skill[value] = tempBuff
    } else {
      skill[value] = (effect[value] || 0) + (potentials[value] || 0)
    }
  }
  return skill
}

const charactarSelectClose = (dataList: Record<string, selectCharacterDataObj>) => {
  dialogVisible.value = false
  selectCharactarList.value = dataList
  setEditableTabs(dataList)
}

const handleTabsEdit = (targetName: number, action: string) => {
  if (action === 'add') {
    const newTabName = (tabIndex.value = tabIndex.value + 2)
    editableTabs.value.push({
      name: newTabName,
      charactarList: JSON.parse(JSON.stringify(editableCharactarList.value || [])),
      battleGroundList: JSON.parse(JSON.stringify(editableBattleGroundList.value || [])),
      buffList: {},
    })
    editableTabsValue.value = newTabName
  }
  if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

// 每次更新都初始化，防止buff遗留问题
const handleTabChange = () => {
  const index = (editableTabsValue.value - 1) / 2
  actionBattleGroundBar.value[index].initialization()
}

const changeBuff = (buffList: Record<string, userBuffObj>) => {
  // 回合结束时传递buff向后续回合。先循环buff对象。拿到角色的buff duration - addTurn >= editableTabsValue（回合数） 则代表可以进入该回合否则移除buff
  const index = (editableTabsValue.value - 1) / 2
  editableTabs.value[index].buffList = JSON.parse(JSON.stringify(buffList))
}
</script>

<style lang="less" scoped>
.team_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      }
      .team_character_box + .team_character_box {
        margin-left: 10px;
      }
    }
  }
  .select_btn {
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
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
.damge {
  span {
    color: red;
  }
}
.damge + .damge {
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>
