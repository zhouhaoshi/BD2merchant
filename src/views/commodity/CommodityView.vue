<template>
  <div class="page_header">
    <div>
      <div class="page_title">商品管理</div>
      <div class="page_subtitle">维护可出售商品的基准价与优惠日期 · 支持拖拽排序</div>
    </div>
  </div>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addCommodity(undefined)">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveCommodity">保存</el-button>
      </el-form-item>
    </el-form>
    <draggable
      group="label"
      item-key="index"
      class="shop_box"
      :list="shopList"
      :disabled="false"
      :force-fallback="true"
    >
      <template #item="{ element, index }">
        <div class="normal">
          <img :src="setLocalImageAddress(element.url)" />
          <div>
            <div>{{ element.name }}</div>
            <div><img src="/src/assets/img/icon_resource60005_88.webp" />{{ element.base }}</div>
            <div class="normal_tps">优惠日期：{{ element.date }}号</div>
          </div>
          <div class="overlay">
            <Edit @click="addCommodity(element, index)" />
            <Delete @click="clickDelete(element, index)" />
          </div>
        </div>
      </template>
    </draggable>
    <AddOrEdit
      :dialogVisible="dialogVisible"
      :shopData="shopData"
      ref="addOrEdit"
      @close="closeShop"
      @save="saveShop"
    />
  </el-card>
</template>

<script lang="ts" setup>
import Api from '@/api/api'
import AddOrEdit from './AddOrEdit.vue'
import draggable from 'vuedraggable'
import { ElMessage, ElMessageBox } from 'element-plus'
import { setLocalImageAddress } from '@/utils/utils'
const formInline = reactive({
  shopId: '1',
})
// 地图信息
interface shopObj {
  id?: number
  url?: string
  name?: string
  maxRate: string | number
  minRate: string | number
  base: number
  shopId: number[] | string[]
  date: string | number
}
// 商店物品信息
const shopList = ref<Array<shopObj>>()
const onSubmit = async () => {
  const { code, data, message } = await Api.sellList({})
  if (code === 200) {
    const obj = data as Array<shopObj>
    const tempList: Array<shopObj> = []
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        tempList.push({
          id: +key,
          url: obj[key].url,
          name: obj[key].name,
          base: obj[key].base,
          maxRate: obj[key].maxRate,
          minRate: obj[key].minRate,
          shopId: obj[key].shopId,
          date: obj[key].date,
        })
      }
    }
    shopList.value = tempList.sort((a, b) => {
      // 首先比较 base 字段
      if (a.base !== b.base) {
        return a.base - b.base // 升序
      }
      // 如果 base 相同，再比较 id 字段（处理可能为 undefined 的情况）
      const aId = a.id ?? 0
      const bId = b.id ?? 0
      return aId - bId // 升序
    })
  } else console.log(message)
}
// 是否弹窗
const dialogVisible = ref(false)
// 商品数据
const shopData = ref<shopObj | undefined>()
// 获取组件
const addOrEdit = ref()
// 新增商品
const addCommodity = (data: shopObj | undefined, index?: number) => {
  dialogVisible.value = true
  shopData.value = data
  nextTick(() => {
    //因为是ref创建的，所以得加.value，调用子组件方法
    addOrEdit.value.initEditData(index)
  })
}
const closeShop = () => {
  dialogVisible.value = false
  shopData.value = undefined
}
const saveShop = (data: shopObj, index?: number) => {
  if (typeof index !== 'number') {
    shopList.value?.push(data)
  } else {
    // 处理ts提示问题
    const dataList = shopList.value as Array<shopObj>
    dataList[index] = JSON.parse(JSON.stringify(data))
    shopList.value = dataList as Array<shopObj>
  }
}
// 保存商品
const saveCommodity = async () => {
  const tempData: Record<string, shopObj> = {}
  shopList.value?.forEach((item) => {
    if (item.id !== undefined) {
      tempData[item.id] = {
        url: item.url,
        name: item.name,
        base: +item.base,
        maxRate: +item.maxRate,
        minRate: +item.minRate,
        shopId: item.shopId ? item.shopId : [],
        date: +item.date,
      }
    }
  })
  const { data } = await Api.sellUpdate(tempData)
  ElMessage({ message: data, type: 'success' })
}
// 删除
const clickDelete = (data: shopObj, dIndex?: number) => {
  ElMessageBox.alert(`是否删除商品: ${data.name}？`, '删除提示', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '是',
    callback: (action: string) => {
      if (action === 'confirm') {
        //                                                                        防止id一致，使用下标和id同时标记
        shopList.value = shopList.value!.filter(
          (item: shopObj, index: number) => `${item.id}${index}` !== `${data.id}${dIndex}`,
        )
      }
    },
  })
}
onMounted(() => {
  onSubmit()
})
</script>

<style lang="less" scoped>
.demo-form-inline {
  :deep(.el-select) {
    --el-select-width: 220px;
  }
}
.shop_box {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 定义三列，每列占据等分的空间 */
  grid-template-rows: auto; /* 行高自动 */
  gap: 12px; /* 设置行和列之间的间距 */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* 标准语法 */
  cursor: pointer;
  .normal {
    background-color: rgba(61, 90, 254, 0.06);
    border: 1px solid var(--app-border);
    position: relative;
    transition: var(--app-transition);
    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--app-shadow-hover);
      border-color: var(--el-color-primary-light-7);
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(30, 42, 90, 0.55);
      border-radius: var(--app-radius);
      opacity: 0;
      transition: opacity 0.2s;
      display: flex;
      justify-content: space-around;
      align-items: center;
      & > svg {
        height: 40px;
        width: 40px;
        color: #fff;
      }
    }
    &:hover {
      .overlay {
        opacity: 1;
      }
    }
  }
  .normal_tps {
    font-size: 12px;
    color: var(--app-text-weak);
  }
  & > div {
    padding: 16px;
    border-radius: var(--app-radius);
    display: flex;
    & > img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    & > div {
      & > div:first-child {
        margin-left: 5px;
        font-weight: 600;
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
</style>
