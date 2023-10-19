import axios from 'axios'
//全局参数，自定义参数可在发送请求时设置
axios.defaults.timeout = 5000 //超时时间ms
axios.defaults.withCredentials = true
// 请求时的拦截
//回调里面不能获取错误信息
// const loadingInstance = ElLoading.service({ 
//   fullscreen: true ,
//   text:"拼命加载中...",   //显示在加载图标下方的加载文案
//   background:'rgba(0,0,0,.7)',   //遮罩背景色
// });
axios.interceptors.request.use(

  // console.log("here is", config),

  function (config) {

    // loadingInstance.close();
    return config;
  },
  function (error) {
    // 当请求异常时做一些处理
    // loadingInstance.close();
    console.log('请求异常：' + JSON.stringify(error));
    ElMessage.error('请求失败' +  JSON.stringify(error))
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  console.log('响应出错：' )
  ElMessage.error('响应出错')
  // loadingInstance.close();
  return Promise.reject(error)
})


const base = {
  axios: axios,
  baseUrl: 'http://localhost:5173'
}

export default base
