<script setup>
import {inject, onBeforeMount, onMounted, ref, watch} from "vue";
import {CloseBold} from '@element-plus/icons-vue'

//点击导航链接触发
let routerList = ref([
  {
    label: '首页',
    name: 'home'
  },
  {
    label: '精选习题',
    name: 'test'
  },
  {
    label: '教学课堂',
    name: 'class'
  },
  {
    label: '知识图谱',
    name: 'graph'
  },
  {
    label: '知识问答',
    name: 'answer'
  },
  {
    label: '风格问卷',
    name: 'personStyle'
  },
  {
    label: '我的',
    name: 'my'
  },
])

const select = ref("")

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
  router.push({name: newValue})
})
</script>

<template>
  <div class="split">
    <el-scrollbar>
      <div class="nav-wrapper" ref="navWrapperRef">
        <div
          v-for="item in routerList"
          :key="item.name" class="nav-item-left"
          :class="{sel: select === item.name}"
          @click="select = item.name"
        >
          {{item.label}}
        </div>
      </div>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.split {
  display: flex;
}
.el-scrollbar {
  width: 100%;
  height: 100vh;
}
.nav-wrapper{
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 15px 150px;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  justify-content: space-between;
}
.sel {
  color: #409EFF;
}
.nav-wrapper::after {
  content: '';
  clear: both;
  display: block;
}
.nav-item-left {
  float: left;
  margin-right: 30px;
  cursor: pointer;
}
</style>