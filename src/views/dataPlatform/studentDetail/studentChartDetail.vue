<template>
  <div class="main">
    <div class="animation-title-area" ref="animationTitleArea">
      <Transition name="info-item"  @after-enter="onAfterEnter">
        <div class="main-title" v-show="isShow > 0" ref="mainTitle">
          {{ this.$route.params.studentId }}&nbsp;-&nbsp;{{ this.$route.params.studentName }}
          <ColorTag :color-name="computedColor" class="color-tag">{{ formedStyle }}</ColorTag>
        </div>
      </Transition>
    </div>
    <div class="animation-info-area">
      <div class="info">
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 1">
            <div class="info-item-lable">当前表现</div>
            <div class="info-item-value">{{ formedLevel }}</div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 2">
            <div class="info-item-lable">预警级别</div>
            <div 
              class="info-item-value warning-value" 
              :style="{backgroundColor: `${warningColor}`}">
              {{ formedWarning }}
            </div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 3">
            <div class="info-item-lable">知识点掌握程度</div>
            <div class="info-item-value">{{ fixedCD }}</div>
          </div>
        </Transition>
        <Transition name="info-item">
          <div class="info-item" v-show="isShow > 4">
            <div class="info-item-lable">试题自测数量</div>
            <div class="info-item-value">{{ studentInfo.selfTestCount }}</div>
          </div>
        </Transition>
      </div>
    </div>
    <div class="exam-score-chart" ref="examScoreChart"></div>
    <SliderNav
      class="slider-nav"
      :sliderData="stages"
      height="28"
      @selectSlider="handleSelect"></SliderNav>
    <div class="stage-knowledge-chart" ref="stageKnowledgeChart"></div>
    <div class="button-wrapper">
      <transition name="btn">
        <div class="button-area" v-show="!preBtnDisabled || !nextBtnDisabled">
          <button class="btn" :disabled="preBtnDisabled" ref="preBtn" @click="showPreKnowledge">上一页</button>
          <button class="btn" :disabled="nextBtnDisabled" ref="nextBtn" @click="showNextKnowledge">下一页</button>
        </div>
      </transition>
    </div>
    <div class="stage-knowledge-graph-chart" ref="stageKnowledgeGraphChart"></div>
  </div>
</template>

<script>
import ColorTag from '@/components/ColorTag.vue'
import SliderNav from '@/components/SliderNav.vue';
import * as echarts from "echarts";
import { learningQueryStudentLearningServer } from '@/api/learning.js'
import { personKnowledgeQueryStudentKnowledgeComprehensionServer } from '@/api/personKnowledge.js'
import {classKnowledgeQueryClassStageServer} from "@/api/classKnowledge.js";
import { studentPaperClassStudentPaperQueryServer } from '@/api/studentPaper.js'
import {classesGetClassKnowledgeGraphServer} from '@/api/classes.js'

const tagColor = {
  '0': '#FFF',
  '1': '#5470C6FF',
  '2': '#91CC75FF',
  '3': '#FAC858FF',
}

export default{
  components:{
    ColorTag,
    SliderNav,
  },
  data(){
    return {
      studentInfo: {
        resourceType: 0,
        stagePerformance: 0,
        warning: 0,
        averageCD: 0,
        selfTestCount: 0,
      },
      isShow: 0,
      stages: [],
      activeStage: 0,
      examChart: '',
      xExam:[],
      examData: [],
      stageKnowledgeChart: '',
      xKnowledge: [[]],
      knowledgeData: [[]],
      knowledgeStart: 0,
      knowledgeEnd: 5,
      maxLenght: 5,
      disabled: false,
      isStiky: false,
      stageKnowledgeGraphChart: null
    }
  },
  mounted() {
    const observe = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.intersectionRatio < 1 && this.isStiky){
          if(this.$refs.animationTitleArea){
            this.$refs.animationTitleArea.style.boxShadow = '0px 1.5px 0px rgba(0, 0, 0, 0.1)';
          }
        }else {
          if(this.$refs.animationTitleArea){
            this.$refs.animationTitleArea.style.boxShadow = 'none';
          }
        }
      })
    },{threshold: [0,1], rootMargin: '-40px 0px 0px 0px'})
    observe.observe(this.$refs.animationTitleArea);
    this.examChart = echarts.init(this.$refs.examScoreChart,null,{renderer: 'svg'})
    this.stageKnowledgeChart = echarts.init(this.$refs.stageKnowledgeChart,null,{renderer: 'svg'})
    this.stageKnowledgeGraphChart = echarts.init(this.$refs.stageKnowledgeGraphChart,null,{renderer: 'svg'})
    this.initExamChart();
    this.initKnowledgeChart();
    const resizeObserver = new ResizeObserver(() => {
      this.examChart.resize();
      this.stageKnowledgeChart.resize();
    })
    resizeObserver.observe(document.body);
    this.getStudentInfo();
    this.getClassStage();
    this.getExam();
  },
  methods: {
    handleSelect(index,item){
      this.knowledgeStart = 0;
      this.knowledgeEnd = this.maxLenght;
      this.activeStage = index;
      this.drawKnowledgeChart();
      this.drawKnowledgeGraphChart();
    },
    getStudentInfo(){
      learningQueryStudentLearningServer(this.$route.params.classId,this.$route.params.studentId)
      .then(res => {
        this.studentInfo = res.data
        const startIterval = setInterval(() => {
          this.isShow++;
          if(this.isShow > 4){
            clearInterval(startIterval);
          }
        }, 150);
      })
    },
    getExam(){
      studentPaperClassStudentPaperQueryServer(this.$route.params.classId,this.$route.params.studentId)
      .then(res => {
        res.data.forEach((item,index) => {
          this.xExam.push(item.examTitle);
          this.examData.push(item.score);
        })
        this.drawExamChart();
      })
    },
    getClassStage(){
      classKnowledgeQueryClassStageServer(this.$route.params.classId)
      .then(res => {
        this.stages = res.data[0].map(item => {
          return '第' + item.stage + '阶段';
        })
        res.data[0].forEach((item,index) => {
          this.xKnowledge[index] = [];
          this.knowledgeData[index] = [];
        })
        this.getStudentKnowledge();
      })
    },
    getStudentKnowledge(){
      personKnowledgeQueryStudentKnowledgeComprehensionServer(this.$route.params.classId,this.$route.params.studentId)
      .then(res => {
        res.data.forEach(item => {
          this.knowledgeData[item.stage-1].push(item.comprehension);
          this.xKnowledge[item.stage-1].push(item.knowledgeName);
        })
        this.drawKnowledgeChart();
      })
    },
    initExamChart() {
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
      this.examChart.setOption(option);
    },
    drawExamChart() {
      let option = {
        xAxis: {
          data: this.xExam
        },
        series: [
          {
            data: this.examData,
          },
        ],
      };
      this.examChart.setOption(option);
    },
    initKnowledgeChart(){
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
      this.stageKnowledgeChart.setOption(option);
    },
    drawKnowledgeChart() {
      let option = {
        xAxis: [
          {
            type: 'category',
            data: this.xKnowledge[this.activeStage].slice(this.knowledgeStart,this.knowledgeEnd)
          }
        ],
        series: [
          {
            data: this.knowledgeData[this.activeStage].slice(this.knowledgeStart,this.knowledgeEnd)
          },
        ],
      };
      this.stageKnowledgeChart.setOption(option);
    },
    async drawKnowledgeGraphChart() {
      let option;
      let res = await classesGetClassKnowledgeGraphServer(this.$route.params.classId, this.activeStage + 1)
      const graph = res.data
      graph.nodes.forEach(node => {
        node.label = {
          show: node.symbolSize > 15
        };
      });
      option = {
        title: {
          text: '知识图谱',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            data: graph.categories.map(a => {
              return a.name;
            }),
            top: "20px"
          }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '对外汉语教育',
            type: 'graph',
            draggable: 'true',
            layout: 'force',
            force: {
              repulsion: 700
            },
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            }
          }
        ]
      };
      this.stageKnowledgeGraphChart.setOption(option);
      window.onresize = () => {
        this.stageKnowledgeGraphChart.showLoading()
        this.stageKnowledgeGraphChart.resize()
        this.stageKnowledgeGraphChart.hideLoading();
      }
    },
    showPreKnowledge(){
      if(this.knowledgeEnd === this.xKnowledge[this.activeStage].length && this.xKnowledge[this.activeStage].length%this.maxLenght !== 0){
        this.knowledgeStart -= this.maxLenght;
        this.knowledgeEnd = this.knowledgeEnd - this.xKnowledge[this.activeStage].length%this.maxLenght;
        this.drawKnowledgeChart();
        return;
      }
      this.knowledgeStart -= this.maxLenght;
      this.knowledgeEnd -= this.maxLenght;
      this.drawKnowledgeChart();
    },
    showNextKnowledge(){
      if(this.knowledgeEnd + this.maxLenght > this.xKnowledge[this.activeStage].length){
        this.knowledgeStart += this.maxLenght
        this.knowledgeEnd = this.xKnowledge[this.activeStage].length;
        this.drawKnowledgeChart();
        return;
      }
      this.knowledgeStart += this.maxLenght;
      this.knowledgeEnd += this.maxLenght;
      this.drawKnowledgeChart();
    },
    onAfterEnter(el){
      this.isStiky = true;
    }
  },
  computed: {
    preBtnDisabled() {
      return this.knowledgeStart === 0;
    },
    nextBtnDisabled() {
      return this.knowledgeEnd >= this.xKnowledge[this.activeStage].length;
    },
    fixedCD(){
      return this.studentInfo.averageCD.toFixed(2)
    },
    formedStyle(){
      if(this.studentInfo.resourceType == 1) {
        return '视 频';
      }else if(this.studentInfo.resourceType == 2){
        return '文 档';
      }else if(this.studentInfo.resourceType == 3){
        return '综 合';
      }
    },
    formedLevel(){
      if(this.studentInfo.stagePerformance == 1){
        return 'A';
      }else if(this.studentInfo.stagePerformance == 2){
        return 'B';
      }else if(this.studentInfo.stagePerformance == 3){
        return 'C';
      }else if(this.studentInfo.stagePerformance == 4){
        return 'D';
      }else if(this.studentInfo.stagePerformance == 5){
        return 'E';
      }
    },
    formedWarning(){
      if(this.studentInfo.warning == 1){
        return '最佳';
      }else if(this.studentInfo.warning == 2){
        return '正常';
      }else if(this.studentInfo.warning == 3){
        return '轻度';
      }else if(this.studentInfo.warning == 4){
        return '中度';
      }else if(this.studentInfo.warning == 5){
        return '严重';
      }
    },
    warningColor(){
      if(this.studentInfo.warning == 0){
        return '#fff';
      }else if(this.studentInfo.warning == 1){
        return '#409EFF';
      }else if(this.studentInfo.warning == 2){
        return '#4095E5c0';
      }else if(this.studentInfo.warning == 3){
        return '#F7EF68';
      }else if(this.studentInfo.warning == 4){
        return '#FFBF6B';
      }else if(this.studentInfo.warning == 5){
        return '#F76B68';
      }
    },
    computedColor(){
      return tagColor[this.studentInfo.resourceType];
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.main::-webkit-scrollbar{
  display: none;
}
.animation-info-area{
  width: 100%;
  height: 150px;
}
.animation-title-area{
  width: 100%;
  height: 40px;
  position: sticky;
  top: -0.1px;
  z-index: 999;
  background-color: #FFF;
  transition: 0.3s;
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
.info-item-lable{
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
  white-space: nowrap;
  font-size: 22px;
  border-radius: 50%;
}
.exam-score-chart{
  width: 100%;
  height: 40%;
}
.slider-nav{
  margin: 0 auto 10px;
  width: 99%;
}
.stage-knowledge-chart{
  width: 100%;
  height: 40%;
}
.button-wrapper{
  width: 100%;
  height: 60px;
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
  /* color: #464648; */
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
.stage-knowledge-graph-chart {
  width: 100%;
  height: calc(100% - 60px);
}
</style>