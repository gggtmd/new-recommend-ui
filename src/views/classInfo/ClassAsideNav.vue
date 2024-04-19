<script setup>
import {onMounted, ref, shallowRef} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Bell,House,Finished,Document,Memo,User,Share,Tickets,Histogram,Aim,Files} from "@element-plus/icons-vue";

//初始定位激活导航
const route = useRoute()
onMounted(() => {
  const activeName = route.matched[1].name
  navList.value.find((item, index) => {
    if(item.name === activeName) {
      return handleClick(navItemRef.value[index], activeName)
    }
  })
})

const navList = shallowRef([
  {
    label: "课堂简介",
    name: "classDescription",
    role: 1,
    icon: House
  },
  {
    label: "通知公告",
    name: "classNotice",
    role: 1,
    icon: Bell
  },
  {
    label: "教学资源",
    name: "classNotice",
    role: 1,
    icon: Files
  },
  {
    label: "教学阶段",
    name: "classStage",
    role: 2,
    icon: Finished
  },
  {
    label: "在线考试",
    name: "classExam",
    role: 1,
    icon: Document
  },
  {
    label: "试卷管理",
    name: "classPaper",
    role: 2,
    icon: Memo
  },
  {
    label: "学生信息",
    name: "classStudent",
    role: 1,
    icon: User
  },
  {
    label: "知识图谱",
    name: "classGraph",
    role: 1,
    icon: Share
  },
  {
    label: "问卷调查",
    name: "investigation",
    role: 1,
    icon: Tickets
  },
  {
    label: "认知诊断",
    name: "classDiagnosis",
    role: 1,
    icon: Histogram
  },
  {
    label: "学情预警",
    name: "dataPlatform",
    role: 1,
    icon: Aim
  },
])

//导航点击事件
const top = ref("0px")
const activeDom = ref()
const navItemRef = ref()
const router = useRouter()
function handleClick(eventTarget, name) {
  if(name === 'dataPlatform') {
    const routerURL = router.resolve({
      name: "dataPlatform",
      params: {
        classId: route.params.classId
      }
    })
    window.open(routerURL.href, '_blank')
    return
  }
  router.push({
    name
  })
  top.value = eventTarget.offsetTop + "px"
  eventTarget.classList.toggle("nav-item-toggle")
  if(activeDom.value) {
    activeDom.value.classList.toggle("nav-item-toggle")
  }
  activeDom.value = eventTarget
}
</script>

<template>
  <div class="class-aside-nav">
    <div class="title">智辅汉学堂</div>
    <el-divider></el-divider>
    <div class="nav-wrapper">
      <div
          class="nav-item"
          ref="navItemRef"
          v-for="item in navList"
          @click="handleClick($event.target, item.name)"
          v-roleJudge="item.role"
      >
        <el-icon><component :is="item.icon"></component></el-icon>
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-aside-nav {
  width: 100%;
  height: 100vh;
  background-color: white;
}
.title {
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0;
}
.el-divider {
  margin: 0 auto 20px;
  width: 90%;
}
.nav-wrapper {
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
}
.nav-wrapper::before {
  content: '';
  position: absolute;
  z-index: 999;
  width: calc(100% - 20px);
  height: 40px;
  left: 10px;
  top: v-bind(top);
  border-radius: 6px;
  background-color: #409EFF30;
  transition: 0.4s cubic-bezier(.38,1.03,.53,1.02);
}
.nav-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 1.1rem;
  color: #333;
  text-indent: 5px;
  letter-spacing: 2px;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.nav-item-toggle {
  color: #409EFF;
}
.nav-item:hover {
  color: #409EFF;
  border-radius: 6px;
  background-color: #3331;
}
</style>