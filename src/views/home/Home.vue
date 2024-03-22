<script setup>
import {onMounted, ref} from "vue";

//点击导航链接触发
let activePathDom = null
function handleRoute(event) {
  if(activePathDom){
    activePathDom.style.color = "#333"
  }
  event.target.style.color = "#409EFF"
  activePathDom = event.target
}

import {usePathStore} from "@/stores/path.js";
const pathStore = usePathStore()
const navWrapperRef = ref()
onMounted(() => {
  const path = pathStore.path
  switch (path) {
    case "/recommend":
      navWrapperRef.value.children[0].children[0].style.color = "#409EFF"
      activePathDom = navWrapperRef.value.children[0].children[0]
      break
    case "/test":
      navWrapperRef.value.children[1].children[0].style.color = "#409EFF"
      activePathDom = navWrapperRef.value.children[1].children[0]
      break
    case "/answer":
      navWrapperRef.value.children[2].children[0].style.color = "#409EFF"
      activePathDom = navWrapperRef.value.children[2].children[0]
      break
    case "/class":
      navWrapperRef.value.children[3].children[0].style.color = "#409EFF"
      activePathDom = navWrapperRef.value.children[3].children[0]
      break
    case "/my":
      navWrapperRef.value.children[4].children[0].style.color = "#409EFF"
      activePathDom = navWrapperRef.value.children[4].children[0]
      break
  }
})
</script>

<template>
  <el-scrollbar>
    <div class="header-image"></div>
    <div class="nav-wrapper" ref="navWrapperRef">
      <div class="nav-item-left" @click="handleRoute($event)"><router-link to="/recommend">推荐</router-link></div>
      <div class="nav-item-left" @click="handleRoute($event)"><router-link to="/test">测验</router-link></div>
      <div class="nav-item-left" @click="handleRoute($event)"><router-link to="/answer">问答助手</router-link></div>
      <div class="nav-item-left" @click="handleRoute($event)"><router-link to="/class">课堂</router-link></div>
      <div class="nav-item-left" @click="handleRoute($event)"><router-link to="/my">我的</router-link></div>
    </div>
    <router-view></router-view>
  </el-scrollbar>
</template>

<style scoped>
.el-scrollbar {
  width: 100%;
  height: 100vh;
}
.header-image {
  width: 100%;
  height: 100px;
  background-image: url("@/assets/image1.jpg");
}
.nav-wrapper{
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 15px 155px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.nav-wrapper::after {
  content: '';
  clear: both;
  display: block;
}
.nav-item-left {
  float: left;
  margin-right: 30px;
}
</style>