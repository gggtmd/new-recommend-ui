<script setup>
import {ref} from "vue";

const linkList = ref([
  [
    {
      name: '汉考国际',
      url: 'https://www.chinesetest.cn'
    },
    {
      name: '中文联盟',
      url: 'https://www.chineseplus.net/home'
    },
    {
      name: '世界汉语教学学会',
      url: 'http://www.shihan.org.cn'
    },
    {
      name: '中外语言交流合作中心',
      url: 'http://www.chinese.cn/page/#/pcpage/mainpage'
    },
  ],
  [
    {
      name: '孔子学院',
      url: 'https://www.ci.cn/grzx'
    },
    {
      name: '留学中国',
      url: 'https://cn.studyinchina.edu.cn/'
    },
    {
      name: '中国留学网',
      url: 'https://www.cscse.edu.cn/'
    },
    {
      name: '国际中文教育资源网',
      url: 'http://www.hanfengeducation.com/product/220624-1.html'
    },
  ],
  [
    {
      name: '央视网',
      url: 'https://www.cctv.com/'
    },
    {
      name: '中国网',
      url: 'http://www.china.com.cn/'
    },
    {
      name: '文化中国',
      url: 'http://cul.china.com.cn/'
    },
    {
      name: '汉语考试服务网',
      url: 'http://www.chinesetest.cn/index.do'
    },
  ]
])
</script>

<template>
  <div class="footer-link">
    <div class="about-wrapper">
      <ul v-for="list in linkList" class="link-wrapper">
        <li class="link-item" v-for="link in list">
          <a class="link-a" :href="link.url" target="_blank">{{link.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.footer-link {
  box-sizing: border-box;
  padding: 20px 20px 60px;
}
.about-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.link-wrapper {
  list-style: none;
  padding: 0;
}
.link-item {
  margin-bottom: 30px;
  cursor: pointer;
}
.link-item:last-child {
  margin-bottom: 0;
}
.link-a {
  color: white;
}
.link-a:hover {
  color: #4293fd;
}
</style>