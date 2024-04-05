<script setup>
import {inject, ref} from "vue";
import { intelligenceSendQuestionServer } from '@/api/intelligence.js'
import {Position, CloseBold} from '@element-plus/icons-vue'

const input = ref("")
const isLoading = ref(false)
const answer = ref("")
const title = ref("")

//获取答案
async function getAnswer() {
  isLoading.value = true
  let res = await intelligenceSendQuestionServer(input.value)
  isLoading.value = false
  title.value = input.value
  answer.value = res.data
  input.value = ""
}

//close按钮点击事件
const closeIconRef = ref(null)
const emit = defineEmits(["close", "open"])
const visible = ref(false)
const $bus = inject("$bus")
function handleVisible() {
  if(visible.value) {
    closeIconRef.value.$el.classList.add("close-icon-end")
    $bus.emit("closeAnswer")
  } else {
    closeIconRef.value.$el.classList.remove("close-icon-end")
    $bus.emit("openAnswer")
  }
  visible.value = !visible.value
}

defineExpose({
  handleVisible
})
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <div>知识问答</div>
      <el-icon ref="closeIconRef" class="close-icon" @click="handleVisible"><CloseBold /></el-icon>
    </div>
    <el-scrollbar>
    <Transition name="fade">
      <div class="answer-area" v-show="!isLoading&&answer">
        <h1 class="title">{{title}}</h1>
        <img class="source" src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" alt=""></img>
        <video controls class="source">
          <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
          <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm">WEBM</a>
        </video>
        <div class="answer">
          {{answer}}
        </div>
      </div>
    </Transition>
    </el-scrollbar>
    <div class="search-wrapper">
      <el-input v-model="input" placeholder="请输入问题"></el-input>
      <button class="operate" @click="getAnswer" :disabled="isLoading">
        <el-icon class="send-icon" v-if="input"><Position /></el-icon>
        <span v-else>搜索</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
  backdrop-filter: blur(10px);
  transform: translateZ(0);
  border-bottom: var(--el-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
}
.close-icon {
  cursor: pointer;
  transition: 0.4s;
}
.close-icon-end {
  transform-origin: center;
  transform: rotate(-135deg);
}
.answer-area {
  box-sizing: border-box;
  padding: 60px 25px 250px;
  height: 100%;
}
.title{
  font-size: 2rem;
  margin: 15px 0;
}
.source{
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}
.answer {
  font-size: 1rem;
  line-height: 1.7rem;
  font-family: "Microsoft YaHei UI",serif;
  white-space: break-spaces;
}
.search-wrapper{
  position: absolute;
  bottom: 0;
  z-index: 999;
  width: 100%;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(7px);
  transform: translateZ(0);
  border-top: 1px solid var(--el-border-color);
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
  color: #333;
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
</style>