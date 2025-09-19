import { defineStore } from 'pinia'
import { ref } from 'vue'
import {getFriend, getChatMsg} from '@/api/getData'
export const useUserStore = defineStore(
  'chat-friend',
  () => {
    const chatList = ref([])
    const start = 0
    const end = 0
    const saveMsg = (msg, friend) => {
      chatList = []
      
    }
    const startMsg = ()=>{

    }
    // const 
  },
  {
    persist: true
  }
)