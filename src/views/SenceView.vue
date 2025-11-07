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

    <el-table :data="senceList" style="width: 100%" ref="dragTable" :key="itemKey">
      <el-table-column prop="name" label="场景名" />
      <el-table-column prop="image" label="图片">
        <template #default="scope">
          <SenceImage
            :size="60"
            :senceName="scope.row.name"
            :senceUrl="getSenceList(scope.row.url, scope.row.support)"
          />
        </template>
      </el-table-column>
      <el-table-column label="编辑" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="clickDelete(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="addCommodity(scope.row, scope.$index)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <AddOrEdit :dialogVisible="dialogVisible" ref="addOrEdit" @close="close" @save="save" />
  </el-card>
</template>

<script lang="ts" setup>
import Api from '@/api/api'

import { getSenceList } from '@/utils/utils'

import SenceImage from '@/components/SenceImage.vue'
import AddOrEdit from './AddOrEditBuySence.vue'
import Sortable from 'sortablejs'
import { ElMessage, ElMessageBox } from 'element-plus'

const dragTable = ref()
const itemKey = ref(Math.random())
const initDropTable = () => {
  const el = dragTable.value.$el.querySelector('.el-table__body tbody')
  interface evtObj {
    newIndex: number
    oldIndex: number
  }
  Sortable.create(el, {
    handle: '.el-table__row', //设置指定列作为拖拽
    onEnd(evt: evtObj) {
      const { newIndex, oldIndex } = evt
      const currRow = senceList.value?.splice(oldIndex, 1)[0] as senceObj
      senceList.value?.splice(newIndex, 0, currRow)
      itemKey.value = Math.random() // 刷新表单
      // 重新绑定拖动
      nextTick(() => {
        initDropTable()
      })
    },
  })
}

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

interface senceObj {
  shopId?: number
  url?: string
  name?: string
  support?: Array<number | string>
}

// 场景信息
const senceList = ref<Array<senceObj>>([])
const onSubmit = async () => {
  const { shopId } = formInline
  const { code, data, message } = await Api.senceList({ shopId })
  if (code === 200) senceList.value = data as Array<senceObj>
  else console.log(message)
}
// 是否弹窗
const dialogVisible = ref(false)
// 获取组件
const addOrEdit = ref()
// 新增场景
const addCommodity = (data: senceObj | undefined, index?: number) => {
  dialogVisible.value = true
  nextTick(() => {
    //因为是ref创建的，所以得加.value，调用子组件方法
    addOrEdit.value.initEditData(data, index)
  })
}

const close = () => {
  dialogVisible.value = false
}

const save = (data: senceObj, index: number) => {
  if (!data.shopId) {
    senceList.value?.push(data)
  } else {
    senceList.value[index] = data
  }
}

// 保存商品
const saveCommodity = async () => {
  const { data } = await Api.senceUpdata({
    shopId: formInline.shopId,
    data: senceList.value,
  })
  ElMessage({ message: data, type: 'success' })
}

// 删除
const clickDelete = (data: senceObj) => {
  ElMessageBox.alert(`是否删除此场景: ${data.name}？`, '删除提示', {
    confirmButtonText: '是',
    callback: (action: string) => {
      if (action === 'confirm') {
        senceList.value = senceList.value!.filter(
          (item: senceObj) => `${item.url}` !== `${data.url}`,
        )
      }
    },
  })
}

onMounted(() => {
  nextTick(() => {
    initDropTable()
  })
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
