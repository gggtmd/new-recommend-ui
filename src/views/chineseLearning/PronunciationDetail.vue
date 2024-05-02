<script setup>
import {computed, onMounted, ref} from "vue";
import {VideoPlay} from "@element-plus/icons-vue";

onMounted(() => {
  getPronunciation()
})

// 搜索字形
import {pronunciationPageServer} from "@/api/pronunciation.js";
import {useRoute} from "vue-router";
const route = useRoute()
const pronunciationData = ref({})
const isLoading = ref(false)
const getPronunciation = async () => {
  let res = await pronunciationPageServer(route.query.chinese, 0, 1)
  pronunciationData.value = res.data.records[0]
  setTimeout(() => {
    isLoading.value = true
  }, 100)
}

const computedGlyphChinese = computed(() => {
  return pronunciationData.value.chinese ? `"${pronunciationData.value.chinese}"` : ""
})

// 播放音频
import {xunFeiTextToAudioServer} from '@/api/xunfei.js'
const audio = new Audio()
const getAudio = (text) => {
  if (!audio.src) {
    xunFeiTextToAudioServer(text).then(response => {
      //通过这个API让语音数据转为成一个url地址
      audio.src = URL.createObjectURL(response)//设置audio的src为上面生成的url
      audio.play()//进行播放
      //在谷歌内核中,audio.play()会返回一个promise的值，在IE内核中就不会返回任何的值
      //所以如果你要分浏览器，可以判断playPromiser的值来进行操作哦
      audio.onended = () => {
      }
    }).catch(err => {
    })
  } else {
    audio.play()
  }
}
</script>

<template>
  <div class="glyph-detail">
    <Transition name="fade">
      <div class="container" v-show="isLoading">
        <h1 class="header">
          English Phrase
          <span class="header-main">{{pronunciationData.english}}</span>
        </h1>
        <h2 class="stroke-title">
          How to say in Chinese
          <span class="stroke-main">{{computedGlyphChinese}}</span>
          <el-icon
            class="item-image"
            @click="getAudio(pronunciationData.chinese)"
          ><VideoPlay /></el-icon>
        </h2>
        <div class="stroke-info">
          <div class="info-meaning">
            <span><i>Pinyin：</i></span>
            <span class="content">{{pronunciationData.pinyin}}</span>
          </div>
          <div class="info-meaning">
            <span>meaning：</span>
            <span class="content">{{pronunciationData.meaning}}</span>
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
  padding-bottom: 15px;
  margin-top: 0;
  border-bottom: 1px solid var(--el-border-color-darker);
}
.header-main {
  color: #4293fd;
}
.stroke-main {
  color: #64d22f;
}
.stroke-title {
  border-left: 5px solid #f52a2a;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.stroke-info {
  font-size: 1.2rem;
  padding-left: 5px;
}
.header-item span {
  color: #4293fd;
}
.info-meaning span {
  display: inline-block;
  margin: 10px 0 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #aaa;
}
.info-meaning .content {
  color: #000;
  font-size: 1.5rem;
  font-weight: normal;
}
.item-image {
  font-size: 2rem;
  height: 100%;
  transition: 0.3s;
  margin-left: 20px;
}
.item-image:hover {
  color: #4293fd;
  transform: scale(1.12);
}
.item-image:active {
  color: #4293fd80;
  transform: scale(1.1);
}
</style>