<script setup>
import {computed, inject, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {Search, CirclePlus, Bell} from '@element-plus/icons-vue'

import {useUserInfoStore} from "@/stores/userInfo.js";
const userInfoStore = useUserInfoStore()
const userInfo = computed(() => {
  return userInfoStore.userInfo
})

//点击导航链接触发
let routerList = ref([
  {
    label: '首页',
    enLabel: 'Home',
    name: 'home',
    subName: [
      {
        label: '推荐资源',
        enLabel: 'Recommended',
        name: 'home',
        query: {
          resourceType: 'recommend'
        }
      },
      {
        label: '热门资源',
        enLabel: 'Popular',
        name: 'home',
        query: {
          resourceType: 'link'
        }
      }
    ]
  },
  {
    label: '问卷量表',
    enLabel: 'Questionnaire',
    name: 'personStyle',
    subName: [
      {
        label: '学习风格',
        enLabel: 'Learning Style',
        name: 'personStyle',
      },
      {
        label: '大五人格',
        enLabel: 'Big-Five Personality',
        name: 'BigFivePersonality',
      }
    ]
  },
  {
    label: '教学课堂',
    enLabel: 'Teaching Class',
    name: 'class',
    subName: [
      {
        label: '课堂管理',
        enLabel: 'Class Management',
        name: 'class',
      },
      {
        label: '智能诊断',
        enLabel: 'Intelligent Diagnosis',
        name: 'classWarningDiagnosis',
      },
      {
        label: '学情预警',
        enLabel: 'Academic Warning',
        name: 'transferStation',
      }
    ]
  },
  {
    label: '汉字学习',
    enLabel: 'Characters Learning',
    name: 'pronunciation',
    subName: [
      {
        label: '字音学习',
        enLabel: 'Pronunciation Learning',
        name: 'pronunciation',
      },
      {
        label: '字形学习',
        enLabel: 'Glyph Learning',
        name: 'glyph',
      }
    ]
  },
  {
    label: '知识图谱',
    enLabel: 'Knowledge Graph',
    name: 'graph',
    subName: [
      {
        label: '体系图谱',
        enLabel: 'System Graph',
        name: 'graph',
      },
      {
        label: '课堂图谱',
        enLabel: 'Class Graph',
        name: 'graph',
      },
    ]
  },
  {
    label: '精选习题',
    enLabel: 'Selected Exercises',
    name: 'testList',
    params: {
      bankId: '0'
    },
    subName: [
      {
        label: '推荐习题',
        enLabel: 'Recommended Exercises',
        name: 'testList',
        params: {
          bankId: '0'
        }
      },
      {
        label: '海量题库',
        enLabel: 'More Exercises',
        name: 'testList',
        params: {
          bankId: '1'
        }
      }
    ]
  },
  {
    label: '知识问答',
    enLabel: 'Knowledge Question',
    name: 'answer',
    subName: [
      {
        label: '实时问答',
        enLabel: 'Real-Time Questions',
        name: 'answer',
      },
      {
        label: '热门问答',
        enLabel: 'Popular Questions',
        name: 'hotAnswer',
      },
    ]
  },
  // {
  //   label: '我的',
  //   enLabel: 'My',
  //   name: 'my',
  // },
])

const navWrapperRef = ref()
const $bus = inject("$bus")
onMounted(() => {
  matchRouter()
  $bus.on('scrollTo', scrollTo)
})

onBeforeUnmount(() => {
  $bus.off('scrollTo', scrollTo)
})

// 获取路由匹配routerList
import {useRoute} from "vue-router";
const route = useRoute()
const selected = ref({
  mainIndex: 0,
  nextIndex: 0,
})
const matchRouter = () => {
  const routerNameList = route.matched.map(item => item.name)
  routerList.value.find((routerItem, mainIndex) => {
    selected.value.mainIndex = mainIndex
    if(routerNameList.includes(routerItem.name)) {
      selected.value.nextIndex = 0
      return true
    } else if(routerItem.subName && Array.isArray(routerItem.subName)){
      const matchRouterItem = routerItem.subName.find((item, nextIndex) => {
        selected.value.nextIndex = nextIndex
        return routerNameList.includes(item.name)
      })
      return !!matchRouterItem
    }
  })
}

// 监听路由变化，跳转
import {useRouter} from "vue-router";
const router = useRouter()
let isRouter = false
watch(() => selected.value, (newValue, oldValue) => {
  if (isRouter || newValue.mainIndex < 0 && newValue.nextIndex < 0) {
    return
  }
  isRouter = true
  let matchRouter
  if(newValue.nextIndex < 0) {
    matchRouter = routerList.value[selected.value.mainIndex]
  } else {
    matchRouter = routerList.value[selected.value.mainIndex].subName && routerList.value[selected.value.mainIndex].subName[selected.value.nextIndex] || routerList.value[selected.value.mainIndex]
  }
  router.push({
    name: matchRouter.name,
    params: matchRouter.params ? matchRouter.params : {},
    query: matchRouter.query ? matchRouter.query : {}
  })
  setTimeout(() => {
    isRouter = false
  }, 500)
})

// 滚动el-scroll
const scrollRef = ref(null)
const scrollTo = (top) => {
  scrollRef.value.setScrollTop(top)
}

// 跳转至我的界面
const routerMy = () => {
  selected.value = {
    mainIndex: -1,
    nextIndex: -1
  }
  router.push({
    name: 'my'
  })
}
</script>

<template>
  <div class="header">
    <div class="header-main">
      <div class="slogan">
        <div class="slogan-main">留华学生汉语智能导学系统</div>
        <div>Chinese Intelligent Guide System For Foreign Students Study In China</div>
      </div>
      <div class="nav-wrapper" ref="navWrapperRef">
        <div
          v-for="(item, mainIndex) in routerList"
          :key="item.name"
          class="nav-item-left"
          @click="selected = {
            mainIndex,
            nextIndex: -1,
          }"
        >
          <div class="nav-item-title" :class="{sel: selected.mainIndex === mainIndex}">
            <div class="nav-item-main">{{item.label}}</div>
            <div class="nav-item-main main-english">{{item.enLabel}}</div>
          </div>
          <div
            v-for="(sub, nextIndex) in item.subName"
            class="nav-item-sub"
            @click="selected = {
              mainIndex,
              nextIndex: nextIndex
            }"
          >
            <div>{{sub.label}}</div>
            <div class="nav-item-sub-en">{{sub.enLabel}}</div>
          </div>
        </div>
        <div class="nav-icon-wrapper">
          <el-icon class="nav-icon"><Search /></el-icon>
          <el-icon class="nav-icon"><CirclePlus /></el-icon>
          <el-icon class="nav-icon"><Bell /></el-icon>
          <div class="nav-icon-name" @click="routerMy">你好，{{userInfo.userName}}</div>
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
  <el-scrollbar ref="scrollRef" wrap-style="scroll-behavior: smooth;">
    <router-view></router-view>
  </el-scrollbar>
</template>

<style scoped>
.header {
  position: fixed;
  z-index: 2003;
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
  height: 280px;
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
    backdrop-filter: blur(8px);
  }
}
.el-scrollbar {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 120px;
  background-image: radial-gradient(farthest-corner at 40px 40px, rgb(255, 196, 196), rgb(255, 255, 255, 0) 45%),
  radial-gradient(farthest-corner at 100% 100%, rgb(245, 255, 177), rgb(255, 255, 255, 0) 55%);
}
.slogan {
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.7rem;
  color: transparent;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.slogan-main {
  font-size: 1.3rem;
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
  display: flex;
  justify-content: center;
}
.nav-item-left {
  cursor: pointer;
  white-space: nowrap;
  transition: 0.3s;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 1rem;
  color: white;
  text-align: left;
  box-sizing: border-box;
  margin-right: 30px;
}
.sel {
  color: #409EFF;
}
.nav-item-title {
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
}
.main-english {
  font-size: 0.7rem;
  margin-top: 2px;
}
.nav-item-sub {
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: normal;
  margin-bottom: 10px;
  flex-basis: 6rem;
  flex-grow: 1;
  box-sizing: border-box;
  transition: 0.1s;
}
.nav-item-sub:hover {
  color: #409EFF;
}
.nav-item-sub-en {
  font-size: 0.7rem;
}
.nav-icon-wrapper {
  display: flex;
  align-items: center;
  color: white;
  margin-left: 20px;
}
.nav-icon {
  font-size: 1.5rem;
  transition: 0.1s;
  cursor: pointer;
  margin-right: 20px;
}
.nav-icon:hover {
  color: #409EFF;
}
.nav-icon-name {
  padding: 5px 10px;
  border-radius: 5px;
  line-height: 1.5rem;
  font-weight: normal;
  color: #409EFF;
  cursor: pointer;
  transition: 0.2s;
}
.nav-icon-name:hover {
  //filter: brightness(70%);
  color: #b4d6ff;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>