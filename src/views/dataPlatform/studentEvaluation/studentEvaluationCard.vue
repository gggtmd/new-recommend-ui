<template>
  <div class="card" @click="linkToStyleScoreDetail">
    <div class="card-left">
      <div class="info">
        <div class="title">课堂评分</div>
        <div class="info-content" :style="{color: `${mainNumberColor}`}">{{ animationAverageScore }}</div>
        <div class="sub-info">平均得分</div> 
      </div>
      <div class="info-label">
        <ColorTag color-name="#409EFF">评价不错</ColorTag>
      </div>
    </div>
    <div class="card-right" a="1" ref="chart">
    </div>
  </div>
</template>

<script>
import ColorTag from '@/components/ColorTag.vue'
import gsap from 'gsap'
import * as echarts from "echarts";
import { learningClassWholeSummaryServer ,learningStageWholeSummaryServer } from '@/api/learning.js'
import { classKnowledgeQueryClassStageServer } from '@/api/classKnowledge.js'
export default{
  components:{
    ColorTag
  },
  data(){
    return{
      myChart: '',
      drawInterval: null,
      averageScore: 0,
      tweenedAverageScore: 0,
      stageData: [],
      scoreData: [],
      isInit: false,
      getClassStateRateTime: -1,
      mainNumberColor: '#000000',
    }
  },
  created() {
    this.getClassRate();
    this.getClassStage();
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart,null,{renderer: 'svg'});
    this.initChart();
    this.drawInterval = setInterval(() => {
      if(this.isInit){
        clearInterval(this.drawInterval);
        this.drawChart();
      }
    }, 100);
    const resizeObserver = new ResizeObserver(() => {
      this.myChart.resize();
    })
    resizeObserver.observe(document.body);
  },
  methods: {
    initChart() {
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // show: false
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 5,
          // show: false
        },
        series: [
          {
            type: 'line',
            showSymbol: false,
            lineStyle: {
              color: '#FFC90E'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 0.8,
                colorStops: [{
                  offset: 0, color: '#FFF200' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FFF20050' // 100% 处的颜色
                }]
              }
            },
          },
        ],
        grid: {
          left: '15%',
          right: '15%',
          top: '25%',
          bottom: '15%'
        },
      };
      this.myChart.setOption(option);
    },
    drawChart() {
      let option = {
        xAxis: {
          data: this.stageData,
        },
        series: [
          {
            data: this.scoreData,
          },
        ],
      };
      this.myChart.setOption(option);
    },
    linkToStyleScoreDetail(){
      this.$router.replace({
        name: 'studentEvaluationDetail',
        params: {
          stage: JSON.stringify(this.stageData),
          score: JSON.stringify(this.scoreData),
        }
      })
    },
    getClassRate(){
      learningClassWholeSummaryServer(this.$route.params.classId)
      .then(res => {
        this.averageScore = res.data;
      })
    },
    getClassStage(){
      classKnowledgeQueryClassStageServer(this.$route.params.classId)
      .then(res => {
        this.getClassStateRateTime = res.data[0].length;
        res.data[0].forEach((item,index) => {
          this.getClassStageRate(item,index);
        })
        this.stageData = res.data[0].map(item => item.stage.toString() + "阶段");
      })
    },
    getClassStageRate(item,index){
      learningStageWholeSummaryServer(this.$route.params.classId, item.stage)
      .then(res => {
        this.scoreData[index] = res.data;
        this.getClassStateRateTime--;
        if(this.getClassStateRateTime === 0){
          this.isInit = true;
        }
      })
    }
  },

  watch: {
    averageScore(newValue) {
      if(newValue > 4){
        this.mainNumberColor = "#81B337"
      }else if(newValue > 3){
        this.mainNumberColor = "#4095E5"
      }else if(newValue > 2){
        this.mainNumberColor = "#FFA000"
      }else {
        this.mainNumberColor = "#FF4D4D"
      }
      gsap.to(this.$data, { duration: 0.5, tweenedAverageScore: newValue });
    }
  },

  computed: {
    animationAverageScore(){
      return this.tweenedAverageScore.toFixed(2);
    }
  }
}
</script>

<style scoped>
.card{
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 17px 14px;
  border-radius: 8px;
  display: flex;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}
.card:hover{
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.4);
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
  color: #7a7a7c;
}
.info-content{
  font-size: 36px;
  line-height: 40px;
  font-weight: bold;
  text-decoration-line: underline;
  color: #81B337;
  margin-bottom: 6px;
}
.sub-info{
  font-size: 14px;
  color: #a6a6a8;
  font-weight: normal;
}
.info-label{
  font-size: 12px;
  white-space: nowrap;
}
</style>