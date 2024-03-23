<script setup>
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver.vue";
import {inject, onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const bankId = ref("")
const pageNum = ref(0)
const questionList = ref([])
const body = document.body
//挂载事件，响应bankId变化
const $bus = inject("$bus")
onMounted(() => {
  $bus.on("updateQuestionList", updateQuestionList)
})

onBeforeUnmount(() => {
  $bus.off("updateQuestionList", updateQuestionList)
})

//更新数据类型，清空数据，重新获取数据
function updateQuestionList() {
  bankId.value = router.currentRoute.value.path.substring(router.currentRoute.value.path.lastIndexOf("/") + 1)
  questionList.value = []
  pageNum.value = 0
  getQuestionList()
}

//获取数据
import {questionsPageServer} from "@/api/questions.js";
async function getQuestionList() {
  //InfiniteScrollObserver组件中，handleIntersect事件在updateQuestionList触发bankId更新前执行，导致进行一次bankId为""的加载请求
  if(bankId.value !== "") {
    pageNum.value++
    let res = await questionsPageServer(bankId.value, pageNum.value)
    questionList.value.push(...res.data.records)
  }
}
</script>

<template>
  <div>
    <div v-for="item in questionList">{{item}}</div>
    <InfiniteScrollObserver :root-selector="body" @handleIntersect="getQuestionList"></InfiniteScrollObserver>
  </div>
</template>

<style scoped>

</style>