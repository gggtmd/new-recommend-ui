<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

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

const navList = ref([
  {
    label: "简介",
    name: "classDescription"
  },
  {
    label: "公告",
    name: "classNotice"
  },
  {
    label: "阶段",
    name: "classStage"
  },
  {
    label: "考试",
    name: "classExam"
  },
  {
    label: "试卷",
    name: "classPaper"
  },
  {
    label: "学员",
    name: "classStudent"
  },
  {
    label: "图谱",
    name: "classGraph"
  },
])

//导航点击事件
const top = ref("0px")
const activeDom = ref()
const navItemRef = ref()
const router = useRouter()
function handleClick(eventTarget, name) {
  console.log(name)
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
    <div class="title">课堂名称</div>
    <el-divider></el-divider>
    <div class="nav-wrapper">
      <div
          class="nav-item"
          ref="navItemRef"
          v-for="item in navList"
          @click="handleClick($event.target, item.name)"
      >
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
  font-size: 2rem;
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
  background-color: #3333;
  transition: 0.4s cubic-bezier(.38,1.03,.53,1.02);
}
.nav-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 1.2rem;
  color: #666;
  letter-spacing: 2px;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 0 20px;
  transition: 0.2s;
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