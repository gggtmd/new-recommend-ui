<script setup>
import {ref, onMounted, inject, onBeforeUnmount, watch} from "vue";
import {personStylePaperResourceRecommendServer} from "@/api/personStylePaper.js";
import SourceCard from "@/views/recommend/SourceCard.vue";
import ScaleModal from "@/components/ScaleModal.vue";

onMounted(() => {
  getRecommendResource()
  getLessonList()
})

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
//将Body交给IntersectionObserver,监听交叉
const body = document.querySelector("body")

//Modal
const isShow = ref(false)
const scaleModalRef = ref()
//点击展开模态框
import {useRouter} from "vue-router";
import RecommendCarousel from "@/views/recommend/recommendCarousel.vue";
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
    name: "home"
  })
}

import {useRoute} from 'vue-router'
const recommendTitleRef = ref(null)
const outerTitleRef = ref(null)
const $bus = inject("$bus")
const route = useRoute()
watch(() => route.query.resourceType, (newValue) => {
  if(newValue === 'recommend') {
    $bus.emit("scrollTo", recommendTitleRef.value.offsetTop - 160)
  } else if(newValue === 'link') {
    $bus.emit("scrollTo", outerTitleRef.value.offsetTop - 160)
  }
})
</script>

<template>
  <ScaleModal :show="isShow" @clickMask="hideModal" ref="scaleModalRef">
    <router-view></router-view>
  </ScaleModal>
  <div class="recommend">
    <recommend-carousel class="carousel"></recommend-carousel>
    <div class="title" ref="recommendTitleRef">推荐资源</div>
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
    <div class="title" ref="outerTitleRef">外部资源</div>
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
.carousel {
  margin-bottom: 30px;
}
.title{
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
  letter-spacing: 5px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border-bottom: 1px solid #4293fd;
}
.recommend-wrapper,
.lesson-wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
</style>