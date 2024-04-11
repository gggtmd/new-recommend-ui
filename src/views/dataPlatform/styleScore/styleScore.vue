<script setup>
import gsap from 'gsap'
import * as echarts from "echarts";
import ColorTag from '@/components/ColorTag.vue'
import { examsPageServer } from '@/api/exams.js'
import { studentPaperStyleGradeServer } from '@/api/studentPaper.js'
import {computed, inject, onBeforeUnmount, onMounted, ref, watch} from "vue";

class exam{
  examInfo = {}
  styleScore = {
    video: [],
    document: [],
    both: [],
  }
  constructor(examInfo){
    this.examInfo = examInfo;
  }
}

let myChart = null
const chartRef = ref(null)
onMounted(() => {
  myChart = echarts.init(chartRef.value,null,{renderer: 'svg'})
  initChart()
  getExams()
  const resizeObserver = new ResizeObserver(() => {
    myChart.resize();
  })
  resizeObserver.observe(document.body);
  $bus.on("changeStyleScoreSlider", changeStyleScoreSlider)
})

onBeforeUnmount(() => {
  $bus.off("changeStyleScoreSlider", changeStyleScoreSlider)
})

const chartData = {
  xData: ['0~10', '10~20', '20~30', '30~40', '40~50', '50~60', '60~70','70~80','80~90','90~100'],
  yData: 0, //暂未使用
  series: {
    video: new Array(11).fill(0),
    document: new Array(11).fill(0),
    both: new Array(11).fill(0)
  }
}
const isInit = ref(false)

// 初始化图表轮廓
function initChart() {
  const option = {
    legend:{
      selectedMode: false,
      data: ["视频", "文档", "综合"],
      textStyle: {
        fontSize: 12,
      },
      icon: 'roundRect',
      itemHeight: 2,
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 2,
      interval: 1,
    },
    series: [
      {
        type: 'line',
        smooth: true,
        name: '视频',
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 0.8,
            colorStops: [{
              offset: 0, color: '#5470C6FF' // 0% 处的颜色
            }, {
              offset: 1, color: '#5470C600' // 100% 处的颜色
            }]
          }
        },
      },
      {
        type: 'line',
        smooth: true,
        name: '文档',
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 0.8,
            colorStops: [{
              offset: 0, color: '#91CC75FF'
            }, {
              offset: 1, color: '#91CC7500'
            }]
          }
        },
      },
      {
        type: 'line',
        smooth: true,
        name: '综合',
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#FAC858FF'
            }, {
              offset: 1, color: '#FAC85800'
            }]
          }
        },
      }
    ],
    grid: {
      left: '15%',
      right: '15%',
      top: '25%',
      bottom: '15%'
    },
  };
  myChart.setOption(option);
}
//绘制图表数据
function drawChart() {
  const option = {
    xAxis: {
      data: chartData.xData,
    },
    yAxis: {
      min: 0,
    },
    series: [
      {
        data: chartData.series.video,
      },
      {
        data: chartData.series.document,
      },
      {
        data: chartData.series.both,
      }
    ],
  };
  myChart.setOption(option);
}

// 获取课堂考试数据
import {useRoute} from "vue-router";
const route =useRoute()
let pageNum = 0
const exams = []
async function getExams() {
  pageNum++
  let res = await examsPageServer(route.params.classId, pageNum, "")
  if(res.data.records.length) {
    res.data.records.forEach(item =>{
      exams.push(new exam(item))
    })
    await getExams()
  } else {
    await getStudentGrade()
  }
}

// 获取考试学生成绩及学生类型
async function getStudentGrade() {
  let requestPromise = []
  exams.forEach(item => {
    requestPromise.push(studentPaperStyleGradeServer(item.examInfo.examId))
  })
  let allRes = await Promise.all(requestPromise)
  allRes.forEach((res, index) => {
    res.data.forEach(item => {
      if(item.style === '1'){
        exams[index].styleScore.video.push(item.score)
      } else if(item.style === '2'){
        exams[index].styleScore.document.push(item.score)
      } else if(item.style === '3'){
        exams[index].styleScore.both.push(item.score)
      }
    })
  })
  // 提取最近一次考试的数据
  initStyleGradeChartData(exams.length - 1)
}

// 初始化图表数据
function initStyleGradeChartData(examIndex) {
  chartData.series.video = new Array(11).fill(0);
  chartData.series.document = new Array(11).fill(0);
  chartData.series.both = new Array(11).fill(0);
  exams[examIndex].styleScore.video.forEach((item, index) => {
    chartData.series.video[Math.floor(exams[examIndex].styleScore.video[index]/10)]++
  })
  exams[examIndex].styleScore.document.forEach((item, index) => {
    chartData.series.document[Math.floor(exams[examIndex].styleScore.document[index]/10)]++
  })
  exams[examIndex].styleScore.both.forEach((item, index) => {
    chartData.series.both[Math.floor(exams[examIndex].styleScore.both[index]/10)]++
  })
  // 获取最近一次考试平均成绩
  getAverageScore(exams.length - 1);
  isInit.value = true;
  drawChart()
}

// 获取某次考试平均成绩
const averageScore = ref(0)
function getAverageScore(index){
  let sum = 0;
  if(exams && exams[index]){
    exams[index].styleScore.video.forEach(item => {
      sum += item;
    })
    exams[index].styleScore.document.forEach(item => {
      sum += item;
    })
    exams[index].styleScore.both.forEach(item => {
      sum += item;
    })
    averageScore.value =  sum/(exams[index].styleScore.video.length + exams[index].styleScore.document.length + exams[index].styleScore.both.length)
  }
}

// 点击卡片
import {useRouter} from "vue-router";
const router = useRouter()
const $bus = inject("$bus")
function linkToStyleScoreDetail() {
  let sliderData = [];
  exams.forEach(item => {
    sliderData.push(item.examInfo);
  })
  router.replace({
    name: 'styleScoreDetail',
    params: {
      sliderData: JSON.stringify(sliderData),
      time: Date.now(),
    }
  })
  console.log(exams[0])
  $bus.emit("changeStyleScoreDetail", exams[0])
}

function changeStyleScoreSlider(index,item){
  let interval = setInterval(() => {
    if(isInit.value){
      clearInterval(interval);
      $bus.emit("changeStyleScoreDetail", exams[index])
    }
  },100)
}

watch(isInit, () => {
  drawChart();
})

const tweenedAverageScore = ref({
  score: 0
})
const mainNumberColor = ref('#000000')
watch(averageScore, (newValue) => {
  if(newValue > 80){
    mainNumberColor.value = "#81B337"
  }else if(newValue > 60){
    mainNumberColor.value = "#4095E5"
  }else if(newValue > 40){
    mainNumberColor.value = "#FFA000"
  }else {
    mainNumberColor.value = "#FF4D4D"
  }
  // 相当于tweenedAverageScore.value.score在0.5秒内增加至newValue
  gsap.to(tweenedAverageScore.value, { duration: 0.5, score: newValue });
})

const animationAverageScore = computed(() => {
  return tweenedAverageScore.value.score.toFixed(2);
})
const subInfo = computed(() => {
  return exams[exams.length - 1].examInfo.examTitle
})
</script>

<template>
  <div class="card" @click="linkToStyleScoreDetail">
    <div class="card-left">
      <div class="info">
        <div class="title">学生考试成绩</div>
        <div class="info-content" :style="{color: `${mainNumberColor}`}">{{ animationAverageScore }}</div>
        <div class="sub-info" v-if="isInit">{{ subInfo }}</div>
      </div>
      <div class="info-label">
        <ColorTag color-name="#FF4D4DA0">成绩偏低</ColorTag>
        <ColorTag color-name="#FFBF6B">分布异常</ColorTag>
      </div>
    </div>
    <div class="card-right" ref="chartRef">
    </div>
  </div>
</template>

<style scoped>
.card{
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px 12px 14px;
  border-radius: 8px;
  display: flex;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}
.card:hover{
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.4);
}
.card-left{
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-right{
  width: 65%;
}
.title{
  margin-bottom: 12px;
  font-size: 15px;
  color: #434343EF;
  letter-spacing: 1px;
  font-weight: bold;
}
.info-content{
  font-size: 36px;
  line-height: 40px;
  font-weight: bold;
  text-decoration-line: underline;
  /* color: #81B337; */
  margin-bottom: 6px;
}
.sub-info{
  font-size: 14px;
  color: #666668;
  font-weight: normal;
}
.info-label{
  font-size: 12px;
  white-space: nowrap;
}
.info-label > * {
  margin-right: 5px;
}
</style>