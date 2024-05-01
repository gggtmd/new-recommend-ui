<script setup>
import {ref} from "vue";

const props = defineProps(["classId", "stage"])

// 表单校验规则
const validateRate = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('评分不能为空'));
  } else if(value < 0 || value > 5) {
    return callback(new Error('评分范围0-5'));
  } else if(!Number.isInteger(value * 10)) {
    return callback(new Error('评分递增为0.1'));
  } else {
    callback();
  }
}
const validateCommend = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('评价不能为空'));
  } else {
    callback();
  }
}
const rules = {
  stageRating: [
    { validator: validateRate, trigger: 'blur' }
  ],
  stageComment: [
    { validator: validateCommend, trigger: 'blur' }
  ],
}

// 表单数据
const investigationForm = ref({
  stageRating: '',
  stageComment: ''
})
const dialogFormVisible = ref(false)
const isLoading = ref(false)

// dialog显示切换
function dialogVisible() {
  dialogFormVisible.value = !dialogFormVisible.value
}

// 提交表单数据
import {learningStageSummaryServer} from "@/api/learning.js";
import {ElMessage} from "element-plus";
const investigationFormRef = ref(null)
function submitForm() {
  investigationFormRef.value.validate(async valid => {
    if (valid) {
      let res = await learningStageSummaryServer(props.classId, props.stage, investigationForm.value.stageRating, investigationForm.value.stageComment)
      if (res.code === 200) {
        dialogVisible()
        window.location.reload()
      } else {
        ElMessage.error("评分失败")
      }
    }
  })
}

defineExpose({
  dialogVisible
})
</script>

<template>
  <el-dialog
      title="新增试卷"
      v-model="dialogFormVisible"
      width="500px"
      :destroy-on-close="true"
      style="border-radius: 15px"
  >
    <el-form :model="investigationForm" :rules="rules" ref="investigationFormRef" label-width="60px">
      <el-form-item label="评分:" prop="stageRating">
        <el-input v-model.number="investigationForm.stageRating" type="number" max="5" min="0" step="0.1" placeholder="评分为0~5"></el-input>
      </el-form-item>
      <el-form-item label="评价:" prop="stageComment">
        <el-input v-model="investigationForm.stageComment" placeholder="输入阶段评价"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading = isLoading>提 交</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.el-form-item {
  margin-bottom: 25px;
  margin-top: 10px;
  height: 35px;
  align-items: center;
}
.el-input {
  height: 35px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>