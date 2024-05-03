<script setup>
import {computed, onMounted, ref} from "vue";
import { ArrowRightBold, VideoPlay, Position } from '@element-plus/icons-vue'

onMounted(() => {
  getResource()
  getResourceComment()
})

const resource = ref({})
const isLoading = ref(true)

//资源获取
import {useRoute} from "vue-router";
import {resourcesFindResourceServer} from "@/api/resource.js";
const route = useRoute()
async function getResource() {
  const resourceId = route.params.resourceId
  let res = await resourcesFindResourceServer(resourceId)
  resource.value = res.data
  isLoading.value = false
}

// 获取资源评论
import {resourceCommentQueryResourceCommentServer} from "@/api/resourceComment.js";
const commentList = ref([])
const getResourceComment = async () => {
  let res = await resourceCommentQueryResourceCommentServer(route.params.resourceId)
  commentList.value = res.data
}

//资源详细描述文字处理
const formResourceDetail =  computed(() => {
  if(resource.value.resourceDetail) {
    return resource.value.resourceDetail
  }
  return "暂无"
})

//资源评分
const rate = ref(0)
const isRate = ref(false)
import {resourcesAssessResourcesServer} from "@/api/resource.js";
import {ElMessage, ElMessageBox} from "element-plus";
async function sendRate() {
  try {
    await ElMessageBox.confirm('提交评分?', null, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    let res = await resourcesAssessResourcesServer(route.params.resourceId, rate.value)
    if(res.code === 200) {
      isRate.value = true
    }
  } catch (error) {
    console.log("操作取消")
  }
}

// 发送评论
import {resourceCommentSaveServer} from "@/api/resourceComment.js";
const input = ref("")
const sendComment = async () => {
  if(!input.value) {
    return
  }
  let res = await resourceCommentSaveServer(route.params.resourceId, input.value)
  if(res.code === 200) {
    input.value = ""
    ElMessage.success("发送生成")
  }
}

//资源跳转
import {browseRecordsSaveServer} from "@/api/browseRecords.js";
function routerGo() {
  browseRecordsSaveServer(route.params.resourceId)
  window.open(resource.value.resourceLink, "_blank")
}
</script>

<template>
  <Transition name="fade">
    <div class="recommend-detail" v-show="!isLoading">
      <img class="image" :src="resource.resourcePicture" alt="">
      <el-scrollbar>
        <div class="title">{{resource.resourceName}}</div>
        <div class="info">{{formResourceDetail}}</div>
        <div class="rate-area">
          <div class="pre-rate">
            <el-icon><VideoPlay /></el-icon>
            &nbsp;{{resource.assessNumber}}
            &nbsp;&nbsp;&nbsp;&nbsp;评分:&nbsp;{{resource.assess}}/5.0
          </div>
          <div class="rate">
            <el-rate v-model="rate" :disabled="isRate"></el-rate>
            <el-button class="sub-btn" round type="primary" :disabled="isRate" @click="sendRate">Rate</el-button>
          </div>
        </div>
        <ul class="comment-list">
          <li class="comment-item" v-for="item in commentList">
            <div class="comment-user">{{item.userName}}</div>
            <div class="comment-content">{{item.content}}</div>
          </li>
        </ul>
        <div class="input-wrapper">
          <el-input v-model="input" placeholder="请输入问题" @keydown.enter="sendComment"></el-input>
          <el-button class="go-button"  type="primary" @click="sendComment">Send<el-icon><Position /></el-icon></el-button>
          <el-button class="go-button"  type="success" @click="routerGo">Go<el-icon><ArrowRightBold /></el-icon></el-button>
        </div>
      </el-scrollbar>
    </div>
  </Transition>
</template>

<style scoped>
.recommend-detail {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}
.image {
  width: 40%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
}
.el-scrollbar {
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  position: relative;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-indent: 0.4rem;
  margin-bottom: 20px;
  //white-space: nowrap;
}
.info {
  width: 100%;
  min-height: 150px;
  background: rgba(240, 240, 240, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
}
.rate-area{
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 0.3rem;
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.pre-rate {
  height: 100%;
  line-height: 35px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: #555;
}
.pre-icon {
  margin-right: 3px;
}
.rate {
  display: flex;
  align-items: center;
  height: 100%;
}
.el-rate:deep(.el-rate__icon) {
  font-size: 35px;
}
.sub-btn {
  margin-left: 20px;
}
.comment-list {
  list-style: none;
  padding: 0 0 200px;
}
.comment-item {
  padding: 15px 10px;
  border-bottom: 1px solid var(--el-border-color);
  transition: 0.15s;
}
.comment-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.comment-user {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 5px;
}
.input-wrapper {
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  border-top: 1px solid var(--el-border-color);
  box-sizing: border-box;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.el-input{
  height: 45px;
  margin-right: 10px;
}
.el-input:deep(.el-input__wrapper)  {
  height: 100%;
  border-radius: 99px;
  border-width: 2px;
  background-color: rgba(70, 70, 70, 0.1);
}
.el-input:deep(.el-input__inner)  {
  text-indent: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: #222;
}
.go-button {
  height: 45px;
  border-radius: 99px;
  font-size: 1.1rem;
}
</style>