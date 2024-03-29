<script setup>
import {onMounted, ref} from "vue";

const boxHeight = ref("0")
const titleRef = ref(null)

onMounted(() => {
  boxHeight.value = titleRef.value.offsetHeight + "px"
})

import {defineEmits} from "vue";
const emit = defineEmits(["addPeriod"])
function handleClick() {
  emit("addPeriod")
}
</script>

<template>
  <div class="box-card" @click="handleClick">
    <div class="title" ref="titleRef">
      新 增&nbsp;&nbsp;<i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 1px 1px 6px -2px rgba(0, 0, 0, .2);
  overflow: hidden;
  background-color: #FFF;
  text-align: center;
  border: #409EFF 1px solid;
  box-sizing: border-box;
  color: #409EFF;
  margin-bottom: 20px;
  transition: all 0.2s, color 0.1s;
  height: v-bind(boxHeight);
}

.box-card:hover{
  transform: translate(1px,-2px);
  box-shadow: -1px 5px 10px -2px rgba(0, 0, 0, .3);
  background-color: #409EFF;
  color: #FFF;
}

.box-card:active{
  transform: translate(-1px,1px);
}

.title {
  padding: 20px;
  font-size: 1.2rem;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
  transition: 0.2s;
}
</style>