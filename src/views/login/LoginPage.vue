<script setup>
import { ref, onMounted } from 'vue'
import 'animate.css';
// import {Created} from 'vue-router'
import {
  User, Lock, ArrowRightBold, ArrowLeftBold, PictureFilled
} from '@element-plus/icons-vue'
import {registeruser, loginuser} from '@/api/apiuser'
import { useRouter } from 'vue-router';
import {useUserStore} from '@/stores'
const formModel = ref({
  id: '',
  password: '',
  repassword: ''
})
const isRegister = ref(true)
const themevalue = ref(0)
let themesvalue = ref(true)
const switchvalue = ref(false);
const form = ref()
const router = useRouter()
const userStore = useUserStore()
//整个表单的校验规则    
const rules = {
  // blur 代表的是， 失去焦点的时候才去校验
  id: [
    { required: true, message: '请输入id', trigger: 'blur' },
    { min: 4, max: 10, message: 'id长度在4-10个字符之间', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // 这里 /^ 代表开头， $/代表结尾 , \S表示非空字符
      pattern: /^\S{4,16}$/,
      message: '密码必须为4-16非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    // 自定义校验

    {
      // 这里 /^ 代表开头， $/代表结尾 , \S表示非空字符
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-16非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else callback() // 计算校验成功也需要callback
      },
      trigger: 'blur'
    }
  ]
  
}
const changetheme = () => {
  switchvalue.value = true
  if(themevalue.value == 0){
    themesvalue.value = true
    // themes = true
    ElMessage({
      showClose: true,
      message: '切换页面',
      type: 'warning'
    })
    // 刀剑圣域状态
    // const todo = document.getElementsByClassName('container')[0].style
    const todo1 = document.getElementsByClassName('title1')[0].style
    const todo2 = document.getElementsByClassName('button')[0].style
    const todo3 = document.getElementsByClassName('three-d')[0].style
    // todo.background = "url('@/assets/login_bg2.jpg') no-repeat center / cover"
    todo1.color = "#AF5F48"
    todo2.background = "#AF5F48"
    todo3.textShadow = "-1px 1px 1px rgb(209 132 0),\
                  -1px 1px 1px rgb(209 132 0),\
                  -1px 1px 1px rgb(209 132 0),\
                  -1px 1px 1px rgb(209 132 0),\
                  -1px 1px 1px rgb(209 132 0),\
                  -1px 1px 1px rgb(209 132 0)"
    todo3.boxShadow = "0px 5px 0px 0px #AF5F48"
  }
  else {
    themesvalue.value = false
    // 消息提示框不用理会
    ElMessage({
      showClose: true,
      message: '切换页面',
      type: 'success'    })
    // const todo = document.getElementsByClassName('container')[0].style
    const todo1 = document.getElementsByClassName('title1')[0].style
    const todo2 = document.getElementsByClassName('button')[0].style
    const todo3 = document.getElementsByClassName('three-d')[0].style
    // 其他时刻状态
    // todo.background = "url('@/assets/login_bg5.png') no-repeat center / cover"
    todo1.color = "rgb(233,240,191)"
    todo2.background = "rgb(43,66,30)"
    todo3.textShadow = "-1px 1px 1px rgb(43 66 30),\
                  -1px 1px 1px rgb(43 66 30),\
                  -1px 1px 1px rgb(43 66 30),\
                  -1px 1px 1px rgb(43 66 30),\
                  -1px 1px 1px rgb(43 66 30),\
                  -1px 1px 1px rgb(43 66 30)"
    todo3.boxShadow = "0px 5px 0px 0px rgb(43 66 30)"
  }
  // 1.5s中才可以点击按钮， 切换页面
  setTimeout(() => {
    switchvalue.value = false
  }, 1000)
  
}
const register = async () => {
  await form.value.validate()

  const code = await registeruser(formModel.value)
  console.log(code);

  if(code === 1){
    ElMessage.success('注册成功')
    isRegister.value = false
  }
  else ElMessage.error('注册失败')
}
const login = async()=>{
  await form.value.validate()
  const code = await loginuser(formModel.value)
  if(code === 1){
    ElMessage.success('登录成功')
    userStore.userid = formModel.value.id
    console.log(userStore.userid);
    router.push('chat')
  }
}
onMounted(() => {
    // 在控制台打印环境信息
    console.log(import.meta.env);
    // 默认主题
})
</script>
<template>
    <el-row :class="{container: themesvalue, container1: !themesvalue}">
      <!-- <h1 class="animate__flash">heelo</h1> -->
        <el-col :span="14" class="bg1"></el-col>
        <el-col :span="8">
            <div class="login">
                <el-form class="el-form animate__animated animate__flipInX"
                    :model="formModel"
                    :rules="rules"
                    ref="form"
                    size="large"
                    autocomplete="off"
                    v-if="isRegister"
                    >
                    <el-form-item>
                        <h1 class="title1">注册</h1>
                    </el-form-item>
                    <!-- 登录相关表单 -->
                    <el-form-item prop="id">
                        <el-input
                        class="input"
                        v-model="formModel.id"
                        :prefix-icon="User"
                        placeholder="请输入id"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                        class="input"
                        v-model="formModel.password"
                        :prefix-icon="Lock"
                        type="password"
                        placeholder="请输入密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="repassword">
                        <el-input
                        class="input"
                        v-model="formModel.repassword"
                        :prefix-icon="Lock"
                        type="password"
                        placeholder="请输入再次密码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        @click="register"
                        class="button three-d"
                     
                        auto-insert-space
                        >
                        <p class="font">注册</p>
                        
                        </el-button>
                    </el-form-item>
                    <el-form-item class="flex">
                      <div class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = false" class="font"> 
                        ← 返回
                        </el-link>
                        <el-switch
                            class="switch clicked"
                            v-model="themevalue"
                            @click="changetheme"
                            style="--el-switch-on-color: rgb(115,145,93); --el-switch-off-color: #AF5F48"
                            :disabled=switchvalue
                            active-value="1"
                            inactive-value="0"
                            :inactive-action-icon="PictureFilled"
                            :active-action-icon="PictureFilled"
                          />
                      </div>

                    </el-form-item>
                    </el-form>
                    <el-form  
                        class="animate__animated animate__flipInX"           
                        :model="formModel"
                        :rules="rules" 
                        ref="form" 
                        size="large" 
                        autocomplete="off" v-else>
                    <el-form-item>
                        <h1 class="title">
                          Wechat
                        </h1>
                    </el-form-item>
                    <el-form-item prop="id">
                        <el-input class="input" v-model="formModel.id" :prefix-icon="User" placeholder="请输入id"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input 
                        v-model="formModel.password"
                        name="password"
                        :prefix-icon="Lock"
                        type="password"
                        placeholder="请输入密码"
                        class="input"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="flex">
                        <div class="flex">
                        <el-checkbox class="item1">记住我</el-checkbox>
                        <el-link type="primary" class="item1" :underline="false">忘记密码？</el-link>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="button three-d"  auto-insert-space @click="login"
                        ><p class="font animate__flash animate__flash">登录</p></el-button
                        >
                    </el-form-item>
                    <el-form-item class="flex">
                      <div class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true">
                            <!-- 注册 -->
                          <el-link type="info" :underline="false" @click="isRegister = false" class="font">
                            ← 注册
                          </el-link>
                        </el-link>
                          <el-switch
                            class="switch"
                            v-model="themevalue"
                            @click="changetheme"
                            style="--el-switch-on-color: #AF5F48; --el-switch-off-color: #AF5F48"
                            active-value="1"
                            inactive-value="0"
                            :inactive-action-icon="PictureFilled"
                            :active-action-icon="PictureFilled"
                          />
                      </div>

                    </el-form-item>
                    </el-form>
              </div>
            </el-col>
        <el-col :span="2"></el-col>
    </el-row>
   </template>
   
   <style lang="scss" scoped>
   .container {
    height: 100vh;
    background:  ''; 
    background:  url('@/assets/login_bg2.jpg') no-repeat center / cover; 
    transition: background 0.5s ease-in-out;
    // 登录页面
    .login{
        position: relative;
        top:15%;
        // padding-left: 15%;
        // padding-right: 15%;
        // padding-top: 15%;
        // padding-bottom: 15%;
        // margin-left: 10%;
        height: 70%;
        width: 70%;
        left: 10%;
        display: flex;
        background: rgba(255, 255, 255, 0.2);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        border-radius: 25px;
        box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
        flex-direction: column;
        justify-content: center;
        user-select: none;
        box-shadow: 0 5px 15px rgba(0, 0,0,.8);
        border-radius: 10px;
        padding-left:5%;
        padding-right:5%;
        // 标题
        .title {
          margin: 0 auto;
          color:#AF5F48
        }
        .title1 {
          color: #AF5F48;
          margin: 0 75% 5% 5%;
        }
        // 按钮
        .button {
            position: relative;
            width: 60%;
            left:20%;
            // background-image: linear-gradient(to right, #e1eeea, #d3e2eb);
            // 
            border-width: 0;
            background-color: #AF5F48;
            // border
            border-radius: 30px;
            // 字体
            .font {
              color:white;
            }
        }
        // 布局
        .flex {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            .font{
              color: white;
            }
            // 滑动开关
            .switch {
              opacity: 0.7;
            }
        }
        .el-form{
          position: relative;
          padding-left: 8%;
          padding-right: 8%;
          // animate__flipInX
        }
        .flexbottom {
          display: flex;
          width: 100%;
          justify-content: space-between;
          .switch {
              opacity: 0.7;
            }
          .font{
            color: white;
          }
        }
        .input {
            position: relative;
            overflow: hidden;
            opacity: 0.5;
            border-radius: 15px;
        }
        .item1 {
          color: #AF5F48;
        }
        .three-d {
            color: #fff;
            background-color: #AF5F48;
            text-shadow: -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0);
            box-shadow: 0px 5px 0px 0px #AF5F48;
            transition: all .5s;
        }
        
        .three-d:hover {
            background-color: #c0674f;
        }

        .three-d:active {
            transform: translate(0,4px);
            box-shadow: 0px 1px 0px 0px #AF5F48;
        }   


    }
   }
   .container1 {
    height: 100vh;
    background: '';
    background:  url('@/assets/login_bg5.png') no-repeat center / cover; 
    transition: background 0.5s ease-in-out;
    // 登录页面
    .login{
        position: relative;
        top:15%;
        // padding-left: 15%;
        // padding-right: 15%;
        // padding-top: 15%;
        // padding-bottom: 15%;
        // margin-left: 10%;
        height: 70%;
        width: 70%;
        left: 10%;
        display: flex;
        background: rgba(255, 255, 255, 0.2);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        border-radius: 25px;
        box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
        flex-direction: column;
        justify-content: center;
        user-select: none;
        box-shadow: 0 5px 15px rgba(0, 0,0,.8);
        border-radius: 10px;
        padding-left:5%;
        padding-right:5%;
        // 标题
        .title {
          margin: 0 auto;
          color:#AF5F48
        }
        .title1 {
          color: #AF5F48;
          margin: 0 75% 5% 5%;
        }
        // 按钮
        .button {
            position: relative;
            width: 60%;
            left:20%;
            // background-image: linear-gradient(to right, #e1eeea, #d3e2eb);
            // 
            border-width: 0;
            background-color: #AF5F48;
            // border
            border-radius: 30px;
            // 字体
            .font {
              color:white;
            }
        }
        // 布局
        .flex {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            .font{
              color: white;
            }
            // 滑动开关
            .switch {
              opacity: 0.7;
            }
        }
        .el-form{
          position: relative;
          padding-left: 8%;
          padding-right: 8%;
          // animate__flipInX
        }
        .flexbottom {
          display: flex;
          width: 100%;
          justify-content: space-between;
          .switch {
              opacity: 0.7;
            }
          .font{
            color: white;
          }
        }
        .input {
            position: relative;
            overflow: hidden;
            opacity: 0.5;
            border-radius: 15px;
        }
        .item1 {
          color: #AF5F48;
        }
        .three-d {
            color: #fff;
            background-color: #AF5F48;
            text-shadow: -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0),
                        -1px 1px 1px rgb(209 132 0);
            box-shadow: 0px 5px 0px 0px #AF5F48;
            transition: all .5s;
        }
        
        .three-d:hover {
            background-color: #c0674f;
        }

        .three-d:active {
            transform: translate(0,4px);
            box-shadow: 0px 1px 0px 0px #AF5F48;
        }   


    }
   }
   
   </style>