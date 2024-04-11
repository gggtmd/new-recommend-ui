<template>
  <div class="card" @click="linkToStyleScoreDetail">
    <div class="card-left">
      <div class="info">
        <div class="title">知识点掌握度</div>
        <div class="info-content" :style="{color: `${mainNumberColor}`}">{{ animationAverageCD }}</div>
        <div class="sub-info">总体掌握程度</div>
      </div>
      <div class="info-label">
        <ColorTag color-name="#FFBF6B">掌握不足</ColorTag>
      </div>
    </div>
    <div class="card-right" ref="chart">
    </div>
  </div>
</template>

<script>
import ColorTag from '@/components/ColorTag.vue'
import gsap from 'gsap'
import * as echarts from "echarts";
import { learningQueryAllClassLearningServer, learningQueryStageLearningServer } from '@/api/learning.js'
import { classKnowledgeQueryClassStageServer } from '@/api/classKnowledge.js'

export default{
  components:{
    ColorTag
  },
  data(){
    return{
      myChart: '',
      averageCD: 0,
      tweenedAverageCD: 0,
      xData: [],
      seriesData: [[],[],[]],
      sliderData: [],
      maxStageLenght: 4,
      mainNumberColor: '#000000',
    }
  },
  created() {
    learningQueryAllClassLearningServer(this.$route.params.classId)
    .then(res => {
      this.averageCD = res.data.averageCD
    })
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart,null,{renderer: 'svg'});
    this.initChart();
    const resizeObserver = new ResizeObserver(() => {
      this.myChart.resize();
    })
    resizeObserver.observe(document.body);
    this.getChartdata();
  },
  methods: {
    initChart() {
      let option = {
        legend: {
          data: ['视频', '文档', '综合'],
          selectedMode: false,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.xData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '视频',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData[0],
            itemStyle: {
              borderRadius: [3,3,0,0],
            }
          },
          {
            name: '文档',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData[1],
            itemStyle: {
              borderRadius: [3,3,0,0],
            }
          },
          {
            name: '综合',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData[2],
            itemStyle: {
              borderRadius: [3,3,0,0],
            }
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
    //绘制图表
    drawChart() {
      let option = {
        xAxis: {
          data: this.xData
        },
        series: [
          {
            data: this.seriesData[0],
          },
          {
            data: this.seriesData[1],
          },
          {
            data: this.seriesData[2],
          }
        ],
      };
      this.myChart.setOption(option);
    },
    linkToStyleScoreDetail(){
      this.$router.replace({
        name: 'knowledgeStageStyleDetail',
        params: {
          stage: JSON.stringify(this.sliderData),
        }
      })
    },
    getChartdata() {
      classKnowledgeQueryClassStageServer(this.$route.params.classId).then(res => {
        this.sliderData = res.data[0].map(item => "第" + item.stage + "阶段");
        if(res.data[0].length > this.maxStageLenght){
          res.data[0].splice(0, res.data[0].length - this.maxStageLenght);
        }
        this.xData = res.data[0].map(item => "第" + item.stage + "阶段");
        let stageList = res.data[0].map(item => Number(item.stage));
        learningQueryStageLearningServer(this.$route.params.classId, ...stageList).then(res => {
          res.data.forEach((item,index) => {
            this.seriesData[index] = item.map(item => item.averageCD);
          })
          this.drawChart();
        })
      })
    }
  },
  watch: {
    averageCD(newValue) {
      if(newValue > 0.8){
        this.mainNumberColor = "#81B337"
      }else if(newValue > 0.6){
        this.mainNumberColor = "#4095E5"
      }else if(newValue > 0.35){
        this.mainNumberColor = "#FFA000"
      }else {
        this.mainNumberColor = "#FF4D4D"
      }
      gsap.to(this.$data, { duration: 0.5, tweenedAverageCD: newValue });
    }
  },
  computed: {
    animationAverageCD(){
      return this.tweenedAverageCD.toFixed(2);
    }
  }
}
</script>

<style scoped>
.card{
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 10px 12px 14px;
  letter-spacing: 1px;
  font-weight: bold;
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
  color: #434343EF;
  font-weight: bold;
}
.info-content{
  font-size: 36px;
  line-height: 40px;
  text-decoration-line: underline;
  color: #81B337;
  margin-bottom: 6px;
}
.sub-info{
  font-size: 14px;
  color: #666668;
  font-weight: normal;
}
.info-label{
  font-weight: normal;
  font-size: 12px;
  white-space: nowrap;
}
.info-label > * {
  margin-right: 5px;
}
</style>