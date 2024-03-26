<script setup>
import {classKnowledgeQueryClassStageServer} from "@/api/classKnowledge.js";
import {onMounted, ref} from "vue";

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
    <div class="title">公告</div>
    <el-divider></el-divider>
    <ul class="notice-wrapper" v-loading="isLoading">
      <li class="mask" v-if="!noticeList.length&&!isLoading">暂无数据</li>
      <li class="notice-item" v-for="item in noticeList" v-show="!isLoading">
        第{{item.stage}}阶段
        <div
          class="icon"
          :class="{ableIcon:item.statue}"
        >
          {{item.statue === "0"?"未开始":"已开始"}}
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
  padding: 20px 0;
  border-bottom: var(--el-border);
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  transition: 0.15s;
  text-indent: 15px;
  position: relative;
}
.notice-item:last-child {
  border: none;
}
.notice-item:hover {
  background-color: #409EFF1B;
}
.icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #5555;
}
.ableIcon {
  cursor: pointer;
  color: #55be21;
}
</style>