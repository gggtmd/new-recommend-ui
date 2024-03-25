<script setup>
import {onMounted, ref} from "vue";

onMounted(() => {
  handleClick(navItemRef.value[0])
})

const navList = ref([
  {
    label: "简介",
    url: "a"
  },
  {
    label: "公告",
    url: "b"
  },
  {
    label: "考试",
    url: "c"
  },
  {
    label: "试卷",
    url: "d"
  },
  {
    label: "学员",
    url: "e"
  },
  {
    label: "图谱",
    url: "f"
  },
  {
    label: "统计",
    url: "g"
  },
])
const top = ref("0px")
const activeDom = ref()
const navItemRef = ref()
function handleClick(eventTarget) {
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
    <h1>课堂名称</h1>
    <div class="nav-wrapper">
      <div
          class="nav-item"
          ref="navItemRef"
          v-for="item in navList"
          @click="handleClick($event.target)"
      >
        {{item.label}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-aside-nav {
  width: 100%;
  height: 150vh;
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
  margin: 10px 0;
  box-sizing: border-box;
  padding: 0 10px;
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