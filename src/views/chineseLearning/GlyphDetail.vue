<script setup>
import {computed, onMounted, ref} from "vue";

onMounted(() => {
  searchGlyph()
})

// 搜索字形
import {glyphPageServer} from "@/api/glyph.js";
import {useRoute} from "vue-router";
const route = useRoute()
const glyphData = ref({})
const isLoading = ref(false)
const searchGlyph = async () => {
  let res = await glyphPageServer(route.query.glyphChinese, 0, 1)
  glyphData.value = res.data.records[0]
  setTimeout(() => {
    isLoading.value = true
  }, 100)
}

const computedGlyphChinese = computed(() => {
  return glyphData.value.glyphChinese ? `"${glyphData.value.glyphChinese}"` : ""
})
</script>

<template>
  <div class="glyph-detail">
    <Transition name="fade">
      <div class="container" v-show="isLoading">
        <h1 class="header">
          {{glyphData.glyphChinese}}
          Stroke Order
        </h1>
        <h2 class="stroke-title">Animated Stroke Order Of {{computedGlyphChinese}}</h2>
        <img
          class="stroke-image"
          :src="glyphData.strokeAnimation"
          :alt="glyphData.glyphChinese">
        <div class="stroke-info">
          <div class="info-header">
            <h4 class="header-item">pronunciationChinese：<span>{{glyphData.pronunciationChinese}}</span></h4>
            <h4 class="header-item">glyphEnglish：<span>{{glyphData.glyphEnglish}}</span></h4>
          </div>
          <div class="info-header">
            <h4 class="header-item">strokeNumber：<span>{{glyphData.strokeNumber}}</span></h4>
            <h4 class="header-item">strokeCoding：<span>{{glyphData.strokeCoding}}</span></h4>
            <h4 class="header-item">radicalsChinese：<span>{{glyphData.radicalsChinese}}</span></h4>
          </div>
          <div class="info-meaning">
            <h4>中文词意：</h4>
            <p>{{glyphData.understandingChinese}}</p>
          </div>
          <div class="info-meaning">
            <h4>understandingEnglish：</h4>
            <p>{{glyphData.understandingEnglish}}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.glyph-detail {
  max-width: 1200px;
  margin: 0 auto;
}
.container {
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
  margin: 20px 50px 200px;
  border-radius: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
}
.header {
  padding-bottom: 20px;
  margin-top: 0;
  border-bottom: 1px solid var(--el-border-color-darker);
}
.stroke-title {
  border-left: 5px solid #f52a2a;
  padding-left: 10px;
}
.stroke-image {
  height: 300px;
  margin-bottom: 20px;
}
.stroke-info {
  font-size: 1.2rem;
  padding-left: 5px;
}
.info-header {
  display: flex;
  flex-wrap: wrap;
}
.header-item {
  margin: 10px 40px 10px 0;
  color: #333;
}
.header-item span {
  color: #4293fd;
}
.info-meaning {
  color: #333;
}
.info-meaning h4 {
  margin: 10px 0 0;
}
.info-meaning p {
  margin-top: 10px;
}
</style>