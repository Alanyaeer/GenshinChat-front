
<script setup>
import HeadPortrait from "./HeadPortrait.vue";
import {defineProps,watch, ref} from 'vue'
const props = defineProps({
  messageInfo:{
    default: {
    }
  },
  msgCurrent: {
    default: ''
  }
})
const current = ref('')
const isActive = () => {
  current.value = props.msgCurrent
}
watch(
  ()=> props.msgCurrent,
  ()=> isActive(),
  {immediate: true, deep: true}
)
</script>

<template>
  <div class="person-card" :class="{ activeCard: messageInfo.id == current }">
    <div class="info">
          <HeadPortrait :imgUrl="messageInfo.headImg" :status = "messageInfo.status"></HeadPortrait>
          <div class="info-detail">
            <div class="name">{{ messageInfo.name }}</div>
            <div class="detail">{{ messageInfo.detail }}</div>
          </div>
    </div>
    <div class="message">
      <span class="font">
        {{ messageInfo.time+ ':  ' }}
      </span>
      <span class="font">
        {{ messageInfo.msg }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.person-card {
  width: 500px;
  height: 150px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  display: flex;
  cursor: pointer;
  .info {
    position: absolute;
    // left: 50%;
    // top: 50%;
    left: 10%;
    top: 50%;
    transform: translate(0, -50%);
    // width: 90%;
    // transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  .message{
    background-color: #151414;
    position:relative;
    // width: 100%;

    // height: 100%;
    top: 50%;
    left: 40%;
    transform: translate(0, -50%);
    height: 80%;
    opacity: 0.8;
    width: 55%;
    display: flex;
    .font{
      padding-top: 20%;
      position: relative;
      font-weight: bold;
      padding-left: 10%;
      color: white;
      // justify-content: center;

    }
  }
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
</style>