<script setup>
import { ref, onMounted} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  SwitchButton,
  Search,
  CirclePlus,
  FullScreen,
  CloseBold 
} from '@element-plus/icons-vue'

// import { QuillEditor } from '@vueup/vue-quill'
// import {CommPage} from './components/CommPage.vue'
import avatar from '@/assets/img/head_portrait4.jpg'
import { useRouter } from 'vue-router'
// 还缺少一个请求函数
import { getFriend } from '@/api/getData'
import  PersonCart  from '@/components/PersonCart.vue'
import chatwindow from './components/chatwindow.vue'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
// import { router } from 'vue-router';
const iconsize = ref(32)
const isCollapse = ref(true)   
const leftsize = ref(1)
const middlesize = ref(5)
const avatarUrl = ref('')
const personList = ref([])
const pcCurrent = ref('')
const isShowChatWindow = ref(false)
const personInfo = ref('')
const chatWindowInfo = ref('')
avatarUrl.value = avatar
// avatarUrl.value = require.resolve('@/assets/images/avatar_default.png')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const logout = () => {
    router.push('/login')
}
const clickPerson = (info) => {
    
    pcCurrent.value = info.id
    isShowChatWindow.value = true
    personInfo.value = info
    personCardSort(info.id)
    // console.log(personInfo.value);
    chatWindowInfo.value = info
}
const Fullexpend = () => {

    isCollapse.value = !isCollapse.value
    if(isCollapse.value === false){
        middlesize.value = 3

        leftsize.value = 3
    }
    else {
        leftsize.value = 1
        middlesize.value = 5
    }
}
// TODO, 记得退出的时候要记录当前的数组顺寻
const personCardSort = (id)=>{
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
onMounted(async () => {
    personList.value = await getFriend ()
})
</script>

<template>
    <el-row class="chatPageheader">
        <div>
            <el-avatar
                class="mr-3"
                :size="32"
                :src="avatarUrl"
            />
        </div>
        <div class="search-box">
            <input class="search-txt" type="text" placeholder="Type to search" />
            <a class="search-btn" href="#">
                <i class="fas fa-search"><el-icon :size="20"><Search /></el-icon></i>
            </a>
        </div>
        <div> 
            <el-icon :size="iconsize"  class="specalforicon" @click="logout"><SwitchButton /></el-icon>
        </div>
    </el-row>
    <el-row class="chatPage">
        <el-col :span="leftsize" class="leftcomponent"> 
            <el-menu
            default-active="2"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
            :collapse-transition="false"
            class="el-menu"
            text-color="#fff"
        >
            <el-menu-item index="0"  class="submenubg">
                <el-icon class="iconbg" @click="Fullexpend"><FullScreen/></el-icon>
                <template #title>收缩</template>
            </el-menu-item>
            <el-menu-item index="2"  class="submenubg">
            <el-icon class="iconbg"><icon-menu /></el-icon>
            <template #title>管理</template>
            </el-menu-item>
            <el-menu-item index="3"  class="submenubg">
            <el-icon class="iconbg"><setting /></el-icon>
            <template #title>设置</template>
            </el-menu-item>
            <el-menu-item index="4"  class="submenubg">
            <el-icon class="iconbg"><CirclePlus /></el-icon>
            <template #title>添加</template>
            </el-menu-item>
            <el-menu-item index="5"  class="submenubg" @click="logout">
            <el-icon class="iconbg" ><SwitchButton /></el-icon>
            <template #title>注销</template>
            </el-menu-item>
        </el-menu>

        </el-col>
        <!-- 中间的列表选择框 -->







        <el-col :span="middlesize" class="middlecomponent"> 
            <h1 class="title">WeChat</h1>
            <div class="online-person">
                <span class="onlin-text">聊天列表</span>
                <span  style="padding-left: 100px; color: rgb(176, 178, 189)">{{ personList.length}} / ?</span>
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
                <div class="person-card">
                    <el-icon :size="40" class="iconcolor"><Plus /></el-icon>
                </div>
                </div>
            </div>
        </el-col>
        <el-col   el-col :span="18" class="rightcomponent">
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
                            <img class="iconsize" src="@/assets/snapchat.png" alt="" />
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
.chatPageheader{
    // background-color: #2e3b62;
    display: flex;
    height: 7vh;
    padding-top: 0.5%;
    padding-left: 1.25%;
    padding-right: 1.25%;
    background-image: linear-gradient(to right,  #232D4A,  #4f66ac);
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
    background-color: #232D4A;
     
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .leftcomponent { 
        .iconbg {
            color: #C3C7D1;

        }
        .iconbg:hover{
            // background-image: linear-gradient(to right, #336DF4, #33D6C0);
            color: #336DF4;
        
        }
        .submenubg {
            background: #232D4A;
            size:100
            
        }
        .el-menu {
        // 解决1px elementui出现展开后子菜单宽度多出1px问题
            border: none;
            border-right-width: 0;
            // height: 93vh;
        }
        .heightfull {
            transition: 0.62s;  

            height: 93vh;
        }
    }
    .middlecomponent{
        background-color: #272A37;
        padding-left: 1%;
        border-color:#232D4A;
        border-radius: 30px 0% 0% 0%;
        .title {
            color:#fff;
            padding-left: 10px;
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