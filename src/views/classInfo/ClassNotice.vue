<script setup>
import {onMounted, ref} from "vue";
import {Clock} from "@element-plus/icons-vue";

onMounted(() => {
  // getStage()
  getNotice()
})

// 获取课堂通知
import {useRoute} from "vue-router";
const route = useRoute()
const isLoading = ref(true)
import {announcementQueryClassAnnouncementsServer} from "@/api/announcement.js";
const noticeList = ref([])
const getNotice = async () => {
  let res = await announcementQueryClassAnnouncementsServer(route.params.classId)
  noticeList.value = res.data
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}
</script>

<template>
  <div class="class-notice">
    <div class="title">通知公告</div>
    <el-divider></el-divider>
    <ul class="notice-wrapper" v-loading="isLoading">
      <li class="mask" v-if="!noticeList.length&&!isLoading">暂无数据</li>
      <li class="notice-item" v-for="item in noticeList" v-show="!isLoading">
        <div class="notice-item-header">
          <div class="notice-item-title">{{item.title}}</div>
          <div class="notice-item-time"><el-icon class="time-icon"><Clock /></el-icon>{{item.createdTime}}</div>
        </div>
        <div class="notice-item-info">
          {{item.announcementContent}}
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
}
.notice-item:last-child {
  border: none;
}
.notice-item:hover {
  background-color: #409EFF1B;
}
.notice-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.notice-item-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}
.notice-item-time {
  display: flex;
  align-items: center;
  color: #777;
}
.time-icon {
  margin-right: 3px;
}
.notice-item-info {
  color: #333;
  font-size: 1.1rem;
  line-height: 1.8rem;
}
</style>