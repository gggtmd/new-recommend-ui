<script setup>
import { examsSaveServer } from '@/api/exams.js'
import { classKnowledgeQueryClassStageServer } from '@/api/classKnowledge.js'
import {useRoute} from 'vue-router'
import {onMounted, ref} from "vue";
const route = useRoute()

onMounted(() => {
  getStageOptions()
})

async function getStageOptions() {
  const res = await classKnowledgeQueryClassStageServer(route.params.classId)
  stageOption.value = res.data[0].map(item => {
    return {
      stage: item.stage,
      stageTitle: "第" + item.stage.toString() + "阶段"
    }
  });
}

//  表单验证规则
const validateExamTitle = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('考试名不能为空'));
  } else {
    callback();
  }
};
const validateTimeRange = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('考试时间不能为空'));
  }else if(value[0] == value[1]) {
    return callback(new Error('开考和结束时间不能相同'));
  }else {
    callback();
  }
};
const rules =  {
  examTitle: [
    { validator: validateExamTitle, trigger: 'blur' }
  ],
      timeRange: [
    { validator: validateTimeRange, trigger: 'blur' }
  ],
}

const temInfo = ref({
  examTitle: "",
  timeRange: [],
  stage: '',
})
const stageOption = ref([])
const dialogFormVisible = ref(false)
const isLoading = ref(false)
const temInfoRef = ref(null)
//  提交新增或修改
import {ElMessage} from "element-plus";

function submitForm() {
  temInfoRef.value.validate(async valid => {
    if (valid) {
      isLoading.value = true
      let res = await examsSaveServer(route.params.classId, temInfo.value.examTitle, temInfo.value.timeRange[0], temInfo.value.timeRange[1], temInfo.value.stage)
      if(res.code === 200) {
        resetForm()
        dialogVisible()
      } else {
        ElMessage.error("请求失败")
      }
      isLoading.value = false
    }
  })
}

//  表单数据重置
function resetForm() {
  temInfoRef.value.resetFields()
}

//  弹窗是否显示
function dialogVisible() {
  dialogFormVisible.value = !dialogFormVisible.value
}

defineExpose({
  dialogVisible
})
</script>

<template>
  <div class="class-exam-add">
    <el-dialog
      class="new-dialog"
      v-model="dialogFormVisible"
      width="450px"
      :destroy-on-close="true"
    >
      <template #header>
        <div class="title">新增考试</div>
      </template>
      <el-form :model="temInfo" :rules="rules" ref="temInfoRef" @closed="resetForm('temInfo')">
        <el-form-item prop="examTitle">
          <el-input v-model="temInfo.examTitle" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item prop="timeRange">
          <el-date-picker
            v-model="temInfo.timeRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="stage">
          <el-select
            v-model="temInfo.stage"
            filterable
            placeholder="请绑定阶段">
            <el-option
              v-for="item in stageOption"
              :key="item.stage"
              :label="item.stageTitle"
              :value="item.stage"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible();resetForm('temInfo');">取 消</el-button>
        <el-button type="primary" @click="submitForm('temInfo')" :loading = isLoading>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.class-exam-add:deep(.new-dialog) {
  border-radius: 20px;
  padding: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
}
.title {
  font-size: 20px;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
  letter-spacing: 3px;
  margin-bottom: 10px;
}
.el-form-item {
  height: 45px;
  margin: 0 10px 25px;
}
.el-input,
.el-select,
::v-deep(.el-date-editor){
  height: 100%;
}
.el-input::v-deep(.el-input__wrapper),
.el-select::v-deep(.el-select__wrapper),
::v-deep(.el-date-editor){
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
  font-size: 0.9rem;
}
</style>