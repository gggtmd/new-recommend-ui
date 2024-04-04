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
      title="新增试卷"
      v-model="dialogFormVisible"
      width="500px"
      :destroy-on-close="true"
    >
      <el-form :model="paperForm" :rules="rules" ref="paperFormRef" label-width="60px">
        <el-form-item label="试卷名:" prop="paperTitle">
          <el-input v-model="paperForm.paperTitle"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading = isLoading>添 加</el-button>
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