<script setup>
import { animation} from '../../../utils/util.js'
import { getChatMsg } from "../../../api/getData.js";
// import HeadPortrait from "@/components/HeadPortrait";
// import Emoji from "@/components/Emoji";
// import FileCard from "@/components/FileCard.vue";
import HeadPortrait from "../../../components/HeadPortrait.vue";
import Emoji from "../../../components/Emoji.vue";
import FileCard from "../../../components/FileCard.vue";
import { ref, onMounted, watch ,defineProps, defineEmits, nextTick, getCurrentInstance} from 'vue'

import { VideoCamera,Phone, Document, PictureRounded } from '@element-plus/icons-vue';
// 声明变量
const chatList = ref([])
const inputMsg = ref("")  
const showEmoji = ref(false)
const srcImgList = ref([])
const chatContent = ref(null)
// const instance = getCurrentInstance()
// 父组件传递过来的变量
const props = defineProps({
  friendInfo: Object,
  default: () => ({})
})
// 发送消息给父组件
const emit = defineEmits(['personCardSort'])
// methods
// 获取聊天记录
const getFriendChatMsg = () => {
  let params = {
    frinedId: props.friendInfo.id,
  };
  getChatMsg(params).then((res) => {
    chatList.value = res;
    chatList.value.forEach((item) => {
      if (item.chatType == 2 && item.extend.imgType == 2) {
        srcImgList.value.push(item.msg);
      }
    });
    scrollBottom();

  });
}
// 发送信息
const sendMsg = (msgList) => {
  chatList.value.push(msgList);
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
// 关闭标签页
const clickEmoji = () => {
  showEmoji.value = !showEmoji.value;
}
// 发送消息
const sendText = () => {
  if (inputMsg.value) {
    let chatMsg = {
    // 就是本人的信息

      headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
      name: "大毛是小白",
      time: "09：12 AM",
      msg: inputMsg.value,
      chatType: 0, //信息类型，0文字，1图片
      uid: "1001", //uid
    };
    sendMsg(chatMsg);

    // 发送给父组件的消息
    emit('personCardSort',props.friendInfo.id)
    inputMsg.value = "";
  } else {
    ElMessage.warning("消息不能为空")
  }
}
// 发送表情
const sendEmoji = (msg) => {
  let chatEmoji = {
      headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
      name: "大毛是小白",
      time: "09：12 AM",
      msg: msg,
      chatType: 1, //信息类型，0文字，1图片
      extend: {
        imgType: 1, //(1表情，2本地图片)
      },
      uid: "1001",
    };
    sendMsg(chatEmoji);
    clickEmoji();

}
// 发送本地图片
const sendImg = (e) => {
  // console.log(e.target.files);
  let chatfiles = {
    headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "",
    chatType: 1, //信息类型，0文字，1图片, 2文件
    extend: {
      imgType: 2, //(1表情，2本地图片)
    },
    uid: "1001",
  };
  let files = e.target.files[0];
  if (!e || !window.FileReader) return;
  let reader = new FileReader();
  reader.readAsDataURL(files);
  reader.onloadend = (es) => {
    console.log(reader.result);
    chatfiles.msg = es.target.result; //赋值
    srcImgList.value.push(chatfiles.msg);
  };
  console.log(chatfiles);
  setTimeout(()=>{
    sendMsg(chatfiles);
  }, 100)
  e.target.files = null;
}
// 发送文件
const sendFile = (e) => { 
  let chatFile = {
    headImg: new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
    name: "大毛是小白",
    time: "09：12 AM",
    msg: "",
    chatType: 2, //信息类型，0文字，1图片, 2文件
    extend: {
      fileType: "", //(1word，2excel，3ppt，4pdf，5zpi, 6txt)
    },
    uid: "1001",
  };
  let files = e.target.files[0]; //图片文件名
  chatFile.msg = files;
  // console.log(files);
  if (files) {
    switch (files.type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        chatFile.extend.fileType = 1;
        break;
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        chatFile.extend.fileType = 2;
        break;
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        chatFile.extend.fileType = 3;
        break;
      case "application/pdf":
        chatFile.extend.fileType = 4;
        break;
      case "application/zip":
      case "application/x-zip-compressed":
        chatFile.extend.fileType = 5;
        break;
      case "text/plain":
        chatFile.extend.fileType = 6;
        break;
      default:
        chatFile.extend.fileType = 0;
    }
    sendMsg(chatFile);
    e.target.files = null;
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
// Mounted时期
onMounted(()=>{

  getFriendChatMsg()
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
        <HeadPortrait :imgUrl="props.friendInfo.headImg"></HeadPortrait>
      </div>
      <div class="info-detail">
        <div class="name">{{ props.friendInfo.name }}</div>
        <div class="detail">{{ props.friendInfo.detail }}</div>
      </div>
      <div class="other-fun">
        <span  @click="video"> 
          <el-icon  class="other_fun_icon"><VideoCamera /></el-icon> 
        </span>
        <span @click="telephone">
          <el-icon class="other_fun_icon"><Phone /></el-icon>
        </span>
        <label for="docFile">
          <el-icon class="other_fun_icon"><Document /></el-icon>
        </label>
        <label for="imgFile">
          <el-icon class="other_fun_icon"><PictureRounded /></el-icon>
        </label>
        <input
          type="file"
          name=""
          id="imgFile"
          @change="sendImg"
          accept="image/*"
        />
        <input
          type="file"
          name=""
          id="docFile"
          @change="sendFile"
          accept="application/*,text/*"
        />
        <!-- accept="application/*" -->
      </div>
    </div>
    <div class="botoom">
      <div class="chat-content" ref="chatContent">
        <div class="chat-wrapper" v-for="item in chatList" :key="item.id">
          <div class="chat-friend" v-if="item.uid !== '1001'">
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1" >
              
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image :src="item.msg" :preview-src-list="srcImgList" v-else>
              </el-image>
            </div>
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
              <img :src="item.headImg" alt="" />
              <span>{{ item.name }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="chat-me" v-else>
            <div class="chat-text" v-if="item.chatType == 0">
              {{ item.msg }}
            </div>
            <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
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
            <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div>
            <div class="info-time">
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
        <div class="emoji-content">
          <Emoji
            v-show="showEmoji"
            @sendEmoji="sendEmoji"
            @closeEmoji="clickEmoji"
          ></Emoji>
        </div>
        <input class="inputs" v-model="inputMsg" @keyup.enter="sendText" />
        <div class="send boxinput" @click="sendText">
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

      // }
      input {
        display: none;
      }
      .other_fun_icon{
        color:#757889;
        margin-left: 30px;
        cursor: pointer;
      }
      .other_fun_icon:hover{
        color:#1D90F5;
        
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
        &:hover {
          background-color: rgb(46, 49, 61);
          border: 1px solid rgb(71, 73, 82);
        }
      }

      .inputs {
        width: 90%;
        height: 50px;
        background-color: rgb(66, 70, 86);
        border-radius: 15px;
        border: 2px solid rgb(34, 135, 225);
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