<script setup>
import {computed, getCurrentInstance, onMounted, ref, useSlots} from "vue";

const props = defineProps({
  //列表数据
  allListData:{
    type: Array,
    required: true,
  },
  //获取数据方法
  load:{
    type:Function,
    required: true,
  },
  //item高度包括margin、border和padding
  itemHeight: {
    type: Number,
    required: true,
  },
  cacheLength: {
    type: Number||String,
    default: 5
  }
})

onMounted(() => {
  props.load()
  getContainerSize()
})

const startIndex = ref(0)
const containerSize = ref(0)
const scrollContainer = ref(null)
const itemContainer = ref(null)

//获取虚拟列表可以显示多少项子元素
function getContainerSize() {
  containerSize.value = Math.floor(scrollContainer.value.offsetHeight / props.itemHeight) + 2
}

//滚动显示列表，并加载新数据
function handleScroll() {
  startIndex.value = Math.floor(scrollContainer.value.scrollTop / props.itemHeight)
  if(startIndex.value + containerSize.value > props.allListData.length - props.cacheLength) {
    props.load()
  }
}

//删除子元素
const emit = defineEmits(["afterDeleteItem"])
function deleteItem(index) {
  const deleteItem = props.allListData[startIndex.value + index]
  props.allListData.splice(startIndex.value + index, 1)
  if(startIndex.value + containerSize.value > props.allListData.length - props.cacheLength) {
    props.load()
  }
  emit("afterDeleteItem", deleteItem)
}

//显示的列表
const showList = computed(() => {
  return props.allListData.slice(startIndex.value, startIndex.value + containerSize.value)
})

//计算padding来滚动
const bankFillStyle = computed(() => {
  return {
    paddingTop: startIndex.value * props.itemHeight + "px",
    paddingBottom: (props.allListData.length - (startIndex.value + containerSize.value)) * props.itemHeight + "px"
  };
})

defineExpose({
  deleteItem
})

</script>

<template>
  <div class="container" @scroll="handleScroll" ref="scrollContainer">
    <div :style="bankFillStyle" ref="itemContainer">
      <slot
        v-for="(item,index) in showList"
        :item="item"
        :index="index"
      >
        加载中...
      </slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  /* 隐藏IE, Edge和Firefox的滚动条 */
  -ms-overflow-style: none; /* IE和Edge */
  scrollbar-width: none; /* Firefox */
}
/* 隐藏Chrome, Safari, Opera等基于Webkit的浏览器的滚动条 */
.container::-webkit-scrollbar {
  display: none;
}
</style>