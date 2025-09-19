
<script setup>
import { calendarEmits } from 'element-plus';
import { defineProps, watch, onMounted, ref} from 'vue';
const props = defineProps({
  fileType:{
    type: Number
  },
  fileName:{
    type: String
  },
  size:{
    type: String
  },
  value: {
    type: Number
  },
  index: {
    type: Number
  },
  uploadvalue: {
    type: Number
  }
  // value:{
  //   type: Number
  // }
})
const lock = ref(true)
const emit = defineEmits(['resetValue', 'sethundred'])
const watchafter = ()=>{
  if(props.value >= 100 && lock.value === true){
    // props.value = 0
    // emit('resetValue', props.index)
    lock.value = false
  }
  else if(props.value === 0){
    lock.value = true
  } 
}
const watchupload = ()=>{
  if(props.uploadvalue >= 100){
    emit('sethundred',props.index)
  }
}

watch(
  ()=>props.value,
  ()=>watchafter(),
  {immediate:true},
  {deep: true}
)
watch(
  ()=> props.value,
  ()=> watchupload(),
  {deep: true}
)
onMounted(()=>{
})
</script>

<template>
  <div class="file-card">
    <div class="file-card-content">
      <img src="@/assets/img/fileImg/unknowfile.png" alt="" v-if="props.fileType == 0"/>
      <img src="@/assets/img/fileImg/word.png" alt="" v-else-if="props.fileType == 1"/>
      <img src="@/assets/img/fileImg/excel.png" alt="" v-else-if="props.fileType == 2"/>
      <img src="@/assets/img/fileImg/ppt.png" alt="" v-else-if="props.fileType == 3"/>
      <img src="@/assets/img/fileImg/pdf.png" alt="" v-else-if="props.fileType == 4"/>
      <img src="@/assets/img/fileImg/zpi.png" alt="" v-else-if="props.fileType == 5"/>
      <img src="@/assets/img/fileImg/txt.png" alt="" v-else/>
      <div class="word">
        <span
          >{{props.fileName || '未知'}}</span
        >
        <span>{{props.size}}</span>
      </div>
    </div>
    <div class="xcprogress" v-show="props.uploadvalue !== 100">
        <div class="xcprogress-bar1" :style="{ 'width': `${props. uploadvalue}%` }">
        </div>
    </div>
    <div class="xcprogress" v-show="props.value !== 0">
        <div class="xcprogress-bar" :style="{ 'width': `${props.value}%` }">
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.file-card {
  width: 250px;
  height: 80px;
  background-color: rgb(45, 48, 63);
  border-radius: 20px;
  display: flex;
  // justify-content: center;
  // align-items: center;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
 
  flex-direction: column;
  cursor: pointer;
  .file-card-content{
    display: flex;
    justify-content: center;
    align-items: center;

  img {
    width: 60px;
    height: 60px;
  }
  .word {
    width: 60%;
    margin-left: 10px;
    overflow: hidden;
    span {
      width: 90%;
      display: inline-block;
      color: #fff;
    }
    span:first-child {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:last-child {
      font-size: 12px;
      color: rgb(180, 180, 180);
    }
  }
  }

  .xcprogress {
    width: 230px;
    height: 5px;
    background: #e5e5e5;
    border-radius: 4px;
    overflow: hidden;

}

.xcprogress-bar {
    width: 0;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: rgb(55, 103, 212);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
    transition: width .6s ease;
    border-radius: 4px;
    animation: xcprogress-bar-anim 2s linear infinite;
}
.xcprogress-bar1 {
    width: 0;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: rgb(65, 177, 58);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
    transition: width .6s ease;
    border-radius: 4px;
    animation: xcprogress-bar-anim 2s linear infinite;
}
.xcprogress-bar-value {
    font-size: 5px;
    font-weight: bold;
    color: white;
    margin-right: 5px;
}

@keyframes xcprogress-bar-anim {
    from {
        background-position: 80px 0;
    }

    to {
        background-position: 0 0;
    }
}
&:hover {
    background-color: rgb(33, 36, 54);
  }
}
</style>