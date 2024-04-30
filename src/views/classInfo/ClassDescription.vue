<script setup>
import {computed, onMounted, ref} from "vue";

onMounted(() => {
  getClassInfo()
  getStage()
})

const classData = ref({})
const creator = ref({})
const isLoading = ref(true)

//获取课堂详细信息
import {classesGetByIdServer} from "@/api/classes.js";
import {useRoute} from "vue-router";
import {personGetByIdServer} from "@/api/person.js";
const route = useRoute()
async function getClassInfo() {
  let classInfo = await classesGetByIdServer(route.params.classId)
  let classCreatorInfo = await personGetByIdServer(classInfo.data.createUserId)
  classData.value = classInfo.data
  creator.value = classCreatorInfo.data
  // isLoading.value = false
}

// 跳转至中控平台
import {useRouter} from "vue-router";
const router = useRouter()
function routeToDataPlatform() {
  const routerURL = router.resolve({
    name: "dataPlatform",
    params: {
      classId: route.params.classId
    }
  })
  window.open(routerURL.href, '_blank')
}

const noticeList = ref([])

//获取课堂所有阶段及关联知识点
import {classKnowledgeQueryClassStageServer, classKnowledgePageServer} from "@/api/classKnowledge.js";
async function getStage() {
  const classId = route.params.classId
  //获取课堂阶段
  let res = await classKnowledgeQueryClassStageServer(classId)
  noticeList.value.push(...res.data[0])
  //获取阶段关联知识点
  let knowledgePromise = []
  res.data[0].forEach(item => {
    knowledgePromise.push(classKnowledgePageServer(classId, item.stage))
  })
  let knowledgeList = await Promise.all(knowledgePromise)
  noticeList.value.forEach((item, index) => {
    item.knowledge = []
    item.knowledge.push(...knowledgeList[index].data)
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
</script>

<template>
<!--  <Transition name="fade">-->
    <div class="class-description">
      <Transition name="fade">
        <template>
          <div class="header">
            <div class="title">{{classData.className}}</div>
            <el-button type="primary" @click="routeToDataPlatform">课堂分析</el-button>
          </div>
          <el-divider></el-divider>
          <div class="info">
            <div class="info-item">
              <div class="sub-title">课堂ID:</div>
              <div class="sub-info">{{classData.classId}}</div>
            </div>
            <div class="info-item">
              <div class="sub-title">课堂学分:</div>
              <div class="sub-info">{{classData.classCredit}}</div>
            </div>
            <div class="info-item">
              <div class="sub-title">课堂学时:</div>
              <div class="sub-info">{{classData.classHours}}</div>
            </div>
            <div class="info-item">
              <div class="sub-title">创建时间:</div>
              <div class="sub-info">{{new Date(classData.createdTime).toLocaleDateString()}}</div>
            </div>
            <div class="info-item">
              <div class="sub-title">课堂教师:</div>
              <div class="sub-info">{{creator.name}}</div>
            </div>
          </div>
          <div class="box">
            <img class="image" :src="classData.classPicture" alt="">
            <div class="description">{{classData.description}}</div>
          </div>
        </template>
      </Transition>
      <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
      <div class="mask" v-if="!noticeList.length&&!isLoading">暂无数据</div>
      <Transition name="fade">
        <ul class="notice-wrapper" v-show="!isLoading">
          <li class="notice-item" v-for="(item, index) in noticeList">
            <div class="stage">第{{item.stage}}阶段</div>
            <div class="knowledge">{{showKnowledge(item)}}</div>
            <div
                class="icon"
                :class="{unableIcon:item.statue === '1'}"
                @click="handleClick(item, index)"
            >
              {{item.statue === "0"?"未开始":"已开始"}}
            </div>
          </li>
        </ul>
      </Transition>
    </div>
<!--  </Transition>-->
</template>

<style scoped>
.class-description {
  width: 100%;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  height: 27px;
}
.el-button {
  padding: 0 8px;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
}
.box {
  display: flex;
  margin-bottom: 30px;
}
.image {
  border-radius: 12px;
  width: 180px;
  margin-right: 20px;
}
.description {
  font-size: 1.1rem;
  line-height: 1.7rem;
  color: #333D;
  box-sizing: border-box;
  padding: 12px 10px;
  background-color: #3332;
  border-radius: 10px;
}
.info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin-bottom: 30px;
  gap: 10px;
}
.info-item {
  width: 100%;
  height: 100%;
  display: flex;
}
.sub-title {
  font-weight: bold;
  color: #555;
  text-align: right;
  min-width: 30%;
}
.sub-info {
  text-align: left;
  text-indent: 10px;
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
  color: #333;
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
  color: #555;
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
.unableIcon {
  color: #5555;
  cursor: not-allowed;
}
</style>