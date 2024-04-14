<template>
  <div class="style-score-detail">
    <SliderNav height="32" :slider-data="sliderData" @selectSlider="changeSlider"></SliderNav>
    <div class="main">
      <div class="linear-chart" ref="linearChart"></div>
      <div class="exam-student">
        <el-table :data="activeStudentStyleData">
          <el-table-column label="学号" prop="userId"></el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="风格" prop="style"></el-table-column>
        </el-table>
      </div>
      <div class="percent-chart" ref="percentChart"></div>
    </div>
  </div>
</template>

<script>
import { classUserClassUsersQueryServer } from '@/api/classUser.js'
import { personStylePaperPersonResourceStyleServer } from '@/api/personStylePaper.js'
import { personUserListServer } from '@/api/person.js'
import * as echarts from "echarts";
import SliderNav from "@/components/SliderNav.vue";

let judgeStyle = {
  '1': '视频',
  '2': '文档',
  '3': '综合'
}

export default {
  inject: ["$bus"],
  components: {
    SliderNav,
  },
  data() {
    return {
      navHeight: 32,
      exam: null,
      linearChart: null,
      percentChart: null,
      examStudent: null,
      chartData: {
        xData: ['0~10', '10~20', '20~30', '30~40', '40~50', '50~60', '60~70','70~80','80~90','90~100'],
        yData: 0, //暂未使用
        series: {
          video: new Array(11).fill(0),
          document: new Array(11).fill(0),
          both: new Array(11).fill(0)
        }
      },
      studentStyleData: [],
      activeStyle:{
        '视频':true,
        '文档':true,
        '综合':true
      },
      sliderData: []
    }
  },
  mounted() {
    this.sliderData = JSON.parse(this.$route.params.sliderData).map(item => {
      return item.examTitle
    })
    this.$bus.on('changeStyleScoreDetail',this.changeStyleScoreDetail);
    this.linearChart = echarts.init(this.$refs.linearChart,null,{renderer: 'svg'});
    this.percentChart = echarts.init(this.$refs.percentChart,null,{renderer: 'svg'});
    this.initLinearChart();
    this.initPercentChart();
    const resizeObserver = new ResizeObserver(() => {
      this.linearChart.resize();
      this.percentChart.resize();
    })
    resizeObserver.observe(document.body);
  },
  beforeDestroy() {
    this.$bus.off('changeStyleScoreDetail', this.changeStyleScoreDetail)
  },
  methods: {
    changeStyleScoreDetail(data){
      this.exam = data;
    },
    initLinearChart() {
      let option = {
        title:{
          text: "不同风格学生成绩分布",
          left: 'left',
        },
        tooltip:{
          trigger: 'axis',
        },
        legend:{
          data: ["视频", "文档", "综合"],
          textStyle: {
            fontSize: 12,
          }
        },
        xAxis: {
          name: '成绩/分',
          type: 'category',
          axisTick: { show: false },
          data: this.chartData.xData,
        },
        yAxis: {
          name: '人数/个',
          type: 'value',
          min: 0,
          interval: 1,
        },
        series: [
          //视频类型
          {
            id: 'video',
            type: 'line',
            smooth: true,
            name: '视频',
            symbol: 'circle',
            symbolSize: 8,
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
          //文档类型
          {
            id: 'document',
            type: 'line',
            smooth: true,
            name: '文档',
            symbol: 'circle',
            symbolSize: 8,
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
          //综合类型
          {
            id: 'both',
            type: 'line',
            smooth: true,
            name: '综合',
            symbol: 'circle',
            symbolSize: 8,
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
          left: '12%',
          right: '12%',
          top: '25%',
          bottom: '15%'
        },
      };
      this.linearChart.setOption(option);
    },
    drawLinearChart() {
      let option = {
        series: [
          //视频类型
          {id: 'video',data: this.chartData.series.video,},
          //文档类型
          {id: 'document',data: this.chartData.series.document,},
          //综合类型
          {id: 'both',data: this.chartData.series.both,},
        ],
      };
      this.linearChart.setOption(option);
    },
    initPercentChart() {
      let option = {
        title: {
          subtext: '学生风格占比',
          left: 'center',
          subtextStyle: {
            fontSize: '16',
          }
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [{
            type: 'pie',
            radius: '75%',
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
        }],
      };
      this.percentChart.setOption(option);
    },
    drawPercentChart() {
      let option = {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          label:{
            show:true,
            position:'inner',
            formatter:'{d}%',
            fontSize: '18',
            fontWeight: 'bold'
          },
          data: [
            { value: this.exam.styleScore.video.length, name: '视频' },
            { value: this.exam.styleScore.document.length, name: '文档' },
            { value: this.exam.styleScore.both.length, name: '综合' },
          ],
        }]
      };
      this.percentChart.setOption(option);
    },
    initStyleGradeChartData(){
      this.chartData.series.video = new Array(10).fill(0);
      this.chartData.series.document = new Array(10).fill(0);
      this.chartData.series.both = new Array(10).fill(0);
      for(let i = 0; i < this.exam.styleScore.video.length; i++){
        this.chartData.series.video[parseInt(this.exam.styleScore.video[i]/10) - 1]++;
      }
      for(let i = 0; i < this.exam.styleScore.document.length; i++){
        this.chartData.series.document[parseInt(this.exam.styleScore.document[i]/10)]++;
      }
      for(let i = 0; i < this.exam.styleScore.both.length; i++){
        this.chartData.series.both[parseInt(this.exam.styleScore.both[i]/10)]++;
      }
    },
    getStudentStyleData(){
      classUserClassUsersQueryServer(this.exam.examInfo.classId)
      .then(res => {
        let studentInfo = [];
        let studentStyle = [];
        let studentIds = [];
        res.forEach(item => {
          studentIds.push(item.userId);
        })
        studentIds.reverse();
        personUserListServer(...studentIds)
        .then(res => {
          studentInfo = res.data;
          this.pushStudentStyleData(studentInfo,studentStyle);
        })
        personStylePaperPersonResourceStyleServer(...studentIds)
        .then(res => {
          studentStyle = res.data;
          this.pushStudentStyleData(studentInfo,studentStyle);
        })
      })
    },
    pushStudentStyleData(studentInfo,studentStyle){
      if(studentInfo.length && studentStyle?.length){
        for(let i = 0; i < studentInfo.length; i++){
          this.studentStyleData.push({
            userId: studentInfo[i].userId,
            userName: studentInfo[i].userName,
            style: judgeStyle[studentStyle[i].style],
          })
        }
      }
    },
    changeLinearLegend(params){
      let percentOption = this.percentChart.getOption();
      percentOption.legend[0].selected = params.selected;
      this.percentChart.setOption(percentOption);
      this.activeStyle = params.selected;
    },
    changePercentLegend(params){
      let linearOption = this.linearChart.getOption();
      linearOption.legend[0].selected = params.selected;
      this.linearChart.setOption(linearOption);
      this.activeStyle = params.selected;
    },
    changeSlider(index, item) {
      this.$bus.emit("changeStyleScoreSlider", index, item)
    }
  },
  watch: {
    exam(newValue, oldValue){
      if(oldValue === null){
        this.getStudentStyleData();
      }
      this.initStyleGradeChartData();
      this.drawLinearChart();
      this.drawPercentChart();
      this.linearChart.on('legendselectchanged',this.changeLinearLegend);
      this.percentChart.on('legendselectchanged',this.changePercentLegend);
    }
  },
  computed: {
    activeStudentStyleData(){
      return this.studentStyleData.filter(item => this.activeStyle[item.style]);
    }
  }
}
</script>

<style scoped>
.style-score-detail{
  width: 100%;
  height: 100%;
}
.main{
  width: 100%;
  height: calc(100% - 38px);
  overflow: auto;
  box-sizing: border-box;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
}
.main::-webkit-scrollbar{
  display: none;
}
.chart-box{
  width: 100%;
  height: 50%;
  border-radius: 8px;
  display: flex;
  margin-bottom: 10px;
}
.linear-chart{
  width: 100%;
  height: 40%;
  margin-bottom: 10px;
}
.percent-chart{
  width: 45%;
  height: calc(60% - 10px);
}
.exam-student{
  width: 55%;
  height: calc(60% - 10px);
  border-radius: 8px;
  background: #f7f7f8;
  box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.15);
  overflow: auto;
}
.exam-student::-webkit-scrollbar{
  display: none;
}
.el-table{
  box-sizing: border-box;
  padding-left: 20px;
}
/* el-table背景透明 */
::v-deep(.el-table),
::v-deep(.el-table__expanded-cell) {
  background-color: transparent;
}
/* 表格内背景颜色 */
::v-deep(.el-table th),
::v-deep(.el-table tr) {
  background-color: transparent;
}
/* 表格内背景颜色 */
::v-deep(.el-table--enable-row-transition .el-table__body td),
::v-deep(.el-table .cell) {
  background-color: transparent;
}
</style>