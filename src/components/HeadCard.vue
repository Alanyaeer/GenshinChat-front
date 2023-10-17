
<script setup>
import {ref, defineEmits} from 'vue'
const emit = defineEmits(['closehead', 'sendhead'])
const emojiList =  ref([
    new URL("@/assets/img/head_portrait4.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait5.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait6.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait7.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait9.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait10.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait11.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait12.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait13.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait14.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait15.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait16.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait17.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait18.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait19.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait20.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait21.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait22.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait23.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait24.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait25.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait26.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait27.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait28.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait29.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait30.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait31.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait32.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait33.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait34.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait35.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait36.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait37.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait38.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait39.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait40.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait41.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait42.jpg", import.meta.url).href,
    new URL("@/assets/img/head_portrait43.jpg", import.meta.url).href,
])
const sendheads = (item) => {
    emit('sendhead', item)
}
</script>
<template>
    <div class="emoji-content">
      <div class="emoji">
        <div class="emoji-wrapper">
          <ul class="emoji-list">
            <li
              class="emoji-item"
              v-for="(item, index) in emojiList"
              :key="index"
              @click="sendheads(item)"
            >
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="mask" @click="closeEmoji"></div>
    </div>
  </template>
  
 
  
  <style lang="scss" scoped>
  .emoji-content {
    .emoji {
    width: 530px;
    height: 450px;
    background-color: rgb(39, 42, 55);
    position: absolute;
    top: -430px;
    left: 265px;
    // opacity: 0.9;
    border-radius: 10px;
    transition: 0.3s;
    z-index: 3;
  
    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-top: 10px solid rgb(39, 42, 55);
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      position: absolute;
      bottom: -8px;
      left: 15px;
      z-index: 100;
    }
    .emoji-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
        background: rgb(95, 101, 122);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
        border-radius: 10px;
        background: rgb(39, 42, 55);
      }
      .emoji-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-left: 10px;
        .emoji-item {
          list-style: none;
          width: 130px;
          height: 130px;
          border-radius: 10px;
          margin: 5px;
          position: relative;
          cursor: pointer;
          &:hover {
            background-color: rgb(50, 54, 68);
          }
          img {
            width: 125px;
            height: 125px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  
  }
  .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      background: transparent;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  
  </style>