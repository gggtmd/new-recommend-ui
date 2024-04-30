<script setup>
getClassList()

import {useRouter} from "vue-router";
import {personClassServer} from "@/api/person.js";
const router = useRouter()
async function getClassList() {
  const res = await personClassServer()
  await router.replace({
    name: 'dataPlatform',
    params: {
      classId: res.data[res.data.length - 1].classId
    }
  })
}
</script>

<template>

</template>

<style scoped>

</style>