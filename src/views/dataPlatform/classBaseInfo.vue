<template>
  <div class="class-base-info">
    <div class="item">
      <div class="info-number">{{ animationAverageScore }}</div>
      <div class="sub-title">总平均成绩</div>
    </div>
    <div class="item">
      <div class="info-number">{{ animationCompletion }}</div>
      <div class="sub-title">试卷完成度</div>
    </div>
    <div class="item">
      <div class="info-number">{{ animationAverageCD }}</div>
      <div class="sub-title">知识点掌握度</div><!-- 认知诊断 -->
    </div>
    <div class="item">
      <div class="info-number">{{ animationStagePerformance }}</div>
      <div class="sub-title">总体表现</div>
    </div>
    <div class="item">
      <div class="sub-title">预警等级</div>
      <div class="info-number" :style="{backgroundColor: `${warningColor}`}">{{ animationWarning }}</div>
    </div>
  </div>
</template>

<script>
import { learningQueryAllClassLearningServer } from '@/api/learning.js'
import gsap from 'gsap'

let judgePerformance = {
  '0': '--',
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E'
}

let judgeWarning = {
  '0': '--',
  '1': '最佳',
  '2': '正常',
  '3': '轻度',
  '4': '重度',
  '5': '严重'
}

let judgeWarningColor = {
  '0': '#fff',
  '1': '#409EFF',
  '2': '#4095E5c0',
  '3': '#F7EF68',
  '4': '#FFBF6B',
  '5': '#F76B68'
}

export default {
  data() {
    return {
      classInfo: {
        "completion": 0,
        "averageCD": 0,
        "averageScore": 0,
        "stagePerformance": 0,
        "warning": 0,
      },
      tweenedCompletion: 0,
      tweenedAverageCD: 0,
      tweenedAverageScore: 0,
      tweenedStagePerformance: 0,
      tweenedWarning: 0,
      warningColor: '#81B337'
    }
  },

  mounted() {
    learningQueryAllClassLearningServer(this.$route.params.classId)
    .then(res => {
      for(let key in res.data){
        if(key in this.classInfo){
          this.classInfo[key] = res.data[key];
        }
      }
    })
  },

  watch: {
    'classInfo.averageScore': {
      handler(newValue) {
        gsap.to(this.$data, { duration: 1, tweenedAverageScore: newValue });
      }
    },
    'classInfo.completion': {
      handler(newValue) {
        gsap.to(this.$data, { duration: 1, tweenedCompletion: newValue });
      }
    },
    'classInfo.averageCD': {
      handler(newValue) {
        gsap.to(this.$data, { duration: 1, tweenedAverageCD: newValue });
      }
    },
    'classInfo.stagePerformance': {
      handler(newValue) {
        gsap.to(this.$data, { duration: 1, tweenedStagePerformance: newValue });
      }
    },
    'classInfo.warning': {
      handler(newValue) {
        gsap.to(this.$data, { duration: 1, tweenedWarning: newValue });
      }
    },
  },

  computed: {
    animationAverageScore(){
      return this.tweenedAverageScore.toFixed(2);
    },
    animationCompletion(){
      return this.tweenedCompletion.toFixed(2);
    },
    animationAverageCD(){
      return this.tweenedAverageCD.toFixed(2);
    },
    animationStagePerformance(){
      return judgePerformance[this.tweenedStagePerformance.toFixed(0)];
    },
    animationWarning(){
      this.warningColor = judgeWarningColor[this.tweenedWarning.toFixed(0)]
      return judgeWarning[this.tweenedWarning.toFixed(0)];
    },
  }
}
</script>

<style scoped>
.class-base-info{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item{
  box-sizing: border-box;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.item:last-child{
  flex-direction: row;
}
.item:last-child > .sub-title{
  color: #000000;
  margin-right: 20px;
}
.item:last-child > .info-number{
  /* background-color: #81B337; */
  border-radius: 50%;
  width: 70px;
  height: 70px;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
}
.item:not(:last-child)::after{
  content: '';
  width: 1px;
  height: 40%;
  background-color: #a6a6a880;
  position: absolute;
  right: 0;
  top: 40%;
}
.sub-title{
  font-size: 18px;
  color: #a6a6a8;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
}
.info-number{
  font-size: 36px;
}
</style>