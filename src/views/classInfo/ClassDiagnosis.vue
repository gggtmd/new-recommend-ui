<script setup>
import ColorTag from '@/components/ColorTag.vue'
import SliderNav from '@/components/SliderNav.vue';
import * as echarts from "echarts";
import {computed, onMounted, ref} from "vue";
import {useUserInfoStore} from "@/stores/userInfo.js";
import {useRoute} from "vue-router";
const userInfoStore = useUserInfoStore()
const route = useRoute()

const tagColor = {
  '0': '#FFF',
  '1': '#5470C6FF',
  '2': '#91CC75FF',
  '3': '#FAC858FF',
}
const formedStyle = {
  '0': '--',
  '1': '视 频',
  '2': '文 档',
  '3': '综 合',
}
const formedLevel = {
  '0': '--',
  '1': 'A',
  '2': 'B',
  '3': 'C',
  '4': 'D',
  '5': 'E',
}
const formedWarning = {
  '0': '--',
  '1': '最佳',
  '2': '正常',
  '3': '轻度',
  '4': '中度',
  '5': '严重',
}
const warningColor = {
  '0': '#fff',
  '1': '#409EFF',
  '2': '#4095E5c0',
  '3': '#F7EF68',
  '4': '#FFBF6B',
  '5': '#F76B68',
}

import { learningQueryStudentLearningServer } from '@/api/learning.js'
import { personKnowledgeQueryStudentKnowledgeComprehensionServer } from '@/api/personKnowledge.js'
import {classKnowledgeQueryClassStageServer} from "@/api/classKnowledge.js";
import { studentPaperClassStudentPaperQueryServer } from '@/api/studentPaper.js'

let examChart = null
const examScoreChartRef = ref(null)
let stageKnowledgeChart = null
const stageKnowledgeChartRef = ref(null)
const isShow = ref(0)
onMounted(() => {
  getDiagnosisInfo()
  getClassStage()
  getExam()
  
  examChart = echarts.init(examScoreChartRef.value,null,{renderer: 'svg'})
  stageKnowledgeChart = echarts.init(stageKnowledgeChartRef.value,null,{renderer: 'svg'})
  initExamChart()
  initKnowledgeChart()
  
  const resizeObserver = new ResizeObserver(() => {
    examChart.resize()
    stageKnowledgeChart.resize()
  })
  resizeObserver.observe(document.body)
})

// nav点击事件
const activeStage = ref(0)
const handleSelect = (index,item) => {
  knowledgeStart.value = 0;
  knowledgeEnd.value = maxLength.value;
  activeStage.value = index;
  drawKnowledgeChart();
}

// 获取用户总体认知诊断信息
const diagnosisInfo = ref({
  resourceType: 0,
  stagePerformance: 0,
  warning: 0,
  averageCD: 0,
  selfTestCount: 0,
})
const getDiagnosisInfo = async () => {
  let res = await learningQueryStudentLearningServer(route.params.classId, userInfoStore.userInfo.userId)
  diagnosisInfo.value = res.data
  // 逐一展示
  const startInterval = setInterval(() => {
    isShow.value++;
    if (isShow.value > 4) {
      clearInterval(startInterval);
    }
  }, 150);
}

// 获取课堂阶段
const stages = ref([])
const xKnowledge = ref([[]])
const knowledgeData = ref([[]])
const getClassStage = async () => {
  let res = await classKnowledgeQueryClassStageServer(route.params.classId)
  stages.value = res.data[0].map(item => {
    return '第' + item.stage + '阶段'
  })
  res.data[0].forEach((item, index) => {
    xKnowledge.value[index] = []
    knowledgeData.value[index] = []
  })
  await getUserKnowledge()
}

// 获取用户认知诊断
const getUserKnowledge = async () => {
  let res = await personKnowledgeQueryStudentKnowledgeComprehensionServer(route.params.classId, userInfoStore.userInfo.userId)
  res.data.forEach(item => {
    knowledgeData.value[item.stage - 1].push(item.comprehension)
    xKnowledge.value[item.stage - 1].push(item.knowledgeName)
  })
  drawKnowledgeChart()
}

// 获取课堂考试
const xExam = []
const examData = []
const getExam = async () => {
  let res = await studentPaperClassStudentPaperQueryServer(route.params.classId, userInfoStore.userInfo.userId)
  res.data.forEach((item, index) => {
    xExam.push(item.examTitle)
    examData.push(item.score)
  })
  drawExamChart()
}

// 展示前一页知识点
const knowledgeStart = ref(0)
const knowledgeEnd = ref(5)
const maxLength = ref(5)
const showPreKnowledge = () => {
  // 当现实最后几个知识点，且知识点不足maxLength
  if(knowledgeEnd.value === xKnowledge.value[activeStage.value].length && xKnowledge.value[activeStage.value].length % maxLength.value !== 0){
    knowledgeStart.value -= maxLength.value
    knowledgeEnd.value -= xKnowledge.value[activeStage.value].length % maxLength.value
    drawKnowledgeChart()
    return
  }
  knowledgeStart.value -= maxLength.value;
  knowledgeEnd.value -= maxLength.value;
  drawKnowledgeChart();
}
// 展示后一页知识点
const showNextKnowledge = () => {
  if(knowledgeEnd.value + maxLength.value > xKnowledge.value[activeStage.value].length){
    knowledgeStart.value += maxLength.value
    knowledgeEnd.value = xKnowledge.value[activeStage.value].length;
    drawKnowledgeChart();
    return;
  }
  knowledgeStart.value += maxLength.value;
  knowledgeEnd.value += maxLength.value;
  drawKnowledgeChart();
}

const initExamChart = () => {
  let option = {
    title: {
      text: '考试成绩/分',
      left: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        name: '考试名称',
        type: 'category',
        axisTick: { show: false },
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 100,
      }
    ],
    series: [
      {
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        barMaxWidth: 35,
        itemStyle: {
          borderRadius: [3,3,0,0],
          color: function (params) {
            if(params.data < 40){
              return '#C42207'
            }else if(params.data < 60){
              return '#C4BD04'
            }else if(params.data < 80){
              return '#0457C4'
            }else if(params.data <= 100){
              return '#05C41B'
            }
          }
        }
      },
    ],
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '15%'
    },
  };
  examChart.setOption(option);
}
const drawExamChart = () => {
  let option = {
    xAxis: {
      data: xExam
    },
    series: [
      {
        data: examData,
      },
    ],
  };
  examChart.setOption(option);
}
const initKnowledgeChart = () =>{
  let option = {
    title:{
      text: '知识点掌握度(0~1)',
      left: '5'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: [
      {
        name: '知识点名称',
        type: 'category',
        axisTick: { show: false },
        axisLabel:{
          interval: 0,
          formatter: function (value, index) {
            if(value.length>10){
              return value.substr(0,5)+'...'
            }else{
              return value
            }
          }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 1,
      }
    ],
    series: [
      {
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        barMaxWidth: 35,
        itemStyle: {
          borderRadius: [5,5,0,0],
          color: function (params) {
            if(params.data < 0.3){
              return '#C42207'
            }else if(params.data < 0.6){
              return '#C4BD04'
            }else if(params.data < 0.8){
              return '#0457C4'
            }else if(params.data <= 1){
              return '#05C41B'
            }
          }
        }
      },
    ],
    grid: {
      left: '10%',
      right: '10%',
      top: '15%',
      bottom: '15%'
    },
  };
  stageKnowledgeChart.setOption(option);
}
const drawKnowledgeChart = () => {
  let option = {
    xAxis: [
      {
        type: 'category',
        data: xKnowledge.value[activeStage.value].slice(knowledgeStart.value, knowledgeEnd.value)
      }
    ],
    series: [
      {
        data: knowledgeData.value[activeStage.value].slice(knowledgeStart.value, knowledgeEnd.value)
      },
    ],
  };
  stageKnowledgeChart.setOption(option);
}

const preDisable = computed(() => {
  return knowledgeStart.value === 0;
})

const nextDisable = computed(() => {
  return knowledgeEnd.value >= xKnowledge.value[activeStage.value].length;
})
</script>

<template>
  <div class="class-diagnosis">
    <div class="animation-title-area" ref="animationTitleArea">
      <Transition name="info-item">
        <div class="main-title" v-show="isShow > 0" ref="mainTitle">
          {{userInfoStore.userInfo.userId}}&nbsp;-&nbsp;{{userInfoStore.userInfo.userName}}
          <ColorTag :color-name="tagColor[diagnosisInfo.resourceType]" class="color-tag">{{ formedStyle[diagnosisInfo.resourceType] }}</ColorTag>
        </div>
      </Transition>
    </div>
    <div class="animation-info-area">
      <div class="info">
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 1">
            <div class="info-item-label">当前表现</div>
            <div class="info-item-value">{{ formedLevel[diagnosisInfo.stagePerformance] }}</div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 2">
            <div class="info-item-label">预警级别</div>
            <div
                class="info-item-value warning-value"
                :style="{backgroundColor: `${warningColor[diagnosisInfo.warning]}`}">
              {{ formedWarning[diagnosisInfo.warning] }}
            </div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 3">
            <div class="info-item-label">知识点掌握程度</div>
            <div class="info-item-value">{{ diagnosisInfo.averageCD.toFixed(2) }}</div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 4">
            <div class="info-item-label">试题自测数量</div>
            <div class="info-item-value">{{ diagnosisInfo.selfTestCount }}</div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="exam-score-chart" ref="examScoreChartRef"></div>
    <SliderNav
        class="slider-nav"
        :sliderData="stages"
        height="28"
        @selectSlider="handleSelect"></SliderNav>
    <div class="stage-knowledge-chart" ref="stageKnowledgeChartRef"></div>
    <div class="button-wrapper">
      <transition name="btn">
        <div class="button-area" v-show="!preDisable || !nextDisable">
          <button class="btn" :disabled="preDisable" @click="showPreKnowledge">上一页</button>
          <button class="btn" :disabled="nextDisable" @click="showNextKnowledge">下一页</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.class-diagnosis{
  width: 100%;
}
.animation-info-area{
  width: 100%;
  height: 150px;
}
.animation-title-area{
  width: 100%;
  height: 40px;
}
.main-title{
  width: 100%;
  height: 40px;
  color: #434343EF;
  font-size: 24px;
  font-weight: bold;
  box-sizing: border-box;
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: start;

}
.color-tag{
  font-size: 20px;
  margin-left: 20px;
  color: #000;
}
.info{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  height: 150px;
}
.info-item{
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  transition: 0.5s;
}
.info-item-leave-active,
.info-item-enter-active {
  transition: all 0.3s;
}
.info-item-enter-from,
.info-item-leave-to{
  transform: translateX(20px);
  opacity: 0;
}
.info-item-label{
  font-size: 18px;
  color: #767678;
  text-align: end;
  margin-right: 12px;
}
.info-item-value{
  font-size: 30px;
  font-weight: bold;
  margin-left: 12px;
}
.warning-value{
  background: #00000008;
  line-height: 55px;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  width: 55px;
  margin-left: -5px;
  white-space: nowrap;
  font-size: 22px;
  border-radius: 50%;
}
.exam-score-chart{
  width: 100%;
  height: 400px;
}
.slider-nav{
  margin: 0 auto 10px;
  width: 99%;
}
.stage-knowledge-chart{
  width: 100%;
  height: 400px;
}
.button-wrapper{
  width: 100%;
  height: 100px;
}
.button-area{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: start;
}
.btn{
  margin: 0 10px;
  border: none;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.3s;
  background-color: rgb(110, 175, 254);
}
.btn:hover{
  background-color: rgb(51, 143, 255);
}
.btn:active{
  background-color: rgb(110, 175, 254);
}
.btn-enter-active,
.btn-leave-active {
  transition: opacity 0.4s ease;
}
.btn-enter {
  opacity: 0;
}
.btn-enter-to {
  opacity: 1;
}
.btn-leave {
  opacity: 1;
}
.btn-leave-to {
  opacity: 0;
}
</style>