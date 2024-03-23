<script setup>
import {ref} from "vue";
import { ArrowRightBold } from '@element-plus/icons-vue'


const rate = ref(0)
const isRate = ref(false)
function sendRate() {

}
function routerGo() {

}
</script>

<template>
  <div class="recommend-detail">
    <img class="image" src="@/assets/image1.jpg" alt="">
    <el-scrollbar>
      <div class="title">标题</div>
      <div class="info">详细描述</div>
      <div class="btn-area">
        <div class="rate">
          <el-rate v-model="rate" :disabled="isRate"></el-rate>
          <el-button class="sub-btn" round type="primary" @click="sendRate">提交</el-button>
        </div>
        <el-button class="go-button" round type="success" @click="routerGo">前往<el-icon><ArrowRightBold /></el-icon></el-button>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.recommend-detail {
  width: 100%;
  height: 100%;
  display: flex;
}
.image {
  width: 40%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
}
.el-scrollbar {
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
}
.title {
  font-size: 1.8rem;
  font-weight: bold;
  text-indent: 0.4rem;
  margin-bottom: 20px;
}
.info {
  width: 100%;
  min-height: 150px;
  background: rgba(240, 240, 240, 1);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
}
.btn-area{
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 0.3rem;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.rate {
  display: flex;
  align-items: center;
}
.el-rate /deep/ .el-rate__icon{
  font-size: 35px;
}
.sub-btn {
  margin-left: 20px;
}
.go-button {
  font-size: 1.5rem;
  height: 90%;
  letter-spacing: 5px;
  border-radius: 999px;
}
</style>