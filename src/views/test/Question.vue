<script setup>
import {onMounted} from "vue";

onMounted(() => {
  getData()
})

//获取试题题目和选项
import {useRoute} from "vue-router";
import { questionsFindQuestionOptionsServer} from "@/api/questions.js";
const route = useRoute()
async function getData() {
  let options = await questionsFindQuestionOptionsServer(route.params.questionId)
  console.log(options)
}
</script>

<template>

</template>

<style scoped>

</style>