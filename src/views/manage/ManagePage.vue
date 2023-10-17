
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

import { ref , watch, onMounted, defineProps, defineExpose, defineEmits} from 'vue'
const props = defineProps({
  come: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['closeDialog'])

const before = ref('1')
const switchvalue = ref(false)
const firstin = (id)=>{
  setTimeout(()=>{
    before.id = id
    change(id)
  }, 300)
}
const change = (id)=>{
  
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
  console.log(id);
  setTimeout(()=>{
    let underline = document.getElementsByClassName('underline')[0].style
    underline.left = (id - 1) * 19.2 + "%"
  }, 500)

}
const close = () => {
  emits('closeDialog')
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
  console.log(id);
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
      .bottom{
        position: relative;
        background-color: red;
        width: 30vh;
        height: 30vw;
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