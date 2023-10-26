import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl
export const upload =  (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/upload`,
        data: params
    }).then(res => res.data)
}
export const downloadbasecontent =  (params)=>{
    return axios({
        method: 'post',
        baseURL: `${baseUrl}/api/download`,
        data: params
    }).then(res => res.data)
}
export const downloadfile =  (params)=>{
    return axios({
        method: 'get',
        baseURL: `${baseUrl}/api/downloadfile`,
        data: params
    }).then(res => res.data)
}