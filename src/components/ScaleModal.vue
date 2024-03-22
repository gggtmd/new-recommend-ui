<script setup>
import {ref} from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
//点击mask遮罩方法
const emit = defineEmits(["clickMask"])
function handleMaskClick() {
  emit("clickMask")
}

//body初始化
let domRect = {}
function init(el) {
  domRect = el.getBoundingClientRect();
}
//modal-body元素我位置信息
const left = ref("")
const top = ref("")
const width = ref("")
const height = ref("")
//transition下元素插入dom之前
function onBeforeEnter() {
  top.value = domRect.top + "px"
  left.value = domRect.left + "px"
  width.value = domRect.width + "px"
  height.value = domRect.height + "px"
}
// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter() {
  setTimeout(() => {
    top.value = "10%"
    left.value = "15%"
    width.value = "70%"
    height.value = "80%"
  },0)
}
function onLeave() {
  setTimeout(() => {
    top.value = domRect.top + "px"
    left.value = domRect.left + "px"
    width.value = domRect.width + "px"
    height.value = domRect.height + "px"
  },0)
}
defineExpose({
  init
})
</script>

<template>
  <teleport to="body">
    <Transition
      name="modal"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeEnter"
    >
      <div v-if="show" class="modal-mask" @click="handleMaskClick">
        <div class="modal-body" @click.stop>
          <slot></slot>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  transition: all 0.5s,width 0.5s cubic-bezier(.38,1.03,.53,1.01), height 0.5s cubic-bezier(.38,1.03,.53,1.01);
  background: rgba(200, 200, 200, 0.3);
  backdrop-filter: blur(10px);
}
.modal-body {
  transition: all 0.5s,width 0.5s cubic-bezier(.38,1.03,.53,1.01), height 0.5s cubic-bezier(.38,1.03,.53,1.01);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: v-bind(width);
  height: v-bind(height);
  left: v-bind(left);
  top: v-bind(top);
}
.modal-enter-from,
.modal-leave-to{
  background: rgba(240, 240, 240, 0);
  backdrop-filter: blur(0px);
}
</style>