<script setup>
import {ref} from "vue";
import {ArrowLeft} from "@element-plus/icons-vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  location: {
    default: {
      left: '15%',
      top: '10%',
      width: '70%',
      height: '80%'
    }
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
    top.value = props.location.top
    left.value = props.location.left
    width.value = props.location.width
    height.value = props.location.height
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
      @before-leave="onLeave"
    >
      <div v-if="show" class="modal-mask">
        <div class="operate" @click="handleMaskClick">
          <el-icon><ArrowLeft /></el-icon>
        </div>
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
  z-index: 9999;
  transition: all 0.5s,width 0.5s cubic-bezier(.38,1.03,.53,1.02), height 0.5s cubic-bezier(.38,1.03,.53,1.02);
  background: rgba(0, 0, 0, 0.4);
}
.modal-body {
  overflow: hidden;
  transition: all 0.5s cubic-bezier(.38,1.03,.53,1.02);
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: v-bind(width);
  height: v-bind(height);
  left: v-bind(left);
  top: v-bind(top);
}
.operate {
  position: absolute;
  z-index: 1;
  top: 40px;
  left: 40px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 99px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-enter-from,
.modal-leave-to{
  background: rgba(240, 240, 240, 0);
}
</style>