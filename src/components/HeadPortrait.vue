
  <script setup>
    import { defineProps ,onMounted} from 'vue';
    const props = defineProps({
        imgUrl:{
            required: true,
            // default:new URL('@/assets/head_portrait.jpg', import.meta.url).href
        },
        status:{
            required: true,
            default: false,
            type: Boolean
        },
        needStatus:{
            required: true,
            default: false,
            type: Boolean
        }
    })
    onMounted(()=>{
        setInterval(()=>{
            let userstatus = document.getElementsByClassName('head-portrait')
        },10000)
    })
  </script>
  <template>
    <div v-if="status" class="head-portrait">
      <img :src="imgUrl" alt="">
    </div>
    <div v-else>
        <div v-if="needStatus" class="head-portrait3">
            <img  :src="imgUrl" alt="">
        </div>
        <div v-else class="head-portrait2">
            <img :src="imgUrl" alt="">
        </div>
    </div>

  </template>
  
  <style lang="scss" scoped>
  .head-portrait {
    
      width: 50px;
      height: 50px;
      border-radius: 50%;
    //   border: 2px solid rgb(137,140,151);
      border: 2px solid rgb(144,225,80);
      position:relative;
      &::before {
          content: '';
          width: 15px;
          height: 15px;
          z-index: 14;
          display: block;
          border-radius: 50%;
          background-color: rgb(144,225,80);
          box-shadow: 0, 0, 10px, 0 rgb(144,225,80);
          position: absolute;
          right: 0;
      }
      img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          // padding: 2px;
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          vertical-align: middle;
      }
  }
  .head-portrait2 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // border: 2px solid rgb(137,140,151);
      border: 2px solid rgb(255, 0, 0);
      position:relative;
      &::before {
          content: '';
          width: 15px;
          height: 15px;
          z-index: 14;
          display: block;
          border-radius: 50%;
          background-color: rgb(255, 0, 0);
          box-shadow: 0, 0, 10px, 0 rgb(255, 0, 0);
          position: absolute;
          right: 0;
      }
      
      img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          // padding: 2px;
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          vertical-align: middle;
      }
  }
  @keyframes huxi_light {
    0% {
        box-shadow: 0px 0px 1px 1px rgb(144,225,80);
    }
    50% {
        box-shadow: 0px 0px 3px 2px rgb(144,225,80);
    }
    100% {
        box-shadow: 0px 0px 1px 1px rgb(144,225,80);
    }
    }
    @keyframes huxi_dark {
    0% {
        box-shadow: 0px 0px 1px 1px red;
    }
    50% {
        box-shadow: 0px 0px 3px 2px red;
    }
    100% {
        box-shadow: 0px 0px 1px 1px red;
    }
}
.head-portrait::before {
    animation: huxi_light 4s ease-in-out infinite;
}
.head-portrait2::before {
    animation: huxi_dark 4s ease-in-out infinite;
}
  .head-portrait3 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // border: 2px solid rgb(137,140,151);
      position:relative;
      &::before {
          content: '';
          width: 15px;
          height: 15px;
          z-index: 14;
          display: block;
          border-radius: 50%;
          position: absolute;
          right: 0;
      }
      img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          // padding: 2px;
          box-sizing: border-box;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          vertical-align: middle;
      }
  }
  </style>