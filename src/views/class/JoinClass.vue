<script setup>
import {ref} from "vue";

const validateClassId = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('课程ID不能为空'));
  } else {
    callback();
  }
};
const rules = {
  classId: [
    { validator: validateClassId, trigger: 'blur' }
  ],
}
const classes = ref({
  classId: ""
})
const dialogFormVisible = ref(false)

// dialog是否显示
function dialogVisible() {
  dialogFormVisible.value = !dialogFormVisible.value
}

// 提交
import {classUserSaveServer} from "@/api/classUser.js";
const classesRef = ref(null)
const isLoading = ref(false)
function submitForm() {
  classesRef.value.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      let res = await classUserSaveServer(classes.value.classId)
      if(res.code === 200) {
        window.location.reload()
      }
      isLoading.value = false
    }
  })
}

defineExpose({
  dialogVisible
})
</script>

<template>
  <el-dialog
    class="dialog"
    v-model="dialogFormVisible"
    width="450px"
    :destroy-on-close="true"
    :modal-append-to-body="false"
    style="border-radius: 15px"
  >
    <template #header>
      <div class="title">加入课堂</div>
    </template>
    <el-form :model="classes" :rules="rules" ref="classesRef">
      <el-form-item prop="classId">
        <el-input v-model="classes.classId" placeholder="课堂名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading="isLoading">添 加</el-button>
      </div>
    </template>
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
  margin: 0 10px 20px;
}
.el-input{
  height: 100%;
}
.el-input::v-deep(.el-input__wrapper){
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
  font-size: 1rem;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.dialog::v-deep(.el-dialog__footer) {
  padding: 0;
}
</style>