<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="章节">
        <el-select
          v-model="formInline.shopId"
          placeholder="所属章节"
          filterable
          @change="changeMap"
        >
          <el-option
            v-for="item in mapList"
            :class="isCompleted(item)"
            :key="item.shopId"
            :value="item.shopId"
            :label="`${item.label}.${item.value}`"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="买卖">
        <el-select v-model="formInline.type" placeholder="请选择类型" @change="onSubmit">
          <el-option value="buy" label="买" />
          <el-option value="sell" label="卖" />
        </el-select>
      </el-form-item>
      <el-form-item label="讨价还价" v-if="formInline.type === 'buy'">
        <el-select v-model="formInline.discount" placeholder="请选择讨价还价级别">
          <el-option
            v-for="item in discountList"
            :key="item.value"
            :value="item.value"
            :label="item.lable"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="价格走势" v-if="formInline.type === 'sell'">
        <el-date-picker
          v-model="formInline.time"
          type="date"
          @change="onSubmit"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickCompleted">完成探索</el-button>
      </el-form-item>
    </el-form>
    <div class="shop_box" v-if="shopList">
      <template v-if="formInline.type === 'buy'">
        <div
          v-if="formInline.discount === 0 || formInline.discount === 0.1"
          :class="formInline.discount === 0.1 ? 'normal' : 'abnormal'"
        >
          <img style="height: 50px; width: 50px" src="/src/assets/img/icon.png" />
          <div>
            <div>天賦特效藥</div>
            <div>
              <img src="/src/assets/img/icon_resource60005_88.webp" />{{
                formInline.discount !== 0.1 ? 50 : 45
              }}
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in shopList"
          :key="item.id + index.toString()"
          :class="
            item.type === 'cuisine'
              ? 'cuisine_food'
              : getPrice(+item.price, formInline.discount) < item.maxPrice
                ? 'normal'
                : 'abnormal'
          "
        >
          <img :src="setLocalImageAddress(item.url)" />
          <div>
            <div>
              {{ item.name }} {{ item.maxPrice - getPrice(+item.price, formInline.discount) }}
            </div>
            <div>
              <img src="/src/assets/img/icon_resource60005_88.webp" />{{
                getPrice(+item.price, formInline.discount)
              }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="item in shopList" :key="item.id" class="normal">
          <img :src="item.url" />
          <div>
            <div>{{ item.name }}</div>
            <div><img src="/src/assets/img/icon_resource60005_88.webp" />{{ item.price }}</div>
          </div>
        </div>
      </template>
    </div>
  </el-card>
  <el-card style="margin-top: 20px" v-if="senceList.length">
    <el-radio-group v-model="sence" size="large" @change="changeSence">
      <el-radio-button v-for="(item, index) in senceList" :value="index" :key="item.url">
        {{ item.name }}</el-radio-button
      >
    </el-radio-group>
    <SenceImage
      isMove
      :size="512"
      style="margin: auto; margin-top: 20px"
      :senceName="senceList[sence].name"
      :senceUrl="setSence(senceList[sence].url, senceList[sence].support)"
      @move="
        (moveData) =>
          sence + moveData < 0
            ? (sence = senceList.length - 1)
            : sence + moveData > senceList.length - 1
              ? (sence = 0)
              : (sence += moveData)
      "
    />
  </el-card>
</template>

<script lang="ts" setup>
import Api from '@/api/api'
import SenceImage from '@/components/SenceImage.vue'
import { getHoursAgo, getSenceList as setSence, setLocalImageAddress } from '@/utils/utils'
const formInline = reactive({
  shopId: '1',
  type: 'buy',
  discount: 0.6,
  sellType: 'all',
  time: new Date(),
})

const discountList = ref([
  { lable: '直购', value: 0 },
  { lable: '直购绿脸', value: 0.1 },
  { lable: '新手', value: 0.35 },
  { lable: '进阶', value: 0.4 },
  { lable: '高手', value: 0.45 },
  { lable: '达人', value: 0.5 },
  { lable: '传说', value: 0.6 },
])

// 地图下拉框
const mapList = ref()
const getMapList = async () => {
  const { code, data, message } = await Api.mapList()
  if (code === 200) {
    // const AllShop: mapObj = {
    //   shopId: '-1',
    //   label: '全部',
    //   value: 0,
    //   completedData: '',
    //   mapList: [],
    // }
    mapList.value = data
  } else console.log(message)
  getSenceList()
}
// 商品列表
const shopList = ref()
const onSubmit = async () => {
  const { shopId, type, time } = formInline
  const { code, data, message } = await Api.shopList({ shopId, type, time })
  if (code === 200) shopList.value = data
  else console.log(message)
}

interface senceObj {
  shopId?: number
  url?: string
  name?: string
  support?: Array<string>
}
interface mapObj {
  shopId?: string
  label?: string
  completedData?: string
  value?: number
  mapList: Array<senceObj>
}
const sence = ref()

// 场景信息
const senceList = ref<Array<senceObj>>([])
const getSenceList = async () => {
  const { shopId } = formInline
  const { code, data, message } = await Api.senceList({ shopId })
  if (code === 200) {
    senceList.value = data as Array<senceObj>
    sence.value = 0
  } else console.log(message)
}

// 切换地图
const changeMap = () => {
  onSubmit()
  getSenceList()
}
const changeSence = (data: number) => {
  sence.value = data
}
// 价格计算
const getPrice = (price: number, discount: number) => {
  const discountedPrice = price * (1 - discount)
  return parseInt(discountedPrice.toString())
}
// 完成探索
const clickCompleted = () => {
  let data = {}
  mapList.value.forEach((item: mapObj) => {
    if (item.shopId === formInline.shopId) {
      item.completedData = getHoursAgo()
      data = item
    }
  })
  // 更新完成时间
  Api.mapUpdata({ shopId: formInline.shopId, data })
}
const isCompleted = (data: mapObj) => {
  return data.completedData && data.completedData === getHoursAgo() ? 'completed' : ''
}
onMounted(() => {
  getMapList()
  onSubmit()
})
</script>

<style lang="less" scoped>
.demo-form-inline {
  :deep(.el-select) {
    --el-select-width: 220px;
  }
}
.completed {
  background-color: rgb(239.8, 248.9, 235.3);
  color: var(--el-color-success);
}
.shop_box {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 定义三列，每列占据等分的空间 */
  grid-template-rows: auto; /* 行高自动 */
  gap: 10px; /* 设置行和列之间的间距 */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* 标准语法 */
  cursor: pointer;
  .normal {
    background-color: rgba(45, 212, 191, 0.2);
    border: 1px solid rgba(45, 212, 191, 0.6);
  }
  .cuisine_food {
    background-color: rgba(102, 157, 255, 0.6);
    border: 1px solid rgb(0, 94, 255);
  }
  .abnormal {
    background-color: rgba(255, 0, 0, 0.2);
    border: 1px solid rgba(255, 0, 0, 0.6);
  }
  & > div {
    padding: 20px;
    border-radius: 20px;
    display: flex;
    & > img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    & > div {
      & > div:first-child {
        margin-left: 5px;
      }
      & > div + div {
        margin-top: 5px;
      }
      & > div {
        display: flex;
        align-items: center;
        & > img {
          width: 25px;
          height: 25px;
        }
      }
    }
  }
}
@media (max-width: 576px) {
  .shop_box {
    grid-template-columns: repeat(1, 1fr); /* 定义三列，每列占据等分的空间 */
  }
}
/* 小屏（手机 ≥576px） */
@media (max-width: 768px) and (min-width: 577px) {
  .shop_box {
    grid-template-columns: repeat(2, 1fr); /* 定义三列，每列占据等分的空间 */
  }
}

/* 中屏（平板 ≥768px） */
@media (max-width: 992px) and (min-width: 769px) {
  .shop_box {
    grid-template-columns: repeat(3, 1fr); /* 定义三列，每列占据等分的空间 */
  }
}
</style>
