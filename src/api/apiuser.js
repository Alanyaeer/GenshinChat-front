import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl
export const loginuser = ({id, password}) =>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/login`,
        data: {id, password}
    }).then(res => res.data)
}
export const getuserInfo = (params) => {
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/getuserInfo`,
        data: params

    }).then(res => res.data)
}
export const registeruser = ({id, password, repassword})=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/register`,
        data: {id, password, repassword}
    }).then(res => res.data)
}
export const saveuserInfo = (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/save`,
        data: params
    }).then(res => res.data)
}
export const deletefriend = (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/deletefriend`,
        data: params
    }).then(res => res.data)
}
export const addfriend = (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/addfriend`,
        data: params
    }).then(res => res.data)
}
// 搜索所有的对象
export const searchfriends = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/api/searchfriends`,
      data: params
    }).then(res => res.data)
}
// 修改update 时间。 
export const updatefriend = (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/updatefriend`,
        data: params
    }).then(res => res.data)    
}
export const logoutuser = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/api/logout`,
      data: params
    }).then(res => res.data)
}
export const findFriend = (params) => {
    return axios({
      method: 'get',
      baseURL: `${baseUrl}/api/findFriend`,
      params: params
    }).then(res => res.data)
}