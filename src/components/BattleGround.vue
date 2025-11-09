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
          :class="{ select_box: selectIndex === index, buff_box: friendlyPosition.includes(index) }"
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
import {
  splicingqImage,
  transformationCoordinates,
  transformationIndex,
  upsertObjectByKey,
} from '@/utils/utils'
import calculateDamage from '@/utils/damage'
const props = defineProps({
  battleGroundList: {
    // 角色场地位置
    type: Array,
    default: () => [] as editableCharactar[],
  },
  warcraftData: {
    // 魔兽数据
    type: Object,
    default: () => {},
  },
  attackSequence: {
    // 角色攻击顺序
    type: Array,
    default: () => [],
  },
  turnNumber: {
    // 回合数。用来处理buff
    type: Number,
    default: 0,
  },
  beforeBuffList: {
    // 上个回合的有效buff
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['changeBuff'])

const userBuff = ref<Record<string, buffObj[]>>({}) // 用来记录本回合角色身上的buff 回合结束后统一更新
const warcraftBuff = ref({}) // 用来记录本回合魔兽身上的buff 回合结束后统一更新
const tempEnemyList = ref() // 初始状态下的魔兽情况
const afterTempEnemyList = ref() // 攻击后的魔兽状态
const attackPosition = ref<number[]>([]) // 攻击到的位置的下标 展示用
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
    damageCalculation()
  }
  if (!!props.battleGroundList[index] && (!!selectIndex.value || selectIndex.value === 0)) {
    // 如果选到了角色
    selectCharactarBox()
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
      chainDamageAdd: [
        // {
        //   key: '',
        //   duration: 4,
        //   chainDamageAdd: 0,
        // },
      ],
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
  attackPosition: number[],
  attackUser: editableCharactar,
  charactarSkill: editableCharactarSkill,
) => {
  // console.log(attackPosition, attackUser)
  let damageNumber: number = 0
  const charactarData: userBuff = {
    panel: attackUser.panel,
    multiplier: 0,
    attackAdd: getAttackAdd(attackUser), // 需要计算
    critical: getCritical(attackUser),
    increasedDamage: 0,
    attributeDamage: getAttributeDamage(attackUser),
  }
  attackPosition.forEach((item, index) => {
    const warcraftBoxData = afterTempEnemyList.value[item]
    const warcraftData: warcraftBuff = {
      chainCount: warcraftBoxData.chainCount, // 连锁伤害
      weakPointDamageAdd: warcraftBoxData.weakPointDamageAdd, // 弱点加伤
    }
    const chainAddNumber = getchainAddNumber(attackUser)
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
    charactarData.increasedDamage = getIncreasedDamage(attackUser, warcraftBoxData.chainCount)
    // 问魔兽的
    // enemyWeakness?: number // 易伤/脆弱
    // enemyDefence?: number // 防御/魔抗
    // damageReduction?: number // 减伤
    // chainCount?: number // 当前连锁数
    // chainDamageAdd?: number // 连锁伤害加成
    // attributeResistance?: number // 属性抵抗
    // weakPointDamageAdd?: number // 弱点加伤
    const damageData: damageObj = {
      ...charactarData,
      ...warcraftData,
    }
    damageNumber = damageNumber + +calculateDamage(damageData)
    // 连锁+1 有buff还要计算
    afterTempEnemyList.value[item].chainCount += chainAddNumber
  })
  return damageNumber
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
  console.log(chainCount, 'chainCount')
  // 是否有自拐
  ourSelfBuff(attackUser)
  const attackAddBuffNumber = (userBuff.value[attackUser.name] || [])
    .map((item) => {
      if (item.increasedDamage) {
        const limitKeyList = ['minChainCount', 'maxChainCount']
        const hasOwn = Object.prototype.hasOwnProperty
        if (!limitKeyList.some((key) => hasOwn.call(item, key))) {
          // 没限制条件的增伤则直接使用
          return item.increasedDamage
        } else if (item.minChainCount && chainCount >= item.minChainCount) {
          return item.increasedDamage
        } else if (item.maxChainCount && chainCount <= item.maxChainCount) {
          return item.increasedDamage
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
        ? attackAddBuffNumberList.reduce((prev, cur) => prev || 0 + (cur || 0)) || 0
        : 0
    attributeDamageNumber = attackUser.attributeDamage + attributeDamage
  }
  return attributeDamageNumber
}
// 获取buff增强值 通用模块封装
const getBuffNumber = (attackUser: editableCharactar, key: string) => {
  ourSelfBuff(attackUser)
  const buffNumberList = (userBuff.value[attackUser.name] || [])
    .map((item) => (item[key] ? item[key] : undefined))
    .filter((item) => !!item) as unknown as number[]
  return buffNumberList.length > 0
    ? buffNumberList.reduce((prev, cur) => (prev || 0) + (cur || 0))
    : 0
}

const damageList = ref<Record<string, number>>({})
const alldamage = () => {
  // console.log(damageList.value, '----角色伤害详情-----', props.turnNumber)
  // console.log(userBuff.value, '----角色所有的buff----', props.turnNumber)
  const damageNumberList = Object.values(damageList.value) || []
  return damageNumberList.length > 0 ? damageNumberList.reduce((prev, cur) => prev + cur) : 0
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
        damageList.value[data.name] = damageNumber
      }
    }
  })
  console.log(userBuff.value, '------userBuff-------')
  emit('changeBuff', userBuff.value)
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
  attackPosition: number[],
  charactarSkill: editableCharactarSkill,
  attackUser: editableCharactar,
) => {
  const buffList = charactarSkill.skillEffect.buff || []
  buffList.forEach((item: buffObj, index) => {
    // 继承主目标范围，否则单独计算范围
    if (item.scope.length === 0) {
      // 给范围内的角色上buff
      attackPosition.forEach((nItem) => {
        if (props.battleGroundList[nItem]) {
          const selectCharactar = props.battleGroundList[nItem] as editableCharactar
          const temp = JSON.parse(JSON.stringify(item))
          delete temp.scope
          if (!temp.attribute) {
            const tempBuff = {
              addTurn: props.turnNumber, // 上buff的回合
              key: `${charactarSkill.name}_${index}`, // buffid，防止同一个buff上多次
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
              key: `${charactarSkill.name}_${index}`, // buffid，防止同一个buff上多次
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
          key: `${charactarSkill.name}_${index}`, // buffid，防止同一个buff上多次
          ...temp,
        }
        userBuff.value[attackUser.name] = upsertObjectByKey(
          userBuff.value[attackUser.name],
          tempBuff,
        )
      }
    }
  })
}

const getUserBuffList = () => {
  nextTick(() => {
    const tempBuffList = JSON.parse(JSON.stringify(props.beforeBuffList))
    const effectiveBuffList: Record<string, buffObj[]> = {}
    for (const value in tempBuffList) {
      effectiveBuffList[value] = tempBuffList[value].filter(
        (item: buffComonElement) => props.turnNumber - item.addTurn < item.duration,
      )
    }
    userBuff.value = effectiveBuffList
  })
}

const getWarcraftBuffList = () => {
  warcraftBuff.value = props.warcraftData.buffList || []
}
// 回合开始初始化
const initialization = async () => {
  // 清空遗留数据
  attackPosition.value = []
  friendlyPosition.value = []
  selectIndex.value = undefined
  damageList.value = {}
  // 获取角色身上的遗留buff
  await getUserBuffList()
  // 获取魔兽身上的遗留buff
  await getWarcraftBuffList()
  // 开始计算伤害
  damageCalculation()
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
