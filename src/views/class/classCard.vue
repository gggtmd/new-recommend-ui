<script setup>
import {ref} from "vue";

const props = defineProps({
  classData: {
    type: Object,
    required: true
  }
})

//点击跳转界面
import {useRouter} from "vue-router";
const router = useRouter()
const isHover = ref(false)
function newPage() {
  const routerURL = router.resolve({
    name: "classInfo",
    params: {
      classId: props.classData.classId
    }
  })
  window.open(routerURL.href, "_blank")
}

//Hover和leaveHover
function handleHover() {
  isHover.value = true
}
function handleLeave() {
  isHover.value = false
}
</script>

<template>
  <div>
    <div class="class-card"
         @click="newPage"
         @mouseover="handleHover"
         @mouseleave="handleLeave"
    >
      <img :src="classData.classPicture" class="image" :class="{imageHover:isHover}" alt="">
      <div class="class-card-info" :class="{infoHover:isHover}">
        <div class="title" :class="{titleHover:isHover}">{{ classData.className }}</div>
        <div class="idInfo" :class="{idInfoHover:isHover}">课堂id:&nbsp;&nbsp;{{ classData.classId }}</div>
        <div class="description" :class="{descriptionHover:isHover}">{{ classData.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-card {
  width: 250px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  transition: 0.5s;
  position: relative;
}
.class-card:hover{
  box-shadow: -1px 3px 15px 3px rgba(0, 0, 0, .3);
}
.image {
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  object-fit: cover;
  transition: 0.5s;
  position: absolute;
  z-index: 1;
  vertical-align: top;
}
.imageHover{
  transform: scale(1.1) translate(-50%,-50%);
}
.class-card-info {
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  padding: 15px;
  transition: 0.5s;
  position: absolute;
  bottom: 0;
  z-index: 2;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.infoHover{
  height: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
.title{
  width: 100%;
  height: 50%;
  font-size: 1.3rem;
  transition: 0.5s;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.titleHover{
  height: 30%;
  font-size: 1.5rem;
  margin-bottom: 5px;
}
.idInfo{
  transition: 0.5s;
  height: 50%;
}
.idInfoHover{
  display: none;
}
.description{
  display: none;
  overflow: hidden;
  word-break: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  height: 70%;
}
.descriptionHover{
  display: -webkit-box;
}
</style>
