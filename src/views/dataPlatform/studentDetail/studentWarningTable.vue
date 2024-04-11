<template>
  <div class="student-warning-table">
    <div class="title">课堂学生详情</div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :row-style="{height: '60px'}"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        height="100%">
      <el-table-column
          prop="userId"
          label="学号"
      >
      </el-table-column>
      <el-table-column
          prop="userName"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="stagePerformance"
          label="当前表现">
      </el-table-column>
      <el-table-column
          prop="warning"
          label="预警级别">
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { learningClassAllStudentLearningServer } from '@/api/learning.js'

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

export default{
  props:{
  },
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    learningClassAllStudentLearningServer(this.$route.params.classId).then(res => {
      this.tableData = res.data.map(item => {
        return {
          userId: item.userId,
          userName: item.userName,
          stagePerformance: formPerformance[item.stagePerformance],
          warning: formWarning[item.warning]
        }
      })
    })
  },
  methods: {
    handleEdit(index, row) {
      this.$router.replace({
        name: 'studentChartDetail',
        params: {
          studentId: row.userId,
          studentName: row.userName
        },
      })
    },
  },
}
</script>

<style scoped>
.student-warning-table {
  height: 100%;
  background-color: white;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}
.student-warning-table:hover{
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.4);
}
.title{
  padding: 8px 0;
  margin: 0 10px 10px 10px;
  text-indent: 3px;
  letter-spacing: 2px;
  border-bottom: var(--el-border);
  font-size: 18px;
  font-weight: bold;
  color: #434343EF;
}
</style>