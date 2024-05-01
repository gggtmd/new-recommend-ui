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
    title="新增课程"
    v-model="dialogFormVisible"
    width="450px"
    :destroy-on-close="true"
    :modal-append-to-body="false"
    style="border-radius: 15px"
  >
    <el-form :model="classes" :rules="rules" ref="classesRef" label-width="60px">
      <el-form-item label="课堂名:" prop="classId">
        <el-input v-model="classes.classId"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="isLoading">添 加</el-button>
    </div>
  </el-dialog>
</template>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
</style>