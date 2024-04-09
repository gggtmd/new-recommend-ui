<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  getClassInfo()
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
  isLoading.value = false
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
</script>

<template>
  <Transition name="fade">
    <div class="class-description" v-if="!isLoading">
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
      <div class="description">{{classData.description}}</div>
    </div>
  </Transition>
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
.description {
  font-size: 1.1rem;
  margin-bottom: 20px;
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
</style>