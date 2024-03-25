<script setup>
import ClassCard from "@/views/class/classCard.vue";
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
</script>

<template>
  <div class="class-wrapper">
    <class-card v-for="item in classList" :class-data="item"></class-card>
  </div>
</template>

<style scoped>
.class-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 150px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}
</style>