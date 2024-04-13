<script setup>
import {onMounted, ref} from "vue";

const studentList = ref([])
const search = ref("")
const isLoading = ref(false)

onMounted(() => {
  getStudentData()
})

// 获取学生数据
import { learningClassAllStudentLearningServer } from '@/api/learning.js'
import {useRoute} from "vue-router";
const route = useRoute()

const formPerformance = {
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E'
}

const formWarning = {
  '1': '最佳',
  '2': '正常',
  '3': '轻度',
  '4': '中度',
  '5': '重度'
}
async function getStudentData() {
  isLoading.value = true
  let res = await learningClassAllStudentLearningServer(route.params.classId)
  studentList.value.push(...res.data.map(item => {
    return {
      userId: item.userId,
      userName: item.userName,
      stagePerformance: formPerformance[item.stagePerformance],
      warning: formWarning[item.warning]
    }
  }))
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// 删除学生
import {classUserClassStudentDelServer} from "@/api/classUser.js";
import {ElMessage, ElMessageBox} from "element-plus";
async function handleDelete(index, row) {
  try {
    await ElMessageBox.confirm("删除后不可修改", "删除学生")
    let res = await classUserClassStudentDelServer(route.params.classId, row.userId)
    if (res.code === 200) {
      window.location.reload()
    } else {
      ElMessage.error("删除失败")
    }
  } catch (err) {

  }
}

// 查看学生
const handleCheck = (index, row) => {

}
</script>

<template>
  <div class="class-student">
    <div class="title">学员</div>
    <el-divider></el-divider>
    <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
    <div class="mask" v-else-if="!studentList.length">暂无数据</div>
    <Transition name="fade">
      <el-table
        :data="studentList.filter(data => !search || data.userId.toString().includes(search) || data.userName.toLowerCase().includes(search.toLowerCase()))"
        :row-style="{height: '60px'}"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center', 'color': '#000' }"
        v-show="!isLoading&&studentList.length"
      >
        <el-table-column prop="userId" label="学生id"/>
        <el-table-column prop="userName" label="用户名"/>
        <el-table-column prop="stagePerformance" label="当前表现"/>
        <el-table-column prop="warning" label="预警级别"/>
        <el-table-column>
          <template #header>
            <el-input class="header-input" size="small" v-model="search"  placeholder="输入学号/用户名" />
          </template>
          <template #default="scope" v-roleJudge="2">
            <el-button link type="danger" @click.stop="handleDelete(scope.$index, scope.row)" v-roleJudge="2">删 除</el-button>
            <el-button link type="primary" @click.stop="handleCheck(scope.$index, scope.row)" v-roleJudge="2">查 看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Transition>
  </div>
</template>

<style scoped>
.class-student{
  width: 100%;
  height: 100%;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
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
.el-table{
  margin-left: 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  border-radius: 8px;
}
.el-table:deep(.el-table__header-wrapper),
.el-table:deep(.el-table__header){
  height: 60px;
}
.header-input{
  width: 80%;
  height: 35px;
}
.header-input:deep(.el-input__wrapper) {
  border-radius: 7px;
  font-size: 0.9rem;
}
.el-table .el-button {
  font-weight: bold;
}
</style>