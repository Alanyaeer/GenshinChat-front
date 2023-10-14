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
import avatar from '@/assets/avatar_default.png'
import { useRouter } from 'vue-router'
// 还缺少一个请求函数
// import { getFriend } from '@/api/getData'
const router = useRouter()
// import { router } from 'vue-router';
const iconsize = ref(32)
const isCollapse = ref(true)   
const leftsize = ref(1)
const middlesize = ref(5)
const avatarUrl = ref('')
const personList = ref([])
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
onMounted(async () => {
    personList.value = await getPersonList()
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
                <div class="person-cards-wrapper">
                <div
                    v-for="personInfo in personList"
                    :key="personInfo.id"
                    @click="clickPerson(personInfo)"
                >
                    <PersonCard
                    :personInfo="personInfo"
                    :pcCurrent="pcCurrent"
                    ></PersonCard>
                </div>
                </div>
            </div>
        </el-col>
        <el-col   el-col :span="18" class="rightcomponent">
            <div class="rightcomponentheader">

            </div>
            <div class="rightcomponentmiddle">
                <div class="chatcontent">

                </div>
                <div class="chatright">

                </div>
            </div>
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
        background-color:#232D4A;
        // -webkit-backface-visibility: hidden;
        // transition: 0.62s;
        // transition-delay: 1s; 
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
            margin-left:100px;
            .onlin-text {
                padding-right: 50px;
                color: rgb(176, 178, 189);
            }
            .person-cards-wrapper {
                padding-left: 10px;
                height: 65vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;
                box-sizing: border-box;
                &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
            }
        }
    }
    .rightcomponent {
        background-color: #272A37;
        position: relative;
        .rightcomponentheader{
            height: 20%;
            background-color: #272A37;
        }
        .rightcomponentmiddle {
            height: 75%;
            display: flex;
            // background-color: #272A37;
            position: relative;
            border-radius: 15px;
            .chatcontent {
                background-color: #323644;
                width: 96%;
                border-radius: 15px;
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