<script setup>
import {nextTick, onMounted, ref} from "vue";
import ColumnSplit from "@/components/ColumnSplit.vue";
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver.vue";

onMounted(() => {
  getPaperQuestion()
  getNewQuestion()
})

const body = document.body

//获取试卷已有试题
import {papersViewPaperIdServer} from "@/api/papers.js";
import {questionsFindQuestionOptionsServer} from "@/api/questions.js";
import {useRoute} from "vue-router";
const route = useRoute()
const paperQuestionList = ref([])
async function getPaperQuestion() {
  let question = await papersViewPaperIdServer(route.params.paperId)
  let optionsPromise = question.data.map(item => questionsFindQuestionOptionsServer(item.questionId))
  let optionsRes = await Promise.all(optionsPromise)
  question.data.forEach((item, index) => {
    item.options = optionsRes[index].data
  })
  // paperQuestionList.value.push(...question.data)
  // 将在试卷中试题添加至可选择试题列表，以便完成取消操作
  newQuestionList.value.unshift(...question.data)
  await nextTick(() => {
    let i = 0
    const interval = setInterval(() =>{
      newQuestionRef.value[i].children[0].click()
      i++
      if(i >= question.data.length) {
        clearInterval(interval)
      }
    }, 100)
  })
}

// 获取课堂信息
import {classesGetByIdServer} from "@/api/classes.js";
let bankId = null
async function getNewQuestion() {
  let classInfo = await classesGetByIdServer(route.params.classId)
  bankId = classInfo.data.categoryId
  await getNewQuestionList()
}

// 获取可选择试题信息
import {questionsQuestionAndOptionsServer} from "@/api/questions.js";
const rightColumnRef = ref(null)
const newQuestionList = ref([])
const pageNum = ref(0)
async function getNewQuestionList() {
  pageNum.value++
  let res = await questionsQuestionAndOptionsServer(bankId, pageNum.value)
  newQuestionList.value.push(...res.data.records)
}

// 选择试题
const newQuestionRef = ref(null)
function selectQuestion(e, question, index) {
  // 选择操作
  if(e.currentTarget.innerText === "选择") {
    e.currentTarget.innerText = "取消"
    // 在获取试卷试题后初始化已选择试题时需使用此方法但不添加至试卷，因为试卷内已有试题，因此需判断是否有值
    question && paperQuestionList.value.push(question)
  } else {
    // 取消操作
    e.currentTarget.innerText = "选择"
    let deleteIndex
    paperQuestionList.value.find((item, index) => {
      if(item.questionId === question.questionId){
        deleteIndex = index
        return true
      }
    })
    paperQuestionList.value.splice(deleteIndex, 1)
  }
  e.currentTarget.classList.toggle("operate-selected")
}

// 自动生成操作
import {ElMessageBox, ElMessage} from "element-plus";
import {papersAutoTakePaperServer} from "@/api/papers.js";
const isLoading = ref(false)
async function handleGenerate() {
  try {
    await ElMessageBox.confirm("生成20道题，生成后原有试题将被删除", "自动生成试卷")
    isLoading.value = true
    let res = await papersAutoTakePaperServer(bankId, route.params.paperId)
    isLoading.value = false
    if(res.code === 200) {
      window.location.reload()
    } else {
      ElMessage.error("创建失败")
    }
  } catch (err) {

  }
}
</script>

<template>
  <div class="class-paper-add">
    <ColumnSplit class="split">
      <template #left>
        <div class="left-column">
          <div class="title">预览</div>
          <div class="problem-wrapper">
            <TransitionGroup name="fade">
              <div
                ref="radioGroupWrapperRef"
                class="el-radio-group-wrapper"
                v-for="(item,index) in paperQuestionList"
                :key="item.questionId"
                v-show="item"
              >
                <div class="radio-group-title">{{ `${index + 1}、${item.questionStatement}` }}</div>
                <el-radio-group class="el-radio-group" v-model=item.answer @click.prevent>
                  <el-radio-button
                    v-for="option in (item.options)"
                    :key="option.optionId"
                    :value="option.optionLabel"
                  >
                    {{ option.optionValue }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </template>
      <template #right>
        <div class="right-column" ref="rightColumnRef">
          <div class="title">
            试题
            <el-button
              type="primary"
              class="generate-btn"
              @click="handleGenerate"
              :loading="isLoading"
            >
              自动生成
            </el-button>
          </div>
          <div class="new-question-wrapper">
            <TransitionGroup name="fade">
              <div
                ref="newQuestionRef"
                class="new-question"
                v-for="(question, index) in newQuestionList"
                :key="question.questionId"
                v-show="question"
              >
                {{question.questionStatement}}
                <div class="operate" @click="selectQuestion($event, question, index)">选择</div>
              </div>
            </TransitionGroup>
          </div>
          <InfiniteScrollObserver
             :root-selector="body"
             @handleIntersect="getNewQuestionList"
          >
          </InfiniteScrollObserver>
        </div>
      </template>
    </ColumnSplit>
  </div>
</template>

<style scoped>
.class-paper-add {
  width: 100vw;
  height: 100vh;
}
.left-column,
.right-column {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.left-column::-webkit-scrollbar,
.right-column::-webkit-scrollbar{
  display: none;
}
.title {
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #555;
  text-align: center;
  text-indent: 3px;
  letter-spacing: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
}
.generate-btn {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  letter-spacing: 2px;
  text-indent: 2px;
  padding: 4px 8px;
  border-radius: 99px;
}
.left-column .title {
  color: #4293fd;
}
.problem-wrapper {
  margin: 40px auto 0;
  padding: 0 20px 300px;
  box-sizing: border-box;
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
.new-question-wrapper {
  box-sizing: border-box;
  margin: 40px 30px 0 40px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1);
}
.new-question {
  min-height: 70px;
  line-height: 50px;
  font-size: 1.1rem;
  color: #333;
  background-color: white;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
  padding: 10px 15px;
  transition: 0.1s;
  position: relative;
}
.new-question:last-child {
  border: none;
}
.new-question:hover {
  background-color: #8882;
}
.operate {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 80px;
  background-color: #8ad06d;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 3px;
  text-indent: 3px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
}
.operate-selected {
  width: 100%;
  background-color: #d95959;
  color: #555;
}
</style>