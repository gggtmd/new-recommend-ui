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
      title="新增考试"
      v-model="dialogFormVisible"
      width="500px"
      :destroy-on-close="true"
    >
      <el-form :model="temInfo" :rules="rules" ref="temInfoRef" label-width="80px" @closed="resetForm('temInfo')">
        <el-form-item label="考试名:" prop="examTitle">
          <el-input v-model="temInfo.examTitle"></el-input>
        </el-form-item>
        <el-form-item label="考试时间:" prop="timeRange">
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
        <el-form-item label="选择阶段:" prop="stage">
          <el-select v-model="temInfo.stage" filterable placeholder="请选择阶段">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible();resetForm('temInfo');">取 消</el-button>
        <el-button type="primary" @click="submitForm('temInfo')" :loading = isLoading>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.class-exam-add:deep(.new-dialog) {
  border-radius: 15px;
}
/*.el-form-item {
  height: 40px;
}
.class-exam-add:deep(.el-form-item__label) {
  height: 100%;
}
.el-input {
  height: 100%;
}
.el-form-item:deep(.el-date-editor) {
  height: 100%;
}
el-form-item:deep(.el-select){
  height: 100%;
}
el-form-item:deep(.el-select__wrapper){
  height: 100%;
}*/
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>