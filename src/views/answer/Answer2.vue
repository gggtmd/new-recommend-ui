<script setup>
import {ref} from "vue";
import { intelligenceSendQuestionServer } from '@/api/intelligence.js'
import {Position,Loading} from '@element-plus/icons-vue'

const input = ref("")
const isLoading = ref(false)
const answer = ref("")
const title = ref("")

//获取答案
async function getAnswer() {
  isLoading.value = true
  let temInput = input.value
  input.value = ""
  let res = await intelligenceSendQuestionServer(temInput)
  isLoading.value = false
  title.value = temInput
  answer.value = res.data
}

const selectList = ref(['和羹之美，在于合异', '塞翁失马，焉知非福', '咬定青山不放松'])
const selectAnswer = (item, index) => {
  input.value = item
  getAnswer()
}
</script>

<template>
  <div class="wrapper">
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="!answer&&!isLoading">
        <div class="init-answer">
          <div class="init-title">你可以提出问题了解汉语文化:</div>
          <div class="init-content">
            该是一个AI问答系统，你可以提出问题了解汉语文化，例如：和羹之美，在于合异，塞翁失马，焉知非福，咬定青山不放松。
            你还可以了解其它知识。
          </div>
          <div class="init-button">
            <div class="search-select-item" v-for="(item, index) in selectList" :key="item" @click="selectAnswer(item, index)"><el-button>{{item}}</el-button></div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="!answer&&isLoading">
        <div class="loading-statue"><el-icon><Loading /></el-icon></div>
      </div>
    </Transition>
    <div class="header">
      <div>知识问答</div>
    </div>
    <el-scrollbar>
      <Transition name="fade">
        <div class="answer-area" v-show="!isLoading&&answer">
          <h1 class="title">{{title}}</h1>
          <div class="source-wrapper">
            <img class="source" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" alt=""></img>
            <video controls class="source">
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
              <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm">WEBM</a>
            </video>
          </div>
          <div class="answer">
            {{answer}}
          </div>
        </div>
      </Transition>
    </el-scrollbar>
    <div class="foo">
      <div class="search-select">
        <div class="search-select-item">猜你想问:</div>
        <div class="search-select-item" v-for="(item, index) in selectList" :key="item" @click="selectAnswer(item, index)"><el-button>{{item}}</el-button></div>
      </div>
      <div class="search-wrapper">
        <el-input v-model="input" placeholder="请输入问题" @keydown.enter="getAnswer"></el-input>
        <button class="operate" @click="getAnswer" :disabled="isLoading">
          <el-icon class="send-icon" v-if="input"><Position /></el-icon>
          <span v-else>搜索</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  position: relative;
  background-image: radial-gradient(farthest-corner at 40px 40px, rgb(255, 196, 196), rgb(255, 255, 255, 0) 45%),
                    radial-gradient(farthest-corner at 100% 100%, rgb(245, 255, 177), rgb(255, 255, 255, 0) 55%);
}
.header {
  position: absolute;
  top: 0;
  z-index: 999;
  height: 60px;
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  line-height: 60px;
  color: #555;
  letter-spacing: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  transform: translateZ(0);
  border-bottom: var(--el-border);
  text-align: center;
  box-sizing: border-box;
  padding: 0 15px;
}
.answer-area {
  box-sizing: border-box;
  padding: 60px 250px 250px;
  height: 100%;
}
.title{
  font-size: 2rem;
  margin: 15px 0;
}
.source-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.source{
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}
.answer {
  font-size: 1rem;
  line-height: 1.7rem;
  font-family: "Microsoft YaHei UI",serif;
  white-space: break-spaces;
}
.foo {
  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 95px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transform: translateZ(0);
  border-top: 1px solid var(--el-border-color);
  transition: 0.4s;
}
.foo:focus-within {
  height: 160px;
}
.search-select {
  width: 100%;
  height: 65px;
  position: absolute;
  bottom: 95px;
  box-sizing: border-box;
  padding: 25px 330px 0;
  opacity: 0;
  transition: transform 0.3s, opacity 0.2s;
  transform: translateY(40px);
  display: flex;
  justify-content: start;
  align-items: center;
}
.foo:focus-within .search-select {
  opacity: 1;
  transform: translateY(0);
}
.search-select-item {
  height: 40px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.search-select-item .el-button {
  border-radius: 8px;
}
.search-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  padding: 25px 300px;
  width: 100%;
  height: 95px;
}
.el-input{
  height: 45px;
  box-sizing: border-box;
  padding: 0 0 0 20px;
  display: flex;
  align-items: end;
  transition: 0.3s;
}
.el-input:deep(.el-input__wrapper)  {
  height: 100%;
  border-radius: 99px;
  border-width: 2px;
  background-color: rgba(70, 70, 70, 0.1);
}
.el-input:deep(.el-input__inner)  {
  text-indent: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #222;
}
.operate{
  border: none;
  background-color: #4192ff;
  box-sizing: border-box;
  padding: 4px 12px;
  margin: 0 10px;
  border-radius: 99px;
  color: #fff;
  transition: 0.3s;
  font-size: 1.2rem;
  white-space: nowrap;
  height: 45px;
  letter-spacing: 3px;
  text-indent: 3px;
}
.operate:hover{
  background-color: #77b1ff;
}
.operate:disabled{
  background-color: #5f8ac1;
  color: #c6c6c6;
  cursor: not-allowed;
}
.operate:active{
  background-color: #4192ff;
}
.send-icon {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 3px;
}
.pre-answer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.init-answer {
  width: 600px;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.7);
}
.init-title {
  height: 25px;
  line-height: 25px;
  font-size: 25px;
  margin-bottom: 15px;
}
.init-content {
  height: 195px;
  color: #555;
}
.init-button {
  display: flex;
  height: 40px;
}
.loading-statue {
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: #555;
  animation: infinite 1.5s loadingStart linear;
  transform-origin: center center;
}
@keyframes loadingStart {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>