<script setup>
import {useRouter} from "vue-router";
const router = useRouter()

</script>

<template>
  <el-button type="danger" @click="router.push('/login')">退出登录</el-button>
</template>

<style scoped>

</style>