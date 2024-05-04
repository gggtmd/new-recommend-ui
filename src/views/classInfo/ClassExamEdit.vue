<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  //表单信息
  examInfo: {
    type: Object,
    default: {},
    required: true
  }
})

onMounted(() => {
  getStage()
  getPaper()
})

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
  } else {
    callback();
  }
};
const rules = {
  examTitle: [
    { validator: validateExamTitle, trigger: 'blur' }
  ],
  timeRange: [
    { validator: validateTimeRange, trigger: 'blur' }
  ],
}

const dialogFormVisible = ref(false)
const isLoading = ref(false)
const options = ref([]) //课堂试卷
const stageOption = ref([]) //课堂阶段
const examInfoRef = ref(null)

import {useRoute} from "vue-router";
const route = useRoute()

//  dialog是否显示
function dialogVisible() {
  dialogFormVisible.value = !dialogFormVisible.value
}

//  清空表单
function resetForm() {
  examInfoRef.value.resetFields();
}

//  获取课堂试卷
import {papersGetByClassId} from "@/api/papers.js";
async function getStage() {
  let res = await papersGetByClassId(route.params.classId)
  if(res.code === 200) {
    options.value.push(...res.data)
  }
}

//  获取课堂阶段
import { classKnowledgeQueryClassStageServer } from '@/api/classKnowledge.js'
async function getPaper() {
  let res = await classKnowledgeQueryClassStageServer(route.params.classId)
  if(res.code === 200) {
    stageOption.value = res.data[0].map(item => {
      return {
        stage: item.stage,
        stageTitle: "第" + item.stage.toString() + "阶段"
      }
    });
  }
}

//  提交更改
import {examsUpdateServer} from '@/api/exams.js'
import {ElMessage} from "element-plus";
const emit = defineEmits(["afterEdit"])
function submitForm() {
  examInfoRef.value.validate(async (valid) => {
    if(valid) {
      this.isLoading = true;
      let res = await examsUpdateServer(
        route.params.classId,
        props.examInfo.examId,
        props.examInfo.paperId,
        props.examInfo.examTitle,
        props.examInfo.timeRange[0],
        props.examInfo.timeRange[1],
        props.examInfo.stage
      )
      if (res.code === 200) {
        dialogVisible();
        emit("afterEdit", props.examInfo);
      } else {
        ElMessage.error(res.msg)
      }
      isLoading.value = false;
    }
  });
}

defineExpose({
  dialogVisible
})
</script>

<template>
  <div class="class-exam-edit">
    <el-dialog v-model="dialogFormVisible" width="500px" :destroy-on-close="true">
      <template #header>
        <div class="title">编辑考试</div>
      </template>
      <el-form :model="props.examInfo" :rules="rules" ref="examInfoRef" @closed="resetForm('examInfoRef')">
        <el-form-item prop="examTitle">
          <el-input v-model="props.examInfo.examTitle" placeholder="考试名称"></el-input>
        </el-form-item>
        <el-form-item prop="timeRange">
          <el-date-picker
            v-model="props.examInfo.timeRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 100%;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="props.examInfo.paperId" filterable placeholder="请选择试卷">
            <el-option
              v-for="item in options"
              :key="item.paperId"
              :label="item.paperTitle"
              :value="item.paperId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="props.examInfo.stage" filterable placeholder="请选择阶段">
            <el-option
                v-for="item in stageOption"
                :key="item.stage"
                :label="item.stageTitle"
                :value="item.stage">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible();resetForm('examInfoRef')">取 消</el-button>
        <el-button type="primary" @click="submitForm('examInfoRef')" :loading=isLoading>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.class-exam-edit:deep(.el-dialog) {
  border-radius: 20px;
  padding: 20px 25px;
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
  margin: 0 10px 20px;
}
.el-input,
.el-select,
::v-deep(.el-date-editor){
  height: 100%;
}
.el-input::v-deep(.el-input__wrapper),
.el-select::v-deep(.el-select__wrapper),
.el-input::v-deep(.el-input-group__append),
::v-deep(.el-date-editor){
  border-radius: 10px;
  background-color: rgba(71, 71, 71, 0.1);
  height: 100%;
  box-sizing: border-box;
  font-size: 1rem;
}
</style>