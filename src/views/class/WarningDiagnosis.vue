<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  getClassList()
})

//获取学生或教师加入的课堂
const classList = ref([])
import {personClassServer} from "@/api/person.js";
async function getClassList() {
  const res = await personClassServer()
  classList.value.push(...res.data)
}

import {useRouter} from "vue-router";
import {useUserInfoStore} from "@/stores/userInfo.js";
const router = useRouter()
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.userInfo
const routerTo = (item) => {
  router.push({
    name: 'classWarningDiagnosisDetail',
    params: {
      classId: item.classId,
      studentId: userInfo.userId,
      studentName: userInfo.userName
    }
  })
}
</script>

<template>
  <div class="class-warning-diagnosis">
    <div class="class-list">
      <div class="list-title">加入的课堂</div>
      <div class="list-wrapper">
        <div
          class="list-item-wrapper"
          v-for="(item, index) in classList"
          @click="routerTo(item)">
          <div class="list-item">{{item.className}}</div>
          <div class="list-item-border" v-show="index < classList.length - 1"></div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.class-warning-diagnosis {
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
  box-sizing: border-box;
  padding: 0 350px;
}
.class-list {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 300px;
  height: 300px;
}
.list-title {
  font-weight: bold;
  color: #555;
  text-indent: 3px;
  margin-bottom: 10px;
}
.list-wrapper {
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
}
.list-item {
  box-sizing: border-box;
  padding: 15px 20px;
  cursor: pointer;
}
.list-item:hover {
  background-color: rgba(0, 0, 0, 0.08);
}
.list-item-border {
  margin: 0 15px;
  border-bottom: 1px solid #c5c5c7;
}
</style>