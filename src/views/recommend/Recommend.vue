<script setup>
import {ref, onMounted, inject, watch} from "vue";
import {personStylePaperResourceRecommendServer} from "@/api/personStylePaper.js";
import SourceCard from "@/views/recommend/SourceCard.vue";
import ScaleModal from "@/components/ScaleModal.vue";
import Footer from "@/views/my/FooterLink.vue";
import FooterLink from "@/views/my/FooterLink.vue";
import {VideoPlay, Star} from "@element-plus/icons-vue";


onMounted(() => {
  getRecommendResource()
  getLessonList()
})

//推荐资源列表,初始化8个提供骨架占位
const recommendList = ref(new Array(8).fill({}))
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
import {lessonListServer} from "@/api/lesson.js";
import InfiniteScrollObserver from "@/components/InfiniteScrollObserver.vue";
async function getLessonList() {
  // let res = await lessonPageServer(pageNum.value)
  // pageNum.value++
  // lessonList.value.push(...res.data.records)
  let res = await lessonListServer()
  lessonList.value = res
  console.log(res)
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
    <div class="title" ref="recommendTitleRef">
      推荐资源<span class="title-en">Recommended Resource</span>
      <div class="title-info">根据您的学习风格和认知水平，智能推荐最适合您的学习资源</div>
    </div>
    <div class="recommend-wrapper">
      <SourceCard
        v-for="item in recommendList"
        :key="item"
        :image="item.resourcePicture"
        :source-type="item.resourceType"
        @click="showModal($event, item)"
      >
        <template #title>{{ item.resourceName }}</template>
        <template #info>
          <div class="info-wrapper">
            <el-icon><VideoPlay /></el-icon>
            <span>{{item.assessNumber}}</span>
            <el-icon><Star /></el-icon>
            <span>{{item.assess}}</span>
          </div>
        </template>
      </SourceCard>
    </div>
    <div class="title" ref="outerTitleRef">热门资源<span class="title-en">Popular Resource</span></div>
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
  <footer-link class="footer"></footer-link>
</template>

<style scoped>
.recommend {
  position: relative;
  box-sizing: border-box;
  padding: 0 50px 0;
  max-width: 1400px;
  margin: 20px auto 0;
}
.carousel {
  margin-bottom: 30px;
}
.title{
  font-size: 1.5rem;
  font-weight: bold;
  color: #111;
  width: 100%;
  letter-spacing: 5px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-bottom: 5px;
  margin-bottom: 30px;
  border-bottom: 1px solid #4293fd;
}
.title-en {
  letter-spacing: 0;
  font-size: 1.3rem;
  padding: 0 10px;
  color: #4293fd;
}
.title-info {
  font-size: 14px;
  color: #555;
}

.recommend-wrapper,
.lesson-wrapper{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
.info-wrapper {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}
.info-wrapper .el-icon {
  margin-right: 3px;
}
.info-wrapper span {
  margin-right: 10px;
}
.footer {
  width: 100%;
}
</style>
