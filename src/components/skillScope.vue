<template>
  <div
    style="transform: rotateZ(-90deg); position: relative"
    :style="`height: calc(52px * ${sizeList.height});`"
  >
    <!-- 循环列表分别拿到x轴列表和y轴列表，冒泡排序分别拿到最大和最小值。最大最小值绝对值相加就是矩形图像的访问 -->
    <div
      v-for="(row, rowIndex) in sizeList.width"
      :key="rowIndex"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div
        v-for="(col, colIndex) in sizeList.height"
        :key="colIndex"
        class="col_box"
        :class="{
          center_box: `${rowIndex + sizeList.minX}, ${colIndex + sizeList.minY}` === '0, 0',
          scope_box: scopeStringList?.includes(
            `${rowIndex + sizeList.minX}, ${colIndex + sizeList.minY}`,
          ),
        }"
      ></div>
    </div>
    <div class="All_box" v-if="props.scopeList.length === 0">All</div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    scopeList: number[][]
  }>(),
  {
    scopeList: () => [],
  },
)

watch(props, () => {
  calculateSize()
})

interface Size {
  width: number // 坐标轴的x轴
  height: number // 坐标轴的y轴
  minX: number // x轴的最小值
  minY: number // y轴的最小值
}

const sizeList = ref<Size>({
  width: 0,
  height: 0,
  minX: 0,
  minY: 0,
})
const scopeStringList = ref<string[]>()

const calculateSize = () => {
  if (props.scopeList.length > 0) {
    const scopeListX = props.scopeList
      .map((item: number[]) => item[0])
      .sort((a: number, b: number) => a - b)
    const scopeListY = props.scopeList
      .map((item: number[]) => item[1])
      .sort((a: number, b: number) => a - b)
    scopeStringList.value = props.scopeList.map((item: number[]) => `${item[0]}, ${item[1]}`)
    const xMin = Math.abs(scopeListX[0])
    const xMax = Math.abs(scopeListX[scopeListX.length - 1])
    const yMin = Math.abs(scopeListY[0])
    const yMax = Math.abs(scopeListY[scopeListY.length - 1])
    const x = xMin + xMax + 1
    const y = yMin + yMax + 1
    sizeList.value.height = y
    sizeList.value.width = x
    sizeList.value.minY = Math.min(...[scopeListY[0], scopeListY[scopeListY.length - 1]])
    sizeList.value.minX = Math.min(...[scopeListX[0], scopeListX[scopeListX.length - 1]])
    // 处理不展示y负轴的情况
    // if (yMin >= 0 && yMax >= sizeList.value.width - 1) {
    //   sizeList.value.minY += Math.ceil(yMax / 2) + 1
    // }
    // // 处理不展示x负轴的情况
    // if (xMin >= 0 && xMin >= sizeList.value.width - 1) {
    //   sizeList.value.minX += Math.ceil(xMin / 2) - 1
    // }
  } else {
    scopeStringList.value = []
    sizeList.value.height = sizeList.value.width = 3
  }
}
calculateSize()
</script>
<style lang="less" scoped>
.col_box {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #000;
  text-align: center;
}
.center_box::after {
  content: '';
  display: inline-block;
  width: 25px;
  height: 12px;
  display: inline-block;
  border: 1px solid white;
  border-width: 0 0 2px 2px;
  transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  vertical-align: baseline;
}
.scope_box {
  background-color: #2dd4bfd9;
  transform: rotateZ(90deg);
}
.All_box {
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(90deg);
  width: 150px;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 150px;
  font-size: 80px;
  color: red;
}
</style>
