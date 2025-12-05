<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="dialogVisible"
    :title="shopData ? `编辑商品${shopData.name}` : '新增商品'"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="auto" :rules="rules">
      <el-form-item label="商品id" prop="id">
        <el-input placeholder="请输入价格" v-model="form.id" />
      </el-form-item>
      <el-form-item label="图片地址" prop="url">
        <el-input placeholder="请输入价格" v-model="form.url" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input placeholder="请输入价格" v-model="form.name" />
      </el-form-item>
      <el-form-item label="价格" prop="base">
        <el-input-number placeholder="请输入价格" v-model="form.base" />
      </el-form-item>
      <el-form-item label="最低折扣" prop="minRate">
        <el-input placeholder="请输入价格" v-model="form.minRate" />
      </el-form-item>
      <el-form-item label="最高折扣" prop="maxRate">
        <el-input placeholder="请输入价格" v-model="form.maxRate" />
      </el-form-item>
      <el-form-item label="最高日期" prop="date">
        <el-input placeholder="请输入价格" v-model="form.date" />
      </el-form-item>
      <el-form-item label="售卖商店" prop="shopId">
        <el-select v-model="form.shopId" multiple filterable placeholder="请选择商店">
          <el-option
            v-for="item in mapList"
            :key="item.shopId"
            :label="`${item.label}_${item.value}`"
            :value="item.shopId"
          >
            <span>{{ item.label }}_{{ item.value }}</span>
          </el-option>
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
  id?: number | string
  url?: string
  name?: string
  maxRate?: string | number
  minRate?: string | number
  base?: number
  shopId?: number[] | string[]
  date?: string | number
}

const rules = reactive({
  id: [{ required: true, message: '请输入id', trigger: 'change' }],
  url: [{ required: true, message: '请输入图片地址', trigger: 'change' }],
  name: [{ required: true, message: '请输入商品名称', trigger: 'change' }],
  maxRate: [{ required: true, message: '请输入最高折扣', trigger: 'change' }],
  minRate: [{ required: true, message: '请输入最低折扣', trigger: 'change' }],
  base: [{ required: true, message: '请输入基础价格', trigger: 'change' }],
  shopId: [{ required: true, message: '请选择最高价商店', trigger: 'change' }],
  date: [{ required: true, message: '请输入最高价日期', trigger: 'change' }],
})

const form = reactive<shopObj>({})
const editIndex = ref()
// 初始化
function initEditData(index?: number) {
  editIndex.value = index
  if (typeof index === 'number') {
    form.name = props?.shopData.name
    form.id = props?.shopData.id
    form.url = props?.shopData.url
    form.maxRate = props?.shopData.maxRate
    form.minRate = props?.shopData.minRate
    form.base = props?.shopData.base
    form.shopId = props?.shopData.shopId
    form.date = props?.shopData.date
  } else {
    form.name = undefined
    form.id = undefined
    form.url = undefined
    form.maxRate = 120
    form.minRate = 80
    form.base = undefined
    form.shopId = undefined
    form.date = undefined
  }
}

// 获取素材列表
const mapList = ref()
const getMapList = async () => {
  const { code, data, message } = await Api.mapList()
  if (code === 200) mapList.value = data
  else console.log(message)
}
getMapList()

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
