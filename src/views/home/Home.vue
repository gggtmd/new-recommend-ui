<script setup>
import {inject, onBeforeMount, onMounted, ref, watch} from "vue";

//点击导航链接触发
let routerList = ref([
  {
    label: '首页',
    enLabel: 'HOME',
    name: 'home'
  },
  {
    label: '风格问卷',
    enLabel: 'STYLE',
    name: 'personStyle'
  },
  {
    label: '教学课堂',
    enLabel: 'TEACHING CLASS',
    name: 'class',
    subName: [
      {
        label: '课堂管理',
        enLabel: 'CLASS MANAGE',
        name: 'class',
      },
      {
        label: '智能诊断',
        enLabel: 'INTELLIGENT DIAGNOSIS',
        name: 'class',
      },
      {
        label: '学情预警',
        enLabel: 'ACADEMIC WARNING',
        name: 'class',
      }
    ]
  },
  {
    label: '知识图谱',
    enLabel: 'KNOWLEDGE GRAPH',
    name: 'graph'
  },
  {
    label: '精选习题',
    enLabel: 'SELECTED EXERCISES',
    name: 'test',
    subName: [
      {
        label: '推荐习题',
        enLabel: 'RECOMMEND EXERCISES',
        name: 'test',
      },
      {
        label: '海量题库',
        enLabel: 'MORE EXERCISES',
        name: 'test',
      }
    ]
  },
  {
    label: '知识问答',
    enLabel: 'KNOWLEDGE QUESTION',
    name: 'answer',
    subName: [
      {
        label: '热门问答',
        enLabel: 'HOT QUESTIONS',
        name: 'answer',
      },
      {
        label: '实时问答',
        enLabel: 'REAL-TIME QUESTIONS',
        name: 'answer',
      }
    ]
  },
  {
    label: '我的',
    enLabel: 'MY',
    name: 'my',
  },
])

const select = ref("")
const selectIndex = ref(0)

import {useRoute} from "vue-router";
const route = useRoute()
const navWrapperRef = ref()
const $bus = inject("$bus")
onMounted(() => {
  select.value = route.matched[1].name
})

import {useRouter} from "vue-router";
const router = useRouter()
watch(select, (newValue, oldValue) => {
  const routerObject = routerList.value.find(item => item.name === newValue)
  if(!routerObject.subName || !routerObject.subName.length) {
    router.push({name: routerObject.name})
    return
  }
  router.push({name: routerObject.subName[selectIndex.value].name})
})
</script>

<template>
  <div class="header">
    <div class="header-main">
      <div class="slogan">
        <div>汉智大学堂：面向留华学生汉语学习的多模态个性化智能导学系统</div>
        <div>INTELLIGENT SINOLOGY HALL: A MULTI-MODAL PERSONALIZED INTELLIGENT LEARNING GUIDE SYSTEM FOR STUDENTS STUDYING CHINESE IN CHINA</div>
      </div>
      <div class="nav-wrapper" ref="navWrapperRef">
        <div
          v-for="item in routerList"
          :key="item.name"
          class="nav-item-left"
          :class="{sel: select === item.name}"
          @click="select = item.name; selectIndex = 0"
        >
          <div class="nav-item-main">{{item.label}}</div>
          <div class="nav-item-main">{{item.enLabel}}</div>
        </div>
      </div>
      <div class="nav-sub-wrapper">
        <div
          v-for="item in routerList"
          :key="item.name"
          class="nav-item-left"
        >
          <div
            v-for="(sub, index) in item.subName"
            class="nav-item-sub"
            @click="select = item.name;selectIndex = index"
          >
            <div>{{sub.label}}</div>
            <div>{{sub.enLabel}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
  <el-scrollbar>
    <div style="height: 120px"></div>
    <router-view></router-view>
  </el-scrollbar>
</template>

<style scoped>
.header {
  position: fixed;
  z-index: 2500;
  width: 100%;
}
.header-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #003c70;
  height: 120px;
  transition: 0.4s;
  overflow: hidden;
}
.header-main:hover {
  height: 250px;
}
.mask {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: none;
  transition: 0.3s;
}
.header-main:hover + .mask {
  display: block;
  animation: maskBlur 0.3s forwards;
}
@keyframes maskBlur {
  from {
    backdrop-filter: blur(0px);
  }
  to {
    backdrop-filter: blur(5px);
  }
}
.el-scrollbar {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-image: radial-gradient(farthest-corner at 40px 40px, rgb(255, 196, 196), rgb(255, 255, 255, 0) 45%),
  radial-gradient(farthest-corner at 100% 100%, rgb(245, 255, 177), rgb(255, 255, 255, 0) 55%);
}
.slogan {
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: transparent;
  height: 60px;
  box-sizing: border-box;
}
.slogan div {
  background-image: linear-gradient(to right, #ffb11f 40%, #c000c0);
  background-clip: text;
}
.nav-wrapper{
  font-weight: bold;
  letter-spacing: 2px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-item-left {
  cursor: pointer;
  white-space: nowrap;
  transition: 0.3s;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.8rem;
  color: white;
  text-align: left;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  box-sizing: border-box;
}
.sel {
  color: #409EFF;
}
.nav-sub-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
}
.nav-item-sub {
  font-size: 0.7rem;
  font-weight: normal;
  margin-bottom: 10px;
  text-align: left;
  flex-basis: 6rem;
  flex-grow: 1;
  box-sizing: border-box;
  transition: 0.1s;
}
.nav-item-sub:hover {
  color: #409EFF;
}
</style>