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
        <div class="userinfo">
            <ManagePage></ManagePage>
            <ei-icon><Sunrise/></ei-icon>
        </div>
    </div>
</template>

<style>
    .bg{
        /* background-color: rgb(215, 175, 175); */
        background-color: rgb(65, 70, 70);
        height: 100vh;
        width : 100vw;
        .userinfo{
            position: absolute;
            /* left: 50%;
            top: 50%;
            width: 5%;
            height: 5%; */
            /* transform:  translate(-50%,-50%); */
        }
    }

</style>

