<script setup>
import {ref, onMounted} from "vue";
import AnswerDetail from "@/components/AnswerDetail.vue";

const isInit = ref(false)
onMounted(() => {
  getQuestionList()
})

// 获取试题数据
import {papersViewPaperIdServer} from "@/api/papers.js";
import {questionsFindQuestionOptionsServer} from "@/api/questions.js";
import {examsGetByIdServer} from "@/api/exams.js";
import {useRoute} from "vue-router";
const route = useRoute()
const exam = ref({})
const questionList = ref([])
async function getQuestionList() {
  // 考试数据
  let examRes = await examsGetByIdServer(route.params.examId)
  exam.value = examRes.data
  // 题干数据
  let res = await papersViewPaperIdServer(exam.value.paperId)
  questionList.value = res.data
  // 选项数据
  let optionRequest = []
  res.data.map(item => {
    optionRequest.push(questionsFindQuestionOptionsServer(item.questionId))
  })
  let optionList = await Promise.all(optionRequest)
  if(optionList) {
    optionList.forEach((item, index) => {
      questionList.value[index].options = item.data
    })
  }
  isInit.value = true
}

//完成一个题目，修改题目详情组件数据
const answerDetailRef = ref()
function handleChange(index) {
  answerDetailRef.value.checkGroup[index] = index
}

//点击题目详情卡片的回调方法
const scrollRef = ref()
const radioGroupWrapperRef = ref()
function handleSelect(index) {
  scrollRef.value.setScrollTop(radioGroupWrapperRef.value[index].offsetTop - 176)
  setTimeout(() => {
    radioGroupWrapperRef.value[index].style.backgroundColor = "#409EFF30"
  },400)
  setTimeout(() => {
    radioGroupWrapperRef.value[index].style.backgroundColor = ""
  },600)
}
</script>

<template>
  <AnswerDetail ref="answerDetailRef" class="answer-detail" :data="questionList" @handleSelect="handleSelect"></AnswerDetail>
  <div class="title">{{exam.examTitle}}</div>
  <el-scrollbar ref="scrollRef" class="el-scrollbar" wrap-style="scroll-behavior: smooth;">
    <div class="problem-wrapper">
      <div ref="radioGroupWrapperRef" class="el-radio-group-wrapper" v-for="(item,index) in questionList" :key="item.questionId">
        <div class="radio-group-title">{{ `${index + 1}、${item.questionStatement}` }}</div>
        <el-radio-group class="el-radio-group" v-model=item.studentAnswer @change="handleChange(index)">
          <el-radio-button v-for="option in (item.options)" :key="option.optionId" :value="option.optionLabel">{{ option.optionValue }}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </el-scrollbar>
  <div class="info-card">
    <div class="info-title">开始时间:</div>
    <div class="info-item">{{exam.startTime}}</div>
    <div class="info-title">结束时间:</div>
    <div class="info-item">{{exam.endTime}}</div>
  </div>
</template>

<style scoped>
.answer-detail {
  width: 13%;
  position: absolute;
  top: 80px;
  left: 20px;
  z-index: 1;
  border-radius: 4px;
}
.title{
  font-size: 1.7rem;
  font-weight: bold;
  color: #333;
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
.el-scrollbar {
  height: 100vh;
  background-color: #fafafa;
}
.problem-wrapper {
  margin: 76px auto 0;
  max-width: 60%;
  min-width: 600px;
  padding-bottom: 300px;
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
.info-card {
  position: absolute;
  top: 80px;
  right: 1%;
  width: 13%;
  border-radius: 8px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: 0.5s;
  box-sizing: border-box;
  padding: 20px 12px 10px;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.4rem;
  color: #555;
}
.info-card:hover {
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
}
.info-item {
  text-align: center;
  margin-bottom: 10px;
  color: #4293fd;
}
.info-item:last-child {
  color: #ff4242;
}
</style>