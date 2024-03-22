<script setup>
import {ref,onMounted} from "vue";
import {personStylePaperResourceRecommendServer} from "@/api/personStylePaper.js";
import SourceCard from "@/components/SourceCard.vue";

//推荐资源列表
const recommendList = ref([])
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

onMounted(() => {
  getRecommendResource()
  getLessonList()
})
const body = document.querySelector("body")
</script>

<template>
  <div class="recommend">
    <div class="title">推荐资源</div>
    <div class="recommend-wrapper">
      <SourceCard
        v-for="item in recommendList"
        :key="item.resourceId"
        :source-type="item.resourceType"
      >
        <template #title>{{ item.resourceName }}</template>
        <template #info>{{item.resourceLink}}</template>
      </SourceCard>
    </div>
    <div class="title">外部资源</div>
    <div class="lesson-wrapper">
      <SourceCard
        v-for="item in lessonList"
        :key="item.lessonId"
        :image="item.lessonPicture"
        source-type=""
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