<script setup>
import { ref } from "vue";

defineProps({
  data: {
    type: Array,
    required: true
  }
})
//选中项目
const checkGroup = ref([])

//点击按钮时
const emit = defineEmits(["handleSelect"])
function handleClick(index) {
  emit("handleSelect", index)
}

defineExpose({
  checkGroup,
})
</script>

<template>
  <div class="answer-detail">
    <div class="header">答题详情</div>
    <div class="content">
      <el-checkbox-group v-model="checkGroup" v-for="(item, index) in data">
        <el-checkbox-button :value="index" @click.prevent="handleClick(index)">{{ String(index + 1).padStart(2, '0') }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
  </div>
</template>

<style scoped>
.answer-detail {
  overflow: hidden;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.13));
  box-sizing: border-box;
  //padding: 10px;
}
.header {
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  letter-spacing: 2px;
  position: relative;
  background: radial-gradient(circle at left bottom, transparent 8px,white 0) left bottom / 50% 100% no-repeat,
  radial-gradient(circle at right bottom, transparent 8px, white 0) right bottom / 50% 100% no-repeat;
  text-indent: 15px;
}
.header::before {
  content: '';
  height: 1px;
  background: linear-gradient(to right, #0003 0% 60%, transparent 60%) top left / 15px 20px repeat-x;
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
}
.content {
  padding: 10px 15px;
  background: radial-gradient(circle at left top, transparent 8px,white 0) left top / 50% 100% no-repeat,
  radial-gradient(circle at right top, transparent 8px, white 0) right top / 50% 100% no-repeat;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 10px;
}
.el-checkbox-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-radio-group {
  place-self: center;
}
</style>