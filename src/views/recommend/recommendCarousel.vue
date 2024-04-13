<script setup>
import {ArrowRight} from "@element-plus/icons-vue";
import {ref} from "vue";

const hoverIndex = ref(-1)
const handleEnter = (item, index) => {
  hoverIndex.value = index;
};
const handleOut = () => {
  hoverIndex.value = -1;
};

const titleList = ref([
  {
    title: '历史和文化',
    info: ['古代历史', '传统文化', '文化遗产', '现代文化']
  },
  {
    title: '中华语言',
    info: ['汉语学习', '方言', '文字']
  },
  {
    title: '地理和自然环境',
    info: ['地形地貌', '气候', '自然资源']
  },
  {
    title: '社会和经济',
    info: ['社会制度', '经济发展', '现代化进程', '科技创新']
  },
  {
    title: '教育和学术',
    info: ['教育体系', '学术研究', '学科领域']
  },
  {
    title: '风俗习惯和生活方式',
    info: ['饮食习惯', '礼仪规范', '生活习惯']
  },
  {
    title: '国际交流与合作',
    info: [' 国际事务', '国际合作', '合作交流']
  },
])

const imageList = ref([
    'https://pic1.zhimg.com/v2-463f671095a7591e30b727d295fe701b_1440w.jpg?source=172ae18b',
    'https://img.tukuppt.com/bg_grid/00/16/03/pVVp5i8OsK.jpg!/fh/350',
    'https://img.zcool.cn/community/01c498568c742832f8754c80d7423b.jpg@2o.jpg',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.H-lFnACJO0M5ztUKyj3q0gHaE7?pid=ImgDet&w=474&h=315&rs=1'
])
</script>

<template>
  <div class="recommend-carousel">
    <div class="nav-wrapper" @mouseleave="handleOut">
      <div class="carousel-nav">
        <div class="carousel-nav-item" v-for="(item, index) in titleList" @mouseenter="handleEnter(item, index)">
          {{item.title}}
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
      <template v-for="(item, index) in titleList">
        <div class="carousel-nav-item-info" v-if="index === hoverIndex">
          <div class="carousel-nav-item-info-item" v-for="info in titleList[index].info">
            {{info}}
          </div>
        </div>
      </template>
    </div>
    <el-carousel height="350px" arrow="never">
      <el-carousel-item v-for="item in imageList" :key="item">
        <img class="image" :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.recommend-carousel {
  width: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
}
.nav-wrapper {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  transform: scale(1);
  display: flex;
}
.carousel-nav {
  width: 225px;
}
.carousel-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #58585BFF;
  box-sizing: border-box;
  padding: 10px 0;
  margin: 0 20px;
  color: white;
  transition: 0.05s;
  height: 3rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.carousel-nav-item:hover {
  color: #888;
}
.carousel-nav-item-info {
  color: white;
  box-sizing: border-box;
  padding: 20px;
}
.carousel-nav-item-info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #58585BFF;
  box-sizing: border-box;
  padding: 10px 25px;
  margin: 0 20px;
  color: white;
  transition: 0.05s;
  height: 3rem;
  font-size: 0.9rem;
  cursor: pointer;
}
.carousel-nav-item-info-item:hover {
  color: #888;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>