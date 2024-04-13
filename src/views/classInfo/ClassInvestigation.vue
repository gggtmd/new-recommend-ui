<script setup>
import {computed, onMounted, ref} from "vue";
import ClassInvestigationDialog from "@/views/classInfo/ClassInvestigationDialog.vue";

onMounted(() => {
  getStage()
})

const investigationList = ref([])

//获取课堂所有阶段及关联知识点
import {classKnowledgeQueryClassStageServer, classKnowledgePageServer} from "@/api/classKnowledge.js";
import {learningQueryStageSummaryServer} from "@/api/learning.js";
import {useRoute} from "vue-router";
import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()
const route = useRoute()
const isLoading = ref(true)
async function getStage() {
  const classId = route.params.classId
  //获取课堂阶段
  let res = await classKnowledgeQueryClassStageServer(classId)
  investigationList.value.push(...res.data[0])
  //获取阶段关联知识点
  let knowledgePromise = []
  let ratePromise = []
  res.data[0].forEach(item => {
    knowledgePromise.push(classKnowledgePageServer(classId, item.stage))
    ratePromise.push(learningQueryStageSummaryServer(classId, item.stage, userInfoStore.userInfo.userId))
  })
  let knowledgeList = await Promise.all(knowledgePromise)
  investigationList.value.forEach((item, index) => {
    item.knowledge = []
    item.knowledge.push(...knowledgeList[index].data)
  })
  let rateList = await Promise.all(ratePromise)
  rateList.forEach((commend, index) => {
    const stageIndex = investigationList.value.findIndex(item => commend.data[0] && commend.data[0].stage === item.stage)
    if(stageIndex > -1) {
      investigationList.value[stageIndex].rate = commend.data[0].stageRating
    }
  })
  isLoading.value = false
}

//知识点文字处理
const showKnowledge = computed(() => (item) => {
  let str = ""
  item.knowledge && item.knowledge.forEach(item => {
    str += item.knowledgeName + "、"
  })
  return str
})

//列表按钮单击事件
const classInvestigationDialogRef = ref(null)
const selectStage = ref({})
async function handleClick(item, index) {
  if (item.statue === "1") {
    selectStage.value = item
    classInvestigationDialogRef.value.dialogVisible()
  }
}
</script>

<template>
  <ClassInvestigationDialog
    ref="classInvestigationDialogRef"
    :classId="selectStage.classId"
    :stage="selectStage.stage"
  ></ClassInvestigationDialog>
  <div class="class-notice">
    <Transition name="fade">
      <div class="title">问卷调查</div>
    </Transition>
    <el-divider></el-divider>
    <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
    <div class="mask" v-if="!investigationList.length&&!isLoading">暂无数据</div>
    <Transition name="fade">
      <ul class="notice-wrapper" v-show="!isLoading">
        <li class="notice-item" v-for="(item, index) in investigationList">
          <div class="stage">第{{item.stage}}阶段</div>
          <div class="knowledge">{{showKnowledge(item)}}</div>
          <div
            class="icon"
            v-if="!item.rate"
            @click="handleClick(item, index)"
          >
            {{item.statue === "0"?"":"可评价"}}
          </div>
          <div class="icon rate-icon" v-else>{{item.rate}}分</div>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.class-notice {
  width: 100%;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.mask {
  text-align: center;
  padding: 20px;
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: bold;
  color: #555;
  letter-spacing: 3px;
  min-height: calc(40px + 1.2rem);
  background-color: white;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}
.notice-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}
.notice-item {
  box-sizing: border-box;
  padding: 20px 0;
  border-bottom: var(--el-border);
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  transition: 0.15s;
  position: relative;
}
.notice-item:last-child {
  border: none;
}
.notice-item:hover {
  background-color: #409EFF1B;
  z-index: 999;
}
.stage {
  height: 100%;
  margin-left: 15px;
  white-space: nowrap;
  display: inline-block;
}
.knowledge {
  height: 100%;
  width: 80%;
  margin-left: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  font-size: 1rem;
  font-weight: normal;
  color: #3338;
}
.icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 20px 0 5px;
  display: flex;
  align-items: center;
  color: #55be21;
  cursor: pointer;
}
.ableInvestigation {
  color: #5555;
  cursor: default;
}
.rate-icon {
  color: rgb(255, 187, 41);
}
</style>