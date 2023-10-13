<script setup>
import { ref } from 'vue'
import {
  User, Lock, UserFilled,CirclePlus
} from '@element-plus/icons-vue'
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const isRegister = ref(true)
//整个表单的校验规则    
const rules = {
  // blur 代表的是， 失去焦点的时候才去校验
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度在5-10个字符之间', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      // 这里 /^ 代表开头， $/代表结尾 , \S表示非空字符
      pattern: /^\S{6,15}$/,
      message: '密码必须为6-16非空字符',
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
</script>
<template>
    <el-row class="container">
        <el-col :span="14" class="bg1"></el-col>
        <el-col :span="8">
            <div class="login">
                <el-form
                    :model="formModel"
                    :rules="rules"
                    ref="form"
                    size="large"
                    autocomplete="off"
                    v-if="isRegister"
                    >
                    <el-form-item>
                        <h1 class="title">注册</h1>
                    </el-form-item>
                    <!-- 登录相关表单 -->
                    <el-form-item prop="username">
                        <el-input
                        class="input"
                        v-model="formModel.username"
                        :prefix-icon="User"
                        placeholder="请输入用户名"
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
                        <el-link type="info" :underline="false" @click="isRegister = false" class="font"> 
                        ← 返回
                        </el-link>
                    </el-form-item>
                    </el-form>
                    <el-form             
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
                    <el-form-item prop="username">
                        <el-input class="input" v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
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
                        ><p class="font">登录</p></el-button
                        >
                    </el-form-item>
                    <el-form-item class="flex">
                        <el-link type="info" :underline="false" @click="isRegister = true">
                            <!-- 注册 -->
                            <!-- <el-icon size="25"><UserFilled /></el-icon> -->
                          <el-link type="info" :underline="false" @click="isRegister = false" class="font">
                            ← 注册
                          </el-link>
                        </el-link>
                    </el-form-item>
                    </el-form>
                            </div>
                        </el-col>
        <el-col :span="2"></el-col>
    </el-row>
   </template>
   
   <style lang="scss" scoped>
   .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    // background-image: linear-gradient(to left, #f8edec, #ecf3f4 100%);
    background:  url('@/assets/login_bg2.jpg') no-repeat center / cover; 
    // filter:blur(10px)
    // .bg1 {
    //   background:
    //   // url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    //   url('@/assets/login_bg.jpg') no-repeat center / cover;
    //   border-radius: 20px 20px 20px 20px;
    // }
    .login{
        position: relative;
        top:15%;
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
        .title {
          margin: 0 auto;
          color:#AF5F48
        }
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
            .font {
              color:white;
            }
        }
        .flex {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 5px;
            .font{
              color: white;
            }
        }
        .input {
            position: relative;
            opacity: 0.5;
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