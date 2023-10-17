
<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  SwitchButton,
  Search,
  User,
  CirclePlus,
  Delete,
  Minus,
  Sunrise,
  MoonNight,
  FullScreen,
  CloseBold 
} from '@element-plus/icons-vue'
import HeadCard from '@/components/HeadCard.vue'
// import HeadCard from "../components/HeadCard.vue";
import { ref , watch, onMounted, defineProps, defineExpose, defineEmits} from 'vue'
import {getFriend} from '@/api/getData.js'
import { ElMessage } from 'element-plus';
const props = defineProps({
  come: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits(['closeDialog'])

const before = ref('1')
const switchvalue = ref(false)
const nowvalue = ref('')
const userid = ref('')
// const 
const username = ref('')
const userdetail = ref('')
const userimg = ref('')
const searchvalue = ref('')
const personlist = ref('')
const showhead = ref('')
const textshow = ref('确认')
const firstin = (id)=>{
  setTimeout(()=>{
    before.id = id
    change(id)
  }, 300)
}
// tab交换时刻
const change = (id)=>{
  nowvalue.value = id
  username.value = ''
  userdetail.value = ''
  userid.value = ''
  userimg.value = 'src/assets/img/head_portrait.jpg'

  console.log(nowvalue.value);
  let underline = document.getElementsByClassName('underline')[0].style
  let iconselect = document.getElementsByClassName('icon_style')[id - 1].style
  let iconselectb = document.getElementsByClassName('icon_style')[before.value - 1].style
  if(id != before.value){
    iconselectb.opacity = 1
    iconselectb.filter = ""
  }
  underline.left = (id - 1) * 19.2 + "%"
  iconselect.opacity = 1
  iconselect.filter = "drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff)"
  before.value = id
  textshowfuntion(id)

}
const textshowfuntion = (id)=>{
  if(id === 1){
    textshow.value = '保存'
  }
  else if(id === 2){
    textshow.value = '添加'
  }
  else if(id === 3){
    textshow.value = '删除'
  }
  else{
    textshow.value = '搜索'
  }
}
const uiswitch = ()=>{
  // document.getElementsByClassName('switch')[0].style.opacity = switchvalue.value ? 1 : 0
  let contentcolor =  document.getElementsByClassName('content')[0].style
  let buttomnav = document.getElementsByClassName('bottomnav')[0].style
  let iconstyle = document.getElementsByClassName('header')[0].style
  let underlinebefore = document.getElementsByClassName('underline', '::before')[0].style
  let underlineafter = document.getElementsByClassName('underline', '::after')[0].style
  // let 
  console.log(contentcolor);
  console.log(buttomnav);
  if(switchvalue.value === false){
    contentcolor.background = '#272A37'
    buttomnav.background = '#272A37'
    buttomnav.color = '#fff'
    iconstyle.color= '#fff'
  }
  else{
    contentcolor.background = '#E4E4E8'
    buttomnav.background = '#E4E4E8'
    buttomnav.color = '#000'
    iconstyle.color= '#000'
  } 
}
const firstins = (id) => {
  // console.log(id);
  setTimeout(()=>{
    let underline = document.getElementsByClassName('underline')[0].style
    underline.left = (id - 1) * 19.2 + "%"
  }, 500)

}
const close = () => {
  emits('closeDialog')
}
const searchfriend = async ()=>{
  // if(i)
  console.log(searchvalue.value);
  if(searchvalue.value.trim == ''){
    ElMessage('请输入搜索内容')
  }
  else{
    // new URL("@/assets/img/head_portrait7.jpg", import.meta.url).href
    // 获取到数据填入到里面 
    personlist.value = await getFriend()
    let isfind = false
    // console.log(object);
    for(let i = 0; i < personlist.value.length; ++i){
      if(personlist.value[i].id === searchvalue.value){
        username.value= personlist.value[i].name
        userdetail.value = personlist.value[i].detail
        userid.value = personlist.value[i].id
        userimg.value = personlist.value[i].headImg
        // const url =  userimg.value
        // const path = url.split('/').slice(-4).join('/');
        // userimg.value = path

        // console.log(userimg);
        isfind = true
      }

      
      // console.log(path)

    }
    if(isfind === false) {
      ElMessage.warning('未能找到该用户')
      username.value = ''
      userdetail.value = ''
      userid.value = ''
      userimg.value = 'src/assets/img/head_portrait.jpg'
    }
  }
  searchvalue.value = ''
  // 检测id的类型

}

const changehead = (img) => {

  userimg.value = img
  showhead.value = false

}
const save = ()=>{
  ElMessage.success('保存成功')
}
// 刚刚进来的时候调用一下这里 ,可以用暴露出去的方法来实现
watch(
  // ()=>props.isshow
  ()=>switchvalue,
  ()=>uiswitch(),
  {deep: true}

)
// watch(
//   // ()=>dialog
//   ()=> props.come,
//   ()=>firstins,
//   {deep: true, immediate: true}
// )
onMounted(()=>{
  console.log('hello world');

  const id = props.come
  textshow.value =
  nowvalue.value = id
  console.log(id);
  textshowfuntion(id)
  userimg.value = 'src/assets/img/head_portrait.jpg'
  let underline = document.getElementsByClassName('underline')[0].style
  underline.left = (id - 1) * 19.2 + "%"
})
</script>



<template>
    <div class="background">
        <div class="content">
          <div class="header"> 
              <el-switch 
              v-model="switchvalue" 
              size="large" 
              class="switch-button"
              :active-action-icon="Sunrise"
              :inactive-action-icon="MoonNight"

            />
            <el-icon class="iconstyle" :size="30" @click="close" > <Minus/> </el-icon>

          </div>
          <div class="bottom">
            <div class="bottom-up">
              <div class="avatar">
                <!-- <img/ > -->
                <img style="border-radius: 15px;" :src="userimg" />
              </div>
              
              <div class="inputmesg">
                <div class="inputitem"> <span style="padding-right: 4%;">userid</span>  <input readonly="true" class="realinput" type="text"              v-model="userid"     placeholder="输入userid"> </div>
                <div class="inputitem"> <span style="padding-right: 4%;">用户名</span>  <input :readonly="nowvalue !== 1" class="realinput" type="text"  v-model="username"    placeholder="输入用户名"> </div>
                <div class="inputitem"> <span style="padding-right: 4%;">详细资料</span>  <input :readonly="nowvalue !== 1" class="realinput" type="text" v-model="userdetail" placeholder="输入详细资料"> </div>               
                <el-button
                  class="button three-d"
                    auto-insert-space
                    @click="save"
                  >
                  <p class="font">{{textshow}}</p>
                  
                  </el-button>
              </div>
            </div>
            <div  class="bottom-down">
            <Transition>
              <div v-if="nowvalue !== 1" class="search-box">
                  <input class="search-txt" type="text" v-model="searchvalue" placeholder="请输入userid" />
                  <a class="search-btn">
                      <i class="fas fa-search"><el-icon @click="searchfriend" :size="20"><Search /></el-icon></i>
                  </a>
              </div>
              <div v-else >
                <el-button
                  @click="showhead = true"
                  class="button three-d"
                    auto-insert-space
                  >
                  <p class="font">更换头像</p>
                  
                  </el-button>
              </div>
            </Transition>
            <div v-if="showhead">
              <HeadCard
                
                @sendhead="changehead"
                @closehead="clickhead"
              >
              </HeadCard>
            </div>

            </div>

          </div>
        </div>
        <el-icon></el-icon>
        <div class="bottomnav">
          <div class="icon_style" @click="change(1)" ><el-icon  style="left: 10%; top: 10%"><User /></el-icon></div>
          <div class="icon_style" @click="change(2)" ><el-icon  style="left: 10%; top: 10%"><CirclePlus /></el-icon></div>
          <div class="icon_style" @click="change(3)" ><el-icon  style="left: 10%; top: 10%"><Delete /></el-icon></div>
          <div class="icon_style" @click="change(4)" ><el-icon  style="left: 10%; top: 10%"><Search/></el-icon></div>
          <div class="underline"></div>
        </div>
    </div>   
</template>

<style lang="scss" scoped>
.background{
  z-index: 1;
  background-color: rgba(13, 14, 19, 0.5);
  opacity: 0.3s;
  // background-image: linear-gradient(to left, #6a4988, #1d2756 100%);
  height: 100vh;
  position: fixed;
  // transform: translate(-50%, -50%);
  width: 100vw;
  display: flex;
  
  flex-direction: column;
  .content {
    // display: flex; 

    position: relative;
    transition: 1s;
    // justify-content: center;
    opacity: 0.8;
    // box-shadow: 1px, 1px, 5px, 5px rgba(190, 42, 42, 1.2);
    box-shadow:0px 0px 25px 3px rgba(135, 143, 158, 3.1);
    z-index: 2002;
    border-bottom: 3px solid rgba(255, 255, 255, .2);
    transform: translate(-50%, -50%);
    top: 41%;
    left: 50%;
    width: 40%;
    height: 70%;
    padding-top: 1.5%;
    padding-bottom: 2%;
    border-radius: 30px;
    // background-color: #336DF4;
    background-color: #272A37;
    .header {
      cursor: pointer;
      color : white;
      display: flex;
      position: relative;
      justify-content: space-between;
      padding-left: 5%;
      padding-right: 5%;
      .iconstyle{
        size: 30
      }
      .iconstyle:hover {
        opacity: 1;
        filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
      }
      .switch-button {
          --el-switch-on-color: #323644;
          --el-switch-off-color: #4c5e5f;
          --el-switch-size: 50px;
      }

    }
    .bottom{
        position: relative;
        // background-color: red;
        transition: 0.5s;
        display: flex;
        flex-direction: column;
        width: 95%;
        padding-left: 2.5%;
        padding-top: 2.5%;
        padding-right: 2.5%;
        height: 100%;
        gap: 3%;
        .bottom-up{
          position: relative;
          background-color: #757889;
          width: 100%;
          height: 70%;
          display: flex;
          border-radius: 10px;
          .avatar{
            box-shadow: 0, 0, 10px, 0, green;
            // overflow: hidden;
            position: relative;
            padding-top: 3%;
            padding-right: 7%;
            padding-left: 7%;
            width: 40%;
            height: 68%;
            // background-color: #434743;
          }
          .inputmesg{
            display: flex;
            flex-direction: column;
            position: relative;
            width: 40%;
            padding-right: 2%;
            padding-left: 4%;
            padding-top: 5%;
            gap: 20%;
            // border: 0px;

            height: 70%;
            // background-color: red;
            .inputitem{
              position: relative;
              font-size: small;
              // padding-top: 3%;
              color: #fff;
              font-weight: bold;
              font-size: medium;
              height: 15%;
              width: 100%;
              gap: 40%;
              // background-color: #323644;
              // border-radius: 15px;
              // border: 0px;
              .realinput{
                position: relative;
                background-color: #323644;
                padding-left: 5%;
                height: 80%;
                border-radius: 15px;
                border: 0px;
                color: #fff;
                font-weight: bold;
                outline: none;
                box-shadow: 0px 0px 5px 0px #000;
              }
            }
          
            .button {
              position: relative;
              width: 50%;
              height: 15%;
              // height: 5%;
              // left:30%;
              // top: 100%;
              top: 5%;
              left: 40%;
              transform: translate(-50%, -50%);
            // padding-top: 20%;
            // padding-top: ;
            // transform: translate(-50%, -50%);
            // background-image: linear-gradient(to right, #e1eeea, #d3e2eb);
            // 
            border-width: 0;
            background-color: #2f3640;
            // border
            border-radius: 30px;
            // 字体
            .font {
              // font-
              color:white;
            }
          }
            .three-d {
              color: #fff;
              background-color: #2f3640;
              text-shadow: -1px 1px 1px rgb(47 54 64),
                          -1px 1px 1px rgb(47 54 64),
                          -1px 1px 1px rgb(47 54 64),
                          -1px 1px 1px rgb(47 54 64),
                          -1px 1px 1px rgb(47 54 64),
                          -1px 1px 1px rgb(47 54 64);
              box-shadow: 0px 5px 0px 0px #2f3640;
              transition: all .2s;
              box-shadow: 0,0,10px, 0, #2f3640;
            }
            
            .three-d:hover {
                background-color: #444d5b;
            }

            .three-d:active {
                // transform: translate(0,4px);
                box-shadow: 0px 1px 0px 0px #2f3640;
            }
          }
        }
        .v-enter-active,
        .v-leave-active {
          transition: opacity 1s ease;
        //   animation: zoomIn;
        //   animation-duration: 1s;
        }

        .v-enter-from,
        .v-leave-to {
          opacity: 0;
        }
        .bottom-down{
          // padding-top: 10
          position: relative;
          background-color: #757889;
          width: 100%;
          height: 20%;
          border-radius: 10px;
          .search-box {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: #2f3640;
              height: 40px;
              border-radius: 40px;
              padding: 10px;
              width: 60%;
              padding-left: 5%;
              box-shadow: 0px 0px 5px 0px #000;
              // .search-input {
          }
          .search-btn {
              cursor: pointer;
              color: #e84118;
              float: right;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: #2f3640;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: 0.4s;
              text-decoration: none;
          }
          .search-txt {
              border: none;
              background: none;
              outline: none;
              float: left;
              padding: 0;
              color: white;
              font-size: 16px;
              transition: 0.4s;
              line-height: 40px;
              width: 240px;
          }
          .search-box:hover > .search-txt {
              width: 240px;
              // padding: 0 6px;
          }
          .search-box:hover > .search-btn {
              background: white;
          }
          .specalforicon{
              padding-top: 0.5%;
              color: #C3C7D1;
          }
          .specalforicon:hover{
              // padding-top: 0.5%;
              color: #336DF4;
          }
          .three-d {
            color: #fff;
            background-color: #AF5F48;
            text-shadow: -1px 1px 1px rgb(47 54 64),
                        -1px 1px 1px rgb(47 54 64),
                        -1px 1px 1px rgb(47 54 64),
                        -1px 1px 1px rgb(47 54 64),
                        -1px 1px 1px rgb(47 54 64),
                        -1px 1px 1px rgb(47 54 64);
            box-shadow: 0px 5px 0px 0px #2f3640;
            transition: all .2s;
            box-shadow: 0,0,10px, 0, #2f3640;
          }
          
          .three-d:hover {
              background-color: #444d5b;
          }

          .three-d:active {
              // transform: translate(0,4px);
              box-shadow: 0px 1px 0px 0px #2f3640;
          }
          .button {
            position: absolute;
            width: 25%;
            height: 50%;
            // height: 5%;
            // left:30%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            // padding-top: 20%;
            // padding-top: ;
            // transform: translate(-50%, -50%);
            // background-image: linear-gradient(to right, #e1eeea, #d3e2eb);
            // 
            border-width: 0;
            background-color: #2f3640;
            // border
            border-radius: 30px;
            // 字体
            .font {
              // font-
              color:white;
            }
          }
        }
      }
  }
  .bottomnav{
    color: #fff;
    border-bottom: 3px solid rgba(255, 255, 255, .2);
    box-shadow:0px 0px 25px 3px rgba(135, 143, 158, 3.1);
    background-color: #272A37;
    display : flex;
    gap : 8%;
    opacity: 0.8;
    border-radius: 30px;
    padding-top: 1%;
    padding-left: 8%;
    width: 40%;
    height: 10%;
    position: relative;
    transform: translate(-50%, -50%);
    top: 11%;
    left: 50%;
    transition: 1s;
    .icon_style{
      cursor:pointer;
      font-size: 200%;
      height: 80%;
      width: 15%;
      .innerelicon{
        size:30
      }
    }

    .icon_style:hover{
      opacity: 1;
      filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
    }
    .underline {
      position: absolute;
      left: 0; // 19.2 %     distance
      bottom: 0;
      width: 40.3%;
      height: 5px;
      transition: .5s;
    }

    .underline::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      border-radius: 4px;
      height: 100%;
      background-color: #fff;
      filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 30px #fff) drop-shadow(0 0 50px #fff);
    }

    .underline::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      border-radius: 4px;
      height: 100%;
      background-color: #fff;
      filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff) drop-shadow(0 0 30px #fff) drop-shadow(0 0 50px #fff) blur(5px);
    }
  }

}
    
</style>