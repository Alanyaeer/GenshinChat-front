import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getuserInfo ,saveuserInfo} from '../../api/apiuser'
export const useUserStore = defineStore(
  'chat-user',
  () => {
    const userid = ref('')
    const userimg = ref('')
    // const Jwt = ref('')
    let userInfo = {
      userid: '',
      username: '',
      userimmg: '',
      userimg: '',
      userdetail: '',
    }
    const setId = (newToken)=>{
      userid.value = newToken
    }
    const removeId = ()=>{
      userid.value = ''
    }
    const getUser = async () => {
      let params = {
        id: userid.value
      }
      // await 
      await getuserInfo(params).then((res)=>{
        userInfo = res
      })
      if(userInfo.userimg === '')userInfo.userimg = new URL("@/assets/img/genshinchat.png", import.meta.url).href
      return userInfo
    }
    const setUser = async (obj)=>{
      obj = await saveuserInfo(obj)
      console.log("保存用户信息");
      // console.log();
      console.log(obj);
      if(obj === 1){
        ElNotification({
          type: 'success',
          title: '保存成功🎉',
          message: '你的信息更新了🥳'
        })
      }
      getUser()
      return obj
    }
    // const 
    return {
        userid,getUser, setUser,userInfo,setId, removeId
    }
  },
  {
    persist: true
  }
)
