<script setup>
import {computed, onMounted, ref} from "vue";
import FooterLink from "@/views/my/FooterLink.vue";

onMounted(() => {
  searchGlyph()
})

// 搜索字形
import {glyphPageServer} from "@/api/glyph.js";
const glyphList = ref([])
const input = ref("")
const searchNum = ref(0)
const isSearch = ref(false)
const searchGlyph = async () => {
  if(isSearch.value) {
    searchNum.value++
    let res = await glyphPageServer(input.value, searchNum.value, 30)
    glyphList.value.push(...res.data.records)
    if (res.data.records.length) {
      await searchGlyph()
    }
    isSearch.value = false
  } else {
    isSearch.value = true
    glyphList.value = []
    searchNum.value = 0
    await searchGlyph()
  }
}

// 跳转
import {useRouter} from "vue-router";
const router = useRouter()
const routerTo = (item) => {
  const routerURL = router.resolve({
    name: 'GlyphDetail',
    query: {
      glyphChinese: item.glyphChinese
    }
  })
  window.open(routerURL.href, '_blank')
}

const computedInput = computed(() => {
  return input.value ? `"${input.value}"` : ""
})
</script>

<template>
  <div class="glyph">
    <div class="header">
      <h1>Glyph Learning {{computedInput}}</h1>
      <input
        class="input"
        placeholder="请输入关键字以搜索"
        v-model="input"
        @keydown.enter="searchGlyph"
      ></input>
    </div>
    <div class="glyph-wrapper">
      <div
        class="glyph-item"
        v-for="item in glyphList"
        :key="item.glyphId"
        @click="routerTo(item)"
      >
        <img
          class="glyph-image"
          :src="item.strokeAnimation"
          :alt="item.glyphChinese">
        <div class="glyph-item-title">Meaning:<span class="glyph-item-info">{{item.glyphEnglish}}</span></div>
        <div class="glyph-item-title">Pronunciation:<span class="glyph-item-info">{{item.pronunciationChinese}}</span></div>
      </div>
    </div>
  </div>
      <footer-link class="footer"></footer-link>

</template>

<style scoped>
.glyph {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 50px;
}
.header {
  position: sticky;
  z-index: 1;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 20px;
}
.input {
  width: 300px;
  height: 45px;
  outline: none;
  border: none;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  text-indent: 10px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
}
.glyph-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
}
.glyph-item {
  transition: 0.2s;
  cursor: pointer;
}
.glyph-item:hover {
  color: #4293fd;
}
.glyph-item:hover .glyph-image {
  transform: translateY(-5px);
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
}
.glyph-item:active .glyph-image {
  transform: translateY(-2px);
}
.glyph-image {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}
.glyph-item-title {
  font-size: 1rem;
  margin: 0 5px 5px;
}
.glyph-item-info {
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 5px;
}
.footer {
  background-color: #003c70;
  width: 100%;
}
</style>