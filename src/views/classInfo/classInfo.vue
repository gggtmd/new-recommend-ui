<script setup>
import ClassAsideNav from "@/views/class/classAsideNav.vue";

</script>

<template>
    <el-scrollbar class="aside-nav">
      <class-aside-nav></class-aside-nav>
    </el-scrollbar>
    <el-scrollbar class="container">
      <router-view></router-view>
    </el-scrollbar>
</template>

<style scoped>
:deep(.el-scrollbar__thumb) {
  background: #777;
}
.aside-nav {
  width: 15vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 0 15%;
}
</style>