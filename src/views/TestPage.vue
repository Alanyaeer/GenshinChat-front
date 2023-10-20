<script setup>
import {ref } from 'vue'
import {
    Sunrise
} from '@element-plus/icons-vue'
// import { ManagePage} from './manage/ManagePage.vue'
import ManagePage from './manage/ManagePage.vue'
</script>
<template>
    <div class="bg">
        <img class="avatar" src="@/assets/img/head_portrait5.jpg">
    </div>
</template>

<style>
    .bg{
        /* background-color: rgb(215, 175, 175); */
        background-color: rgb(217, 209, 209);
        height: 100vh;
        width : 100vw;
        .avatar{
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            box-shadow: 18px 18px 30px rgba(0, 0,0,0.2),
                        -18px  -18px 30px rgba(255, 255, 255, 1);

        }
    }

</style>

