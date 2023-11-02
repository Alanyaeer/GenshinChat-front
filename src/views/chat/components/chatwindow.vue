<script setup>
import { animation} from '../../../utils/util.js'
import { getChatMsg } from "../../../api/getData.js";
import HeadPortrait from "../../../components/HeadPortrait.vue";
import Emoji from "../../../components/Emoji.vue";
import FileCard from "../../../components/FileCard.vue";
import { ref, onMounted, watch ,defineProps, defineEmits, nextTick, getCurrentInstance, initCustomFormatter} from 'vue'
import { saveChatMsg} from '@/api/getData.js'
import { VideoCamera,Phone, Document, PictureRounded } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores';
import {formatTime} from '@/utils/format.js'
import { ElMessage, uploadBaseProps } from 'element-plus';
import {upload, uploadMsg} from '@/api/common.js'
import axios from 'axios'
import base from '../../../api/index'
const baseUrl = base.baseUrl
// 声明变量
const userstore = useUserStore()
const chatList = ref([])
const inputMsg = ref("")  
const showEmoji = ref(false)
const srcImgList = ref([])
const chatContent = ref(null)
const filesize = ref('')
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
  console.log(params);
  await getChatMsg(params).then((res) => {
    chatList.value = res;
    if(!chatList.value){
      chatList.value = []
    }
      chatList.value.forEach(async (item) => {
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
            console.log(file);
            let reader = new FileReader()
            let fileNameTemp = item.fileName
            reader.onloadend = (es)=>{
                item.msg = es.target.result
                item.fileName = fileNameTemp
                console.log(item.msg)
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

  chatList.value.push(msgList);
  console.log(msgList);
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
  for(let i = 0; i < chatList.length; ++i){
    console.log(chatlist.value[i].uid);

  }
  let userInfo = await userstore.getUser()
  return {
    headImg: userInfo.userimg,
    name: userInfo.username,
    uid: userInfo.userid,
    time: formatTime(new Date()),
  }
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
// 发送消息
const sendText = async () => {
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
  console.log(files)
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
    console.log(chatfiles);
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
// 发送文件
const sendFile = async (e) => { 
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
  const formData = new FormData()
  formData.append('e', files)
  upload(formData)
  if(files.size>1024*1024*100){
    ElNotification({
        type: 'warning',
        title: '文件过大🎢',
        message: '选择上传该文件的压缩包✨'
    })
    return ;
  }
  filesize.value =  calsize(files.size);
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
    sendMsg(chatFile);
    chatFile.size = filesize.value
    chatFile.fileName = files.name
    filenametemp = files.name
    uploadMsg(chatFile)
    //发送socket过来
    sendSocket(chatFile)
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
// 发送语音
const telephone = () => {
  ElMessage.info("语音功能开发中")
}
// 发送视频
const video = () => {
  ElMessage.info("视频功能开发中")
}
// 文件点击后下载
const clickfile = async (item)=>{
  axios.get(baseUrl + "/api/downloadfile", {
    params: {
      fileName: item.fileName,
      extend: item.extend
    },
    responseType: "arraybuffer",
    onDownloadProgress(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      console.log(percentCompleted);
    }
  }).then(res=>new Blob([res], {type: item.extend}))
  .then(blob=>{
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.download = item.fileName
    a.href = url 
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })

}
const init = ()=>{
  let userId = userstore.userid
  if(typeof (WebSocket) == "undefined"){
    console.log("您的浏览器不支持WebSocket")
  }
  else{
    let socketUrl = "ws://localhost:8080/imserver/" + userId
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
      console.log("收到数据====" + msg.data)
      let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
      if (data.users) {  // 获取在线人员信息
        // _this.users = data.users.filter(user => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
        console.log('等待开发');
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        //  // {"from": "zhang", "text": "hello"}
        if (data.from === props.friendInfo.id) {
          let cur = JSON.parse(data.text)
          if(cur.chatType === 1 && cur.imgType === 2){
            srcImgList.value.push(cur.msg)
            sendMsg(cur)

          }
          // 如果接受到文件需要到数据库中下载
          else if(cur.chatType === 2){
            axios.get(baseUrl + "/api/downloadfile", {
            params: {
              fileName: cur.fileName,
              extend: cur.extend
            },
            responseType: "arraybuffer"
            })
            .then(res=>new Blob([res], {type: cur.extend}))
            .then(blob=> new File([blob], cur.fileName))
            .then(file=>{
              cur.msg = file
              let reader = new FileReader()
              let fileNameTemp = cur.fileName
              reader.onloadend = (es)=>{
                  cur.msg = es.target.result
                  cur.fileName = fileNameTemp
              }
              reader.readAsDataURL(file)
            }).then(()=>{
              setTimeout(()=>{
                sendMsg(cur)

              }, 500)
            })
          }
          else sendMsg(cur)          
        }
      }
    }
    socket.onclose = function () {
      console.log('websocket关闭')
    }
    socket.onerror = function () {
      console.log('websocket发送错误');
    }
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
        <HeadPortrait :imgUrl="props.friendInfo.headImg" :status="props.friendInfo.status"></HeadPortrait>
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
        <div class="chat-wrapper " v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== userstore.userid">
            <div class="chat-text " v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1" >
              
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
            <div class="chat-img" v-if="item.chatType == 2" >
              <div class="word-file">
                <FileCard
                  :fileType="item.fileType"
                  :file="item.msg"
                  :fileName="item.fileName"
                  :size="item.size"
                  @click="clickfile(item)"
                ></FileCard>
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
            <div class="chat-img animate__animated animate__slideInUp" v-if="item.chatType == 2"  id="filecards">
              <div class="word-file">
                <FileCard
                 
                  :fileType="item.fileType"
                  :fileName="item.fileName"
                  :size="item.size"
                  @click="clickfile(item)"
                ></FileCard>
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