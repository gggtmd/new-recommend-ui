<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  getPaper()
})

//获取课堂所有试卷
import {papersHandPaperServer, papersPageServer} from "@/api/papers.js";
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
const classPaperAddDialogRef = ref(null)
function addPaper() {
  classPaperAddDialogRef.value.dialogVisible()
}

// 编辑试卷
import {useRouter} from "vue-router";
import ClassPaperAddDialog from "@/views/classInfo/ClassPaperAddDialog.vue";
const router = useRouter()
function handleEdit(item, index) {
  const routerURL = router.resolve({
    name: "classPaperAdd",
    params: {
      classId: route.params.classId,
      paperId: item.paperId
    }
  })
  window.open(routerURL.href, "_blank")
}

// 删除试卷
import {papersDelBatchServer} from "@/api/papers.js";
import {ElMessage, ElMessageBox} from "element-plus";
async function handleDelete(item, index) {
  try {
    await ElMessageBox.confirm("删除后不可更改", "删除试卷")
    let res = await papersDelBatchServer(item.paperId)
    if (res.code === 200) {
      window.location.reload()
    } else {
      ElMessage.error("删除失败")
    }
  } catch (err) {

  }
}
</script>

<template>
  <div class="class-notice">
    <div class="header">
      <div class="title">试卷</div>
      <el-button class="add-btn" type="primary" @click="addPaper">新增</el-button>
      <ClassPaperAddDialog ref="classPaperAddDialogRef" @afterAddPaper="window.location.reload()"></ClassPaperAddDialog>
    </div>
    <el-divider></el-divider>
    <div class="mask" v-loading="isLoading" v-if="isLoading"></div>
    <div class="mask" v-else-if="!paperList.length">暂无数据</div>
    <Transition name="fade">
      <ul class="paper-wrapper" v-show="!isLoading">
        <li class="paper-item" v-for="(item, index) in paperList">
          <div class="paper-title">{{ item.paperTitle }}</div>
          <div
            class="operate-area"
          >
            <div class="operate-edit" @click="handleEdit(item, index)">编辑</div>
            <div class="operate-delete" @click="handleDelete(item, index)">删除</div>
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
  background-color: #409EFF16;
  z-index: 999;
}

.paper-title {
  height: 100%;
  margin-left: 15px;
  white-space: nowrap;
  display: inline-block;
}
.operate-area {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 20px 0 5px;
  display: flex;
  align-items: center;
  letter-spacing: 5px;
  text-indent: 5px;
}
.operate-edit {
  color: #4293fd;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.operate-delete {
  color: #ef5050;
  cursor: pointer;
  transition: 0.2s;
}
.operate-edit:hover,
.operate-delete:hover{
  opacity: 0.5;
}
</style>