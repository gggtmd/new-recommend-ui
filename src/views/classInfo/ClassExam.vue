<script setup>
import {onMounted, ref} from "vue";
import ClassExamAdd from "@/views/classInfo/ClassExamAdd.vue";
import ClassExamEdit from "@/views/classInfo/ClassExamEdit.vue";

onMounted(() => {
  getExam()
})

const examList = ref([])

//获取课堂考试
import {examsPageServer} from "@/api/exams.js";
import {useRoute} from "vue-router";
const route = useRoute()
const isLoading = ref(true)
const pageNum = ref(1)
const examTitle = ref("")
async function getExam() {
  const classId = route.params.classId
  //获取课堂阶段
  let res = await examsPageServer(classId, pageNum.value, examTitle.value)
  examList.value.push(...res.data.records)
  if(res.data.records.length) {
    pageNum.value++
    await getExam()
  } else {
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
}


const classExamAddRef = ref(null)
const classExamEditRef = ref(null)
//单击详情
import {useRouter} from "vue-router";
const router = useRouter()
function handleDetail(item, index) {
  const routerURL = router.resolve({
    name: "examInfo",
    params: {
      examId: item.examId
    }
  })
  window.open(routerURL.href, "_blank")
}

//单击编辑
let editFormData = ref({})
function handleEdit(item, index) {
  item.timeRange = [item.startTime, item.endTime]
  editFormData.value = JSON.parse(JSON.stringify(item))
  classExamEditRef.value.dialogVisible()
}

//新增考试
function handleAdd() {
  classExamAddRef.value.dialogVisible()
}
</script>

<template>
  <div class="class-notice">
    <div class="header">
      <div class="title">考试</div>
      <el-button class="add-btn" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <el-divider></el-divider>
    <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
    <div class="mask" v-if="!examList.length&&!isLoading">暂无数据</div>
    <Transition name="fade">
      <ul class="notice-wrapper" v-show="!isLoading">
        <li class="exam-item" v-for="(item, index) in examList">
          <div class="stage">{{ item.examTitle }}</div>
          <div class="stage time">
            开始时间:
            <span>
              {{ item.startTime }}
            </span>
          </div>
          <div class="stage time">
            结束时间:
            <span>
              {{ item.endTime }}
            </span>
          </div>
          <div class="operate-area">
            <div
                class="operate"
                @click="handleDetail(item, index)"
            >
              预览
            </div>
            <div
                class="operate"
                @click="handleEdit(item, index)"
            >
              编辑
            </div>
          </div>
        </li>
      </ul>
    </Transition>
    <ClassExamAdd ref="classExamAddRef"></ClassExamAdd>
    <ClassExamEdit ref="classExamEditRef" :examInfo="editFormData"></ClassExamEdit>
  </div>
</template>

<style scoped>
.class-notice {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
}
.add-btn {
  letter-spacing: 5px;
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
.notice-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}
.exam-item {
  box-sizing: border-box;
  padding: 20px 0;
  border-bottom: var(--el-border);
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  transition: 0.15s;
  position: relative;
}
.exam-item:last-child {
  border: none;
}
.exam-item:hover {
  background-color: #409EFF1B;
  z-index: 999;
}
.stage {
  height: 100%;
  margin-left: 15px;
  white-space: nowrap;
}
.time {
  display: inline-block;
  margin-top: 10px;
  font-size: 1rem;
}
.time span {
  color: #55be21;
}
.operate-area {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.operate {
  color: #55be21;
  cursor: pointer;
  padding: 0 20px 0 0;
}
.operate:last-child {
  color: #4293fd;
}
</style>