<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
//传入交叉元素DOM
const {rootSelector} = defineProps({
  rootSelector: {
    required: true
  }
})
//交叉处理方法
const emit = defineEmits(["handleIntersect"])
const targetRef = ref()

//设置观察配置,及触发回调方法
let observer = null
onMounted(() => {
  const options = {
    root: rootSelector,
    rootMargin: "0px 0px 200px 0px"
  }
  observer = new IntersectionObserver(([entry]) => {
    if(entry && entry.isIntersecting) {
      emit("handleIntersect")
    }
  },options)
  observer.observe(targetRef.value)
})
//销毁监听
onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <div class="target" ref="targetRef"></div>
</template>

<style scoped>
.target {
  width: 100%;
  height: 50px;
}
</style>