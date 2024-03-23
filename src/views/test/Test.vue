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
  box-sizing: border-box;
  padding: 0 135px;
}
.btn-wrapper {
  box-sizing: border-box;
  padding: 20px 0;
  position: sticky;
  top: calc(1.3rem + 30px);
}
</style>