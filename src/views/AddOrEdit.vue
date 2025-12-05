<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="dialogVisible"
    :title="shopData ? `编辑商品${shopData.name}` : '新增商品'"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="auto" :rules="rules">
      <el-form-item label="商品" prop="id">
        <el-select v-model="form.id" @change="changeMaterial" filterable placeholder="请选择商品">
          <el-option
            v-for="item in materialList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            class="material_select"
          >
            <img :src="item.url" />
            <span>{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input placeholder="请输入价格" v-model="form.price" />
      </el-form-item>
      <el-form-item label="是否为食材" prop="type">
        <el-select v-model="form.type" placeholder="请选择是否为食材">
          <el-option label="为食材" value="cuisine" />
          <el-option label="非食材" value="normal" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="saveMaterial"> 保存商品 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import Api from '@/api/api'
const props = defineProps(['dialogVisible', 'shopData'])
const emit = defineEmits(['close', 'save'])
defineExpose({ initEditData })
interface shopObj {
  id?: number
  url?: string
  name?: string
  price?: string | number
  type?: string | undefined
}

const rules = reactive({
  id: [{ required: true, message: '请选择商品', trigger: 'change' }],
  price: [
    {
      required: true,
      message: '请输入价格',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择类型',
      trigger: 'change',
    },
  ],
})

const form = reactive<shopObj>({
  name: undefined,
  id: undefined,
  url: undefined,
  price: undefined,
  type: 'normal',
})
const editIndex = ref()
// 初始化
function initEditData(index?: number) {
  editIndex.value = index
  if (typeof index === 'number') {
    form.name = props?.shopData.name
    form.id = props?.shopData.id
    form.url = props?.shopData.url
    form.price = props?.shopData.price
    form.type = props?.shopData.type || 'normal'
  } else {
    form.name = undefined
    form.id = undefined
    form.url = undefined
    form.price = undefined
    form.type = 'normal'
  }
}
// 获取素材列表
const materialList = ref<Array<shopObj>>()
const getMaterialList = async () => {
  const { data } = await Api.materialList()
  materialList.value = data as Array<shopObj>
}
getMaterialList()

// 选中商品
const changeMaterial = (data: string | number) => {
  materialList.value?.forEach((item) => {
    if (item.id === data) {
      form.name = item.name
      form.url = item.url
    }
  })
}
const handleClose = () => {
  emit('close')
}
const saveMaterial = () => {
  emit('save', JSON.parse(JSON.stringify(form)), editIndex.value)
  emit('close')
}
</script>

<style lang="less" scoped>
.material_select {
  height: 40px;
  display: flex;
  align-items: center;
  & > img {
    height: 40px;
    width: 40px;
  }
}
</style>
