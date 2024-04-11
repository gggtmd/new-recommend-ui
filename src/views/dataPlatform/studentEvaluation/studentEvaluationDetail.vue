<template>
  <div class="main">
    <studentEvaluationNav 
      class="nav"
      height="32" 
      :sliderData="sliderData" 
      @changeStyleScoreSlider="changeStyleScoreSlider"></studentEvaluationNav>
    <div class="sub-main">
      <div class="linear-chart" ref="linearChart"></div>
      <div class="evaluation">
        <div class="evaluation-title">学生评价</div>
        <div class="evaluation-item-none" v-if="!comments.length">
          <div class="evaluation-item-comment-none">暂无评价</div>
        </div>
        <ul v-else class="evaluation-comments">
          <li class="evaluation-li" v-for="item in comments">
            <div class="evaluation-item">
              <div class="evaluation-item-rate-before">
                评分:&nbsp;<span class="evaluation-item-rate">{{ item.rate }}</span>
              </div>
              <div class="evaluation-item-comment">{{ item.comment }}</div>
            </div>
            <div class="evaluation-item-line"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import studentEvaluationNav from '@/views/dataPlatform/studentEvaluation/studentEvaluationNav.vue'
import * as echarts from "echarts";
import { learningQueryStageSummaryServer } from '@/api/learning.js'
export default {
  components: {
    studentEvaluationNav
  },
  data() {
    return {
      sliderData: [],
      studentEvaluationRate: [],
      evaluationLinearChart: null,
      classId: -1,
      stage: -1,
      comments: []
    }
  },
  created() {
    this.sliderData = JSON.parse(this.$route.params.stage);
    this.studentEvaluationRate = JSON.parse(this.$route.params.score);
    this.classId = this.$route.params.classId;
  },
  mounted() {
    this.evaluationLinearChart = echarts.init(this.$refs.linearChart,null,{renderer: 'svg'});
    this.initChart();
    const resizeObserver = new ResizeObserver(() => {
      this.evaluationLinearChart.resize();
    })
    resizeObserver.observe(document.body);
  },
  methods: {
    changeStyleScoreSlider(index,item){
      this.stage = index + 1;
      this.getRate();
    },
    initChart() {
      let option = {
        title:{
          text: "不同阶段学生评分",
          left: 'left',
        },
        tooltip:{
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.sliderData,
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 5
        },
        series: [
          {
            type: 'line',
            data: this.studentEvaluationRate,
            symbol: 'circle',
            symbolSize: 8,
            //折线图圆点颜色
            itemStyle: {
              color: '#EDAD01'
            },
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
                  offset: 0, color: '#FFBA01' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FFBA0180' // 100% 处的颜色
                }]
              }
            },
          },
        ],
        grid: {
          left: '10%',
          right: '10%',
          top: '25%',
          bottom: '15%'
        },
      };
      this.evaluationLinearChart.setOption(option);
    },
    getRate(){
      learningQueryStageSummaryServer(this.classId,this.stage)
      .then(res => {
        this.comments = res.data.map(item => {
          if(item.stageRating == null){
            return {
              rate: '0.0',
              comment: '无'
            }
          }
          return {
            rate: item.stageRating.toFixed(1),
            comment: item.stageComment
          }
        });
      })
    }
  },
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
.sub-main{
  width: 100%;
  height: calc(100% - 48px);
  overflow-y: scroll;
  border-radius: 10px;
  background: #FFF;
}
.sub-main::-webkit-scrollbar {
  display: none;
}
.nav{
  margin-bottom: 10px;
}
.linear-chart{
  width: 100%;
  height: 40%;
  margin-bottom: 10px;
} 
.evaluation{
  width: 100%;
}
.evaluation-title{
  font-size: 18px;
  font-weight: bold;
  color: #434343EF;
  margin-bottom: 15px;
  box-sizing: border-box;
  padding-left: 4px;
  position: sticky;
  z-index: 99;
  top: 0;
  width: 100%;
  background: #ffffff;
}
.evaluation-item-none{
  list-style-type: none;
  background: #EEEEEF;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  padding: 20px;
}
.evaluation-comments{
  list-style-type: none;
  background: #EEEEEF;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, 0.15);
  padding: 0;
}
.evaluation-item{
  margin: 0 auto;
  width: 95%;
  position: relative;
  box-sizing: border-box;
  padding: 10px 0;
}
.evaluation-item-rate-before{
  margin-bottom: 3px;
  font-size: 18px;
  font-weight: bold;
  color: #434343EF;
}
.evaluation-item-rate{
  color: rgb(238, 186, 22);
}
.evaluation-item-comment{
  color: #434343EF;
}
.evaluation-item-line{
  width: 97.5%;
  float: right;
  //border: 1px solid #B0B0B0;
  border-bottom: 1px solid var(--el-border-color-darker);
}
.evaluation-li:last-child .evaluation-item-line{
  border: none;
}
</style>