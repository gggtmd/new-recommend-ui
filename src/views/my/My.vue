<script setup>
import {useRouter} from "vue-router";
const router = useRouter()

</script>

<template>
  <div class="my">
    <el-button type="danger" @click="router.push('/login')">退出登录</el-button>
  </div>
</template>

<style scoped>
.my {
  width: 100%;
  display: flex;
}
.el-button {
  margin: 30px auto;
}
</style>