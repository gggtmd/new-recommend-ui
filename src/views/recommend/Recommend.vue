<script setup>
import {ref,onMounted} from "vue";
import {personStylePaperResourceRecommendServer} from "@/api/personStylePaper.js";
import SourceCard from "@/views/recommend/SourceCard.vue";
import ScaleModal from "@/components/ScaleModal.vue";

//推荐资源列表,初始化8个提供骨架占位
const recommendList = ref(new Array(10).fill({}))
//获取推荐资源
async function getRecommendResource() {
  let res = await personStylePaperResourceRecommendServer()
  recommendList.value = res.data
}
//外部课程资源
const lessonList = ref([])
//分页数据
const pageNum = ref(1)
//获取外部课程资源
import {lessonPageServer} from "@/api/lesson.js";
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver.vue";
async function getLessonList() {
  let res = await lessonPageServer(pageNum.value)
  pageNum.value++
  lessonList.value.push(...res.data.records)
}
//挂在后获取资源
onMounted(() => {
  getRecommendResource()
  getLessonList()
})
//将Body交给IntersectionObserver,监听交叉
const body = document.querySelector("body")

//Modal
const isShow = ref(false)
const scaleModalRef = ref()
//点击展开模态框
import {useRouter} from "vue-router";
const router = useRouter()
function showModal(event, source) {
  if (source.resourceId) {
    scaleModalRef.value.init(event.currentTarget)
    isShow.value = true
    router.push({
      name: "recommendDetail",
      params: {
        resourceId: source.resourceId
      }
    })
  } else {
    window.open(source.lessonLink, '_blank');
  }
}
function hideModal() {
  isShow.value = false
  router.push({
    name: "recommend"
  })
}
</script>

<template>
  <ScaleModal :show="isShow" @clickMask="hideModal" ref="scaleModalRef">
    <router-view></router-view>
  </ScaleModal>
  <div class="recommend">
    <div class="title">推荐资源</div>
    <div class="recommend-wrapper">
      <SourceCard
        v-for="item in recommendList"
        :key="item"
        :image="item.resourcePicture"
        :source-type="item.resourceType"
        @click="showModal($event, item)"
      >
        <template #title>{{ item.resourceName }}</template>
        <template #info>{{item.resourceLink}}</template>
      </SourceCard>
    </div>
    <div class="title">外部资源</div>
    <div class="lesson-wrapper">
      <SourceCard
        v-for="item in lessonList"
        :key="item"
        :image="item.lessonPicture"
        source-type=""
        @click="showModal($event, item)"
      >
        <template #title>{{ item.lessonName }}</template>
        <template #info>{{item.intro}}</template>
      </SourceCard>
      <InfiniteScrollObserver :rootSelector="body" @handleIntersect="getLessonList"></InfiniteScrollObserver>
    </div>
  </div>
</template>

<style scoped>
.recommend {
  box-sizing: border-box;
  padding: 20px 150px;
}
.title{
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  letter-spacing: 5px;
  box-sizing: border-box;
  padding-left: 5px;
  margin-bottom: 20px;
}
.recommend-wrapper,
.lesson-wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
</style>