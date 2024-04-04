<!--<script>-->
<!--import { getClassStudentId,deleteClassStudent } from '@/api/classApis'-->
<!--import {getUserArrayInfo} from '@/api/userApis.js'-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      classId: 0,-->
<!--      studentList: [], //学生表格数据-->
<!--      search: '', //搜索框-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    //删除按钮-->
<!--    handleDelete(index, row) {-->
<!--      this.deleteLine(index, row);-->
<!--    },-->
<!--    //获取表格数据-->
<!--    getData() {-->
<!--      getClassStudentId(this.classId,1)-->
<!--        .then((res1) => {-->
<!--          let userId = [];-->
<!--          res1.forEach((item) => {-->
<!--            userId.push(item.userId)-->
<!--          });-->
<!--          if(userId.length > 0){-->
<!--            getUserArrayInfo(userId)-->
<!--            .then((res2) => {-->
<!--              res2.data.forEach((item) => {-->
<!--                this.studentList.push(item)-->
<!--              });-->
<!--            })-->
<!--          }-->
<!--        });-->
<!--    },-->
<!--    //删除当前行数据-->
<!--    deleteLine(index, row) {-->
<!--      this.$confirm("此操作将永久删除, 是否继续?", "提示", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning"-->
<!--      })-->
<!--      .then(() => {-->
<!--        let deleteId = [];-->
<!--        deleteId.push(row.userId)-->
<!--        deleteClassStudent(this.classId,deleteId)-->
<!--        .then((res) => {-->
<!--          if (res.code === 200) {-->
<!--            this.$delete(this.studentList,index);-->
<!--            this.$message.success("删除成功！");-->
<!--          } else {-->
<!--            this.$message.error("删除失败！");-->
<!--          }-->
<!--        });-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.getData();-->
<!--  }-->
<!--}-->
<!--</script>-->

<script setup>
import {onMounted, ref} from "vue";

const studentList = ref([])
const search = ref("")
const isLoading = ref(false)

onMounted(() => {
  getStudentData()
})

// 获取学生数据
import {classUserClassUsersQueryServer} from "@/api/classUser.js";
import {personUserListServer} from "@/api/person.js";
import {useRoute} from "vue-router";
const route = useRoute()
async function getStudentData() {
  isLoading.value = true
  let idRes = await classUserClassUsersQueryServer(route.params.classId)
  const ids = idRes.map(item => item.userId)
  let studentData = await personUserListServer(...ids)
  if(studentData.code === 200) {
    studentList.value.push(...studentData.data)
  }
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// 删除学生
import {classUserClassStudentDelServer} from "@/api/classUser.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {papersHandPaperServer} from "@/api/papers.js";
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
        v-show="!isLoading&&studentList.length"
      >
        <el-table-column prop="userId" label="学生id">
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-input class="header-input" size="small" v-model="search"  placeholder="输入关键词搜索" />
          </template>
          <template #default="scope" v-roleJudge="2">
            <el-button size="small" type="danger" @click.stop="handleDelete(scope.$index, scope.row)">删 除</el-button>
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
  font-size: 1.1rem;
  border-radius: 8px;
}
.el-table:deep(.el-table__header-wrapper),
.el-table:deep(.el-table__header){
  height: 60px;
}
.header-input{
  width: 60%;
  height: 38px;
}
.header-input:deep(.el-input__wrapper) {
  border-radius: 10px;
  font-size: 1.05rem;
}
</style>