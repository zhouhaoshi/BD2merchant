import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useCharacterStore = defineStore(
  'characterList',
  () => {
    const characterList = ref<Record<string, characterDataObj>>({})
    const setCharacterList = (newList: Record<string, characterDataObj>) => {
      characterList.value = newList // 👈 注意：要用 .value
    }
    return { characterList, setCharacterList }
  },
  {
    persist: true, // 开启持久化
  },
)
