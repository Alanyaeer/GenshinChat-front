<script setup>
import { animation} from '../../../utils/util.js'
import { getChatMsg } from "../../../api/getData.js";
import { base } from '@/api/index'
import HeadPortrait from "../../../components/HeadPortrait.vue";
import Emoji from "../../../components/Emoji.vue";
import FileCard from "../../../components/FileCard.vue";
import { ref, onMounted, watch ,defineProps, defineEmits, nextTick, getCurrentInstance, initCustomFormatter} from 'vue'
import { saveChatMsg} from '@/api/getData.js'
import { VideoCamera,Phone, Document, PictureRounded } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import {formatTime} from '@/utils/format.js'
import { ElMessage, ElNotification, uploadBaseProps } from 'element-plus';
import {upload, uploadMsg, reUpload, fileMerge, getSize,redownload} from '@/api/common.js'
import axios from 'axios'
import SparkMD5 from 'spark-md5' 
import base from '../../../api/index'
const baseUrl = base.baseUrl
// 声明变量
const userstore = useUserStore()
const chatList = ref([])
const inputMsg = ref("")  
const showEmoji = ref(false)
const srcImgList = ref([])
const valueList = ref([])
const chatContent = ref(null)
const filesize = ref('')
const stopupload = ref([])
const downloadwhich = ref("")
const valueUploadList = ref([])
let arraymap = new Map()
let recordfile = new Map()
let stopdownload = new Map()
let filenametemp = ""
let socket;
// const instance = getCurrentInstance()
// 父组件传递过来的变量
const props = defineProps({
  friendInfo: Object,
  default: () => ({})
})
// const FileList = ref([])
// 发送消息给父组件
const emit = defineEmits(['personCardSort'])
// methods
// 获取聊天记录
const getFriendChatMsg = async () => {
  let params = {
    friendId: props.friendInfo.id,
    myId: userstore.userid
  };
  await getChatMsg(params).then((res) => {
    chatList.value = res;
    if(!chatList.value){
      chatList.value = []
    }
      chatList.value.forEach(async (item) => {
        if(!valueList.value) valueList.value = []
        valueList.value.push(0.0)
        if(!valueUploadList.value) valueUploadList.value = []
        valueUploadList.value.push(100)
        if(!stopupload.vlaue) stopupload.value = []
        stopupload.value.push(true)
        if ((item.chatType == 1 && item.imgType == 2)) {
          axios.get(baseUrl + "/api/downloadfile", {
            params: {
              fileName: item.fileName,
              extend: item.extend
            },
            responseType: "arraybuffer"
          })
          .then(res=>new Blob([res], {type: item.extend}))
          .then(blob=> new File([blob], item.fileName))
          .then(file=>{
            item.msg = file
            let reader = new FileReader()
            let fileNameTemp = item.fileName
            reader.onloadend = (es)=>{
                item.msg = es.target.result
                item.fileName = fileNameTemp
                if(item.chatType === 1){
                  srcImgList.value.push(item.msg)
                }
            }
            reader.readAsDataURL(file)
          })
        }
      });
      scrollBottom();
  });
}
// 发送信息
const sendMsg = async (msgList) => {
  if(!chatList.value){
      chatList.value = []
  }
  if(!valueList.value) valueList.value = []
  valueList.value.push(0.0)
  chatList.value.push(msgList);
  // await saveChatMsg(msgList)
  scrollBottom();
}
//获取窗口高度并滚动至最底层
const scrollBottom = () => {
  nextTick(()=>{
    const scrollDom = chatContent.value;
    // animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
    scrollDom.scrollTop = scrollDom.scrollHeight;
  })
}
const mycontent = async () => {
  let userInfo = await userstore.getUser()
  return {
    headImg: userInfo.userimg,
    name: userInfo.username,
    uid: userInfo.userid,
    time: formatTime(new Date()),
  }
}
const sethundred = (index)=>{
 valueUploadList.value[index] = 100.0

}
const sendSocket = (message)=>{
  let chatuser = props.friendInfo.id
  let myid = userstore.userid
  if(chatuser == null){
    console.log('选择聊天对象');
    return 
  }
  if (typeof (WebSocket) == "undefined") {
    console.log("您的浏览器不支持WebSocket");
  } else {
    console.log("您的浏览器支持WebSocket");
  }
  let sendmessage = {
    from: myid,
    to: chatuser,
    text: message
  }
  if(myid !== chatuser)
  socket.send(JSON.stringify(sendmessage))
}
// 关闭标签页
const clickEmoji = () => {
  showEmoji.value = !showEmoji.value;
}
const resetValue = (index)=>{
  valueList.value[index] = 0.0

}
// 发送消息
const sendText = async () => {
  if(!valueUploadList.value) valueUploadList.value = []
  valueUploadList.value.push(0.0)
  if(!stopupload.vlaue) stopupload.value = []
        stopupload.value.push(true)
  if (inputMsg.value) {
    let curobj = await mycontent();
    let chatMsg = {
      ...curobj,
      msg: inputMsg.value,
      chatType: 0, //信息类型，0文字，1图片
      myId: userstore.userid,
      friendId: props.friendInfo.id
    };
    sendMsg(chatMsg);
    
    // 发送给父组件的消息
    emit('personCardSort',props.friendInfo.id)
    uploadMsg(chatMsg)
    inputMsg.value = "";
    sendSocket(chatMsg)
  } else {
    ElMessage.warning("消息不能为空")
  }
}
// 发送表情
const sendEmoji = async (msg) => {
  if(!valueUploadList.value) valueUploadList.value = []
  valueUploadList.value.push(0.0)
  if(!stopupload.vlaue) stopupload.value = []
        stopupload.value.push(true)
  let curobj = await mycontent();
  let chatEmoji = {
      ...curobj,
      msg: msg,
      chatType: 1, //信息类型，0文字，1图片
      imgType: 1, //(1表情，2本地图片)
      myId: userstore.userid,
      friendId: props.friendInfo.id
    };
    
    sendMsg(chatEmoji);
    clickEmoji();
    uploadMsg(chatEmoji)
    sendSocket(chatEmoji)
}
// 发送本地图片
const sendImg = async (e) => {
  // console.log(e);
  if(!valueUploadList.value) valueUploadList.value = []
  valueUploadList.value.push(0.0)
  if(!stopupload.vlaue) stopupload.value = []
        stopupload.value.push(true)
  let curobj = await mycontent();
  // console.log(e.target.files);
  let chatfiles = {
    msg: "",
    chatType: 1, //信息类型，0文字，1图片, 2文件

      imgType: 2, //(1表情，2本地图片)
    ...curobj,
    size: "",
    fileName: "",
    myId: userstore.userid,
    friendId: props.friendInfo.id
  };

  let files = e.target.files[0];
  const formData = new FormData()
  formData.append('e', files)
  upload(formData)
  if(files.size>1024*1024){
    ElNotification({
        type: 'warning',
        title: '图片过大🎢',
        message: '选择小的图片上传✨'
    })
    return ;
  }
  if (!e || !window.FileReader) return;
  chatfiles.fileName = files.name
  let reader = new FileReader();
  reader.readAsDataURL(files);
  reader.onloadend = (es) => {
    // let filename = upload(chatfiles.msg)
    chatfiles.msg = es.target.result; 
    srcImgList.value.push(chatfiles.msg);
    
    sendMsg(chatfiles);

    uploadMsg(chatfiles)
    sendSocket(chatfiles)

  };
  e.target.files = null;
}
const calsize =  (size)=>{
  if(size>1024*1024){
    return (size/1024/1024).toFixed(2)+'MB'
  }
  else if(size >1024){
    return (size/1024).toFixed(2)+'KB'
  }
  else 
  return size+'B'

}
const uploadAlgorithm = async(e, index, isorignsend) => {
  let curobj = await mycontent();
  let chatFile = {
    msg: "",
    chatType: 2, //信息类型，0文字，1图片, 2文件

      fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)

    ...curobj,
    size: "",
    fileName: "",
    myId: userstore.userid,
    friendId: props.friendInfo.id
  };
  let files = e.target.files[0]; //图片文件名
  if(files.size>1024*1024*500){
    ElNotification({
        type: 'warning',
        title: '文件过大🎢',
        message: '选择上传该文件的压缩包✨'
    })
    return ;
  }
  const formData = new FormData()
  formData.append('e', files)
  
  // 策略2 分片上传
  const filesizes = files.size
  if(files.size >  1024 * 1024){
    const uploadslice = async()=>{
    if(!files)return 
    const chunks = createChunks(files,1024 * 1024)
    const result = await hash(chunks)
    let ispassfile = false
    let reuploadobj = {
      result: result
    }
    let reuploadcnt = await reUpload(reuploadobj)
    // 现在上传了 reuploadcnt  个文件对吧
    // reuploadcnt * 1024
    if(reuploadcnt !== chunks.length){
      valueUploadList.value[index] = (reuploadcnt * 1024 * 1024 * 100) / filesizes
    }
    else 
      valueUploadList.value[index] = 100.0
    for(let i = reuploadcnt; i < chunks.length; ++i){
      // const loop = async(index, i, result, filesizes)=>{
        if(stopupload.value[index] === true){
          return
        }
        // let file = chunks[i]
        let chunkcnt = i
        let md5 = result
        const formData = new FormData()
        const blob = chunks[i]
        formData.append('file', blob)
        formData.append('hash', result)
        formData.append('chunkcnt', i)
        formData.append('filename', files.name)
        formData.append('totalCnt', chunks.length - 1)  
        await axios.post('/api/uploadslice', (formData),{
            onUploadProgress: function(progressEvent){
              function sendHeartbeat() {  
                setTimeout(function() {  
                  if (socket.readyState === WebSocket.OPEN) {  
                    socket.send(''); // 发送空的心跳包给服务器  
                    sendHeartbeat(); // 递归调用发送心跳包函数，以保持连接活跃  
                  } else {  
                    console.log('WebSocket连接已关闭');  
                  }  
                }, 5000); // 每30秒发送一次心跳包给服务器  
              }
                if( valueUploadList.value[index] + ( (progressEvent.loaded * 100) / filesizes) <= ((i + 1) * 1024 * 1024 * 100) / filesizes)
                valueUploadList.value[index] += ( (progressEvent.loaded * 100) / filesizes)
                else 
                valueUploadList.value[index] = ((i + 1) * 1024 * 1024 * 100) / filesizes
                if(stopupload.value[index] === true){
                  return
                }
              } 
          })
          if(stopupload.value[index] === true){
              return
            }

      // }
      
    }
    let merge = {
      hash:  result,
      filename: files.name,
      totalCnt: chunks.length - 1
    }
    const finish = await fileMerge(merge)
    if(finish === 1){
      valueUploadList.value[index] = 100
    }
    sendSocket(chatFile)
    ElNotification({
      type: 'success',
      title: '上传了一个文件🎉',
      message: '上传成功🥳'
    })
  }
  
  // if(stopupload.value[index] === false) break
    function createChunks(files, chunkSize) {
      const results = []
      for(let i = 0; i < files.size; i += chunkSize){
        results.push(files.slice(i, i + chunkSize))
      }
      return results
    }
    // 增量算法
    function hash(chunks){
      const spark = new SparkMD5
      return new Promise(resovle=>{
          function _read(i){
          if(i >= chunks.length){
            //输出一个哈希
            resovle(spark.end());
            return ;
          }
          const blob = chunks[i]
          const reader = new FileReader
          reader.onload = e=>{
            const bytes = e.target.result
            spark.append(bytes)
            _read(i + 1)
          } 
          reader.readAsArrayBuffer(blob)
        }
        _read(0)
      })
    }
    uploadslice()
  }
  else{
  axios.post('/api/upload', formData, {
      onUploadProgress: function(progressEvent){
        function sendHeartbeat() {  
          setTimeout(function() {  
            if (socket.readyState === WebSocket.OPEN) {  
              socket.send(''); // 发送空的心跳包给服务器  
              sendHeartbeat(); // 递归调用发送心跳包函数，以保持连接活跃  
            } else {  
              console.log('WebSocket连接已关闭');  
            }  
          }, 5000); // 每30秒发送一次心跳包给服务器  
        }
        
        valueUploadList.value[index] = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      // 在控制台打印上传百分比
      }
    }).then(function(response){
      sendSocket(chatFile)
      ElNotification({
        type: 'success',
        title: '上传了一个文件🎉',
        message: '上传成功🥳'
      })
      return
    }).catch(function(error){
      console.log('上传失败' + error);
    })
    upload(formData)
  }
 
  
  filesize.value = calsize(files.size);
  if (files) {
    switch (files.type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        chatFile.fileType = 1;
        break;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        chatFile.fileType = 2;
        break;
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        chatFile.fileType = 3;
        break;
      case "application/pdf":
        chatFile.fileType = 4;
        break;
      case "application/zip":
      case "application/x-zip-compressed":
        chatFile.fileType = 5;
        break;
      case "text/plain":
        chatFile.fileType = 6;
        break;
      default:
        chatFile.fileType = 0;
    }
    if(isorignsend === true)
    sendMsg(chatFile);
    chatFile.size = filesize.value
    chatFile.fileName = files.name
    filenametemp = files.name
    uploadMsg(chatFile)
    //发送socket过来
    // let reader = new FileReader()
    // reader.readAsDataURL(files)    
    // reader.onload = (es) => {
    //   chatFile.msg = es.target.result
    //   chatFile.fileName = filenametemp
    //   // 这里就是在进行前端上传给后台，后台把数据转换为文件放入到文件夹里面
    //   upload(chatFile)
    // }
    // // setTimeout(()=>{
    //   console.log(chatFile);

    // // }, 1000)
    //  e.target.files = null;
  }
}
// 发送文件
const sendFile = async (e) => { 
  

  if(!valueUploadList.value) valueUploadList.value = []
  valueUploadList.value.push(0.0)
  if(!stopupload.value) stopupload.value = []
    stopupload.value.push(false)
  if(!recordfile.value) recordfile.value = []
  const index = valueUploadList.value.length - 1
  // recordfile[index] = e
  recordfile.set(index, e)
  uploadAlgorithm(e ,index, true)
  
}
function sendHeartbeat() {  
  setTimeout(function() {  
    if (socket.readyState === WebSocket.OPEN) {  
      socket.send(''); // 发送空的心跳包给服务器  
      sendHeartbeat(); // 递归调用发送心跳包函数，以保持连接活跃  
    } else {  
      console.log('WebSocket连接已关闭');  
    }  
  }, 5000); // 每30秒发送一次心跳包给服务器  
}
// 发送语音
const telephone = () => {
  ElMessage.info("语音功能开发中")
}
// 发送视频
const video = () => {
  ElMessage.info("视频功能开发中")
}

const fileDownloadAgrithm = async(index, item)=>{
  stopdownload.set(index, false)
    downloadwhich.value = index
    console.log(index);
    let getsizeobj = {
      fileName: item.fileName
    }
    //  普通的下载
    let sizehigh = await getSize(getsizeobj)
    if(sizehigh <= 1024 * 1024){
      axios.get(baseUrl + "/api/downloadfile", {
        params: {
          fileName: item.fileName,
          extend: item.extend
        },
        responseType: "arraybuffer",
        onDownloadProgress(progressEvent) {
          
          valueList.value[index] = (progressEvent.loaded * 100) / progressEvent.total;
          console.log(valueList.value[index]);
        }
      }).then(res=>new Blob([res], {type: item.extend})
      )
      .then(blob=>{
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = item.fileName
        a.href = url 
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        resetValue(index)
      })
    }
    else{
      let redownloadobj = {
        fileName: item.fileName,
        userid: userstore.userid
      }
      
      function concatArrayBuffer(arrayBufferArray) {
      let totalLength = 0;
      arrayBufferArray.forEach(arrayBuffer => {
        totalLength += arrayBuffer.byteLength;
      });
      const result = new Uint8Array(totalLength);
      let offset = 0;
      arrayBufferArray.forEach(arrayBuffer => {
        result.set(new Uint8Array(arrayBuffer), offset);
        offset += arrayBuffer.byteLength;
      });
      return result;
    }
    let arrayBufferArray = []
    if(arraymap.has(index))
    arrayBufferArray = arraymap.get(index);
    console.log('是否有记录', arraymap.has(index), arrayBufferArray);
    // 获取文件的大小
  
    

    console.log('长度为：', sizehigh);
    let downloadcnt = await redownload(redownloadobj)

    // 文件下载
    let len = 1024 * 1024 
    let finish = 0
    let startsize = 0
    let totalcnt = Math.ceil(sizehigh / (1024 * 1024)) - 1
    console.log(totalcnt, downloadcnt, valueList.value[index]);
    let curcnt = 0
    if(downloadcnt === totalcnt){
      startsize = sizehigh
      valueList.value[index] = 100.0
      curcnt = totalcnt
    }
    else{
      startsize = (1024 * 1024) * downloadcnt
      valueList.value[index] = (1024 * 1024 * 100 * downloadcnt) / sizehigh
      curcnt = downloadcnt
    } 
    for(let i = startsize;i < sizehigh; i += len){
      len = Math.min(sizehigh - i, 1024 * 1024)
      await axios.get('/api/downloadslicefile',{
        params: {
          fileName: item.fileName,
          extend: item.extend,
          start: i,
          end: i + len - 1,
          curcnt: curcnt,
          userid: userstore.userid,
          totalcnt: totalcnt
        }, 
        headers: {
          range: `bytes=${i}-${i + len - 1}`
        },
        responseType: "arraybuffer",
        onDownloadProgress(progressEvent){
          if(valueList.value[index] + (progressEvent.loaded * 100) / sizehigh > ((curcnt + 1) * 1024 * 1024) / sizehigh * 100)
            valueList.value[index] = ((curcnt + 1) * 1024 * 1024) / sizehigh * 100
          else
            valueList.value[index] += (progressEvent.loaded * 100) / sizehigh;
          console.log('当前进度条位： ', valueList.value[index] + '  正在传送 ' + curcnt + '   ' + ((curcnt + 1) * 1024 * 1024) / sizehigh * 100);
          if(stopdownload.get(index) === true){
            arraymap.set(index, arrayBufferArray)
            console.log(curcnt);
            return
          }
        }
      }).then(clip=>{
        arrayBufferArray.push(clip)
        // console.log(clip);
        curcnt += 1
      })
      if(i + len === sizehigh){
        let res = concatArrayBuffer(arrayBufferArray)
        const blob = await new Blob([res], {type: item.extend})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = item.fileName
        a.href = url 
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)    
        ElNotification({
          type: 'success',
          title: '获得了一个文件🎉',
          message: '下载成功🥳'
        })  
        arraymap.delete(index)
        resetValue(index)
      }
      if(stopdownload.get(index) === true){
        arraymap.set(index, arrayBufferArray)
        return
      }
    }
    }
}
// 文件点击后下载
const clickfile = async (item, index)=>{
  
  if(valueUploadList.value[index] !== 100){
    
    stopupload.value[index] = !stopupload.value[index]
    if(stopupload.value[index] === true){
        ElNotification({
        type: 'warning',
        title: '通知',
        message: '文件暂停上传🤐'
      })
    }
    else {
      ElNotification({
      type: 'warning',
      title: '通知',
      message: '文件开始继续上传🤐'
      
    })
    uploadAlgorithm(recordfile.get(index), index, false)
    }
    return 
  }
  else {
    if(!stopdownload.has(index)){
      console.log('我进来了');
      stopdownload.set(index, false) 
    }
    else{
      stopdownload.set(index,!stopdownload.get(index))

    }
    console.log('切换形态', stopdownload.get(index));
    if(stopdownload.get(index) === true){
        ElNotification({
        type: 'warning',
        title: '通知',
        message: '文件暂停下载🤐'
      })
    }
    else {
      ElNotification({
        type: 'warning',
        title: '通知',
        message: '文件开始下载🤐'
        
      })
      fileDownloadAgrithm(index, item)
    }
  }
}
const init = ()=>{
  let userId = userstore.userid
  if(typeof (WebSocket) == "undefined"){
    console.log("您的浏览器不支持WebSocket")
  }
  else{
    let socketUrl = "ws://192.168.46.177:8080/imserver/" + userId
    if(socket != null){
      console.log(socket);
      socket.close()
      socket = null
    }
    socket = new WebSocket(socketUrl)
    socket.onopen = function () {
        console.log("websocket已打开");

    };
    socket.onmessage = function (msg) {
      if(msg === ""){
        console.log('保持连接测试');
        return 
      }
      console.log("收到数据====" + msg.data)
      let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      if (data.users) {  // 获取在线人员信息
        // _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        //  // {"from": "zhang", "text": "hello"}
        if (data.from === props.friendInfo.id) {
          let cur = JSON.parse(data.text)
          if(cur.chatType === 1 && cur.imgType === 2){
            srcImgList.value.push(cur.msg)
          }
          if(cur.chatType === 2) valueUploadList.value.push(100) 
          else valueUploadList.value.push(0)
          sendMsg(cur, "now")          
        }
      }
    }
    socket.onclose = function (e) {
      console.log('websocket关闭', e.code+ ' '+e.reason+' ' + e.wasClean)
    }
    socket.onerror = function () {
      console.log('websocket发送错误', );
    }
    // sendHeartbeat()
  }
}
onMounted(()=>{
  getFriendChatMsg()
  init()
})
watch(
  () => props.friendInfo,
  () => {
    getFriendChatMsg()
  },
  {deep: true},
  {immediate: true}
)
</script>


<template>
  <div class="chat-window">
    <div class="top">
      <div class="head-pic">
        <HeadPortrait :imgUrl="props.friendInfo.headImg" :status="props.friendInfo.status" :needStatus="false"></HeadPortrait>
      </div>
      <div class="info-detail">
        <div class="name">{{ props.friendInfo.name }}</div>
        <div class="detail">{{ props.friendInfo.detail }}</div>
      </div>
      <div class="other-fun">
        <label for="docFile">
         <img style="height:40px; width:40px; cursor: pointer; padding-left: 20px;"  src="@/assets/6.png">
        </label>
        <label for="imgFile">
         <img style="height:40px; width:40px; cursor: pointer; padding-left: 20px;"   src="@/assets/7.png">
        </label>
      
        <input
          type="file"
          id="imgFile"
          @change="sendImg"
          accept="image/*"
        />
        <input
          type="file"
          id="docFile"
          @change="sendFile"
          accept="application/*,text/*"
        />

        <!-- accept="application/*" -->
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper " v-for="(item, index) in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== userstore.userid">
            <div class="chat-text " v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1" :class="`${index}`">
              
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image 
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
              v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2" :class="`${index}`">
              <div class="word-file">
                <FileCard
                  :index="index"
                  :fileType="item.fileType"
                  :fileName="item.fileName"
                  :size="item.size"
                  :value="valueList[index]"
                  :uploadvalue="valueUploadList[index]"
                  @click="clickfile(item, index)"
                  @resetValue = "resetValue"
                  @sethundred = "sethundred"
                > 
              </FileCard>
              </div>
            </div>
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <!-- animate__slideInUp -->
          <!-- animate__bounceIn -->
          <div class="chat-me " v-else>
            <div class="chat-text animate__animated animate__slideInUp" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img animate__animated animate__slideInUp" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div>
            <div class="chat-img animate__animated animate__slideInUp" v-if="item.chatType == 2" :class="`${index}`">
              <div class="word-file">
                <FileCard
                  :index="index"
                  :fileType="item.fileType"
                  :fileName="item.fileName"
                  :size="item.size"
                  :value="valueList[index]"
                  :uploadvalue="valueUploadList[index]"
                  @click="clickfile(item, index)"
                  @resetValue = "resetValue"
                  @sethundred = "sethundred"
                >
                </FileCard>

              </div>
            </div>
            <div class="info-time ">
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
              <img :src="item.headImg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="chatInputs">
        <div class="emoji boxinput" @click="clickEmoji">
          <img src="@/assets/img/emoji/smiling-face.png" alt="" />
        </div>
        <!-- 表情包部分 -->
        <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
           
          >  </Emoji>
        </div>
        <input class="inputs" id="inputline" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send boxinput" @click="sendText" >
          <img src="@/assets/img/emoji/rocket.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.chat-window {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  position: relative;

  .top {

    margin-bottom: 50px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    .other-fun {
      float: right;
      margin-top: 20px;
      font-size: 30px;
      // .icon-tupian {
      gap: 20px;
      cursor: pointer;

      // }
      input {
        display: none;
      }
      .other_fun_icon{
        color:#757889;
        margin-left: 30px;
        cursor: pointer;
        // box-shadow: 4px 4px 8px  rgba(0, 0, 0, 2.1),
        //         -1px -1px 3px rgba(255, 255, 255, 2.1);
        border-radius: 10px;
      }
      .other_fun_icon:hover{
        color:#1D90F5;
        // background-color: #1D90F5;
      }

    }
  }
  .botoom {
    width: 100%;
    height: 70vh;
    background-color: rgb(50, 54, 68);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    
    .chat-content {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      padding: 20px;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
      .chat-wrapper {
        position: relative;
        word-break: break-all;
        .chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 20px 5px;
            background-color: rgb(56, 60, 75);
            color: #fff;
            &:hover {
              background-color: rgb(39, 42, 55);
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
    
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
        .chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          // transition: all ease-in 0.3s;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 20px 5px 20px;
            background-color: rgb(29, 144, 245);
            color: #fff;
            &:hover {
              background-color: rgb(26, 129, 219);
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .chatInputs {
      width: 90%;
      position: absolute;
      bottom: 0;
      margin: 3%;
      display: flex;
      .boxinput {
        width: 50px;
        height: 50px;
        box-shadow: 4px 4px 8px  rgba(0, 0, 0, 2.1),
                -1px -1px 3px rgba(255, 255, 255, 2.1);
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 1px solid rgb(80, 85, 103);
        position: relative;
        cursor: pointer;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .emoji {
        transition: 0.3s;
        // box-shadow:  0px 0px 4px 1px rgb(34, 135, 225);
        box-shadow: 4px 4px 8px  rgba(0, 0, 0, 2.1),
                -1px -1px 3px rgba(255, 255, 255, 2.1); 
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
          box-shadow: inset 0px 0px 4px 1px rgb(34, 135, 225);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
        box-shadow: 4px 4px 8px  rgba(0, 0, 0, 2.1),
                -1px -1px 3px rgba(255, 255, 255, 2.1);
        // box-shadow: 0;
        box-shadow: 0px 0px 12px 1px rgb(34, 135, 225);
        box-shadow: inset 0px 0px 4px 1px rgb(34, 135, 225);
        padding: 10px;
        box-sizing: border-box;
        transition: 0.2s;
        font-size: 20px;
        color: #fff;
        font-weight: 100;
        margin: 0 20px;
        &:focus {
          outline: none;
        }
      }
      .send {
        background-color: rgb(29, 144, 245);
        border: 0;
        transition: 0.3s;
        box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        }
      }
    }
  }
}
</style>