<template>
  <div ref="BattleGround" class="battle_ground_box">
    <el-form :model="form" label-width="auto">
      <el-form-item label="场地范围" prop="type">
        <el-select v-model="form.size" placeholder="选择场地范围">
          <el-option label="3x4" :value="1" />
        </el-select>
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
          :class="{ select_box: selectIndex === index }"
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
    <div>期望伤害：{{ alldamage().toLocaleString() }}</div>
  </div>
</template>
<script lang="ts" setup>
import { splicingqImage, transformationCoordinates, transformationIndex } from '@/utils/utils'
import calculateDamage from '@/utils/damage'
const props = defineProps({
  battleGroundList: {
    type: Array,
    default: () => [],
  },
  warcraftData: {
    type: Object,
    default: () => {},
  },
  attackSequence: {
    type: Array,
    default: () => [],
  },
})
interface battleGroundObj {
  attackType: string
  attributeDamage: number
  cName: string
  critical: number
  element: string
  name: string
  panel: number
  selectSikll: string
  skill: Record<string, editableCharactarSkill>
}
const tempEnemyList = ref() // 初始状态下的魔兽情况
const afterTempEnemyList = ref() // 攻击后的魔兽状态
const attackPosition = ref<number[]>([]) // 攻击到的位置的下标 展示用
const selectIndex = ref<number>()
// 友军场地角色位置变化
const changeLocation = (index: number) => {
  attackPosition.value = []
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
  }
  if (!!props.battleGroundList[index] && (!!selectIndex.value || selectIndex.value === 0)) {
    // 如果选到了角色
    getMainAttackPosition()
  }
}
const form = ref({
  size: 1,
})
interface scopeWeaknessesObj {
  scope: number[][]
  weaknesses: number
}
// 魔兽位置设置
const setTempEnemyList = () => {
  tempEnemyList.value = new Array(12)
  const scopeList = props.warcraftData.scope
  scopeList.forEach((item: number[]) => {
    tempEnemyList.value[transformationIndex(item)] = {
      chainCount: 0, // 当前连锁数量
      chainDamageAdd: 0,
      enemyWeakness: [
        // 当前受到了所有易伤buff
        // {
        //   type: 1,
        //   enemyWeakness: 100,
        // },
        // {
        //   type: 2,
        //   enemyWeakness: 93,
        // },
        // {
        //   type: 1,
        //   enemyWeakness: 80,
        // },
      ],
      attributeResistance: props.warcraftData.attributeResistance,
      element: props.warcraftData.element,
      weakPointDamageAdd: 0,
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
    getAllAttackPosition(attackMaintarget, props.warcraftData.scope, selectCharactar)
  }
}
// 获取所有位置， 应对嘲讽的情况。嘲讽的时候主目标固定为嘲讽单位
const getAllAttackPosition = (
  attackMaintarget: number[], // 主目标位置
  warcraftDataScope: number[][], // 魔兽范围
  selectCharactar: editableCharactar, // 角色信息
  column: number = 4, // 场地大小
  row: number = 3,
) => {
  const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
  const charactarSkillScope = selectCharactar.skill[selectSikll].scope
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
    return autoGetAllAttackPosition(attackMaintarget, props.warcraftData.scope, selectCharactar)
  }
}
// 获取所有位置， 应对嘲讽的情况。嘲讽的时候主目标固定为嘲讽单位
const autoGetAllAttackPosition = (
  attackMaintarget: number[], // 主目标位置
  warcraftDataScope: number[][], // 魔兽范围
  selectCharactar: editableCharactar, // 角色信息
  column: number = 4, // 场地大小
  row: number = 3,
) => {
  const selectSikll = selectCharactar.selectSikll || Object.keys(selectCharactar.skill)[0]
  const charactarSkillScope = selectCharactar.skill[selectSikll].scope
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
  return realSkillScope || []
}

const setDamageData = (
  attackPosition: number[],
  attackUser: battleGroundObj,
  multiplier: number,
) => {
  // console.log(attackPosition, attackUser)
  let damageNumber: number = 0
  const charactarData: userBuff = {
    panel: attackUser.panel,
    attackAdd: getAttackAdd(attackUser), // 需要计算
    critical: getCritical(attackUser),
    multiplier: multiplier,
    increasedDamage: getIncreasedDamage(attackUser),
    attributeDamage: getAttributeDamage(attackUser),
  }
  attackPosition.forEach((item) => {
    const warcraftBoxData = afterTempEnemyList.value[item]
    const warcraftData: warcraftBuff = {
      chainCount: warcraftBoxData.chainCount,
      chainDamageAdd: warcraftBoxData.chainDamageAdd,
      weakPointDamageAdd: warcraftBoxData.weakPointDamageAdd,
    }
    // 问魔兽的
    // enemyWeakness?: number // 易伤/脆弱
    // enemyDefence?: number // 防御/魔抗
    // damageReduction?: number // 减伤
    // chainCount?: number // 当前连锁数
    // chainDamageAdd?: number // 连锁伤害加成
    // attributeResistance?: number // 属性抵抗
    // weakPointDamageAdd?: number // 弱点加伤
    const damageData: buffObj = {
      ...charactarData,
      ...warcraftData,
    }
    damageNumber = damageNumber + +calculateDamage(damageData)
    // 连锁+1 有buff还要计算
    afterTempEnemyList.value[item].chainCount++
  })
  return damageNumber
}

const getAttackAdd = (attackUser: battleGroundObj) => {
  return 0
}
const getCritical = (attackUser: battleGroundObj) => {
  return attackUser.critical
}
const getMultiplier = (charactarSkill: editableCharactarSkill) => {
  console.log(charactarSkill.skillEffect.multiplying, 'charactarSkill')
  return charactarSkill.skillEffect.multiplying || 100
}
const getIncreasedDamage = (attackUser: battleGroundObj) => {
  return 0
}
const getAttributeDamage = (attackUser: battleGroundObj) => {
  return attackUser.attributeDamage
}

const damageList = ref<Record<string, number>>({})
const alldamage = () => {
  const damageNumberList = Object.values(damageList.value) || []
  console.log(damageList.value, 'damageList')
  return damageNumberList.length > 0 ? damageNumberList.reduce((prev, cur) => prev + cur) : 0
}
// 伤害计算
const damageCalculation = async () => {
  // 获取打击范围
  const attackPosition: Record<string, number[]> = {}
  afterTempEnemyList.value = JSON.parse(JSON.stringify(tempEnemyList.value))
  await props.battleGroundList.forEach(async (item, index) => {
    if (!!item) {
      const data = item as battleGroundObj
      attackPosition[data.name] = await autoGetMainAttackPosition(index)
    }
  })
  props.attackSequence.forEach((item) => {
    if (!!item) {
      const data = item as battleGroundObj
      const charactarSkill = data.skill[data.selectSikll || Object.keys(data.skill)[0]]
      let damageNumber = 0
      let number = charactarSkill.chain || 0
      while (number > 0) {
        damageNumber =
          damageNumber +
          setDamageData(attackPosition[data.name], data, getMultiplier(charactarSkill))
        number--
      }
      damageList.value[data.name] = damageNumber
    }
  })
}

watch(
  props,
  () => {
    damageCalculation()
  },
  { immediate: true, deep: true },
)
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
</style>
