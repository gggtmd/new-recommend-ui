<script setup>
import {VideoPlay} from "@element-plus/icons-vue";
import {computed, onMounted, ref} from "vue";
import FooterLink from "@/views/my/FooterLink.vue";

onMounted(() => {
  getPronunciationList()
})

// 获取语音列表
import {pronunciationPageServer} from "@/api/pronunciation.js";
const input = ref("")
const pageNum = ref(0)
const isSearch = ref(false)
const pronunciationList = ref([])
const getPronunciationList = async () => {
  if(isSearch.value) {
    pageNum.value++
    let res = await pronunciationPageServer(input.value, pageNum.value)
    pronunciationList.value.push(...res.data.records)
    if(res.data.records.length) {
      await getPronunciationList()
    }
    isSearch.value = false
  } else {
    isSearch.value = true
    pronunciationList.value = []
    pageNum.value = 0
    await getPronunciationList()
  }
}

// 播放音频
import {xunFeiTextToAudioServer} from '@/api/xunfei.js'
const audio = new Audio()
const getAudio = (text) => {
  if (text) {
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
  }
}

// 跳转
import {useRouter} from "vue-router";
const router = useRouter()
const routerTo = (item) => {
  const routerURL = router.resolve({
    name: 'PronunciationDetail',
    query: {
      chinese: item.chinese
    }
  })
  window.open(routerURL.href, '_blank')
}

const computedInput = computed(() => {
  return input.value ? `"${input.value}"` : ""
})
</script>

<template>
  <div class="pronunciation">
    <div class="header">
      <h1>Pronunciation Learning&nbsp;{{computedInput}}</h1>
      <input
        class="input"
        placeholder="请输入关键字以搜索"
        v-model="input"
        @keydown.enter="getPronunciationList"
      ></input>
    </div>
    <div class="pronunciation-wrapper">
      <div
        class="pronunciation-item"
        v-for="item in pronunciationList"
        :key="item.pronunciationId"
      >
        <div class="detail">
          <a class="pronunciation-item-a" @click="routerTo(item)">How to say<span class="pronunciation-item-info-cn">{{item.english}}</span>in Chinese</a>
          <div class="pronunciation-item-title"><i>Pinyin:</i><span class="pronunciation-item-info">{{item.pinyin}}</span></div>
          <a class="pronunciation-item-a" @click="routerTo(item)">View more detail</a>
        </div>
        <el-icon
          class="item-image"
          @click="getAudio(item.chinese)"
        ><VideoPlay /></el-icon>
      </div>
      <div
          v-if="(!pronunciationList || !pronunciationList.length) && input"
          class="pronunciation-item"
      >
        <div class="detail">
          <a class="pronunciation-item-a">How to say<span class="pronunciation-item-info-cn">{{input}}</span>in Chinese</a>
        </div>
        <el-icon
            class="item-image"
            @click="getAudio(input)"
        ><VideoPlay /></el-icon>
      </div>
    </div>
  </div>
  <footer-link class="footer"></footer-link>
</template>

<style scoped>
.pronunciation {
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
.pronunciation-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: 60px;
  row-gap: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 25px 30px 30px;
  border-radius: 10px;
  margin-bottom: 300px;
}
.pronunciation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
  border-bottom: 1px solid var(--el-border-color);
}
.detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pronunciation-item-title,
.pronunciation-item{
  font-size: 1rem;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.5);
}
.pronunciation-item-a {
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.2s;
}
.pronunciation-item-a:last-child {
  color: #4293fd80;
  font-size: 0.9rem;
}
.pronunciation-item-a:hover {
  text-decoration-line: underline;
  color: #4293fd;
}
.pronunciation-item-info {
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 10px;
  color: #333;
}
.pronunciation-item-info-cn {
  color: #408bec;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0 10px;
}
.item-image {
  font-size: 2.5rem;
  transition: 0.3s;
}
.item-image:hover {
  color: #4293fd;
  transform: scale(1.15);
}
.item-image:active {
  color: #4293fd80;
  transform: scale(1.1);
}
.footer {
  background-color: #003c70;
  width: 100%;
  margin-top: -200px;
}
</style>
