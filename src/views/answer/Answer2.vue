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
const sourceList = ref([
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%5B%E5%B9%B3%E2%80%9C%E8%AF%AD%E2%80%9D%E8%BF%91%E4%BA%BA%5D%E5%92%8C%E7%BE%B9%E4%B9%8B%E7%BE%8E%20%E5%9C%A8%E4%BA%8E%E5%90%88%E5%BC%82.mp4',
  },
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%A1%9E%E7%BF%81.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E7%BB%8F%E5%85%B8%E6%88%90%E8%AF%AD%E6%95%85%E4%BA%8B%EF%BC%9A%E5%A1%9E%E7%BF%81%E5%A4%B1%E9%A9%AC%E7%84%89%E7%9F%A5%E9%9D%9E%E7%A6%8F%EF%BC%8C%E8%BF%99%E4%B8%AA%E6%95%85%E4%BA%8B%E8%AF%B4%EF%BC%8C%E4%B8%8D%E8%83%BD%E5%BE%97%E6%84%8F%E5%A4%AA%E6%97%A9%2C%E4%BA%B2%E5%AD%90%2C%E6%97%A9%E6%95%99%2C%E5%A5%BD%E7%9C%8B%E8%A7%86%E9%A2%91.mp4'
  },
  {
    imageURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1.png',
    videoURL: 'https://big-event-kanwo.oss-cn-beijing.aliyuncs.com/%E5%92%AC%E5%AE%9A%E9%9D%92%E5%B1%B1%E4%B8%8D%E6%94%BE%E6%9D%BE%EF%BC%88%E9%83%91%E7%87%AE%E8%AF%8D%20%20%20%E5%88%98%E8%BF%9B%E6%88%90%E6%9B%B2%20%E9%99%88%E8%8B%8F%E5%A8%81%E6%BC%94%E5%94%B1%EF%BC%89.mp4'
  }
])
const sourceIndex = ref(0)
const selectAnswer = (item, index) => {
  input.value = item
  sourceIndex.value = index
  getAnswer()
}
</script>

<template>
  <div class="wrapper">
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="!answer&&!isLoading">
        <div class="init-answer">
          <div class="init-title">为留华学生量身定制的“实时问答”功能:</div>
          <div class="init-content">
            <p>留学之旅不仅仅是学术的提升，更是对中华文化深厚底蕴的探索。为了帮助来自世界各地的留华学生更好地融入中国，理解并欣赏这片古老土地上的文化传统与现代发展，我们专门推出了“实时文化问答”功能。</p>
            <p>这项功能旨在为留华学生提供一个方便快捷的平台，无论是在学术研究中遇到的文化难题，还是日常生活中对中国习俗、历史故事、艺术作品、文学作品或流行趋势产生的好奇，都可以通过我们的实时问答系统得到解答。</p>
            <p>您只需输入他们感兴趣的中华文化相关问题，系统便会实时响应，提供详尽准确的信息和解答。这不仅是一个简单的问答过程，而是一个深入的学习体验，让留华学生能够即时连接到丰富的中华文化知识库，从学术角度到生活实践，从古典艺术到现代流行，无缝对接各类文化话题。</p>
            <p>我们的实时问答系统将成为留华学生的信源和伙伴，助力他们在求学之路上更加自如地与中国社会和文化融合，扩展视野，丰富在中国的留学生活体验。欢迎每一位对中华文化抱有热情的留华学生，利用这个功能，一起沉浸在千年文化的长河中，共同感受其带来的知识愉悦和心灵震撼。</p>
          </div>
          <div class="init-button">
            <div class="search-select-item" v-for="(item, index) in selectList" :key="item" @click="selectAnswer(item, index)"><el-button>{{item}}</el-button></div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition name="fade">
      <div class="answer-area pre-answer" v-if="isLoading">
        <div class="loading-statue"><el-icon><Loading /></el-icon></div>
      </div>
    </Transition>
    <div class="header">
      <div>实时问答</div>
    </div>
    <el-scrollbar>
      <Transition name="fade">
        <div class="answer-area show-answer" v-show="!isLoading&&answer">
          <h1 class="title">{{title}}</h1>
          <div class="source-wrapper">
            <img class="source" :src="sourceList[sourceIndex].imageURL" alt=""></img>
            <video controls class="source">
              <source :src="sourceList[sourceIndex].videoURL" type="video/mp4" />
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
  height: calc(100vh - 120px);
  overflow: hidden;
  position: relative;
  //background-image: radial-gradient(farthest-corner at 40px 40px, rgb(255, 196, 196), rgb(255, 255, 255, 0) 45%),
  //                  radial-gradient(farthest-corner at 100% 100%, rgb(245, 255, 177), rgb(255, 255, 255, 0) 55%);
}
.header {
  position: absolute;
  top: 0;
  z-index: 99;
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
  //box-sizing: border-box;
  ////padding: 60px 350px 250px;
  //height: 100%;
}
.show-answer {
  width: 1080px;
  margin: 80px auto 250px;
}
.title{
  font-size: 2rem;
  margin: 20px 0;
}
.source-wrapper {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.source{
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);;
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
  z-index: 99;
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
  width: 800px;
  //height: 300px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 15px 15px 10px 15px;
  background-color: rgba(255, 255, 255, 0.7);
}
.init-title {
  height: 25px;
  line-height: 25px;
  font-size: 25px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
}
.init-content {
  color: #333;
  margin-bottom: 15px;
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