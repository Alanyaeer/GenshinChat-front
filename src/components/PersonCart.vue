

<script setup>
import HeadPortrait from "./HeadPortrait.vue";
import {defineProps,watch, ref} from 'vue'
const props = defineProps({
  personInfo:{
    default: {
    }
  },
  pcCurrent: {
    default: ''
  }
})
const current = ref('')
const isActive = () => {
  current.value = props.pcCurrent
}
watch(
  ()=> props.pcCurrent,
  ()=> isActive(),
  {immediate: true, deep: true}
)
</script>

<template>
  <div class="person-card" :class="{ activeCard: personInfo.id == current }">
    <div class="info">
          <HeadPortrait :imgUrl="personInfo.headImg" :status="personInfo.status" :needStatus="false"></HeadPortrait>
          <div class="info-detail">
            <div class="name">{{ personInfo.name }}</div>
            <div class="detail">{{ personInfo.detail }}</div>
          </div>

    </div>
  </div>
</template>
<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
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