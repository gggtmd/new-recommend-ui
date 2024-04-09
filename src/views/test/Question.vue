<script setup>
import {nextTick, onMounted, ref} from "vue";

onMounted(() => {
  getData()
})

const question = ref({})
const options = ref([])
const answer = ref("")
const isSubmit = ref(false)
const isLoading = ref(false)
const radioRef = ref()

//获取试题题目和选项
import {useRoute} from "vue-router";
import { questionsFindQuestionOptionsServer, questionsFindQuestionServer} from "@/api/questions.js";
const route = useRoute()
async function getData() {
  const questionId = route.params.questionId
  let questionPromise = []
  questionPromise.push(
      questionsFindQuestionServer(questionId),
      questionsFindQuestionOptionsServer(questionId)
  )
  let [questionRes, optionsRes] = await Promise.all(questionPromise)
  question.value = questionRes.data
  options.value = optionsRes.data
}

//提交答案
import {recordsSaveServer} from "@/api/records.js";
async function submitAnswer() {
  isLoading.value = true
  let res = await recordsSaveServer(question.value.questionId, answer.value)
  if(res.code === 200) {
    setTimeout(() => {
      isSubmit.value = true
      isLoading.value = false
      nextTick(() => {
        radioRef.value[answer.value.charCodeAt(0) - 65].$el.classList.add("error-radio")
        radioRef.value[question.value.answer.charCodeAt(0) - 65].$el.classList.add("correct-radio")
      })
    }, 300)
  }
}
</script>

<template>
  <div class="question">
    <div class="title">
      {{question.questionStatement}}
    </div>
    <el-radio-group v-model="answer" fill="#409eff" :disabled="isSubmit">
      <el-radio
          ref="radioRef"
          v-for="item in options"
          :value="item.optionLabel"
          size="large" border
      >
        {{item.optionValue}}
      </el-radio>
      <Transition name="fade">
        <el-button
          v-if="answer"
          type="primary"
          class="btn"
          :loading="isLoading"
          :disabled="isSubmit"
          @click="submitAnswer"
        >
          提交
        </el-button>
      </Transition>
    </el-radio-group>
  </div>
</template>

<style scoped>
.question {
  box-sizing: border-box;
  padding: 30px;
  height: 100%;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}
.el-radio-group {
  display: block;
  max-width: 450px;
  position: relative;
}
.el-radio {
  width: 100%;
  margin-bottom: 20px;
}
.el-radio:deep(.el-radio__input) {
  display: none;
}
.btn {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 10px;
  transition: 0.2s;
}
.error-radio {
  border-width: 2px;
  border-color: #ff2b2b !important;
}
.correct-radio {
  border-width: 2px;
  border-color: #55be21 !important;
}
</style>