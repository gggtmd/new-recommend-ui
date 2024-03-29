<script setup>
import ClassCard from "@/views/class/classCard.vue";
import AddClass from "@/views/class/AddClass.vue"
import {onMounted, ref} from "vue";

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
</script>

<template>
  <AddClass ref="addClassRef"></AddClass>
  <div class="class-wrapper">
    <class-card v-for="item in classList" :class-data="item"></class-card>
    <div class="add-card">
      <div class="title">需要加入新的课堂？</div>
      <el-button class="btn" type="primary" @click="handleClick">加入</el-button>
    </div>
  </div>
</template>

<style scoped>
.class-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 15%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  position: relative;
}
.add-card {
  position: absolute;
  top: 20px;
  left: 1%;
  width: 13%;
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
}
.add-card:hover {
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
}
.btn {
  width: 100%;
  margin-top: 20px;
}
</style>