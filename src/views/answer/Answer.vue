<script setup>
import {ref} from "vue";
import { intelligenceSendQuestionServer } from '@/api/intelligence.js'

const input = ref("")
const disabled = ref(false)
const answer = ref("")
const title = ref("")

//获取答案
async function getAnswer() {
  disabled.value = true
  let res = await intelligenceSendQuestionServer(input.value)
  disabled.value = false
  title.value = input.value
  answer.value = res.data
  input.value = ""
}
</script>

<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <span class="logo">知识问答</span>
      <el-input v-model="input"></el-input>
      <button class="operate" @click="getAnswer" :disabled="disabled">搜索</button>
    </div>
    <Transition name="fade-slide">
      <div v-show="!disabled">
        <h1 class="title">{{title}}</h1>
        <img class="source" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" alt=""></img>
        <video controls class="source">
          <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
          <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm">WEBM</a>
        </video>
        <pre class="answer">
          {{answer}}
        </pre>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  height: calc(100vh + 50px);
  box-sizing: border-box;
  padding: 0 150px;
}
.search-wrapper{
  position: sticky;
  top: calc(1.3rem + 35px);
  z-index: 999;
  width: 100%;
  height: 50px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo{
  font-size: 40px;
  color: #6c6c6c;
  font-weight: bold;
  height: 100%;
}
.el-input{
  width: 35%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  align-items: end;
  transition: 0.3s;
}
.el-input:focus-within{
  width: 50%;
}
.el-input:deep(.el-input__wrapper)  {
  height: 90%;
  border-radius: 12px;
  border-width: 2px;
}
.operate{
  border: none;
  background-color: #60a5ff;
  box-sizing: border-box;
  padding: 4px 8px;
  border-radius: 8px;
  color: #2d2d2d;
  transition: 0.3s;
  font-size: 22px;
}
.operate:hover{
  background-color: #4293fd;
  color: #515151;
}
.operate:disabled{
  background-color: #5f8ac1;
  color: #c6c6c6;
  cursor: not-allowed;
}
.operate:active{
  background-color: #60a5ff;
  color: #2d2d2d;
}
.title{
  font-size: 36px;
  margin-bottom: 20px;
  text-indent: 5px;
}
.source{
  width: 300px;
  height: 168px;
  border-radius: 8px;
  margin-right: 20px;
}
.answer {
  font-size: 1rem;
  font-family: "Microsoft YaHei UI",serif;
  white-space: break-spaces;
}
</style>