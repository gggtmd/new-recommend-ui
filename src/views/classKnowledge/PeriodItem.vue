<script setup>
import {computed, onMounted, ref} from "vue";
import {ElMessageBox} from "element-plus";

const props = defineProps(["records","index"])

const boxHeight = ref("0")
const boxWidth = ref("0")
const marginBottom = ref("20px")

const titleRef = ref(null)
const infoRef = ref(null)
onMounted(() => {
  boxWidth.value = "80px"
  boxHeight.value = titleRef.value.offsetHeight + "px"
})

const knowledgeNameList = computed(() => {
  let nameList = "";
  props.records.periodKnowledgeList.forEach((item) => {
    nameList += item.knowledgeName + "、";
  })
  return nameList.substring(0 ,nameList.length-1)
})

const emit = defineEmits(["selected","deleteRefresh"])
function handleClick() {
  emit("selected", props.index)
}

function showInfo() {
  boxHeight.value = titleRef.value.offsetHeight + infoRef.value.offsetHeight + "px"
}
function cancelShow() {
  boxHeight.value = titleRef.value.offsetHeight + "px"
}

function selectQuestion() {
  ElMessageBox.confirm(
      `删除后无法撤回`, "确认删除 ?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
    boxWidth.value = "1500px";
    boxHeight.value = "0";
    marginBottom.value = "0";
    emit("deleteRefresh",props.index);
  })
}

defineExpose({
  showInfo,
  cancelShow
})
</script>

<template>
  <div class="box-card">
    <div class="title" ref="titleRef" @click="handleClick()">
      <div class="first-title">第{{ index + 1 }}阶段</div>
      <span class="sub-title">{{ knowledgeNameList }}</span>
      <div class="areaButton" @click.stop="selectQuestion">
        删 除
      </div>
    </div>
    <div class="info" ref="infoRef">
      <slot
          v-for="(knowledgeItem,index) in records.periodKnowledgeList"
          :item="knowledgeItem"
          :index="index">
      </slot>
    </div>
  </div>
</template>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 1px 1px 6px -2px rgba(0, 0, 0, .3);
  transition: 0.5s;
  overflow: hidden;
  background-color: #F2F2F7;
  height: v-bind(boxHeight);
  margin-bottom: v-bind(marginBottom);
}

.box-card:hover{
  transform: translate(1px,-2px);
  box-shadow: -1px 5px 10px -2px rgba(0, 0, 0, .4);
}

.box-card:active{
  transform: translate(-1px,1px);
}

.title {
  transition: 0.5s;
  font-size: 1.2rem;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
  padding: 20px 100px 20px 20px;
  display: flex;
}
.first-title{
  white-space: nowrap;
  align-self: center;
}
.sub-title{
  font-size: 16px;
  color: #C0C0C2;
  margin-left: 10px;
  align-self: center;
}
.areaButton{
  background-color: #ec6767;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 200;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(boxWidth);
  height: v-bind(boxHeight);
}
.info{
  padding: 20px 20px 80px;
  transition: 0.5s;
  background: #fafafc;
}
</style>