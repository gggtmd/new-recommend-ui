<script setup>
import {inject, onMounted, ref} from "vue";
import {questionBankListServer} from "@/api/question-bank.js";

onMounted(() => {
  initQuestionBankList()
})

const buttons = ref([])
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
  initActive()
}
//路由获取激活路径，确认激活按钮，触发updateQuestionList事件
import {useRouter} from "vue-router";
const router = useRouter()
const activeBankIndex = ref("")
const $bus = inject("$bus")
function initActive() {
  //根据路径，确认激活按钮的index
  let activeBankId = Number(router.currentRoute.value.path.substring(router.currentRoute.value.path.lastIndexOf("/") + 1))
  let index = buttons.value.findIndex(item => item.bankId === activeBankId)
  //激活新按钮，重置旧按钮
  buttons.value[index].type = "primary"
  if(activeBankIndex.value) {
    buttons.value[activeBankIndex.value].type = ""
  }
  activeBankIndex.value = String(index)
  $bus.emit("updateQuestionList")
}

//按钮点击,路由跳转，按钮切换
async function handleClick(index) {
  let newActiveId = buttons.value[index].bankId
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
  <el-button
      v-for="(button, index) in buttons"
      :key="button.bankId"
      :type="button.type"
      round
      @click="handleClick(index)"
  >{{ button.bankName }}
  </el-button>
</template>

<style scoped>
.el-button {
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>