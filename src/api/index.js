import axios from 'axios'
//全局参数，自定义参数可在发送请求时设置
axios.defaults.timeout = 5000 //超时时间ms
axios.defaults.withCredentials = true
// 请求时的拦截
//回调里面不能获取错误信息

axios.interceptors.request.use(
  function (config) {

    return config;
  },
  function (error) {
    // 当请求异常时做一些处理
    console.log('请求异常：' + JSON.stringify(error));
    ElMessage.error('请求失败' +  JSON.stringify(error))
    return Promise.reject(error);
  }
);
   // 上线的时候记得要更换
axios.interceptors.response.use(function (response) {
  let red = response.data
  if(red.code === 0){
    console.log('hello');
    ElMessage.error(red.msg)
    return Promise.reject(red)

  }
  console.log(red.data);
  // Do something with response data
  return red
}, function (error) {
  // Do something with response error
  console.log('响应出错：' )
  ElMessage.error('响应出错')
  // loadingInstance.close();
  return Promise.reject(error)
})
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response
// }, function (error) {
//   // Do something with response error
//   console.log('响应出错：' )
//   ElMessage.error('响应出错')
//   // loadingInstance.close();
//   return Promise.reject(error)
// })

// 这里上线之后需要修改

const base = {
  axios: axios,
  baseUrl: 'http://localhost:180'
}

export default base
