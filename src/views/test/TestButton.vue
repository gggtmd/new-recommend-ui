<script setup>
import {inject, onMounted, ref} from "vue";
import {questionBankListServer} from "@/api/question-bank.js";

onMounted(() => {
  initQuestionBankList()
})

const buttons = ref([])
const time = ref(0)
//获取buttons
async function initQuestionBankList() {
  let res = await questionBankListServer()
  buttons.value.push({
    bankId: 0,
    bankName: "推荐试题",
    type: ""
  })
  buttons.value.push(...res.map(item => {
    item.type = ""
    return item
  }))
  setInterval(() => {
    time.value += 1
  }, 150)
  initActive()
}
//路由获取激活路径，确认激活按钮，触发updateQuestionList事件
import {useRouter, useRoute} from "vue-router";
const router = useRouter()
const route =useRoute()
const currentBankId = ref(-1)
const $bus = inject("$bus")
function initActive() {
  //根据路径，确认激活按钮的index
  const activeBankId = Number(route.params.bankId)
  //激活新按钮，重置旧按钮
  buttons.value.find(item => item.bankId === activeBankId).type = "primary"
  // buttons.value[activeBankId].type = "primary"
  if(currentBankId.value >= 0) {
    // buttons.value[currentBankId.value].type = ""
    buttons.value.find(item => item.bankId === currentBankId.value).type = ""
  }
  currentBankId.value = activeBankId
  $bus.emit("updateQuestionList")
}

//按钮点击,路由跳转，按钮切换
async function handleClick(button, index) {
  if(button.bankId === currentBankId.value) {
    return
  }
  let newActiveId = button.bankId
  await router.push({
    name: "testList",
    params: {
      bankId: newActiveId
    }
  })
  initActive()
}
</script>

<template>
  <Transition name="fade-slide" v-for="(button, index) in buttons">
    <el-button
        :key="button.bankId"
        v-show="time > index"
        :type="button.type"
        round
        @click="handleClick(button, index)"
    >{{ button.bankName }}
    </el-button>
  </Transition>
</template>

<style scoped>
.el-button {
  font-size: 1rem;
  font-weight: bold;
  //letter-spacing: 2px;
  margin-bottom: 10px;
}
</style>