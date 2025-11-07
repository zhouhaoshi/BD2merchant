<template>
  <div>
    <slide-verify
      ref="block"
      :slider-text="text"
      :accuracy="accuracy"
      @again="onAgain"
      @success="onSuccess"
      @fail="onFail"
      @refresh="onRefresh"
    ></slide-verify>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// 局部注册组件，需要单独引用组件样式
// 只提供局部引用的方式，不再采用插件形式，方便按需加载，减少主包大小
import SlideVerify, { type SlideVerifyInstance } from 'vue3-slide-verify';
import "vue3-slide-verify/dist/style.css";

export default defineComponent({
  components: { SlideVerify },

  setup() {
    const msg = ref("");
    const block = ref<SlideVerifyInstance>();

    const onAgain = () => {
      msg.value = "检测到非人为操作的哦！ try again";
      // 刷新
      block.value?.refresh();
    };

    const onSuccess = (detail: { timestamp: number; left: number }) => {
      msg.value = `login success, 耗时${(detail.timestamp / 1000).toFixed(1)}s, 移动距离${detail.left}px`;
    };

    const onFail = () => {
      msg.value = "验证不通过";
      setTimeout(() => {
        // 刷新
        block.value?.refresh();
      }, 1000);
    };

    const onRefresh = () => {
      msg.value = "点击了刷新小图标";
    };

    const handleClick = () => {
      // 刷新
      block.value?.refresh();
      msg.value = "";
    };

    return {
      block,
      msg,
      text: "向右滑动->",
      accuracy: 4,
      onAgain,
      onSuccess,
      onFail,
      onRefresh,
      handleClick,
    };
  },
});
</script>