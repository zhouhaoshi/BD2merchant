import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchEquipmentList } from '@/utils/equipment'

export const useEquipmentStore = defineStore('equipmentList', () => {
  const equipmentList = ref<equipmentDataObj[]>([])
  const loading = ref(false)
  const error = ref('')
  const updateTime = ref('')
  const fromLocal = ref(false)

  const loadEquipment = async (force = false) => {
    loading.value = true
    error.value = ''
    try {
      const result = await fetchEquipmentList(force)
      equipmentList.value = result.list
      updateTime.value = result.updateTime
      fromLocal.value = result.fromLocal
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  return { equipmentList, loading, error, updateTime, fromLocal, loadEquipment }
})
