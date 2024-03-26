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
  width: 15vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  min-width: 200px;
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
.main {
  box-sizing: border-box;
  padding: 20px 20px 20px 60px;
}
@media screen and (max-width: 1200px){
  .container {
    padding: 0 40px 0 200px;
  }
}
</style>