<template>
  <div class="tow-container" ref="containerRef">
    <div class="left-column" ref="leftColumn">
      <slot name="left"></slot>
    </div>
    <div class="splitter" ref="splitter" @mousedown="startResize"></div>
    <div class="right-column" ref="rightColumn">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const leftColumn = ref<HTMLElement | null>(null)
const splitter = ref<HTMLElement | null>(null)
const rightColumn = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isResizing = ref(false)
const initialX = ref(0)
const initialLeftWidth = ref(0)

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  initialX.value = e.clientX
  initialLeftWidth.value = leftColumn.value?.offsetWidth || 0

  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)

  e.preventDefault()
}

const resize = (e: MouseEvent) => {
  if (!isResizing.value) return

  const containerRect = containerRef.value!.getBoundingClientRect()
  const offsetX = e.clientX - initialX.value
  const newLeftWidth = initialLeftWidth.value + offsetX
  const newRightWidth = containerRect?.width ? containerRect.width - newLeftWidth : 0

  // 使用 requestAnimationFrame 来平滑调整宽度
  requestAnimationFrame(() => {
    leftColumn.value!.style.width = newLeftWidth + 'px'
    rightColumn.value!.style.width = newRightWidth + 'px'
  })
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}
</script>

<style scoped>
/* 设置容器和左右列的样式 */
.tow-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.left-column,
.right-column {
  width: 50%;
  flex-grow: 1;
  overflow: auto;
  transition: width 0.1s;
}

/* 设置中分线的样式 */
.splitter {
  width: 10px;
  cursor: col-resize;
  background-color: #5558;
  background-clip: content-box;
  box-sizing: border-box;
  padding: 2px 3px;
  transition: 0.1s;
}
.splitter:hover {
  padding: 2px 0;
}
</style>