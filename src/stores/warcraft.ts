import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWarcraftListStore = defineStore(
  'warcraftList',
  () => {
    const warcraftList = ref<Record<string, characterDataObj>>({})

    const setWarcraftList = (newList: Record<string, characterDataObj>) => {
      warcraftList.value = newList // 👈 注意：要用 .value
    }
    return { warcraftList, setWarcraftList }
  },
  {
    persist: true, // 开启持久化
  },
)
