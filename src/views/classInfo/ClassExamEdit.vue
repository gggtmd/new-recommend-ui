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
    <el-dialog title="编 辑" v-model="dialogFormVisible" width="500px" :destroy-on-close="true">
      <el-form :model="props.examInfo" :rules="rules" ref="examInfoRef" label-width="80px" @closed="resetForm('examInfoRef')">
        <el-form-item label="考试名:" prop="examTitle">
          <el-input v-model="props.examInfo.examTitle"></el-input>
        </el-form-item>
        <el-form-item label="考试时间:" prop="timeRange">
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
        <el-form-item label="选择试卷:">
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
        <el-form-item label="选择阶段:">
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
  border-radius: 10px;
  padding: 20px 30px 20px 20px;
}
.el-form-item{
  height: 35px;
  align-items: center;
  margin-bottom: 20px;
}
.el-form-item:last-child {
  margin-bottom: 30px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.el-form-item:deep(.el-form-item__content) {
  height: 100%;
}
.el-input,
.el-form-item:deep(.el-date-editor),
.el-form-item:deep(.el-select),
.el-form-item:deep(.el-select__wrapper){
  height: 100%;
}
</style>