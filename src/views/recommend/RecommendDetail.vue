<script setup>
import {computed, onMounted, ref} from "vue";
import { ArrowRightBold, View } from '@element-plus/icons-vue'

onMounted(() => {
  getResource()
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
import {ElMessageBox} from "element-plus";
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

//资源跳转
import {useRouter} from "vue-router";
const router = useRouter()
function routerGo() {
  const routerURl =  router.resolve({
    path: resource.value.resourceLink
  })
  window.open(routerURl.href, "_blank")
}
</script>

<template>
  <Transition name="fade">
    <div class="recommend-detail" v-show="!isLoading">
      <img class="image" src="@/assets/image1.jpg" alt="">
      <el-scrollbar>
        <div class="title">{{resource.resourceName}}</div>
        <div class="info">{{formResourceDetail}}</div>
        <div class="rate-area">
          <div class="pre-rate">
            <el-icon class="pre-icon"><View /></el-icon>
            &nbsp;{{resource.assessNumber}}
            &nbsp;&nbsp;&nbsp;&nbsp;评分:&nbsp;{{resource.assess}}/5.0
          </div>
          <div class="rate">
            <el-rate v-model="rate" :disabled="isRate"></el-rate>
            <el-button class="sub-btn" round type="primary" :disabled="isRate" @click="sendRate">提交</el-button>
          </div>
        </div>
      </el-scrollbar>
      <el-button class="go-button" round type="success" @click="routerGo">前往<el-icon><ArrowRightBold /></el-icon></el-button>
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
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-indent: 0.4rem;
  margin-bottom: 20px;
  white-space: nowrap;
}
.info {
  width: 100%;
  min-height: 150px;
  background: rgba(240, 240, 240, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
}
.rate-area{
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 0.3rem;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.pre-rate {
  height: 100%;
  line-height: 50px;
  font-size: 1.4rem;
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
.go-button {
  font-size: 1.2rem;
  letter-spacing: 3px;
  border-radius: 999px;
  position: absolute;
  right: 20px;
  bottom: 16px;
}
</style>