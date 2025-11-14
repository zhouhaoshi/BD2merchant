<template>
  <div ref="BattleGround" class="battle_ground_box">
    <el-form :inline="true" :model="form" label-width="auto">
      <el-form-item label="场地范围" prop="type" style="width: 200px">
        <el-select v-model="form.size" placeholder="选择场地范围">
          <el-option label="3x4" :value="12" />
          <el-option label="5x5" :value="25" />
        </el-select>
      </el-form-item>
      <el-form-item label="魔兽等级" prop="type" style="width: 200px">
        <el-select v-model="form.level" placeholder="选择魔兽等级">
          <el-option
            v-for="item in Object.keys(warcraftLevelList).map((item) => +item)"
            :key="item"
            :label="`${item}级`"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="魔兽信息"
        prop="type"
        style="width: calc(100% - 496px)"
        v-if="form.level"
      >
        <!-- 伤害气泡框 -->
        <el-popover placement="top" width="300" trigger="hover">
          <div v-for="value in damageTable.tableList" :key="value[0]" class="damage_box">
            {{ value[0] }}:<span>{{ value[1].toLocaleString() }}</span>
          </div>
          <div class="damage_box">
            总伤害：<span v-if="damageTable.allDamageData">{{
              damageTable.allDamageData.toLocaleString()
            }}</span>
          </div>
          <template v-slot:reference>
            <span style="cursor: pointer" v-html="warcraftDataMessage()"></span>
          </template>
        </el-popover>
        <!-- 技能气泡框 -->
        <el-popover
          placement="top"
          width="400"
          trigger="hover"
          @show="showAttackPositionBuyWarcraft = attackPositionBuyWarcraft"
          @hide="showAttackPositionBuyWarcraft = []"
        >
          {{ warcraftUseSkillData.description }}
          <template v-slot:reference>
            <span>
              <span v-if="warcraftUseSkillData?.cname" style="cursor: pointer; margin-left: 20px"
                >使用技能 <span style="color: blue">{{ warcraftUseSkillData?.cname }}</span></span
              ></span
            >
          </template>
        </el-popover>
      </el-form-item>
    </el-form>
    <!-- 作战场地 -->
    <div class="battle_ground">
      <!-- 友军场地 -->
      <div class="friendly_forces">
        <div
          v-for="(enemy, index) in battleGroundList"
          :key="index"
          class="friendly_forces_box"
          :class="{
            select_box: selectIndex === index,
            buff_box: friendlyPosition.includes(index),
            attack_box: showAttackPositionBuyWarcraft.includes(index),
          }"
          @click="changeLocation(index)"
        >
          <span v-if="enemy">
            <div class="character_box">
              <img
                :src="
                  splicingqImage(
                    enemy.skill[enemy.selectSikll || Object.keys(enemy.skill)[0]].qimage,
                    'qimage',
                  )
                "
                alt=""
              />
            </div>
          </span>
        </div>
      </div>
      <!-- 敌军场地 -->
      <div class="enemy_troops">
        <div v-for="(enemy, index) in tempEnemyList" :key="index" class="enemy_troops_box">
          <span
            v-if="enemy"
            class="enemy_box"
            :class="{ damage_box: attackPosition.includes(index) }"
          >
            {{ enemy.weakPointDamageAdd || '' }}
          </span>
        </div>
      </div>
    </div>
    <el-popover placement="top" width="300" trigger="hover">
      <div v-for="value in trunDamageTable" :key="value[0]" class="damage_box">
        {{ value[0] }}:<span>{{ value[1].toLocaleString() }}</span>
      </div>
      <template v-slot:reference>
        <div style="display: inline-block">
          本轮伤害：<span style="cursor: pointer; color: blue">{{
            alldamage().toLocaleString()
          }}</span>
        </div>
      </template>
    </el-popover>
    <span class="sp_list">
      <span class="sp_list_title">sp:</span>
      <span
        class="sp_circle"
        :class="{
          use_sp: value <= canUseSp,
          all_sp: value <= canUseSp - trunUseSp,
        }"
        v-for="value in limitSp"
        :key="value"
      ></span>
      <span
        >剩余sp：
        <span :style="{ color: canUseSp - trunUseSp < 0 ? 'red' : 'green' }">{{
          canUseSp - trunUseSp
        }}</span>
      </span>
    </span>
  </div>
</template>
<script lang="ts" setup>
import {
  splicingqImage,
  transformationCoordinates,
  transformationIndex,
  upsertObjectByKey,
  sumMaxNumbersByType,
  isEmpty,
} from '@/utils/utils'
import { specialInjuryBuffType } from '@/utils/globals'
import calculateDamage from '@/utils/damage'
const props = withDefaults(
  defineProps<{
    battleGroundList: editableCharactar[]
    warcraftData: warcraftData | undefined
    attackSequence: editableCharactar[]
    turnNumber: number
    beforeBuffList: Record<string, userBuffObj>
    beforeWarcraftBuffList: Record<number, warcraftBuffObj>
    warcraftCanUseSkill: warcraftCanUseSkillObj
    alldamageList: Record<string, number>[]
    canUseSp: number
  }>(),
  {
    battleGroundList: () => [],
    warcraftData: () => ({}) as unknown as warcraftData,
    attackSequence: () => [],
    turnNumber: 0,
    beforeBuffList: () => ({}),
    beforeWarcraftBuffList: () => ({}),
    warcraftCanUseSkill: () => ({}),
    alldamageList: () => [],
    canUseSp: 0,
  },
)
const emit = defineEmits(['changeBuff', 'changeSkill', 'setTurmDamage', 'nextTrunSp'])

interface tempEnemyObj {
  chainCount: number // 当前连锁数量
  chainDamageAdd: []
  enemyWeakness: []
  attributeResistance: number
  element: 'light' | 'dark' | 'fire' | 'wind' | 'water'
  weakPointDamageAdd: number // 弱点增伤
}

const limitSp = ref<number>(20) // 最大sp数量
const trunReplySp = ref<number>(0) // 本回合回复的sp
const trunUseSp = ref<number>(0) // 本回合使用技能消耗的sp

const userBuff = ref<Record<string, userBuffObj[]>>({}) // 用来记录本回合角色身上的buff 回合结束后统一更新
const warcraftBuff = ref<Record<number, warcraftBuffObj>>({}) // 用来记录本回合魔兽身上的buff 回合结束后统一更新
const tempEnemyList = ref<tempEnemyObj[]>([]) // 初始状态下的魔兽情况
const afterTempEnemyList = ref<tempEnemyObj[]>([]) // 攻击后的魔兽状态
const attackPosition = ref<number[]>([]) // 攻击到的位置的下标 展示用
const attackPositionBuyWarcraft = ref<number[]>([]) // 魔兽打击位置 记录用
const showAttackPositionBuyWarcraft = ref<number[]>([]) // 魔兽打击位置 展示用
const friendlyPosition = ref<number[]>([]) // buff效果位置，展示用
const selectIndex = ref<number>()
// 友军场地角色位置变化
const changeLocation = (index: number) => {
  attackPosition.value = []
  friendlyPosition.value = []
  if (selectIndex.value === index) {
    selectIndex.value = undefined
  } else if (!selectIndex.value && selectIndex.value !== 0) {
    selectIndex.value = index
  } else {
    const dataList = props.battleGroundList
    const tempIndex = dataList[selectIndex.value]
    dataList[selectIndex.value] = dataList[index]
    dataList[index] = tempIndex
    selectIndex.value = undefined
    // 位置替换了就重新计算伤害
    initialization(true)
  }
  if (!!props.battleGroundList[index] && (!!selectIndex.value || selectIndex.value === 0)) {
    // 如果选到了角色
    selectCharactarBox()
  }
}
const form = ref<Record<string, number | undefined>>({
  size: 12,
  level: undefined,
})

const warcraftLevelList = ref<Record<string, warcraftLevelData>>({})

interface scopeWeaknessesObj {
  scope: number[][]
  weaknesses: number
}
// 魔兽位置设置
const setTempEnemyList = () => {
  tempEnemyList.value = new Array(form.value.size)
  const scopeList = props.warcraftData.scope
  // 魔兽不同级别的面板记录
  warcraftLevelList.value = props.warcraftData.levelData
  form.value.level = Object.keys(warcraftLevelList.value).map((item) => +item)[0] // 默认使用第一个面板
  scopeList.forEach((item: number[]) => {
    tempEnemyList.value[transformationIndex(item)] = {
      chainCount: 0, // 当前连锁数量
      chainDamageAdd: [],
      enemyWeakness: [],
      attributeResistance: props.warcraftData.attributeResistance,
      element: props.warcraftData.element,
      weakPointDamageAdd: 0, // 弱点增伤
    }
  })
  const scopeWeaknessesList = props.warcraftData.scopeWeaknesses
  scopeWeaknessesList.forEach((item: scopeWeaknessesObj) => {
    item.scope.forEach((sItem: number[]) => {
      tempEnemyList.value[transformationIndex(sItem)].weakPointDamageAdd = item.weaknesses
    })
  })
}
setTempEnemyList()

// 选择了角色
const selectCharactarBox = () => {
  const selectPosition = selectIndex.value || 0
  const selectCharactar = props.battleGroundList[selectPosition] as editableCharactar
  const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
  const charactarSkillTarget = selectCharactar.skill[selectSikll].target
  if (charactarSkillTarget === 'friendly') {
    const mainTarget = transformationCoordinates(selectPosition)
      .split(',')
      .map((item) => +item)
    getAllAttackPosition(mainTarget, selectCharactar)
  } else {
    getMainAttackPosition()
  }
}

// 获取选中的皮肤攻击到的主目标位置
const getMainAttackPosition = (column: number = 4, row: number = 3) => {
  const selectPosition = selectIndex.value || 0
  let nowColumn = Math.floor(selectPosition / column) // 当前选中角色的位置
  const rowRange = Array.from({ length: row }, (_, index) => ({
    // 各列额下标范围
    max: column * (index + 1) - 1,
    min: column * index,
  }))
  const warcraftScope = props.warcraftData.scope // 魔兽占用范围
  const warcraftScopeIndexList = warcraftScope.map((item: number[]) => transformationIndex(item)) // 转化为下标方便查询
  // 皮肤攻击范围 皮肤攻击类型 魔兽范围进行匹配
  const selectCharactar = props.battleGroundList[selectPosition] as editableCharactar
  let attackMaintarget: number[] = [] // 主目标位置
  let firstTarget: string[] = [] // 第一次触碰到的目标
  let secondTarget: string[] = [] // 第二次触碰到的目标 攻击类型为跳过的时候
  let value = rowRange[nowColumn].min
  let CycleNumber = 0 // 控制循环次数
  while (CycleNumber < row) {
    if (attackMaintarget.length > 0) {
      // 找到了目标
      break
    }
    while (value <= rowRange[nowColumn].max) {
      if (warcraftScopeIndexList.includes(value)) {
        if (firstTarget.length > 0) {
          secondTarget = transformationCoordinates(value).split(',')
        } else {
          firstTarget = transformationCoordinates(value).split(',')
        }
      }
      if (firstTarget.length > 0 && selectCharactar.attackType === 'front') {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
      if (secondTarget.length > 0 && selectCharactar.attackType === 'skip') {
        attackMaintarget = secondTarget.map((item) => +item)
        break
      }
      value++
      if (value > rowRange[nowColumn].max && firstTarget.length > 0) {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
    }
    // 如果当前列没有匹配到目标则往下一列查询
    nowColumn++
    // 如果是最后一列则重头开始，因为row是值，nowCloumn是下标
    if (nowColumn === row) {
      nowColumn = 0
    }
    value = rowRange[nowColumn].min
    CycleNumber++
  }
  if (attackMaintarget.length === 0) {
    console.log('没有找到可以打击的目标，确认代码或者魔兽')
    return
  } else {
    attackPosition.value = [transformationIndex(attackMaintarget)]
    getAllAttackPosition(attackMaintarget, selectCharactar)
  }
}
// 获取所有位置， 应对嘲讽的情况。嘲讽的时候主目标固定为嘲讽单位
const getAllAttackPosition = (
  attackMaintarget: number[], // 主目标位置 坐标
  selectCharactar: editableCharactar, // 角色信息
  column: number = 4, // 场地大小
  row: number = 3,
) => {
  const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
  const charactarSkillScope = selectCharactar.skill[selectSikll].scope
  const target: 'friendly' | 'enemy' = selectCharactar.skill[selectSikll].target || 'enemy'
  if (target === 'enemy') {
    const warcraftDataScope: number[][] = props.warcraftData.scope // 魔兽范围
    const warcraftScopeIndexList = warcraftDataScope.map((item: number[]) =>
      transformationIndex(item),
    ) // 转化为下标方便查询
    const realSkillScope = charactarSkillScope
      ?.map(
        (
          item: number[], //坐标都加上真实主目标的偏移量
        ) => item.map((val: number, i: number) => val + (attackMaintarget[i] || 0)),
      )
      .filter((item) => 0 <= item[0] && item[0] <= row - 1 && 0 <= item[1] && item[1] <= column - 1) // 过滤超出地图的点位
      .map((tTtem: number[]) => transformationIndex(tTtem)) // 转化为下标
      .filter((item) => warcraftScopeIndexList.includes(item)) // 过来不是魔兽位置的点位
    attackPosition.value = realSkillScope || []
  } else {
    let realSkillScope: number[] = []
    if (charactarSkillScope?.length === 0) {
      // 没有设置范围那就是全部，
      realSkillScope = Array.from({ length: column * row }, (_, index) => index)
    } else {
      realSkillScope =
        charactarSkillScope
          ?.map(
            (
              item: number[], //坐标都加上真实主目标的偏移量
            ) => item.map((val: number, i: number) => val + (attackMaintarget[i] || 0)),
          )
          .filter(
            (item) => 0 <= item[0] && item[0] <= row - 1 && 0 <= item[1] && item[1] <= column - 1,
          ) // 过滤超出地图的点位
          .map((tTtem: number[]) => transformationIndex(tTtem)) || [] // 转化为下标
    }
    friendlyPosition.value = realSkillScope
  }
}

// 获取选中的皮肤攻击到的主目标位置
const autoGetMainAttackPosition = async (index: number, column: number = 4, row: number = 3) => {
  const selectPosition = index
  let nowColumn = Math.floor(selectPosition / column) // 当前选中角色的位置
  const rowRange = Array.from({ length: row }, (_, index) => ({
    // 各列额下标范围
    max: column * (index + 1) - 1,
    min: column * index,
  }))
  const warcraftScope = props.warcraftData.scope // 魔兽占用范围
  const warcraftScopeIndexList = warcraftScope.map((item: number[]) => transformationIndex(item)) // 转化为下标方便查询
  // 皮肤攻击范围 皮肤攻击类型 魔兽范围进行匹配
  const selectCharactar = props.battleGroundList[selectPosition] as editableCharactar
  let attackMaintarget: number[] = [] // 主目标位置
  let firstTarget: string[] = [] // 第一次触碰到的目标
  let secondTarget: string[] = [] // 第二次触碰到的目标 攻击类型为跳过的时候
  let value = rowRange[nowColumn].min
  let CycleNumber = 0 // 控制循环次数
  while (CycleNumber < row) {
    if (attackMaintarget.length > 0) {
      // 找到了目标
      break
    }
    while (value <= rowRange[nowColumn].max) {
      if (warcraftScopeIndexList.includes(value)) {
        if (firstTarget.length > 0) {
          secondTarget = transformationCoordinates(value).split(',')
        } else {
          firstTarget = transformationCoordinates(value).split(',')
        }
      }
      if (firstTarget.length > 0 && selectCharactar.attackType === 'front') {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
      if (secondTarget.length > 0 && selectCharactar.attackType === 'skip') {
        attackMaintarget = secondTarget.map((item) => +item)
        break
      }
      value++
      if (value > rowRange[nowColumn].max && firstTarget.length > 0) {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
    }
    // 如果当前列没有匹配到目标则往下一列查询
    nowColumn++
    // 如果是最后一列则重头开始，因为row是值，nowCloumn是下标
    if (nowColumn === row) {
      nowColumn = 0
    }
    value = rowRange[nowColumn].min
    CycleNumber++
  }
  if (attackMaintarget.length === 0) {
    return []
  } else {
    return autoGetAllAttackPosition(attackMaintarget, selectCharactar)
  }
}
// 获取所有位置， 应对嘲讽的情况。嘲讽的时候主目标固定为嘲讽单位
const autoGetAllAttackPosition = (
  attackMaintarget: number[], // 主目标位置
  selectCharactar: editableCharactar, // 角色信息
  column: number = 4, // 场地大小
  row: number = 3,
) => {
  const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
  const charactarSkillScope = selectCharactar.skill[selectSikll].scope
  const target: 'friendly' | 'enemy' = selectCharactar.skill[selectSikll].target || 'enemy'
  let realSkillScope: number[] = []
  if (target === 'enemy') {
    const warcraftDataScope: number[][] = props.warcraftData.scope // 魔兽范围
    const warcraftScopeIndexList = warcraftDataScope.map((item: number[]) =>
      transformationIndex(item),
    ) // 转化为下标方便查询
    realSkillScope =
      charactarSkillScope
        ?.map(
          (
            item: number[], //坐标都加上真实主目标的偏移量
          ) => item.map((val: number, i: number) => val + (attackMaintarget[i] || 0)),
        )
        .filter(
          (item) => 0 <= item[0] && item[0] <= row - 1 && 0 <= item[1] && item[1] <= column - 1,
        ) // 过滤超出地图的点位
        .map((tTtem: number[]) => transformationIndex(tTtem)) // 转化为下标
        .filter((item) => warcraftScopeIndexList.includes(item)) || [] // 过来不是魔兽位置的点位
  } else {
    if (charactarSkillScope?.length === 0) {
      // 没有设置范围那就是全部，
      realSkillScope = Array.from({ length: column * row }, (_, index) => index)
    } else {
      realSkillScope =
        charactarSkillScope
          ?.map(
            (
              item: number[], //坐标都加上真实主目标的偏移量
            ) => item.map((val: number, i: number) => val + (attackMaintarget[i] || 0)),
          )
          .filter(
            (item) => 0 <= item[0] && item[0] <= row - 1 && 0 <= item[1] && item[1] <= column - 1,
          ) // 过滤超出地图的点位
          .map((tTtem: number[]) => transformationIndex(tTtem)) || [] // 转化为下标
    }
  }
  return realSkillScope || []
}

const setDamageData = (
  attackPosition: number[], // 攻击的范围
  attackUser: editableCharactar, // 攻击的角色
  charactarSkill: editableCharactarSkill, // 角色使用的技能 正常打击需要指定
  specialDamage: number = 0, // 是否有特殊伤害
) => {
  // console.log(attackPosition, attackUser)
  let damageNumber: number = 0
  // 造成伤害的角色自身的各类属性加成
  const charactarData: userBuff = {
    panel: attackUser.panel,
    multiplier: 0,
    attackAdd: getAttackAdd(attackUser), // 需要计算
    critical: getCritical(attackUser),
    increasedDamage: 0,
    attributeDamage: getAttributeDamage(attackUser),
  }
  // 循环造成伤害的点位分别计算其伤害
  attackPosition.forEach((item, index) => {
    const warcraftBoxData = afterTempEnemyList.value[item]
    const warcraftData: warcraftBuff = {
      chainCount: warcraftBoxData.chainCount, // 连锁伤害
      weakPointDamageAdd: warcraftBoxData.weakPointDamageAdd, // 弱点加伤
    }
    // 有特殊伤害并且不是特殊伤害触发的判断 特指噩梦伤害
    if (warcraftBuff.value[item] && warcraftBuff.value[item].specialInjuryBuff && !specialDamage) {
      const specialInjuryBuffData = warcraftBuff.value[item].specialInjuryBuff
      specialInjuryBuffData.forEach((specialItem: specialInjuryBuffObj) => {
        // 噩梦伤害
        if (specialItem.type === specialInjuryBuffType.Nightmare) {
          let specialAttackUser = {} as editableCharactar
          let key = ''
          const specialAttackSkill = specialItem.key.split('_')[0]
          props.attackSequence.forEach(async (item) => {
            if (!!item) {
              const data = item as editableCharactar
              const charactarSkillList = Object.keys(data.skill)
              if (charactarSkillList.includes(specialAttackSkill)) {
                specialAttackUser = JSON.parse(JSON.stringify(data))
                key = `${data.name}_${specialAttackSkill}`
              }
            }
          })
          damageList.value[key] =
            (damageList.value[key] || 0) +
            setDamageData(
              [item],
              specialAttackUser,
              {} as editableCharactarSkill,
              specialItem.specialMultiplying,
            )
        }
      })
    }
    const chainAddNumber = getchainAddNumber(attackUser)
    let delaybuff = {} // 延时buff主要是脆弱这种增伤
    // 特殊伤害情况下的伤害逻辑
    if (!!specialDamage) {
      charactarData.multiplier = specialDamage
    } else {
      // 给魔兽上debuff
      delaybuff = setAbnormalState(
        attackUser,
        charactarSkill.skillEffect,
        item,
        attackPosition,
        warcraftBoxData.chainCount,
        chainAddNumber,
      )
      // 倍率计算
      if (charactarSkill.skillEffect.mainMultiplying) {
        // 主目标单独倍率
        charactarData.multiplier = getMultiplier(charactarSkill, attackPosition.length, index)
      } else if (charactarSkill.skillEffect.ThreeMultiplying) {
        // 摩托的3x连锁
        charactarData.multiplier = getMultiplier(
          charactarSkill,
          attackPosition.length,
          undefined,
          warcraftBoxData.chainCount,
          chainAddNumber,
        )
      } else {
        charactarData.multiplier = getMultiplier(charactarSkill, attackPosition.length)
      }
    }
    // 增伤
    charactarData.increasedDamage = getIncreasedDamage(attackUser, warcraftBoxData.chainCount)
    // 魔兽的易伤值
    warcraftData.enemyWeakness = getEnemyWeakness(attackUser, item)
    // 问魔兽的
    // enemyDefence?: number // 防御/魔抗
    // damageReduction?: number // 减伤
    // chainDamageAdd?: number // 连锁伤害加成
    // attributeResistance?: number // 属性抵抗
    const damageData: damageObj = {
      ...charactarData,
      ...warcraftData,
    }
    damageNumber = damageNumber + (+calculateDamage(damageData) || 1) // 最低伤害1点

    // 连锁+1 有buff还要计算 如果是特殊的伤害buff则不记录连锁
    if (!specialDamage) {
      afterTempEnemyList.value[item].chainCount += chainAddNumber
    }
    // 延时buff攻击完成之后再上
    if (!isEmpty(delaybuff)) {
      warcraftBuff.value[item].enemyWeakness = upsertObjectByKey(
        warcraftBuff.value[item].enemyWeakness,
        delaybuff,
      )
    }
  })
  return damageNumber
}

// 给魔兽上异常状态
const setAbnormalState = (
  attackUser: editableCharactar,
  skillEffect: skillEffectObj,
  targetLocation: number,
  attackPosition: number[] = [],
  chainCount: number = 1,
  chainAddNumber: number = 1,
) => {
  let delaybuff = {} // 延时buff主要是脆弱这种增伤
  // 上debuff的情况
  if (skillEffect.deBuff) {
    const charactarSkill =
      attackUser.skill[attackUser.selectSikll || Object.keys(attackUser.skill)[0]] // 角色技能
    const deBuffList = skillEffect.deBuff
    deBuffList.forEach((deBuffObj: deBuffObj, deBuffIndex: number) => {
      const temp = JSON.parse(JSON.stringify(deBuffObj))
      const tempBuff = {
        addTurn: props.turnNumber, // 上buff的回合
        key: `${charactarSkill.name}_${deBuffIndex}`, // buffid，防止同一个buff上多次
        ...temp,
      }
      delete tempBuff.scope
      // 虚弱或者脆弱 先判断优先级高的
      if (tempBuff.mainEnemyWeakness) {
        // 有主目标脆弱, 并且打的是主目标
        if (targetLocation === attackPosition[0]) {
          tempBuff.enemyWeakness = tempBuff.mainEnemyWeakness
          delete tempBuff.mainEnemyWeakness
          initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'enemyWeakness')
          if (!tempBuff.delay) {
            warcraftBuff.value[targetLocation].enemyWeakness = upsertObjectByKey(
              warcraftBuff.value[targetLocation].enemyWeakness,
              tempBuff,
            )
          } else {
            // 存储延时buff
            delete tempBuff.delay
            delaybuff = tempBuff
          }
        }
      } else if (tempBuff.enemyWeakness) {
        initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'enemyWeakness')
        delete tempBuff.mainEnemyWeakness
        // 索菲亚的暗属性易伤 攻击后的连锁数量
        if (tempBuff.darkEnemyWeakness) {
          if (tempBuff.minChainCount <= chainCount + chainAddNumber) {
            tempBuff.enemyWeakness = tempBuff.darkEnemyWeakness
            tempBuff.attributeElement = 'dark'
          }
          delete tempBuff.darkEnemyWeakness
          delete tempBuff.minChainCount
        }
        if (!tempBuff.delay) {
          warcraftBuff.value[targetLocation].enemyWeakness = upsertObjectByKey(
            warcraftBuff.value[targetLocation].enemyWeakness,
            tempBuff,
          )
        } else {
          // 存储延时buff
          delete tempBuff.delay
          delaybuff = tempBuff
        }
      }
      // 连锁伤害加成
      if (tempBuff.chainDamageAdd) {
        // 连锁伤害加成
        initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'chainDamageAdd')
        warcraftBuff.value[targetLocation].chainDamageAdd = upsertObjectByKey(
          warcraftBuff.value[targetLocation].chainDamageAdd,
          tempBuff,
        )
      } else {
        // initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'othersDebuff')
        // warcraftBuff.value[targetLocation].othersDebuff = upsertObjectByKey(
        //   warcraftBuff.value[targetLocation].othersDebuff,
        //   tempBuff,
        // )
      }
    })
  }
  if (skillEffect.specialInjuryBuff) {
    const charactarSkill =
      attackUser.skill[attackUser.selectSikll || Object.keys(attackUser.skill)[0]] // 角色技能
    const specialInjuryBuffList = skillEffect.specialInjuryBuff
    specialInjuryBuffList.forEach(
      (specialInjuryBuffObj: specialInjuryBuffObj, deBuffIndex: number) => {
        const temp = JSON.parse(JSON.stringify(specialInjuryBuffObj))
        const tempBuff = {
          addTurn: props.turnNumber, // 上buff的回合
          key: `${charactarSkill.name}_${deBuffIndex}`, // buffid，防止同一个buff上多次
          ...temp,
        }
        delete tempBuff.scope
        initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'specialInjuryBuff')
        warcraftBuff.value[targetLocation].specialInjuryBuff = upsertObjectByKey(
          warcraftBuff.value[targetLocation].specialInjuryBuff,
          tempBuff,
        )
        // console.log(tempBuff, 'setAbnormalState', index)
      },
    )
  }
  // 上dot伤害
  if (skillEffect.dotBuff) {
    const charactarSkill =
      attackUser.skill[attackUser.selectSikll || Object.keys(attackUser.skill)[0]] // 角色技能
    const dotBuffList = skillEffect.dotBuff
    dotBuffList.forEach((deBuffObj: deBuffObj, deBuffIndex: number) => {
      const temp = JSON.parse(JSON.stringify(deBuffObj))
      const tempBuff = {
        addTurn: props.turnNumber, // 上buff的回合
        key: `${attackUser.name}_${charactarSkill.name}_${deBuffIndex}`, // buffid，防止同一个buff上多次
        ...temp,
      }
      delete tempBuff.scope
      initializeWarcraftBuff(warcraftBuff.value, targetLocation, 'dotBuff')
      warcraftBuff.value[targetLocation].dotBuff = upsertObjectByKey(
        warcraftBuff.value[targetLocation].dotBuff,
        tempBuff,
      )
    })
  }
  console.log(delaybuff, 'delaybuff')
  // 抛出记录的延时buff
  return delaybuff
}

// 给魔兽debuff一个初始值
const initializeWarcraftBuff = (
  data: Record<number, warcraftBuffObj>,
  index: number,
  key: warcraftBuffObjKeys,
) => {
  if (!data[index]) {
    Reflect.set(data, index, { [key]: [] })
  }
  if (!!data[index] && !data[index][key]) {
    Reflect.set(data[index], key, [])
  }
}

// 魔兽的增伤状态计算
const getEnemyWeakness = (
  { element, attackAttribute }: editableCharactar,
  targetLocation: number,
) => {
  let enemyWeakness = 0
  if (
    warcraftBuff.value[targetLocation] &&
    warcraftBuff.value[targetLocation].enemyWeakness &&
    warcraftBuff.value[targetLocation].enemyWeakness?.length > 0
  ) {
    let enemyWeaknessList = JSON.parse(
      JSON.stringify(warcraftBuff.value[targetLocation].enemyWeakness),
    )
    enemyWeaknessList = enemyWeaknessList.filter((item: enemyWeaknessBuffObj) => {
      if (item.attributeElement && item.attributeElement === element) {
        return true
      }
      if (item.attribute && item.attribute === attackAttribute) {
        return true
      }
      if (!item.attributeElement && !item.attribute) {
        return true
      }
      return false
    })
    enemyWeakness = enemyWeakness + sumMaxNumbersByType(enemyWeaknessList)
  }
  return enemyWeakness
}

// 计算面板加成比例
const getAttackAdd = (attackUser: editableCharactar) => {
  const attackAddNumber = (getBuffNumber(attackUser, 'attackAdd') || 0) as number
  return attackAddNumber
}
// 计算真实爆伤
const getCritical = (attackUser: editableCharactar) => {
  const critical = (getBuffNumber(attackUser, 'critical') || 0) as number
  return attackUser.critical + critical
}
// 计算真实倍率
const getMultiplier = (
  charactarSkill: editableCharactarSkill,
  attackNumber: number = 1,
  index?: number,
  chainCount: number = 0, // 连锁数
  chainAddNumber: number = 1, // 连锁增长值。默认1
) => {
  let multiply = charactarSkill.skillEffect.multiplying
  if (index === 0 && charactarSkill.skillEffect.mainMultiplying) {
    multiply = charactarSkill.skillEffect.mainMultiplying
  }
  // 卢班希亚野犬倍率，打击后连锁是3x
  if (charactarSkill.skillEffect.ThreeMultiplying && (chainCount + chainAddNumber) % 3 === 0) {
    multiply = charactarSkill.skillEffect.ThreeMultiplying
  }
  if (charactarSkill.skillEffect.extraMultiplying) {
    multiply = multiply + charactarSkill.skillEffect.extraMultiplying * attackNumber
  }
  return multiply
}
// 计算真实增伤
const getIncreasedDamage = (attackUser: editableCharactar, chainCount: number) => {
  // 是否有自拐
  ourSelfBuff(attackUser)
  const attackAddBuffNumber = (userBuff.value[attackUser.name] || [])
    .map((item) => {
      if (item.increasedDamage) {
        const limitKeyList = ['minChainCount', 'maxChainCount', 'superpositionNumber']
        const hasOwn = Object.prototype.hasOwnProperty
        if (!limitKeyList.some((key) => hasOwn.call(item, key))) {
          // 没限制条件的增伤则直接使用
          return item.increasedDamage
        } else if (item.minChainCount && chainCount >= item.minChainCount) {
          return item.increasedDamage
        } else if (item.maxChainCount && chainCount <= item.maxChainCount) {
          return item.increasedDamage
        } else if (!!item.superpositionNumber) {
          return item.increasedDamage * item.superpositionNumber
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    })
    .filter((item) => !!item)
  return attackAddBuffNumber.length > 0
    ? attackAddBuffNumber.reduce((prev, cur) => (prev || 0) + (cur || 0))
    : 0
}
// 连锁增强
const getchainAddNumber = (attackUser: editableCharactar) => {
  const common = 1
  const chainAddNumber = (getBuffNumber(attackUser, 'chainAddNumber') || 0) as number
  return common + chainAddNumber
}
// 计算真实属伤
const getAttributeDamage = (attackUser: editableCharactar) => {
  // light -> dark -> light           water -> fire -> wind -> water
  const beneficialElementList = ['light', 'dark', 'light', 'water', 'fire', 'wind', 'water']
  let attributeDamageNumber = 0
  const elementIndex = beneficialElementList.indexOf(attackUser.element) // 角色属性在克制表格中的下标 第一个位置
  // 属性克制
  if (
    0 <= elementIndex && // 有效下标
    elementIndex < beneficialElementList.length &&
    beneficialElementList[elementIndex + 1] === props.warcraftData.element // 是克制属性
  ) {
    // 是否有自拐
    ourSelfBuff(attackUser)
    // 计算有buff后的属性伤害
    const attackAddBuffNumberList = (userBuff.value[attackUser.name] || [])
      .map((item) =>
        item.lightAttributeDamage && attackUser.element === 'light'
          ? item.lightAttributeDamage
          : item.attributeDamage
            ? item.attributeDamage
            : undefined,
      )
      .filter((item) => !!item)
    const attributeDamage =
      attackAddBuffNumberList.length > 0
        ? attackAddBuffNumberList.reduce((prev, cur) => (prev || 0) + (cur || 0)) || 0
        : 0
    attributeDamageNumber = attackUser.attributeDamage + attributeDamage
  }
  return attributeDamageNumber
}
// 获取buff增强值 通用模块封装
const getBuffNumber = (attackUser: editableCharactar, key: userBuffObjKeys) => {
  ourSelfBuff(attackUser)
  const buffNumberList = (userBuff.value[attackUser.name] || [])
    .map((item) => (item[key] ? item[key] : undefined))
    .filter((item) => !!item) as unknown as number[]
  return buffNumberList.length > 0
    ? buffNumberList.reduce((prev, cur) => (prev || 0) + (cur || 0))
    : 0
}

// 当前回合血量
const damageList = ref<Record<string, number>>({})
const trunDamageTable = ref<[string, number][]>()
const alldamage = () => {
  const damageNumberList = Object.values(damageList.value) || []
  trunDamageTable.value = sortObjectByValue(damageList.value)
  return damageNumberList.length > 0 ? damageNumberList.reduce((prev, cur) => prev + cur) : 0
}

interface damageTableObj {
  tableList?: [string, number][]
  allDamageData?: number
}

const damageTable = ref<damageTableObj>({})

// 魔兽所有伤害 展示用
const warcraftDataMessage = () => {
  const warcraftHp = form.value.level ? warcraftLevelList.value[form.value.level].hp : 0
  const tIndex = (props.turnNumber - 1) / 2
  const allDamageNumberList = props.alldamageList.filter((_, index) => index <= tIndex)
  const allDamageNumberObj: Record<string, number> = {}
  allDamageNumberList.forEach((item) => {
    const temp = JSON.parse(JSON.stringify(item)) as Record<string, number>
    const damageUserList = Object.keys(temp)
    damageUserList.forEach((dItem) => {
      if (allDamageNumberObj[dItem]) {
        allDamageNumberObj[dItem] = allDamageNumberObj[dItem] + temp[dItem]
      } else {
        allDamageNumberObj[dItem] = temp[dItem]
      }
    })
  })
  const damageList = Object.values(allDamageNumberObj) as number[]
  const damageData =
    damageList.length > 0 ? damageList.reduce((prev, cur) => (prev || 0) + (cur || 0)) : 0
  const percentageHp = Math.round(((warcraftHp - damageData) / warcraftHp) * 10000) / 100
  damageTable.value.tableList = sortObjectByValue(allDamageNumberObj)
  damageTable.value.allDamageData = damageData
  return `魔兽血量： <span style="color: blue;">${warcraftHp - damageData}</span>/${warcraftHp} (${percentageHp}%)`
}
/**
 * 将 Record<string, number> 按值排序，返回 [key, value][] 数组
 * @param obj 要排序的对象，键为 string，值为 number
 * @param order 排序顺序，默认 'desc'（降序），可选 'asc'
 * @returns 排序后的 [key, value][] 数组
 */
function sortObjectByValue(
  obj: Record<string, number>,
  order: 'asc' | 'desc' = 'desc',
): [string, number][] {
  const entries = Object.entries(obj) as [string, number][]

  return entries.sort((a, b) => {
    const diff = a[1] - b[1]
    return order === 'asc' ? diff : -diff
  })
}
interface positionObj {
  target: 'friendly' | 'enemy'
  scope: number[]
}
// 伤害计算
const damageCalculation = async () => {
  // 获取打击范围 回合开始
  const attackPosition: Record<string, positionObj> = {}
  afterTempEnemyList.value = JSON.parse(JSON.stringify(tempEnemyList.value)) // 魔兽场地信息
  // 获取需要计算伤害的角色攻击范围
  await props.battleGroundList.forEach(async (item, index) => {
    if (!!item) {
      const data = item as editableCharactar
      const selectCharactar = props.battleGroundList[index] as editableCharactar
      const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
      const target: 'friendly' | 'enemy' = selectCharactar.skill[selectSikll].target || 'enemy'
      spChange(selectCharactar.skill[selectSikll], selectCharactar)
      if (target === 'enemy') {
        const temp: positionObj = {
          scope: await autoGetMainAttackPosition(index),
          target: 'enemy',
        }
        attackPosition[data.name] = temp
      } else {
        // 获取坐标位置
        const mainTarget = transformationCoordinates(index)
          .split(',')
          .map((item) => +item)
        const temp: positionObj = {
          scope: await autoGetAllAttackPosition(mainTarget, selectCharactar),
          target: 'friendly',
        }
        attackPosition[data.name] = temp
      }
    }
  })
  props.attackSequence.forEach(async (item) => {
    if (!!item) {
      const data = item as editableCharactar
      const charactarSkill = data.skill[data.selectSikll || Object.keys(data.skill)[0]]
      let damageNumber = 0
      if (attackPosition[data.name].target === 'friendly') {
        // 作用访问为友军
        await appendBuff(attackPosition[data.name].scope, charactarSkill, data)
      } else {
        let number = charactarSkill.chain || 0
        while (number > 0) {
          damageNumber =
            damageNumber + setDamageData(attackPosition[data.name].scope, data, charactarSkill)
          number--
        }
        const keys = `${data.name}_${charactarSkill.name}`
        damageList.value[keys] = damageNumber
      }
    }
  })
}

// 判断是否有自拐
const ourSelfBuff = (attackUser: editableCharactar) => {
  const charactarSkill =
    attackUser.skill[attackUser.selectSikll || Object.keys(attackUser.skill)[0]] // 角色技能
  // 计算buff
  appendBuff([], charactarSkill, attackUser)
}

// 给角色添加buff
const appendBuff = (
  attackPosition: number[], // 需要上buff的位置的下标
  charactarSkill: editableCharactarSkill,
  attackUser: editableCharactar,
  key: 'buff' | 'aureole' = 'buff',
) => {
  const buffList = charactarSkill.skillEffect[key] || []
  buffList.forEach((item: buffObj | aureoleObj, index) => {
    // 继承主目标范围，否则单独计算范围
    if (item.scope.length === 0) {
      // 给范围内的角色上buff
      attackPosition.forEach((nItem) => {
        if (props.battleGroundList[nItem]) {
          const selectCharactar = props.battleGroundList[nItem] as editableCharactar
          const temp = JSON.parse(JSON.stringify(item))
          if (key === 'aureole') {
            // 光环buff默认2回合 戴安娜的盾还需要单独处理到时候再说吧
            temp.duration = 2
          }
          delete temp.scope
          if (!temp.attribute) {
            const tempBuff = {
              addTurn: props.turnNumber, // 上buff的回合
              key: `${charactarSkill.name}_${index}_${key}`, // buffid，防止同一个buff上多次
              ...temp,
            }
            userBuff.value[selectCharactar.name] = upsertObjectByKey(
              userBuff.value[selectCharactar.name],
              tempBuff,
            )
          } else if (temp.attribute && temp.attribute === selectCharactar.attackAttribute) {
            delete temp.attribute
            const tempBuff = {
              addTurn: props.turnNumber, // 上buff的回合
              key: `${charactarSkill.name}_${index}_${key}`, // buffid，防止同一个buff上多次
              ...temp,
            }
            userBuff.value[selectCharactar.name] = upsertObjectByKey(
              userBuff.value[selectCharactar.name],
              tempBuff,
            )
          }
        }
      })
    } else {
      // 作用给自己的buff
      if (item.scope.length === 1 && transformationIndex(item.scope[0]) === 0) {
        const temp = JSON.parse(JSON.stringify(item))
        delete temp.scope
        delete temp.attribute
        const tempBuff = {
          addTurn: props.turnNumber, // 上buff的回合
          key: `${charactarSkill.name}_${index}_${key}`, // buffid，防止同一个buff上多次
          ...temp,
        }
        userBuff.value[attackUser.name] = upsertObjectByKey(
          userBuff.value[attackUser.name],
          tempBuff,
        )
      }
      // 自身有光环单独再去上一次光环buff
      const temp = JSON.parse(JSON.stringify(item)) as buffObj
      if (!!temp.aureole && temp.aureole === 1) {
        appendBuff(attackPosition, charactarSkill, attackUser, 'aureole')
      }
    }
  })
}

const getUserBuffList = () => {
  nextTick(() => {
    const tempBuffList = JSON.parse(JSON.stringify(props.beforeBuffList))
    const effectiveBuffList: Record<string, userBuffObj[]> = {}
    // 处理需要继承的buff
    for (const value in tempBuffList) {
      effectiveBuffList[value] = tempBuffList[value].filter(
        (item: buffComonElement) => props.turnNumber - item.addTurn < item.duration,
      )
    }
    userBuff.value = effectiveBuffList
    // 单独处理光环buff
    for (const value in effectiveBuffList) {
      effectiveBuffList[value].forEach((item: userBuffObj) => {
        if (!!item.aureole && item.aureole === 1) {
          const userList = props.battleGroundList as editableCharactar[]
          userList.forEach(async (Bitem: editableCharactar, Bindex: number) => {
            if (Bitem && Bitem.name === value) {
              const selectSkill = item.key.split('_')[0]
              const mainTarget = transformationCoordinates(Bindex)
                .split(',')
                .map((item) => +item)
              const selectCharactar = JSON.parse(JSON.stringify(Bitem))
              selectCharactar.selectSikll = selectSkill
              const attackPosition = await autoGetAllAttackPosition(mainTarget, selectCharactar)
              appendBuff(attackPosition, Bitem.skill[selectSkill], Bitem, 'aureole')
            }
          })
        }
      })
    }
  })
}

const getWarcraftBuffList = () => {
  nextTick(() => {
    const tempBuffList = JSON.parse(JSON.stringify(props.beforeWarcraftBuffList)) as Record<
      number,
      warcraftBuffObj
    >
    const effectiveBuffList: Record<number, warcraftBuffObj> = {}
    // 处理需要继承的buff
    for (const value in tempBuffList) {
      initializeWarcraftBuff(effectiveBuffList, +value, 'chainDamageAdd')
      effectiveBuffList[value].chainDamageAdd = (tempBuffList[value].chainDamageAdd || []).filter(
        (item: buffComonElement) => props.turnNumber - item.addTurn < item.duration,
      )
      initializeWarcraftBuff(effectiveBuffList, +value, 'enemyWeakness')
      effectiveBuffList[value].enemyWeakness = (tempBuffList[value].enemyWeakness || []).filter(
        (item: buffComonElement) => props.turnNumber - item.addTurn < item.duration,
      )
      initializeWarcraftBuff(effectiveBuffList, +value, 'specialInjuryBuff')
      effectiveBuffList[value].specialInjuryBuff = (
        tempBuffList[value].specialInjuryBuff || []
      ).filter((item: buffComonElement) => props.turnNumber - item.addTurn < item.duration)
    }
    warcraftBuff.value = effectiveBuffList
  })
}

// 魔兽的回合
const warcraftTurn = async () => {
  // 判断魔兽使用的技能
  setWarcraftSkill()
  // 触发dot伤害 第一段吃连锁
  await estimateDotDamege('user')
  // 魔兽回合清空连锁
  afterTempEnemyList.value.forEach((item) => {
    if (item && item.chainCount) {
      item.chainCount = 0
    }
  })
  // 魔兽开始攻击
  await warcraftAttack()
  // 触发dot伤害
  await estimateDotDamege('warcraft')
}

const estimateDotDamege = (trunType: string) => {
  const dotBuffList = []
  // 判断并且获取所有dot伤害buff
  for (const warcraftLocation in warcraftBuff.value) {
    if (
      !!warcraftBuff.value[warcraftLocation].dotBuff &&
      warcraftBuff.value[warcraftLocation].dotBuff.length > 0
    ) {
      dotBuffList.push({
        location: +warcraftLocation,
        value: warcraftBuff.value[warcraftLocation].dotBuff,
      })
    }
  }
  // 如果有dot伤害
  if (dotBuffList.length > 0) {
    // 魔兽回合判断一下魔兽回合的无效buff
    if (trunType === 'warcraft') {
      const tempBuffList = JSON.parse(JSON.stringify(userBuff.value))
      const effectiveBuffList: Record<string, userBuffObj[]> = {}
      // 处理需要继承的buff
      for (const value in tempBuffList) {
        effectiveBuffList[value] = tempBuffList[value].filter(
          (item: buffComonElement) => props.turnNumber + 1 - item.addTurn < item.duration, // 移除魔兽上的失效buff
        )
      }
      userBuff.value = effectiveBuffList
    }
    dotBuffList.forEach((item) => {
      const temp = JSON.parse(JSON.stringify(item))
      temp.value.forEach((tItem: dotBuffObj) => {
        const dotTemp = JSON.parse(JSON.stringify(tItem))
        const attackUserInformation = dotTemp.key.split('_')
        const attackUser = props.attackSequence.find(
          (item) => item.name === attackUserInformation[0],
        )
        // dot伤害触发
        const damage = setDamageData(
          [temp.location],
          attackUser as editableCharactar,
          {} as editableCharactarSkill,
          dotTemp.dotMultiplying,
        )
        const keys = `${attackUserInformation[0]}_${attackUserInformation[1]}`
        damageList.value[keys] += damage
      })
    })
  }
}

const warcraftUseSkillData = ref<warcraftSpecialSkillData | warcraftSkillData>({
  name: '',
  cname: '',
  chain: 0,
  scope: [],
  multiplying: 0,
})

// 判断本轮魔兽攻击技能
const setWarcraftSkill = () => {
  // 所有的连锁列表
  const chainCountList = afterTempEnemyList.value
    .map((item) => (item ? item.chainCount : undefined))
    .filter((item: number | undefined) => typeof item === 'number')
  // 最大连锁数
  const maxChainCount = Math.max.apply(null, chainCountList)
  // 最小连锁数量
  // const minChainCount = Math.min.apply(null, chainCountList)
  const warcraftSkillList = JSON.parse(JSON.stringify(props.warcraftCanUseSkill))
  if (props.turnNumber === 1) {
    warcraftSkillList.Skill = props.warcraftData.Skill
    warcraftSkillList.specialSkill = props.warcraftData.specialSkill
  }
  console.log(warcraftSkillList, '---------魔兽可使用技能-----------')
  // 默认使用通用队列中的第一个 如果没有则设置空
  warcraftUseSkillData.value = warcraftSkillList.Skill ? warcraftSkillList.Skill[0] : {}
  // 如果有特殊技能，看是否触发条件技能
  if (warcraftSkillList.specialSkill && warcraftSkillList.specialSkill.length > 0) {
    warcraftSkillList.specialSkill.forEach((item: warcraftSpecialSkillData) => {
      if (item.condition.minChainCount && item.condition.minChainCount < maxChainCount) {
        warcraftUseSkillData.value = item
      }
    })
  }
  // 删除已经使用的技能
  if (warcraftUseSkillData.value?.name && warcraftUseSkillData.value?.name.includes('special')) {
    warcraftSkillList.specialSkill = warcraftSkillList.specialSkill.filter(
      (item: warcraftSpecialSkillData) => item.name !== warcraftUseSkillData.value?.name,
    )
  } else if (
    warcraftUseSkillData.value?.name &&
    warcraftUseSkillData.value?.name.includes('skill')
  ) {
    warcraftSkillList.Skill = warcraftSkillList.Skill.filter(
      (item: warcraftSkillData) => item.name !== warcraftUseSkillData.value?.name,
    )
  }
  emit('changeSkill', warcraftSkillList)
}
// 魔兽攻击位置
const warcraftAttack = async () => {
  // 魔兽使用了技能
  if (warcraftUseSkillData.value) {
    // 角色占用位置
    const userScopeIndexList = props.battleGroundList
      .map((item, index) => (!!item ? index : undefined))
      .filter((item) => typeof item === 'number')
    let attackScope: number[] = []
    // 魔兽攻击的不是固定位置
    if (!warcraftUseSkillData.value.fixed) {
      attackScope = await autoGetMainAttackPositionByWarcraft(userScopeIndexList)
    } else {
      attackScope =
        warcraftUseSkillData.value.scope.map((tTtem: number[]) => transformationIndex(tTtem)) || [] // 转化为下标
    }
    attackPositionBuyWarcraft.value = JSON.parse(JSON.stringify(attackScope))
    attackScope.forEach((item) => {
      // 如果攻击范围内有目标
      if (userScopeIndexList.includes(item)) {
        let number = warcraftUseSkillData.value.chain || 0
        while (number > 0) {
          // 触发魔兽打击
          setWarcraftDamageData(item)
          number--
        }
        if (warcraftUseSkillData.value.chain > 0) {
          // 获取被攻击角色信息
          const attackUser = props.battleGroundList[item] as editableCharactar
          const attackUserBuff = userBuff.value[attackUser.name]
          // 魔兽上buff
          if (!!warcraftUseSkillData.value?.buff) {
            warcraftUseSkillData.value?.buff.forEach((item: buffObj, index) => {
              // 限制条件连锁增加为0
              if (typeof item.maxchainAddNumber === 'number' && !!attackUserBuff) {
                let chainAddNumber = 0
                attackUserBuff.forEach((item) => {
                  if (item.chainAddNumber) {
                    chainAddNumber += item.chainAddNumber
                  }
                })
                if (chainAddNumber <= item.maxchainAddNumber) {
                  const temp = JSON.parse(JSON.stringify(item))
                  delete temp.scope
                  delete temp.maxchainAddNumber
                  const tempBuff = {
                    addTurn: props.turnNumber + 1, // 上buff的回合
                    key: `${warcraftUseSkillData.value.name}_${index}`, // buffid，防止同一个buff上多次
                    ...temp,
                  }
                  userBuff.value[attackUser.name] = upsertObjectByKey(
                    userBuff.value[attackUser.name],
                    tempBuff,
                  )
                }
              } else {
                const temp = JSON.parse(JSON.stringify(item))
                delete temp.scope
                const tempBuff = {
                  addTurn: props.turnNumber + 1, // 上buff的回合
                  key: `${warcraftUseSkillData.value.name}_${index}`, // buffid，防止同一个buff上多次
                  ...temp,
                }
                userBuff.value[attackUser.name] = upsertObjectByKey(
                  userBuff.value[attackUser.name],
                  tempBuff,
                )
              }
            })
          }
          // 如果有反击触发反击伤害 使徒公主
          // 如果有特殊buff触发特殊buff 塞尔
          attackUserBuff?.forEach((attackUserItem) => {
            if (!!attackUserItem.hit) {
              triggerHitBuff(attackUser, warcraftUseSkillData.value.chain, attackUserItem)
            }
          })
        }
      }
    })
  }
}

// 魔兽打击，用于计算魔兽打击伤害
const setWarcraftDamageData = (item: number) => {
  console.log('打击了目标，位置为：', item)
}

// 触发受击buff
const triggerHitBuff = (
  attackUser: editableCharactar,
  attackNumber: number = 1,
  triggerBuff: userBuffObj,
) => {
  const triggerSkill = triggerBuff.key.split('_')[0]
  const hitBuff = attackUser.skill[triggerSkill].skillEffect.hitBuff
  hitBuff?.forEach((hItem, index) => {
    const temp = JSON.parse(JSON.stringify(hItem))
    // 给友军上buff
    if (temp.target === 'friendly') {
      delete temp.target
      // 范围是所有友军
      if (temp.scope.length === 0) {
        delete temp.scope
        if (!!temp.spAdd) {
          // 塞尔的受击回复sp
          trunReplySpChang(temp.spAdd * attackNumber, getReplyMax())
        } else if (!!temp.increasingNumber && !!temp.maxNumber) {
          // 塞尔的受击增伤
          let newNumber = attackNumber * temp.increasingNumber
          delete temp.increasingNumber
          // 给所有友军上增伤buff
          for (const userName in userBuff.value) {
            let oldBuff = {} as userBuffObj
            userBuff.value[userName].forEach((buffItem) => {
              if (buffItem.key === `${triggerSkill}_${index}`) {
                oldBuff = buffItem
              }
            })
            newNumber += oldBuff.superpositionNumber ? oldBuff.superpositionNumber : 0
            newNumber = newNumber > temp.maxNumber ? temp.maxNumber : newNumber
            delete temp.maxNumber
            const tempBuff = {
              addTurn: props.turnNumber + 1, // 上buff的回合
              superpositionNumber: newNumber,
              key: `${triggerSkill}_${index}`, // buffid，防止同一个buff上多次
              ...temp,
            }
            userBuff.value[userName] = upsertObjectByKey(userBuff.value[userName], tempBuff)
          }
        }
      } else {
        console.log('塞尔受击回血，以后再说')
      }
    } else {
      if (temp.scope.length === 0) {
        // 攻击所有单位
        const position = props.warcraftData.scope.map((sItem) => transformationIndex(sItem))
        const damage = setDamageData(
          position,
          attackUser,
          {} as editableCharactarSkill,
          temp.hitMultiplying,
        )
        let newTriggerCount = 0
        let effectiveTriggerCount = 0 // 有效打击次数
        if (!triggerBuff.triggerCount) {
          // 不存在就当第一次触发 计算剩余触发次数
          newTriggerCount = temp.triggerCount - attackNumber
          effectiveTriggerCount = newTriggerCount > 0 ? attackNumber : temp.triggerCount
        } else {
          const remainingTriggerCount = triggerBuff.triggerCount || 0
          newTriggerCount = remainingTriggerCount - attackNumber
          effectiveTriggerCount = newTriggerCount > 0 ? attackNumber : remainingTriggerCount
        }
        // 判断是否还是有效buff 是就更新不是就移除buff
        if (newTriggerCount > 0) {
          const tempBuff = JSON.parse(JSON.stringify(triggerBuff))
          tempBuff.triggerCount = newTriggerCount
          userBuff.value[attackUser.name] = upsertObjectByKey(
            userBuff.value[attackUser.name],
            tempBuff,
          )
        } else {
          //否则移除buff
          userBuff.value[attackUser.name] = userBuff.value[attackUser.name].filter(
            (buItem) => buItem.key !== triggerBuff.key,
          )
        }
        const keys = `${attackUser.name}_${triggerSkill}`
        damageList.value[keys] = (damageList.value[keys] || 0) + damage * effectiveTriggerCount
      }
    }
  })
}
// 获取选中的皮肤攻击到的主目标位置
const autoGetMainAttackPositionByWarcraft = async (
  userScopeIndexList: number[],
  column: number = 4,
  row: number = 3,
) => {
  let nowColumn = Math.floor(row / 2) // 魔兽攻击默认从中间一列开始
  const rowRange = Array.from({ length: row }, (_, index) => ({
    // 各列额下标范围
    max: column * (index + 1) - 1,
    min: column * index,
  }))
  const attackType = props.warcraftData.attackType
  // 皮肤攻击范围 皮肤攻击类型 魔兽范围进行匹配
  let attackMaintarget: number[] = [] // 主目标位置
  let firstTarget: string[] = [] // 第一次触碰到的目标
  let secondTarget: string[] = [] // 第二次触碰到的目标 攻击类型为跳过的时候
  let value = rowRange[nowColumn].min
  let CycleNumber = 0 // 控制循环次数
  while (CycleNumber < row) {
    if (attackMaintarget.length > 0) {
      // 找到了目标
      break
    }
    while (value <= rowRange[nowColumn].max) {
      if (userScopeIndexList.includes(value)) {
        if (firstTarget.length > 0) {
          secondTarget = transformationCoordinates(value).split(',')
        } else {
          firstTarget = transformationCoordinates(value).split(',')
        }
      }
      if (firstTarget.length > 0 && attackType === 'front') {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
      if (secondTarget.length > 0 && attackType === 'skip') {
        attackMaintarget = secondTarget.map((item) => +item)
        break
      }
      value++
      if (value > rowRange[nowColumn].max && firstTarget.length > 0) {
        attackMaintarget = firstTarget.map((item) => +item)
        break
      }
    }
    // 如果当前列没有匹配到目标则往下一列查询
    nowColumn++
    // 如果是最后一列则重头开始，因为row是值，nowCloumn是下标
    if (nowColumn === row) {
      nowColumn = 0
    }
    value = rowRange[nowColumn].min
    CycleNumber++
  }
  if (attackMaintarget.length === 0) {
    return []
  } else {
    return autoGetAllWarcraftAttackPosition(attackMaintarget)
  }
}

// 获取所有打击位置， 应对嘲讽的情况。嘲讽的时候主目标固定为嘲讽单位
const autoGetAllWarcraftAttackPosition = (
  attackMaintarget: number[], // 主目标位置
  column: number = 4, // 场地大小
  row: number = 3,
) => {
  const charactarSkillScope = warcraftUseSkillData.value.scope || []
  let realSkillScope: number[] = []
  if (charactarSkillScope?.length === 0) {
    // 没有设置范围那就是全部，
    realSkillScope = Array.from({ length: column * row }, (_, index) => index)
  } else {
    realSkillScope =
      charactarSkillScope
        ?.map(
          (
            item: number[], //坐标都加上真实主目标的偏移量
          ) => item.map((val: number, i: number) => val + (attackMaintarget[i] || 0)),
        )
        .filter(
          (item) => 0 <= item[0] && item[0] <= row - 1 && 0 <= item[1] && item[1] <= column - 1,
        ) // 过滤超出地图的点位
        .map((tTtem: number[]) => transformationIndex(tTtem)) || [] // 转化为下标
  }
  return realSkillScope || []
}
//  延迟的费用回复，处理sp溢出问题
const waitingReplySp = ref<Record<string, number>[]>()

// 技能消耗统计
const spChange = (skillData: editableCharactarSkill, useData: editableCharactar) => {
  if (skillData.name === 'general') {
    // 普攻回复1sp
    waitingReplySp.value?.push({
      spAdd: 1,
    })
  } else {
    const buffList = userBuff.value[useData.name]
    let spReduce = 0
    buffList?.forEach((item) => {
      if (item.spReduce) {
        spReduce += item.spReduce
      }
    })
    const skillUseSp = skillData.sp - spReduce > 0 ? skillData.sp - spReduce : 0
    trunUseSp.value += skillUseSp
  }
  // 技能回复sp的情况
  if (!!skillData.skillEffect.special) {
    skillData.skillEffect.special.forEach((item) => {
      if (!!item.spAdd) {
        waitingReplySp.value?.push(item)
      }
    })
  }
}
// 计算sp
// 重置sp变动
const resetSp = () => {
  trunReplySp.value = 0
  trunUseSp.value = 0
  waitingReplySp.value = []
}
// sp回复
const trunReplySpChang = (sp: number, limit: number = 20) => {
  trunReplySp.value += sp
  if (trunReplySp.value > limit) {
    trunReplySp.value = limit
  }
}

const calculationWaitingReplySp = (limit: number) => {
  waitingReplySp.value?.forEach((item) => {
    trunReplySpChang(item.spAdd, limit)
  })
}

const getReplyMax = () => {
  const remainingSp = props.canUseSp - trunUseSp.value
  const replyMax = limitSp.value - (remainingSp > 0 ? remainingSp : 0) // 本回合最大可回复sp数量
  return replyMax > 0 ? replyMax : replyMax < 20 ? replyMax : 20
}

// 简单计算，费用溢出问题未处理
const setNextTurnSp = () => {
  const nextSp = props.canUseSp - trunUseSp.value + trunReplySp.value
  return nextSp > 20 ? 20 : nextSp < 0 ? 0 : nextSp
}

// 回合开始初始化
const initialization = async (recoed?: boolean) => {
  // 清空遗留数据
  if (!recoed) {
    attackPosition.value = []
    friendlyPosition.value = []
    selectIndex.value = undefined
  }
  // 重置本轮sp回复
  resetSp()
  damageList.value = {}
  // 先清空buff重新计算
  userBuff.value = {}
  // 获取角色身上的遗留buff
  await getUserBuffList()
  // 获取魔兽身上的遗留buff
  await getWarcraftBuffList()
  // 开始计算伤害角色回合
  await damageCalculation()
  // 假装是角色技能使用期间 用于处理sp回复问题
  calculationWaitingReplySp(getReplyMax())
  // 角色回合结束添加sp
  trunReplySpChang(props.warcraftData.sp, getReplyMax())
  emit('setTurmDamage', damageList.value)
  // 魔兽的回合开始
  await warcraftTurn()
  // 魔兽回合结束添加sp
  trunReplySpChang(props.warcraftData.sp, getReplyMax())
  console.log(userBuff.value, '------userBuff-------')
  console.log(warcraftBuff.value, '------warcraftBuff-------')
  emit('changeBuff', {
    userBuff: userBuff.value,
    warcraftBuff: warcraftBuff.value,
  })
  emit('nextTrunSp', setNextTurnSp())
}

defineExpose({ initialization })
</script>
<style lang="less" scoped>
.battle_ground {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 500px;
  }
  .friendly_forces {
    justify-content: flex-end;
    flex-direction: row-reverse;
    .friendly_forces_box {
      width: 25%;
      aspect-ratio: 1/1;
      text-align: center;
      border: 1px dashed gray;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;
      & > span {
        width: 100%;
        display: inline-block;
        .character_box {
          width: 100%;
          aspect-ratio: 1/1;
          position: relative;
          overflow: hidden;
          & > img {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -45%);
          }
        }
      }
    }
    .select_box {
      border: 1px solid red;
    }
    .buff_box {
      background-color: rgba(0, 128, 0, 0.1);
    }
    .attack_box {
      background-color: rgba(255, 0, 0, 0.3);
    }
  }
  .enemy_troops {
    .enemy_troops_box {
      width: 25%;
      aspect-ratio: 1/1;
      text-align: center;
      border: 1px solid gray;
      box-sizing: border-box;
      & > span {
        background-color: rgba(0, 0, 255, 0.1);
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center; /* 同时水平和垂直居中 */
      }
      .damage_box {
        background-color: rgba(255, 0, 0, 0.3);
      }
    }
  }
}
// 伤害展示样式
.damage_box {
  & > span {
    color: red;
  }
}
.damage_box + .damage_box {
  margin-top: 10px;
}
// sp展示样式
.sp_list {
  display: inline-block;
  margin-left: 20px;
  span + span {
    margin-left: 10px;
  }
  .sp_circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid gray;
    border-radius: 50%; /* 关键：让矩形变成圆 */
  }
  .all_sp {
    border: 1px solid green !important;
    background-color: green !important;
  }
  .use_sp {
    border: 1px solid gray;
    background-color: gray;
  }
}
</style>
