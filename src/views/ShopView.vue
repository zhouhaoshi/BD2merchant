<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="章节">
        <el-select v-model="formInline.shopId" placeholder="所属章节" filterable @change="onSubmit">
          <el-option
            v-for="item in mapList"
            :key="item.shopId"
            :value="item.shopId"
            :label="`${item.label}.${item.value}`"
          />
        </el-select>
      </el-form-item>
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
            <div><img src="/src/assets/img/icon_resource60005_88.webp" />{{ element.price }}</div>
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
const mapList = ref()
const getMapList = async () => {
  const { code, data, message } = await Api.mapList()
  if (code === 200) mapList.value = data
  else console.log(message)
}
interface shopObj {
  id?: number
  url?: string
  name?: string
  price?: string | number
  type?: string
}
// 商店物品信息
const shopList = ref<Array<shopObj>>()
const onSubmit = async () => {
  const { shopId } = formInline
  const { code, data, message } = await Api.shopList({ shopId, type: 'buy' })
  if (code === 200) shopList.value = data as Array<shopObj>
  else console.log(message)
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
  const { data } = await Api.shopBuyUpdata({
    shopId: formInline.shopId,
    data: shopList.value,
  })
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
    position: relative;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(0, 0, 0, 0.8);
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.2s;
      display: flex;
      justify-content: space-around;
      align-items: center;
      & > svg {
        height: 40px;
        width: 40px;
        color: #000;
      }
    }
    &:hover {
      .overlay {
        opacity: 1;
      }
    }
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
</style>
