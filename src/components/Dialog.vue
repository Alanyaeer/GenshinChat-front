<script setup>
    import { ref , defineProps , onMounted, defineEmits} from 'vue'

    const props = defineProps({
        userinnername: {
            type: String,
        },
        nowvalue: {
            type: Number
        }
    })
    const emit = defineEmits(['closeinner'])
    const message = ref('')
    const close = (id)=>{
        emit('closeinner', id)
    }
    onMounted(()=>{
        if(props.nowvalue === 3)message.value = '你确认要删除：'
        else message.value = '你确认要跳转到聊天记录：'
    })
</script>
<template>
    <div class="container">
        <div class="dialog">
            <div class="top"><span class="font">{{ message }} {{ props.userinnername }}</span></div>
            <div class="bottom">
                <el-button class="buttontype" type="danger" @click="close(1)">确定</el-button>
                <el-button class="buttontype" type="primary" @click="close(2)">取消</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container{
    // positiofixed
    width: 100vw;
    height: 100vh;
    // background-color: aquamarine;
    z-index: 114514;
    position: absolute;
    opacity: 0.9;
    display: flex;
    .dialog{
        background-color: #272A37;
        position: relative;
        width: 25%;
        height: 40%;
        top: 40%;
        z-index: 2003;
        border-radius: 10px;
        overflow: hidden;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
         box-shadow: 0, 0, 10px, 0, #87762d;
        // margin: 1%;
        .top{
            position: relative;
            height: 60%;
            width: 100%;
            background-image: linear-gradient(to left, #9ba3c9, #969bb4);
            .font{
                position: relative;
                font-size: large;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                left:25%;
                top :20%;
                transform: translate(-50%, -50%);
            }
        }
        .bottom{
            position: relative;
            height: 20%;
            width: 100%;
            // background-color: rgb(4, 44, 44);
            left:50%;
            top :20%;
            display: flex;
            transform: translate(-50%, -50%);
            justify-content:space-evenly;
            .buttontype{
                position: relative;
                box-shadow: 0, 0, 10px, 10px , rgba(177, 117, 117, 0.5);
                margin: 2%;
                z-index:114516;
            }
        }
    }
}
</style>