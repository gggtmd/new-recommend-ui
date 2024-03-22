<script setup>
import {computed} from "vue";

const props = defineProps(["image", "sourceType"])
const tagColor = computed(() => {
  return props.sourceType === "视频"?"video-type":"doc-type"
})
</script>

<template>
  <div class="source-card" :class="tagColor">
    <img class="image" :src="image" alt="">
    <div class="text-area">
      <div class="title">
        <slot name="title">Python程序设计语言</slot>
      </div>
      <div class="info">
        <slot name="info">核聚变水泥厂凯撒</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.source-card {
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  position: relative;
}
.source-card::before {
  content: '';
  position: absolute;
  right: 6px;
  top: calc(70% - 30px);
  padding: 2px 5px;
  border-radius: 3px;
}
.video-type::before {
  content: '视频';
  background-color: #409EFF;
}
.doc-type::before {
  content: '文档';
  background-color: #91CC75;
}
.image {
  width: 100%;
  height: 70%;
  object-fit: cover;
  vertical-align: top;
}
.text-area {
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  transition: 0.2s;
}
.info {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555;
  transition: 0.2s;
}
.source-card:hover .title,
.source-card:hover .info{
  color: #409EFF;
}
</style>