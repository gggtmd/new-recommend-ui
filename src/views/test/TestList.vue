<script setup>
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver.vue";
import ScaleModal from "@/components/ScaleModal.vue";
import {inject, onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const bankId = ref("")
const pageNum = ref(0)
const questionList = ref([])
const body = document.body
const isLoading = ref(true)
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
  isLoading.value = true
  getQuestionList()
}

//获取数据
import {questionsPageServer} from "@/api/questions.js";
import {personStylePaperQuestionRecommendServer} from "@/api/personStylePaper.js";

async function getQuestionList() {
  //InfiniteScrollObserver组件中，handleIntersect事件在updateQuestionList触发bankId更新前执行，导致进行一次bankId为""的加载请求
  if(bankId.value !== "") {
    if (bankId.value !== "0") {
      pageNum.value++
      let res = await questionsPageServer(bankId.value, pageNum.value)
      questionList.value.push(...res.data.records)
    } else {
      pageNum.value++
      let res = await personStylePaperQuestionRecommendServer()
      questionList.value.push(...res.data)
    }
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}
//表格行颜色
const tableRowClassName = ({row, rowIndex}) => {
  if(row.difficultyLevel === "中等") {
    return "warning-row"
  } else if(row.difficultyLevel === "困难"){
    return "error-row"
  }
  return ""
}
//表格行点击事件
const isShow = ref(false)
const scaleModalRef = ref()
const handleClick = (row, column, event) => {
  scaleModalRef.value.init(event.currentTarget)
  isShow.value = true
  router.push({
    name: "question",
    params: {
      questionId: row.questionId
    }
  })
}
//遮罩点击事件
const handleClickMask = () => {
  isShow.value = false
  router.go(-1)
}
</script>

<template>
  <ScaleModal :show="isShow" ref="scaleModalRef" @clickMask="handleClickMask">
    <router-view></router-view>
  </ScaleModal>
  <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
  <div class="mask" v-if="!questionList.length&&!isLoading">暂无数据</div>
  <Transition name="fade">
    <div class="container" v-if="questionList.length&&!isLoading">
      <el-table
        :data="questionList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        :row-style="{height: '60px'}"
        @row-click="handleClick"
      >
        <el-table-column align="center" prop="questionId" label="题号" width="100"/>
        <el-table-column prop="questionStatement" label="问题"/>
        <el-table-column align="center" prop="assessNumber" label="评价数" width="100"/>
        <el-table-column align="center" prop="assess" label="评分" width="100"/>
        <el-table-column align="center" prop="difficultyLevel" label="难度" width="100"/>
      </el-table>
    </div>
  </Transition>
  <InfiniteScrollObserver :root-selector="body" root-margin="0px 0px 500px 0px" @handleIntersect="getQuestionList"></InfiniteScrollObserver>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  padding: 10px 0;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}
.el-table:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table:deep(.error-row) {
  --el-table-tr-bg-color: var(--el-color-error-light-9);
}
.mask {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  color: #555;
  letter-spacing: 3px;
  min-height: calc(40px + 1.2rem);
  background-color: white;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}
</style>