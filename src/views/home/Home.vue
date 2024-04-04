<script setup>
import {onMounted, ref} from "vue";
import {CloseBold} from '@element-plus/icons-vue'

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
import Answer2 from "@/views/answer/Answer2.vue";
const pathStore = usePathStore()
const navWrapperRef = ref()
onMounted(() => {
  const subIndex = pathStore.path.indexOf("/",1)
  let path
  if(subIndex > 0) {
    path = pathStore.path.substring(0, subIndex)
  } else {
    path = pathStore.path
  }
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

// 关闭answer触发
const answerContainerRef = ref(null)
const answerWidth = ref("0")
const answerBtnRef = ref(null)
function handleClose() {
  answerWidth.value = "0"
  answerContainerRef.value.classList.add("answer-container-close")
  answerBtnRef.value.classList.remove("open-answer-btn-toggle")
}

// 关闭answer触发
function handleOpen() {
  answerWidth.value = "500px"
  answerContainerRef.value.classList.remove("answer-container-close")
  answerBtnRef.value.classList.add("open-answer-btn-toggle")
}

//切换answer显示
const answerRef = ref(null)
function handleToggle() {
  answerRef.value.handleVisible()
}
</script>

<template>
  <div class="split">
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
      <Transition name="fade">
        <div ref="answerBtnRef" class="open-answer-btn" @click="handleToggle">
          <el-icon><CloseBold /></el-icon>
        </div>
      </Transition>
    </el-scrollbar>
    <div class="answer-container" ref="answerContainerRef">
      <Answer2 ref="answerRef" @close="handleClose" @open="handleOpen"></Answer2>
    </div>
  </div>
</template>

<style scoped>
.split {
  display: flex;
}
.el-scrollbar {
  width: 100%;
  height: 100vh;
}
.header-image {
  width: 100%;
  height: 100px;
  background-image: url("@/assets/head-image.png");
  background-size: 100% 100%;
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
  height: 60px;
  box-sizing: border-box;
  padding: 15px 150px;
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
.answer-container {
  width: v-bind(answerWidth);
  height: 100vh;
  background-color: white;
  transition: 0.6s;
  transform-origin: right;
}
.answer-container-close {
  transform: scaleX(0);
}
.open-answer-btn {
  position: absolute;
  right: 20px;
  top: 50%;
  width: 30px;
  height: 30px;
  font-size: 30px;
  line-height: 30px;
  transition: 0.4s;
  transform: rotate(-45deg);
  background-color: #4293fd;
  padding: 10px;
  border-radius: 999px;
  cursor: pointer;
}
.open-answer-btn-toggle {
  display: none;
}
</style>