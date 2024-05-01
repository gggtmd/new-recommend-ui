<script setup>
import {classKnowledgeQueryClassStageServer} from "@/api/classKnowledge.js";
import {onMounted, ref} from "vue";
import {Download} from "@element-plus/icons-vue";


onMounted(() => {
  getStage()
})

const noticeList = ref([])

//获取课堂所有阶段
import {useRoute} from "vue-router";
const route = useRoute()
const isLoading = ref(true)
async function getStage() {
  let res = await classKnowledgeQueryClassStageServer(route.params.classId)
  noticeList.value.push(...res.data[0].filter((item) => {
    if(item.statue === "1") {
      return true
    }
  }))
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}
</script>

<template>
  <div class="class-notice">
    <div class="title">教学资源</div>
    <el-divider></el-divider>
    <ul class="notice-wrapper" v-loading="isLoading">
      <li class="mask" v-if="!noticeList.length&&!isLoading">暂无数据</li>
      <li class="notice-item" v-for="item in noticeList" v-show="!isLoading">
        <div class="notice-item-header">
          <div class="notice-item-title">第{{item.stage}}阶段</div>
          <div class="notice-item-info">
            <div class="info-item">创建人</div>
            <div class="info-item">大小：3.8MB</div>
            <div class="info-item">下载数：12</div>
            <div class="info-item">发布时间：2024-04-23 09:35</div>
          </div>
        </div>
        <div class="notice-item-icon">
          <el-icon size="18"><Download /></el-icon>
          下载
        </div>
      </li>
    </ul>
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
}
.notice-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  min-height: calc(40px + 1.2rem);
  background-color: white;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
}
.notice-item {
  box-sizing: border-box;
  padding: 20px 15px;
  border-bottom: var(--el-border);
  transition: 0.15s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notice-item:last-child {
  border: none;
}
.notice-item-header {
  //margin-bottom: 10px;
  //height: 30px;
}
.notice-item-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}
.notice-item-icon {
  cursor: pointer;
  background-color: rgba(0, 0, 0 , 0.08);
  padding: 5px 8px 4px 5px;
  border-radius: 4px;
  transition: 0.1s;
  display: flex;
  align-items: center;
}
.notice-item-icon:hover {
  background-color: rgba(0, 0, 0 , 0.2);
}
.notice-item-icon:active {
  background-color: rgba(0, 0, 0 , 0.1);
}
.notice-item-icon .el-icon {
  margin-top: 2px;
}
.notice-item-info {
  color: #333;
  line-height: 1.8rem;
  display: flex;
}
.info-item {
  margin-right: 20px;
}
</style>