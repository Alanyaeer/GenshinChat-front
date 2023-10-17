import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'chat-user',
  () => {
    const token = ref('')
    const username = ref('')
    const userimg = ref('')
    const userid = ref('')
    const userdetail = ref('')


    return {
        token, username, userimg, userid
    }
  },
  {
    persist: true
  }
)
