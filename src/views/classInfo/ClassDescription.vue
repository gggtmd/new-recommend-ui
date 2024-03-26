<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  getClassInfo()
})

const classData = ref({})
const creator = ref({})

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
}
</script>

<template>
  <div class="class-description">
    <div class="title">{{classData.className}}</div>
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
</template>

<style scoped>
.class-description {
  width: 100%;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 20px;
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