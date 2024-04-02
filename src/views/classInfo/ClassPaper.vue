<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  getPaper()
})

//获取课堂所有试卷
import {papersPageServer} from "@/api/papers.js";
import {useRoute} from "vue-router";
const route = useRoute()
const paperList = ref([])
const isLoading = ref(true)
const pageNum = ref(0)
async function getPaper() {
  //获取课堂阶段
  pageNum.value++
  let res = await papersPageServer(route.params.classId, pageNum.value)
  paperList.value.push(...res.data.records)
  if(res.data.records.length) {
    await getPaper()
  }
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

// 新增试卷
function addPaper() {

}

// 编辑试卷
import {useRouter} from "vue-router";
const router = useRouter()
function handleClick(item, index) {
  const routerURL = router.resolve({
    name: "classPaperAdd",
    params: {
      classId: route.params.classId
    }
  })
  window.open(routerURL.href, "_blank")
}
</script>

<template>
  <div class="class-notice">
    <div class="header">
      <div class="title">试卷</div>
      <el-button class="add-btn" type="primary" @click="addPaper">新增</el-button>
    </div>
    <el-divider></el-divider>
    <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
    <div class="mask" v-else-if="!paperList.length">暂无数据</div>
    <Transition name="fade">
      <ul class="paper-wrapper" v-show="!isLoading">
        <li class="paper-item" v-for="(item, index) in paperList">
          <div class="paper-title">{{ item.paperTitle }}</div>
          <div
            class="operate"
            :class="{unableIcon:item.statue === '1'}"
            @click="handleClick(item, index)"
          >
            编辑
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 1.3rem;
  font-weight: bold;
}
.add-btn {
  letter-spacing: 3px;
  text-indent: 2px;
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

.paper-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

.paper-item {
  box-sizing: border-box;
  padding: 20px 0;
  border-bottom: var(--el-border);
  font-size: 1.2rem;
  font-weight: bold;
  color: #555;
  transition: 0.1s;
  position: relative;
}

.paper-item:last-child {
  border: none;
}

.paper-item:hover {
  background-color: #409EFF1B;
  z-index: 999;
}

.paper-title {
  height: 100%;
  margin-left: 15px;
  white-space: nowrap;
  display: inline-block;
}
.operate {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 20px 0 5px;
  display: flex;
  align-items: center;
  color: #4293fd;
  cursor: pointer;
  letter-spacing: 5px;
  text-indent: 5px;
}

.unableIcon {
  color: #5555;
  cursor: default;
}
</style>