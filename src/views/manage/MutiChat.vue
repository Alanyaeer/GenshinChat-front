<script setup>
import HeadCard from '@/components/HeadCard.vue'
import HeadPortrait from "@/components/HeadPortrait.vue";
import { ElIcon, ElNotification} from 'element-plus';
import { defineEmits ,watch, defineProps, ref, onMounted, computed} from 'vue';
import {Delete, Minus,Search} from '@element-plus/icons-vue'
const props = defineProps({
    friends: {
        type: Array
    }
})
const emit = defineEmits('closeMuti')
const current = ref('')
const findPerson = ref({})
const isActive = () => {
  current.value = props.pcCurrent
}
const searchvalue = ref('')
const beingclick = ref([])
watch(
  ()=> props.pcCurrent,
  ()=> isActive(),
  {immediate: true, deep: true}
)
const personInfo = ref([])
const calPersonCnt = computed(
    ()=>{
        return beingclick.value.filter((item)=>(item === true)).length
    }
)
// 测试使用 ？？ 
onMounted(()=>{
    personInfo.value = []
    personInfo.value = props.friends
    if(personInfo.value.length != 0)
    findPerson.value = personInfo.value[personInfo.value.length - 1]
    // beingclick.value = new Array(personInfo.value.length)
    if(!beingclick.value) beingclick.value = []
    for(let i = 0; i < personInfo.value.length; ++i){
        beingclick.value.push(false)
    }
})
const close = ()=>{
    emit('closeMuti')
    console.log('关闭弹窗');
}
const clickperson = (index)=>{
    const person = document.getElementsByClassName("person-card")[index].style
    console.log(beingclick.value[index]);
    if(beingclick.value[index] === false){
    // console.log(person);
        person.backgroundColor="#1d90f5"
        person.boxShadow="0px 0px 10px 0px rgba(0, 136, 255)"
        beingclick.value[index] = true
    }
    else{
        person.backgroundColor="rgb(50, 54, 68)"
        person.boxShadow=""
        beingclick.value[index] = false
    }   
}
const findAddFriend = ()=>{
    for(let i = 0; i < personInfo.value.length; ++i){
        if(personInfo.value[i].id === findPerson.value.id){
            clickperson(i)
            break
        }
    }
}
const searchfriend = () => {
    console.log(searchvalue.value);
    let find = false
    for(let i = 0; i < personInfo.value.length; ++i){
        if(personInfo.value[i].id === searchvalue.value){
            findPerson.value = personInfo.value[i]
            find = true
            break
        }
    }
    if(find !== true){
        ElNotification({
            type: 'warning',
            title: '寻找好友🤓',
            message: '未能找到该用户🥺'
        })
    }
    else{
        ElNotification({
            type: 'success',
            title: '寻找好友🤓',
            message: '找到该用户😜'
        })
    }
    searchvalue.value = ''
}       
</script>
<template>
<div class="bg">
    <div class="container">
        <div class="top">
            <div style="position: relative; left: 100%; top: 10%;">
                <!-- <ElIcon></ElIcon> -->
                <div style="color: white; cursor: pointer;"  @click="close"><el-icon size="30" ><Minus /></el-icon></div>
            </div>
        </div>
            <div style="display: flex;">
                <div class="person-wrapper">
                    <div v-for="(item, index) in personInfo" :key="item.id">
                        <div class="person-card" @click="clickperson(index)">
                            <div class="info">
                                <HeadPortrait :imgUrl="item.headImg" :status="item.status"></HeadPortrait>
                                <div class="info-detail">
                                    <div class="name">{{ item.name }}</div>
                                    <div class="detail">{{ item.detail }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-display">
                    <div class="person-card" @click="findAddFriend"  v-if="findPerson">
                        <div class="info">
                            <HeadPortrait :imgUrl="findPerson.headImg" :status="findPerson.status"></HeadPortrait>
                            <div class="info-detail">
                                <div class="name">{{ findPerson.name }}</div>
                                <div class="detail">{{ findPerson.detail }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="info-font">
                        <input class="groupname" placeholder="请输入群名称"/>
                        <span style="color: white; font-weight: bold; font-size:medium;">当前已经添加了: {{calPersonCnt}}人</span>
                    </div>
                    <div class="buttonmy">
                        <el-button type="primary">
                            保存群聊
                        </el-button>
                    </div>
                    <div class="search-box"> 
                        <input class="search-txt" type="text" v-model="searchvalue" placeholder="请输入userid" />
                        <a class="search-btn">
                            <i class="fas fa-search"><el-icon @click="searchfriend" :size="20"><Search /></el-icon></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
    
</template>

<style lang="scss" scoped>
    .bg{
        height: 100vh;
        z-index: 1;
        background-color: rgba(13, 14, 19, 0.5);
        opacity: 0.3s;
        width : 100vw;
        position: fixed;
        .container{
            position: relative;
            top: 50%;
            left: 50%;
            border-radius: 15px;
            height: 80%;
            // padding: 5%;
            width: 40%;
            transform: translate(-50%, -50%);    
            // padding-top: 2%;
            padding-left: 2%;
            background-color: #272A37;
            transition: 1s;
            opacity: 0.8;
            box-shadow: 3px 3px 8px  rgba(0, 0, 0, 2.1),
                        -1px -1px 3px rgba(255, 255, 255, 2.1),
                        inset 2px 2px 10px 0px rgba(255, 255, 255, 2.1),
                        inset -2px -2px 15px 0px rgba(0, 0, 0, 2.1);
            .top{
                width: 90%;
                height: 8%;
            }
            .right-display{
                .person-card {
                width: 250px;
                height: 80px;
                top: 30%;
                left: 5%;
                border-radius: 10px;
                background-color: rgb(50, 54, 68);
                position: absolute;
                margin: 30px 0px;
                // gap: 10px;
                // margin-top: 25px;
                cursor: pointer;
                .info {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 90%;
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    display: flex;
                    .info-detail {
                    margin-top: 5px;
                    margin-left: 20px;
                    .name {
                        color: #fff;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-bottom: 5px;
                    }
                    .detail {
                        color: #5c6675;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 12px;
                    }
                    }
                }
                &:hover {
                    background-color: #1d90f5 !important;
                    transition: 0.3s;
                    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255) !important;
                    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
                    .info {
                    .info-detail {
                        .detail {
                        color: #fff;
                        }
                    }
                    }
                }
            }
                // background-color: #1d90f5;
                position: absolute;
                display: flex;
                flex-direction: column;
                width: 45%;
                height: 80%;
                left: 50%;
                top: 50%;
                transform: translate(0, -50%);
                .info-font{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    top: 10%;
                    gap: 20px;
                    .groupname{
                        // width: 20[];
                        height: 30px;
                        background:bottom;
                        border-radius: 15px;
                        color: white;
                    }
                }
                .buttonmy{
                    width: 80%;
                    height: 15%;
                    display: flex;
                    gap: 5%;
                    padding-left: 10%;
                    top: 90%;
                    cursor: pointer;
                    left: 70%;
                    border-radius: 15px;
                    position: absolute;
                    transform: translate(-50%, -50%);                  
                }
                .search-box {
              position: absolute;
              top: 70%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: #2f3640;
              height: 40px;
              border-radius: 40px;
              padding: 10px;
              width: 100%;
              padding-left: 5%;
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
            .person-wrapper{
                &::-webkit-scrollbar {
                    width: 0; /* Safari,Chrome 隐藏滚动条 */
                    height: 0; /* Safari,Chrome 隐藏滚动条 */
                    display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
                position: absolute;
                box-sizing: border-box;
                overflow-y: scroll;
                width: 40%;
                height: 80%;
                .person-card {
                width: 250px;
                height: 80px;
                border-radius: 10px;
                background-color: rgb(50, 54, 68);
                position: relative;
                margin: 30px 0px;
                // gap: 10px;
                // margin-top: 25px;
                cursor: pointer;
                .info {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 90%;
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                    display: flex;
                    .info-detail {
                    margin-top: 5px;
                    margin-left: 20px;
                    .name {
                        color: #fff;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        margin-bottom: 5px;
                    }
                    .detail {
                        color: #5c6675;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 12px;
                    }
                    }
                }
                &:hover {
                    background-color: #1d90f5 !important;
                    transition: 0.3s;
                    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255) !important;
                    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
                    .info {
                    .info-detail {
                        .detail {
                        color: #fff;
                        }
                    }
                    }
                }
                }
                .activeCard {
                    background-color: #1d90f5;
                    transition: 0.3s;
                    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
                    .info {
                    .info-detail {
                        .detail {
                        color: #fff;
                        }
                    }
                    }
                }
            }
            
        }
    }


</style>

