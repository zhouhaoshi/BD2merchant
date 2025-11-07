<template>
  <el-dialog
    :close-on-click-modal="false"
    :model-value="dialogVisible"
    :title="senceData ? `编辑场景:${senceData.name}` : '新增场景'"  
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="auto" :rules="rules">
      <el-form-item label="场景名称" prop="name">
        <el-input placeholder="请输入场景名称" v-model="form.name" />
      </el-form-item>
      <el-form-item label="图片ID" prop="url">
        <el-input placeholder="请输入图片ID" v-model="form.url" />
      </el-form-item>
      <el-form-item label="资源点" prop="type">
        <el-select v-model="form.support" multiple placeholder="请选择包含的资源点">
          <el-option label="收集点" value="dot" />
          <el-option label="怪物点" value="monster" />
          <el-option label="宝箱点" value="box" />
          <el-option label="调查点" value="collect" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="saveMaterial"> 保存场景 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
defineProps(['dialogVisible'])
const emit = defineEmits(['close', 'save'])
defineExpose({ initEditData });
interface senceObj {
  shopId?: number | string
  url?: string,
  name?: string,
  support?: Array<number | string>
}

const rules = reactive({
  name: [
    { required: true, message: '请输入场景名称', trigger: 'blur' }
  ],
  url: [
    {
      required: true,
      message: '请输入图片ID',
      trigger: 'blur',
    },
  ]
})

const form = reactive<senceObj>({
  name: undefined,
  shopId: undefined,
  url: undefined,
  support: undefined
})
const senceData = ref<senceObj>({})
const senceIndex = ref<number>()
// 初始化
function initEditData (data:senceObj, index:number){
  senceData.value = data
  senceIndex.value = index
  if (!!data) {
    form.name = data.name
    form.shopId = data.shopId
    form.url = data.url
    form.support = data.support
  } else {
    form.name = undefined
    form.shopId = undefined
    form.url = undefined
    form.support = undefined
  }
}

const handleClose = () => {
  emit('close')
}
const saveMaterial = () => {
  emit('save', JSON.parse(JSON.stringify(form)), senceIndex.value)
  emit('close')
}
</script>

<style lang="less" scoped>
  .material_select{
    height: 40px;
    display: flex;
    align-items: center;
    &>img{
      height: 40px;
      width: 40px;
    }
  }
</style>