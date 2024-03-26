<script setup>
import {computed, onMounted, ref} from "vue";

onMounted(() => {
  getStage()
})

const noticeList = ref([])

//获取课堂所有阶段及关联知识点
import {classKnowledgeQueryClassStageServer, classKnowledgePageServer} from "@/api/classKnowledge.js";
import {useRoute} from "vue-router";
const route = useRoute()
const isLoading = ref(true)
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

//列表项单击事件
import {classKnowledgeClassStageStatusServer} from "@/api/classKnowledge.js";
import {ElMessageBox} from "element-plus";
async function handleClick(item, index) {
  if (item.statue === "0") {
    try {
      await ElMessageBox.confirm('确认开启这个阶段吗吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
      let res = await classKnowledgeClassStageStatusServer(route.params.classId, item.stage, 1)
      if(res.code === 200) {
        noticeList.value[index].statue = "1"
      }
    } catch (error) {
      console.log("操作取消")
    }
  }
}
</script>

<template>
  <div class="class-notice">
    <Transition name="fade">
    <div class="title">阶段</div>
    </Transition>
    <el-divider></el-divider>
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
.unableIcon {
  color: #5555;
  cursor: default;
}
</style>