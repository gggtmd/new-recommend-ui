<script setup>
import {ref} from "vue";

// 表单校验规则
const validatePaperTitle = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('课程名不能为空'));
  } else {
    callback();
  }
}
const rules = {
  paperTitle: [
    { validator: validatePaperTitle, trigger: 'blur' }
  ],
}

// 表单数据
const paperForm = ref({
  paperTitle: ""
})
const dialogFormVisible = ref(false)
const isLoading = ref(false)

// dialog显示切换
function dialogVisible() {
  dialogFormVisible.value = !dialogFormVisible.value
}

// 提交表单数据
import {papersSaveServer} from "@/api/papers.js";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
const route = useRoute()
const emit = defineEmits(["afterAddPaper"])
const paperFormRef = ref(null)
function submitForm() {
  paperFormRef.value.validate(async valid => {
    if (valid) {
      let res = await papersSaveServer(route.params.classId, paperForm.value.paperTitle)
      if (res.code === 200) {
        dialogVisible()
        emit("afterAddPaper")
      } else {
        ElMessage.error("添加失败")
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
      v-model="dialogFormVisible"
      width="450px"
      :destroy-on-close="true"
      style="border-radius: 20px; padding: 20px"
    >
      <template #header>
        <div class="title">新增试卷</div>
      </template>
      <el-form :model="paperForm" :rules="rules" ref="paperFormRef">
        <el-form-item prop="paperTitle">
          <el-input v-model="paperForm.paperTitle" placeholder="试卷名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading = isLoading>添 加</el-button>
      </div>
    </el-dialog>
</template>

<style scoped>
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
.el-input {
  height: 100%;
}
.el-input::v-deep(.el-input__wrapper) {
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
  font-size: 0.9rem;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
}
</style>