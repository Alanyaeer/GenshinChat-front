<script setup>
import { ref, onMounted, watch, computed} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  SwitchButton,
  Search,
  CirclePlus,
  FullScreen,
  CloseBold, 
  User, 
  Delete,
  Plus 
} from '@element-plus/icons-vue'

// import { QuillEditor } from '@vueup/vue-quill'
// import {CommPage} from './components/CommPage.vue'
import avatar from '@/assets/img/head_portrait4.jpg'
import { useRouter } from 'vue-router'
// 还缺少一个请求函数
import { getFriend } from '@/api/getData'
// 这是保存用户信息列表的
import {  updatefriend ,logoutuser } from '@/api/apiuser.js'
import  PersonCart  from '@/components/PersonCart.vue'
import chatwindow from './components/chatwindow.vue'
import { useUserStore } from  '@/stores'
import ManagePage from '../manage/ManagePage.vue'
const router = useRouter()
// import { router } from 'vue-router';
const iconsize = ref(32)
const isCollapse = ref(true)   
const leftsize = ref(1)
const middlesize = ref(5)
const rightsize = ref(18)
const avatarUrl = ref('')
const ismoving = ref(false)
const personList = ref([])
const pcCurrent = ref('')
const isShowChatWindow = ref(false)
const personInfo = ref('')
const chatWindowInfo = ref('')
const isshowDialog = ref(false)
const userInfo = ref('')
const typeDialog = ref(1)
const userStore = useUserStore()
const onperson = ref(0)
// 判断消息的来源
const direction = ref(false)


const logout = async () => {
    const ids = {
        id: userStore.userid
    }
    const id = await logoutuser(ids)
    if(id === 1){
        ElMessage.success('退出登录')
    }
    userStore.removeId()

    router.push('/login')
}
const clickPerson = (info) => {
    pcCurrent.value = info.id
    isShowChatWindow.value = true
    personInfo.value = info
    personCardSort(info.id)
    // console.log(personInfo.value);
    chatWindowInfo.value = info
    // 
    // 滚条属性存在的话 
    if(info.pos){
        // 移动到对应的位置
    }   
}
const Fullexpend = () => {
    ismoving.value = true
    isCollapse.value = !isCollapse.value
    if(isCollapse.value === false){
        middlesize.value = 3

        leftsize.value = 3
    }
    else {
        leftsize.value = 1
        setTimeout(()=>{
            middlesize.value = 5

        }, 500)

    }
}
// TODO, 记得退出的时候要记录当前的数组顺寻
const personCardSort = (id)=>{
    const ids = {
        id: id
    }
    updatefriend(ids)
    if(id !== personList.value[0].id){
        let nowPersonInfo = {}
        let isSort = false
        for(let i = 1; i < personList.value.length; i++){
            if(id === personList.value[i].id){
                nowPersonInfo = personList.value[i]
            // 扔掉这个元素
                personList.value.splice(i, 1)
                isSort = true
                break
            }

        }
        // 在首部添加这个元素
        if(isSort === true){
            personList.value.unshift(nowPersonInfo)
            document.getElementsByClassName('person-cards-wrapper')[0].scrollTo(0, 'smooth')
        }
    }
}
const closeDialog = async() => {
    const user = await userStore.getUser()
    let id = {
        id: user.userid
    }
    personList.value = await getFriend(id)
    isshowDialog.value = false
}
// 增添好友触发
const manage = (id) => {
    typeDialog.value = id
    isshowDialog.value = true
}
// onperson.value = 
const onlineperson = computed(()=>{
    return personList.value.filter((person)=>(person.status === true)).length
})
onMounted(async () => {
    const user = await userStore.getUser()
    let id = {
        id: user.userid
    }
    personList.value = await getFriend(id)
    if(!personList.value) personList.value = []
    setInterval(async ()=>{
        personList.value = await getFriend(id)
    },15000)
    avatarUrl.value = user.userimg
})
</script>

<template>
        <!-- zoomIn -->
        <Transition>
            <ManagePage v-if="isshowDialog" @closeDialog="closeDialog" @clickPersonorigin="clickPerson" :come = "typeDialog" ></ManagePage>
        </Transition>
        

        <el-row class="chatPageheader">
        <div >
            <el-avatar
                class="mr-3"
                :size="45"
                :src="avatarUrl"
            />

        </div>
        <div class="search-box">
            <input class="search-txt" type="text" placeholder="Type to search" />
            <a class="search-btn" href="#">
                <i class="fas fa-search"><el-icon :size="20"><Search /></el-icon></i>
            </a>
        </div>
        <div style="padding-top: 0.5%;"> 
            <el-icon :size="iconsize"  class="specalforicon" @click="logout"><SwitchButton /></el-icon>
        </div>
    </el-row>
    <el-row class="chatPage">


        <el-col :span="leftsize" class="leftcomponent"> 
            <!-- 扩展功能 -->
            <div class="iconbg"> <el-icon  @click="Fullexpend"><FullScreen/></el-icon>
                <span class="font"  >扩展</span> 
            </div>
            <!-- 管理自己的状态 -->
            <div class="iconbg"> <el-icon  @click="manage(1)"><User /></el-icon>
                <span class="font" >管理</span>
            </div>
            <!-- 添加好友 -->
            <div class="iconbg"><el-icon  @click="manage(2)"><CirclePlus /></el-icon>
                <span class="font" >添加</span>
            </div>
            <!-- 删除好友 -->
            <div class="iconbg"><el-icon  @click="manage(3)"><Delete /></el-icon>
                <span class="font" >删除</span>
            </div>
            <!-- 搜索 -->
            <div class="iconbg"> <el-icon  @click="manage(4)"><Search/></el-icon>
                <span class="font" >搜索</span>
            </div>
        

        </el-col>
        <!-- 中间的列表选择框 -->







        <el-col :span="middlesize" class="middlecomponent"> 
            <h1 class="title">GenshinChat</h1>
            <div class="online-person">
                <span class="onlin-text">聊天列表</span>
                <span  style="padding-left: 100px; color: rgb(176, 178, 189)">{{ onlineperson }} / {{ personList.length}}</span>
                <!-- <Transition> -->
                    <div class="person-cards-wrapper">
                    <div
                        v-for="personInfo in personList"
                        :key="personInfo.id"
                        @click="clickPerson(personInfo)"
                        
                    >
                        <PersonCart
                        :personInfo="personInfo"
                        :pcCurrent="pcCurrent"
                        ></PersonCart>
                    </div>
                    <!-- // 添加卡片 -->
                    <div class="person-card" @click="manage(2)">
                        <el-icon :size="40" class="iconcolor"><CirclePlus/></el-icon>
                        
                    </div>
                    </div>
                <!-- </Transition> -->

            </div>
        </el-col>
        <el-col   el-col :span="rightsize" class="rightcomponent">
            <!-- 不需要理会这里 -->
            <div class="rightcomponentheader">

            </div>



            <div class="rightcomponentmiddle">
                <!-- 真正的对话框 -->
                <div class="chatcontent">
                    <div v-if="isShowChatWindow">
                        <!-- 等一下再来这里操作 -->
                        <chatwindow
                            
                            :friendInfo="chatWindowInfo"
                            @personCardSort="personCardSort"
                        ></chatwindow>
                    </div>
                    <div v-else>
                        <span class="emptychaticon">
                            <!-- TODO -->
                            <img class="iconsize" src="@/assets/img/genshinchat.png" alt="" />
                        </span>
                    </div>
                </div>


                <!-- // 不需要理会则合理 -->
                <div class="chatright">

                </div>
            </div>



            <!-- 不需要理会这里 -->
            <div class="rightcomponentbottom">

            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
@font-face {
    font-family: dogica;
    src: url(@/assets/font/dogica.ttf);
    }
// .changeshow-enter-active{
//     animation: animate__zoomIn;
//     animation-duration: 1s;
// }
// .chageshow-leave-active{
//     animation: animate__zoomOut;
//     animation-duration: 1s;
// }
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
.chatPageheader{
    // background-color: #2e3b62;
    display: flex;
    height: 7vh;
    padding-top: 0.2%;
    padding-left: 0.8%;
    padding-right: 1.25%;
    // background-image: linear-gradient(to right,  #232D4A,  #4f66ac);
    background-color: #323644;
    justify-content: space-between;


    .chatPageheaderson {
        justify-content: space-between;
    }
    .search-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2f3640;
        height: 40px;
        border-radius: 40px;
        padding: 10px;
    }
    .search-btn {
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
        width: 0;
    }
    .search-box:hover > .search-txt {
        width: 240px;
        padding: 0 6px;
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

}

.chatPage{

    height: 93vh;
    background-color: #323644;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .leftcomponent { 
        position: relative;
        transition: 0.5s;
        padding-top : 1%;
        padding-right: 1%;
        // background-image: linear-gradient(to bottom,  #232D4A,  #4f66ac);
        background-color: #323644;
        font-size: 40px;
        display: flex;  
        // padding-bottom: 1%;
        gap : 8%;
        padding-left: 0.7%;
        flex-direction: column;
        justify-content: center;
        height: 93vh;
        opacity: .7;
        cursor: pointer;
        // -webkit-text-stroke: 1px #fff;
        .iconbg {
            // font-size: large;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            .font{

                color: rgb(235, 224, 224);
            
                padding-top: 8px;
                font-size: 15px;
                padding-left: 4.5px;
            }
        }
        .iconbg:hover{
            // background-image: linear-gradient(to right, #336DF4, #33D6C0);
            // color: #000;
            color: #336DF4;
            filter: drop-shadow(0 0 10px #336DF4) drop-shadow(0 0 20px #336DF4);
        
        }
       
    }
    .middlecomponent{
        transition: 0.5s;
        background-color: #272A37;
        // background-color: rgb(219, 200, 200);
        padding-left: 1%;
        border-color:#232D4A;
        border-radius: 30px 0% 0% 0%;
 
        .title {

            color:#fff;
            padding-left: 10px;
            font-size: 25px;
            font-family: dogica;

        }
        .online-person {
            margin-top: 50px;
            margin-left:25px;
            .onlin-text {
                padding-right: 50px;
                color: rgb(176, 178, 189);
            }
            .person-cards-wrapper {
                height: 65vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;
                box-sizing: border-box;
                // transition: all 1s;
                &::-webkit-scrollbar {
                    width: 0; /* Safari,Chrome 隐藏滚动条 */
                    height: 0; /* Safari,Chrome 隐藏滚动条 */
                    display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
                .person-card {
                    width: 250px;
                    height: 80px;
                    border-radius: 10px;
                    background-color: rgb(50, 54, 68);
                    position: relative;
                    margin: 25px 0;
                    cursor: pointer;
                    font-size: 20px;
                    &:hover {
                        background-color: #1d90f5;
                        transition: 0.3s;
                        box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
                        // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
                        .info {
                        .info-detail {
                            .detail {
                            color: #fff;
                            }
                        }
                        }
                    }
                    position: relative;
                    .iconcolor {
                        left: 42%;
                        top :26%;
                        color:whitesmoke
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
    .rightcomponent {
        background-color: #272A37;
        // background-color: rgb(219, 200, 200);
        position: relative;
        .rightcomponentheader{
            height: 3%;
            background-color: #272A37;
        }
        .rightcomponentmiddle {
            height: 75%;
            display: flex;
            // background-color: #272A37;
            position: relative;
            border-radius: 15px;
            .chatcontent {
                background-color: #272A37;
                width: 96%;
                border-radius: 15px;
                
            }
            .emptychaticon{
                position: absolute;
                left: 35%;
                top: 30%;
                .iconsize{
                    width: 400px;
                    height: 400px;
                }
            }
            .chatright {
                background-color: #272A37;
                width: 3%;
            }
        }
        .rightcomponentbottom{
            height: 5%;
            background-color: #272A37;
        }
    }
}
</style>