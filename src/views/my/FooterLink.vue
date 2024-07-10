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
        <p>友情链接：</p>
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
        <p>
          本系统由湖南师范大学信息科学与工程学院金晟、崔志坚、张文军三人合作开发，指导教师为湖南师范大学信息科学与工程学院马华教授和蔡美玲副教授。近年来马华教授曾主持国家自科基金面上项目、湖南省自科基金面上项日等科研课题近10项，以第一作者在TPDS、TSC、TLT等国际顶级和权威的SC1、SSCI期刊发表论文10余篇。主持和参与人型横向课题多项，获得国家发明专利授权7项。
        </p>
        <p>
          本系统获得了湖南师范大学的国家“世界一流”建设学科“外国语言文学”的支持，该学科不懈推广中华文化的卓越成就，在培养具有国际视野的国际化人才、服务于国家的安全战略、外交政策、一带一路倡议以及地区经济和社会进步等方面具有独特优势。本项目也得到了“人工智能与精准国际传播”湖南省哲学社会科学重点实验室、湖南师范大学“人工智能与精准国际传播”研究院、信息科学与工程学院的大力支持。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-link {
  box-sizing: border-box;
  padding: 20px 20px 10px;
  background-color: #003c70;
}
.about-wrapper-display{
  margin-right: 2%;
  color: white;
  white-space:nowrap;
  font-size: 1rem;
}
.about-wrapper {
  margin: 0 auto;
  max-width: 1400px;
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
  color: white;
  font-size: 1rem;
}
.about-us {
  color: white;
  font-size: 0.9rem;
}
</style>
