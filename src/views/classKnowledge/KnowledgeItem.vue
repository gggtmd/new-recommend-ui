<script setup>
import {getCurrentInstance, nextTick, onMounted, ref} from "vue";

const props = defineProps({
  records:{
    type: Object
  },
  index:{
    type:Number
  },
  buttonColor:{
    type: String,
    default: "#86cd63"
  },
  buttonText:{
    type: String,
    default: "选 择"
  }
})

const titleRef = ref(null)
const _this = ref()
onMounted(() => {
  boxWidth.value = "80px"
  boxHeight.value = titleRef.value.offsetHeight + "px"
  _this.value = getCurrentInstance()
})

const boxHeight = ref("0")
const boxWidth = ref("0")
const marginBottom = ref("20px")
const transition = ref("0.5s")

const emit = defineEmits(["selectedRefresh"])
function handleSelect() {
  let isClose = false
  emit("selectedRefresh",props.records, props.index, (val) => {
    isClose = val
  })
  if(isClose) {
    close()
  }
  setTimeout(() => {
    transition.value = "0";
    nextTick(() => {
      boxWidth.value = "80px"
      boxHeight.value = "65px"
      marginBottom.value = "20px"
      setTimeout(() => {
        transition.value = "0.5s"
      }, 500)
    })
  }, 500)
}

function close() {
  boxWidth.value = "1500px"
  boxHeight.value = "0"
  marginBottom.value = "0"
}

defineExpose({
  close
})
</script>

<template>
  <div class="box-card">
    <div class="title" ref="titleRef">
      {{ records.knowledgeName }}
      <div
          class="areaButton"
          @click.stop="handleSelect">
        {{ buttonText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-card {
  border-radius: 15px;
  box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
  overflow: hidden;
  background-color: #FFF;
  height: v-bind(boxHeight);
  margin-bottom: v-bind(marginBottom);
  transition: v-bind(transition);
}

.box-card:hover{
  transform: translate(1px,-2px);
  box-shadow: -1px 5px 15px -2px rgba(0, 0, 0, .3);
}

.box-card:active{
  transform: translate(-1px,1px);
}

.title {
  padding: 20px;
  font-size: 1.2rem;
  word-break: break-all;
  word-wrap: break-word;
  position: relative;
  transition: v-bind(transition);

}
.areaButton{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  height: v-bind(boxHeight);
  width: v-bind(boxWidth);
  transition: v-bind(transition);
  background-color: v-bind(props["buttonColor"]);
}
</style>