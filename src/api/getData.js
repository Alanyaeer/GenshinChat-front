import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

// 获取好友, 按照时间更新顺序返回数据 
export const getFriend = (params) => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/api/friend/friendList`,
      data: params
    }).then(res => res.data)
}

  // 获取聊天信息, 这里可以拓展方法比如 msg，time, friendId
export const getChatMsg = (params) => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/api/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}
export const saveChatMsg = (params)=>{
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/api/friend/saveMsg`,
    data:  params
  }).then(res=>res.data)
}

