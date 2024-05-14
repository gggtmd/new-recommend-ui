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
      <div class="about-wrapper-display">
        <p>相关网站：</p>
      </div>
      <ul v-for="list in linkList" class="link-wrapper">
        <li class="link-item" v-for="link in list">
          <a class="link-a" :href="link.url" target="_blank">{{link.name}}</a>
        </li>
      </ul>
      <div class="about-us-display">
        <p>关于我们：</p>
      </div>
      <div class="about-us">
        <p>开发团队：本系统由湖南师范大学信息科学与工程学院金晟、崔志坚、张文军三人共同开发。</p>
        <p>指导老师：湖南师范大学信息科学与工程学院马华教授、蔡美玲教授</p>
        <p>平台支撑：该系统从设计到实现过程中，得到了湖南师范大学的国家“世界一流”建设学科“外国语言文学”的大力支持。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-link {
  box-sizing: border-box;
  padding: 20px 20px 60px;
}
.about-wrapper-display{
  margin-right: 2%;
  color: white;
  white-space:nowrap;
}
.about-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.link-wrapper {
  flex-shrink: 0;
  margin-right: 50px;
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
.about-us-display {
  white-space:nowrap;
  margin-right: 10px;
  color: #4293fd;
  font-size: 0.9rem;
}
.about-us {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #4293fd;
  font-size: 0.9rem;
}
</style>