<script setup>
import {inject, onBeforeMount, onMounted, ref, watch} from "vue";
import {CloseBold} from '@element-plus/icons-vue'

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
    name: 'class'
  },
  {
    label: '知识图谱',
    enLabel: 'KNOWLEDGE GRAPH',
    name: 'graph'
  },
  {
    label: '精选习题',
    enLabel: 'SELECTED EXERCISES',
    name: 'test'
  },
  {
    label: '知识问答',
    enLabel: 'KNOWLEDGE QUESTIONS',
    name: 'answer'
  },
  {
    label: '我的',
    enLabel: 'MY',
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
    <div class="slogan">
      <div>智辅汉学堂：面向留华学生汉语学习的多模态个性化智能导学系统</div>
      <div>INTELLIGENT SINOLOGY HALL: A MULTI-MODAL PERSONALIZED INTELLIGENT LEARNING GUIDE SYSTEM FOR STUDENTS STUDYING CHINESE IN CHINA</div>
    </div>
    <el-scrollbar>
      <div class="nav-wrapper" ref="navWrapperRef">
        <div
          v-for="item in routerList"
          :key="item.name"
          class="nav-item-left"
          :class="{sel: select === item.name}"
          @click="select = item.name"
        >
          <div>{{item.label}}</div>
          <div>{{item.enLabel}}</div>
        </div>
      </div>
      <Transition
        name="fade"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
      >
      </Transition>
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.el-scrollbar {
  width: 100%;
  height: 100vh;
}
.nav-wrapper{
  font-weight: bold;
  letter-spacing: 2px;
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #003c70;
}
.slogan {
  text-align: center;
  padding: 20px 0;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: transparent;
  background-color: #003c70;
}
.slogan div {
  background-image: linear-gradient(to right, #ffb11f 40%, #c000c0);
  background-clip: text;
}
.nav-item-left {
  margin-right: 40px;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.4s;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.9rem;
  color: white;
}
.sel {
  color: #409EFF;
  transform: scale(1.2);
  margin-bottom: 5px;
}
</style>