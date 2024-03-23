<script setup>
import TestButton from "@/views/test/TestButton.vue";

</script>

<template>
  <div class="container">
    <div class="btn-wrapper">
      <TestButton></TestButton>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 500px;
  box-sizing: border-box;
  padding: 0 135px;
}
.btn-wrapper {
  box-sizing: border-box;
  padding: 15px 0;
}
</style>