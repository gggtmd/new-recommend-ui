<script setup>
import {computed, ref, watch} from "vue";

defineOptions({
  inheritAttrs: false
})

const props = defineProps(["image", "sourceType"])
//标签样式
const tagColor = computed(() => {
  if(props.sourceType) {
    return props.sourceType === "视频"?"video-type":"doc-type"
  }
})
//数据是否正在加载
const isLoading = ref(true)

watch(() => props.image, (value) => {
  if(props.image) {
    isLoading.value = false
  }
}, {immediate: true})
</script>

<template>
  <el-skeleton style="width: 100%" :loading="isLoading" animated>
    <template #template>
      <div class="source-card">
        <el-skeleton-item class="image" variant="image"></el-skeleton-item>
        <div class="text-area">
          <div class="title">
            <el-skeleton-item variant="h3" style="width: 50%"></el-skeleton-item>
          </div>
          <div class="info">
            <el-skeleton-item variant="text"></el-skeleton-item>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="source-card" :class="tagColor" v-bind="$attrs">
        <img class="image" :src="image" alt="">
        <div class="text-area">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="info">
            <slot name="info"></slot>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
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
  transition: 0.4s;
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
.source-card:hover {
  box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.15);
  transform: scale(1.01);
}
.source-card:active {
  transform: scale(0.99);
}
</style>