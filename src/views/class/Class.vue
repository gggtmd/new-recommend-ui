<script setup>
import ClassCard from "@/views/class/classCard.vue"
import AddClass from "@/views/class/AddClass.vue"
import JoinClass from "@/views/class/JoinClass.vue";
import {inject, onBeforeMount, onBeforeUnmount, onMounted, ref} from "vue";

onMounted(() => {
  getClassList()
})

const classList = ref([])
//获取学生或教师加入的课堂
import {personClassServer} from "@/api/person.js";
async function getClassList() {
  const res = await personClassServer()
  classList.value.push(...res.data)
}

//添加新课堂显示弹窗
const addClassRef = ref()
function handleClick() {
  addClassRef.value.dialogVisible()
}

// 加入课堂
const joinClassRef = ref(null)
function handleJoin() {
  joinClassRef.value.dialogVisible()
}
</script>

<template>
  <AddClass ref="addClassRef"></AddClass>
  <JoinClass ref="joinClassRef"></JoinClass>
  <div ref="classWrapperRef" class="class-wrapper">
    <class-card v-for="item in classList" :class-data="item" style="display: flex;justify-content: center;align-items: center"></class-card>
    <div ref="leftAsideRef" class="left-aside">
      <div class="left-aside-wrapper">
        <div class="add-card" v-roleJudge="2">
          <div class="title">需要创建新的课堂？</div>
          <el-button class="btn" type="primary" @click="handleClick">创建</el-button>
        </div>
        <div class="add-card">
          <div class="title">需要加入新的课堂？</div>
          <el-button class="btn" type="primary" @click="handleJoin">加入</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.class-wrapper {
  max-width: 1200px;
  padding: 20px 50px 200px 250px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  position: relative;
}
.class-wrapper-answer {
  padding: 20px 20px 20px 22% ;
}
.left-aside {
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
}
.left-aside-answer {
  width: 22%;
}
.left-aside-wrapper {
  position: sticky;
  top: 20px;
}
.add-card {
  border-radius: 8px;
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: 0.5s;
  box-sizing: border-box;
  padding: 20px 12px 10px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 20px;
}
.add-card:hover {
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
}
.btn {
  width: 100%;
  margin-top: 20px;
  letter-spacing: 3px;
  text-indent: 3px;
}
</style>