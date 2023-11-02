<script setup>
import {ref } from 'vue'
import {
HelpFilled,
    Sunrise
} from '@element-plus/icons-vue'
// import { ManagePage} from './manage/ManagePage.vue'

const change = ()=>{
   let tt = document.getElementsByClassName("bg")[0].style
//    tt.background = "url('src/assets/login_bg5.png') no-repeat center / cover"
}
const list = ref([1, 2, 3, 4, 5, 6])
const fn = (index)=>{
    let b = document.getElementsByClassName(index)[0]
    console.log(b);
    let c = b.getElementsByClassName('oround')[0]
    console.log(c);
    console.log(c.getTotalLength());
    c.style.strokeDashoffset = c.getTotalLength()/2
    // b.createElement
    // console.log(b);
    // let c = b.style
    
}
</script>
<template>
    <div class="bg">
        <!-- <div v-for"list" :key="item.index"></div> -->
        <div class="pos">

            <div  @click="fn(index)" style="margin:50px; width: 100px; height: 100px; background-color: burlywood;" v-for="(item, index) in list" :key="item.id">
                <svg width="100" height="100"  :class="`${index}`">
                    <circle cx="50" cy="50" r="30"
                        fill="transparent"
                        stroke-width="6"
                        stroke="grey"
                        class="oround"
                    />
                </svg>
            </div>      
            <!-- <svg width="30px"  height="30px">
                    <circle class="oround" cx="15" cy="15" r="15" 
                        fill="transparent" stroke-width="12" stroke="grey"
                    />
            </svg> -->
        </div>

    </div>

</template>

<style lang="scss" scoped>
    .bg{
        /* background-color: rgb(215, 175, 175); */
        /* background-color: rgb(217, 209, 209); */
        height: 100vh;
        width : 100vw;
        /* background-color: ; */
        /* background: url("@/assets/login_bg2.jpg") no-repeat center / cover; */
        /* background:  url('@/assets/login_bg2.jpg') no-repeat center / cover;  */
        .pos{   

            .oround{
                stroke-dasharray: 190;
                // stroke-dashoffset: 15;
            }
        }
    }


</style>

