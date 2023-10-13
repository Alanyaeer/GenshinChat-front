import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'chat-user',
  () => {
    const token = ref('')
    return {
        token
    }
  },
  {
    persist: true
  }
)
