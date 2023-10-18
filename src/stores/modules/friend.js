import { defineStore } from 'pinia'
import { ref } from 'vue'
import {getFriend, getChatMsg} from '@/api/getData'
export const useUserStore = defineStore(
  'chat-friend',
  () => {
    const personList = ref([])
    // const 
  },
  {
    persist: true
  }
)