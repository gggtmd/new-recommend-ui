<script setup>
import {InfoFilled} from "@element-plus/icons-vue";
import {ref, onMounted} from "vue";
import {studyStylePaperListServer} from "@/api/studyStylePaper.js";
import AnswerDetail from "@/components/AnswerDetail.vue";

const isInit = ref(false)
onMounted(() => {
  getStudyStylePaper()
})

// 获取风格问卷题目
const problemList = ref([])
async function getStudyStylePaper() {
  let res = await studyStylePaperListServer()
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
    radioGroupWrapperRef.value[index].style.backgroundColor = "#409EFF30"
  },400)
  setTimeout(() => {
    radioGroupWrapperRef.value[index].style.backgroundColor = ""
  },600)
}

//验证题目是否全部完成,返回第一个未完成题目相关信息
function problemListValidate() {
  return problemList.value.find((item) => !item.studentAnswer)
}

//提交风格测试
import {personStylePaperSaveServer} from "@/api/personStylePaper.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";


const router = useRouter()
const isLoading = ref(false)
async function savePersonStylePaper() {
  if (!problemListValidate()) {
    isLoading.value = true
    let res = await personStylePaperSaveServer(JSON.stringify(problemList.value))
    isLoading.value = false
    if(res.code === 200) {
      await router.push('/')
    }
  } else {
    ElMessage.warning("请完成所有题目")
  }
}
</script>

<template>
  <AnswerDetail ref="answerDetailRef" class="answer-detail" :data="problemList" @handleSelect="handleSelect"></AnswerDetail>
  <div class="title">调查问卷</div>
  <el-scrollbar ref="scrollRef" class="el-scrollbar" wrap-style="scroll-behavior: smooth;">
    <div class="problem-wrapper">
      <div ref="radioGroupWrapperRef" class="el-radio-group-wrapper" v-for="(item,index) in problemList" :key="item.id">
        <div class="radio-group-title">{{ `${index + 1}、${item.questionName}` }}</div>
        <el-radio-group class="el-radio-group" v-model=item.studentAnswer @change="handleChange(index)">
          <el-radio-button value="item.option1">{{ item.option1 }}</el-radio-button>
          <el-radio-button value="item.option2">{{ item.option2 }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="footer" v-show="isInit">
        <div class="el-icon-info">
          <el-icon><InfoFilled /></el-icon>填写问卷以为您个性化推荐资源
        </div>
        <div>
          <el-button type="primary" @click="savePersonStylePaper" :loading = isLoading>提 交</el-button>
        </div>
      </div>
    </div>
  </el-scrollbar>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 150px;
}
.el-icon-info{
  color: rgb(160, 157, 157);
}
</style>