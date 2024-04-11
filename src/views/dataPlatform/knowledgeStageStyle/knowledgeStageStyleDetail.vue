<template>
  <div class="main">
    <div class="knowledge-stage-chart" ref="knowledgeStageChart"></div>
    <SliderNav 
      class="slider-nav"
      :sliderData="sliderData" 
      height="28"
      :disabled="disabled"
      @selectSlider="handleSelect">
      </SliderNav>
      <div class="knowledge-stage-style-chart" ref="knowledgeStageStyleChart"></div>
      <transition>
        <div class="button-area" v-show="!preBtnDisabled || !nextBtnDisabled">
          <button class="btn" :disabled="preBtnDisabled" ref="preBtn" @click="showPreKnowledge">上一页</button>
          <button class="btn" :disabled="nextBtnDisabled" ref="nextBtn" @click="showNextKnowledge">下一页</button>
        </div>
      </transition>
  </div>
</template>

<script>
import SliderNav from '@/components/SliderNav.vue';
import * as echarts from "echarts";
import { learningQueryStageLearningServer, learningQueryStageKnowledgeComprehensionServer } from '@/api/learning.js'
import { classKnowledgeQueryClassStageServer, classKnowledgePageServer } from '@/api/classKnowledge.js'
export default {
  components: {
    SliderNav
  },
  data() {
    return {
      myChart: '',
      myChart2: '',
      sliderData: [],
      xData: [],
      seriesData: [[],[],[]],
      xData2: [],
      seriesData2: [[],[],[]],
      seriesData2Start: 0,
      seriesData2End: 5,
      maxLenght: 5,
      disabled: false,
    }
  },
  created() {
    this.sliderData = JSON.parse(this.$route.params.stage);
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.knowledgeStageChart,null,{renderer: 'svg'});
    this.myChart2 = echarts.init(this.$refs.knowledgeStageStyleChart,null,{renderer: 'svg'});
    this.initChart();
    this.initChart2();
    const resizeObserver = new ResizeObserver(() => {
      this.myChart.resize();
      this.myChart2.resize();
    })
    resizeObserver.observe(document.body);
    this.getChartdata();
    this.myChart.on('legendselectchanged',this.legendselectchanged);
    this.myChart2.on('legendselectchanged',this.legendselectchanged);
  },
  methods: {
    initChart() {
      let option = {
        title: {
          text: '各阶段知识点整体掌握情况'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['视频', '文档', '综合'],
          left: '60%'
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
            name: '知识点掌握程度',
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
              borderRadius: [5,5,0,0],
            },
            barMaxWidth: 40,
          },
          {
            name: '文档',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData[1],
            itemStyle: {
              borderRadius: [5,5,0,0],
            },
            barMaxWidth: 40,
          },
          {
            name: '综合',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData[2],
            itemStyle: {
              borderRadius: [5,5,0,0],
            },
            barMaxWidth: 40,
          },
        ],
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '15%'
        },
      };
      this.myChart.setOption(option);
    },
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
    initChart2(){
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['视频', '文档', '综合']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            // axisLabel: { interval: 0, rotate: -30 }
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
            name: '知识点掌握程度',
            type: 'value',
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
            itemStyle: {
              borderRadius: [4,4,0,0],
            }
          },
          {
            name: '文档',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              borderRadius: [4,4,0,0],
            }
          },
          {
            name: '综合',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            itemStyle: {
              borderRadius: [4,4,0,0],
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
      this.myChart2.setOption(option);
    },
    drawChart2() {
      let option = {
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.xData2.slice(this.seriesData2Start,this.seriesData2End)
          }
        ],
        series: [
          {
            name: '视频',
            data: this.seriesData2[0].slice(this.seriesData2Start,this.seriesData2End)
          },
          {
            name: '文档',
            data: this.seriesData2[1].slice(this.seriesData2Start,this.seriesData2End)
          },
          {
            name: '综合',
            data: this.seriesData2[2].slice(this.seriesData2Start,this.seriesData2End)
          },
        ],
      };
      this.myChart2.setOption(option);
    },
    getChartdata() {
      classKnowledgeQueryClassStageServer(this.$route.params.classId).then(res => {
        this.xData = res.data[0].map(item => "第" + item.stage + "阶段");
        let stageList = res.data[0].map(item => Number(item.stage));
        learningQueryStageLearningServer(this.$route.params.classId, ...stageList).then(res => {
          res.data.forEach((item,index) => {
            this.seriesData[index] = item.map(item => item.averageCD);
          })
          this.drawChart();
        })
      })
    },
    handleSelect(index,item){
      this.disabled = true;
      this.seriesData2Start = 0;
      this.seriesData2End = this.maxLenght;
      if(this.myChart2){
        this.myChart2.showLoading();
      }
      this.getxData2(this.$route.params.classId, index + 1);
    },
    getxData2(classId, stage){
      classKnowledgePageServer(classId, stage)
      .then(res => {
        this.xData2 = res.data.map(item => item.knowledgeName);
        this.seriesData2 = [new Array(this.xData2.length).fill(0),
                            new Array(this.xData2.length).fill(0),
                            new Array(this.xData2.length).fill(0)]
        this.getSeriesData2(classId, stage);
      })
    },
    getSeriesData2(classId, stage){
      learningQueryStageKnowledgeComprehensionServer(classId, stage)
      .then(res => {
        res.data.forEach((item,index) => {
          item.forEach((item2) => {
            this.seriesData2[index][this.xData2.indexOf(item2.knowledgeName)] = item2.comprehension;
          })
        })
        this.myChart2.hideLoading();
        this.drawChart2();
        this.disabled = false;
      })
    },
    legendselectchanged(params){
      let option1 = this.myChart.getOption();
      let option2 = this.myChart2.getOption();
      option1.legend[0].selected = params.selected;
      option2.legend[0].selected = params.selected;
      this.myChart.setOption(option1);
      this.myChart2.setOption(option2);
    },
    showPreKnowledge(){
      if(this.seriesData2End === this.xData2.length && this.xData2.length%this.maxLenght !== 0){
        this.seriesData2Start -= this.maxLenght;
        this.seriesData2End = this.seriesData2End - this.xData2.length%this.maxLenght;
        this.drawChart2();
        return;
      }
      this.seriesData2Start -= this.maxLenght;
      this.seriesData2End -= this.maxLenght;
      this.drawChart2();
    },
    showNextKnowledge(){
      if(this.seriesData2End + this.maxLenght > this.xData2.length){
        this.seriesData2Start += this.maxLenght
        this.seriesData2End = this.xData2.length;
        this.drawChart2();
        return;
      }
      this.seriesData2Start += this.maxLenght;
      this.seriesData2End += this.maxLenght;
      this.drawChart2();
    }
  },
  computed: {
    preBtnDisabled() {
      return this.seriesData2Start === 0;
    },
    nextBtnDisabled() {
      return this.seriesData2End >= this.xData2.length;
    }
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
}
.knowledge-stage-chart{
  width: 100%;
  height: 40%;
}
.slider-nav{
  margin-bottom: 10px;
}
.knowledge-stage-style-chart{
  width: 100%;
  height: calc(60% - 44px - 60px);
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-leave {
   opacity: 1; 
}
.v-leave-to {
  opacity: 0;
}
</style>