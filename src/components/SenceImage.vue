<template>
  <div 
    class="img_box"
    @click="clickImgList"
    ref="fullScreenRef"
    :style="{ 
      height: `${size}px`,
      width: `${size}px`,
      borderRadius : `${size/10 > 20 ? 20 : size/10 < 5 ? 5 : size/10}px`
    }">
    <img class="map" v-for="item in senceUrl" :key="item" :src="item">
    <div
      v-if="isFullScreen"
      class="icon name"
    >{{ senceName }}</div>
    <Close
      v-if="isFullScreen"
      :style="{height:`${iconSize}px`, width: `${iconSize}px`}" 
      class="icon close"
      @click.prevent.stop="colseFullscreen()"
    />
    <ArrowLeftBold
      v-if="isMove"
      :style="{height:`${iconSize}px`, width: `${iconSize}px`}" 
      class="icon left"
      @click.prevent.stop="handleMove(-1)"
    />
    <ArrowRightBold 
      v-if="isMove"
      :style="{height:`${iconSize}px`, width: `${iconSize}px`}" 
      class="icon right"
      @click.prevent.stop="handleMove(1)"
    />
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    'senceUrl':{},
    'size':{
      type: Number,
      default: 60
    },
    'senceName':{
      type: String,
      default: ''
    },
    'isMove':{
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['move'])
  const fullScreenRef = ref()
  const isFullScreen = ref(false) // 是否为全屏展示
  const clickImgList = () => {
    if (!document.fullscreenElement) {
      fullScreenRef.value.requestFullscreen();
    }
  }
  // 全屏模式后退出和监听都是直接操作document就行
  const colseFullscreen =  () => {
    if(document.fullscreenElement) {
      document.exitFullscreen()
    }
  }
  const handleKeyDown = (event:KeyboardEvent) => {
    // keyCode === 39 小键盘右键
    // keyCode === 37 小键盘左键
    if (event.keyCode === 39 || event.keyCode === 37) {
      handleMove(event.keyCode === 37 ? -1 : 1)
    }
  }
  const handleMove = (moveIndex: number) => {
    emit('move', moveIndex)
  }
  const iconSize = ref(20)
  onMounted(() => {
    window.addEventListener('fullscreenchange', () => {
      if(document.fullscreenElement) {
        isFullScreen.value = true
        iconSize.value = 40
        if(props.isMove) window.addEventListener('keydown', handleKeyDown)
      } else {
        isFullScreen.value = false
        iconSize.value = 20
        if(props.isMove) window.removeEventListener('keydown', handleKeyDown)
      }
    })
  })
</script>
<style lang="less" scoped>
  .img_box{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* 标准语法 */
    background-color: rgba(0, 0, 0, .9);
    .map{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
    .icon{
      position: absolute;
      z-index: 2;
      color: #fff;
      transition: opacity 0.2s;
      opacity: 0.1;
      &:hover{
        opacity: 0.8;
      }
    }
    .left{
      top: calc(50% - 10px);
      left: 20px;
    }
    .right{
      top: calc(50% - 10px);
      right: 20px;
    }
    .name {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      opacity: 1;
      font-size: 36px;
      letter-spacing: 10px
    }
    .close{
      top: 20px;
      right: 20px;
    }
  }
</style>
