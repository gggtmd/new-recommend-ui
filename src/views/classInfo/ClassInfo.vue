<script setup>
import ClassAsideNav from "@/views/classInfo/ClassAsideNav.vue";

</script>

<template>
    <el-scrollbar class="aside-nav">
      <class-aside-nav></class-aside-nav>
    </el-scrollbar>
    <el-scrollbar class="container">
      <div class="main">
        <router-view></router-view>
      </div>
    </el-scrollbar>
</template>

<style scoped>
:deep(.el-scrollbar__thumb) {
  background: #777;
}
.aside-nav {
  width: 220px;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  min-width: 200px;
}
.container {
  width: calc(100vw - 240px);
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  margin: 0 auto 0 240px;
}
.main {
  box-sizing: border-box;
  padding: 20px;
  max-width: 1200px;
}
</style>