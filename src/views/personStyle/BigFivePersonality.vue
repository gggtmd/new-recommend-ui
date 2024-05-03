<script setup>
import {InfoFilled, ArrowLeftBold} from "@element-plus/icons-vue";
import {ref, onMounted} from "vue";
import {bigFivePaperListServer} from "@/api/bigFivePaper.js";
import AnswerDetail from "@/components/AnswerDetail.vue";

const isInit = ref(false)
onMounted(() => {
  getStudyStylePaper()
})

// 获取风格问卷题目
const problemList = ref([])
async function getStudyStylePaper() {
  let res = await bigFivePaperListServer()
  problemList.value = res.data
  isInit.value = true
}

const answerDetailRef = ref()
//完成一个题目，修改题目详情组件数据
function handleChange(index) {
  answerDetailRef.value.checkGroup[index] = index
}

const scrollRef = ref()
const radioGroupWrapperRef = ref()
//点击题目详情的回调方法
function handleSelect(index) {
  scrollRef.value.setScrollTop(radioGroupWrapperRef.value[index].offsetTop - 176)
  setTimeout(() => {
    radioGroupWrapperRef.value[index].style.backgroundColor = "#409EFF50"
  },400)
  setTimeout(() => {
    radioGroupWrapperRef.value[index].style.backgroundColor = ""
  },800)
}

//验证题目是否全部完成,返回第一个未完成题目相关信息
function problemListValidate() {
  return problemList.value.find((item) => !item.studentAnswer)
}

//提交风格测试
import {bigFivePaperSaveServer} from "@/api/bigFivePaper.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
const router = useRouter()
const isLoading = ref(false)
async function savePersonStylePaper() {
  if (!problemListValidate()) {
    isLoading.value = true
    let res = await bigFivePaperSaveServer(JSON.stringify(problemList.value))
    isLoading.value = false
    if(res.code === 200) {
      await router.push('/')
    }
  } else {
    ElMessage.warning("请完成所有题目")
  }
}

const routerTo = () => {
  router.push({
    name: 'index'
  })
}
</script>

<template>
  <AnswerDetail ref="answerDetailRef" class="answer-detail" :data="problemList" @handleSelect="handleSelect"></AnswerDetail>
  <div class="title">
    大五人格
    <el-button
      link
      type="primary"
      class="title-back"
      @click="routerTo"
    >
      <el-icon><ArrowLeftBold /></el-icon>
      返回
    </el-button>
  </div>
  <el-scrollbar ref="scrollRef" class="el-scrollbar" wrap-style="scroll-behavior: smooth;">
    <div class="problem-wrapper">
      <div
        ref="radioGroupWrapperRef"
        class="el-radio-group-wrapper"
        v-for="(item,index) in problemList"
        :key="item.id"
      >
        <div class="radio-group-title">{{ `${index + 1}、${item.questionName}` }}</div>
        <el-radio-group class="el-radio-group" v-model=item.studentAnswer @change="handleChange(index)">
          <el-radio-button :value="item.option1">{{ item.option1 }}</el-radio-button>
          <el-radio-button :value="item.option2">{{ item.option2 }}</el-radio-button>
          <el-radio-button :value="item.option3">{{ item.option3 }}</el-radio-button>
          <el-radio-button :value="item.option4">{{ item.option4 }}</el-radio-button>
          <el-radio-button :value="item.option5">{{ item.option5 }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="footer" v-show="isInit">
        <div class="footer-title">请填写完此问卷</div>
        <div class="el-icon-info">
          填写问卷以为您个性化推荐资源
        </div>
        <div class="footer-button">
          <el-button type="primary" @click="savePersonStylePaper" :loading = isLoading>提 交</el-button>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.answer-detail {
  width: 240px;
  max-height: calc(100vh - 120px);
  position: absolute;
  top: 80px;
  left: 20px;
  z-index: 1;
  border-radius: 4px;
}
.title{
  font-size: 1.7rem;
  font-weight: bold;
  color: #555;
  text-align: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px 0;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  letter-spacing: 10px;
  backdrop-filter: blur(10px);
}
.title-back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  font-size: 1.1rem;
}
.el-scrollbar {
  height: 100vh;
  background-color: #fafafa;
}
.problem-wrapper {
  margin: 76px auto 400px 300px;
  min-width: 800px;
}
.el-radio-group-wrapper{
  margin-top: 50px;
  transition: 0.2s;
}
.radio-group-title{
  margin-bottom: 20px;
  font-size: 1.1rem;
}
.el-radio-group {
  margin-left: 1.2rem;
}
.footer{
  position: absolute;
  top: 80px;
  right: 20px;
  background-color: white;
  padding: 10px 12px 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  width: 240px;
}
.footer-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}
.el-icon-info{
  display: flex;
  align-items: center;
  color: rgb(121, 118, 118);
  margin-bottom: 20px;
}
.footer-button .el-button {
  width: 100%;
}
</style>