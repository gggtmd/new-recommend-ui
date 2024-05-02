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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 50px;
}
.btn-wrapper {
  box-sizing: border-box;
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 99;
  min-height: 72px;
}
</style>