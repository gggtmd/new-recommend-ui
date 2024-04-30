<template>
  <div class="main-background">
    <div class="top-background">
      <div class="title">
        {{ classInfo.className }}
      </div>
      <div class="class-info">
          <classBaseInfo></classBaseInfo>
      </div>
      <div class="operate">
<!--        <button>导出</button>-->
        <label class="select-class-label">
          当前展示课堂:
          <select v-model="selectedClass" class="select-item">
            <option v-for="item in classList" :value="item">{{item.className}}</option>
          </select>
        </label>
      </div>
    </div>
    <div class="chart">
      <div class="chart-left">
        <outlineCard class="outline-card"></outlineCard>
        <studentEvaluationCard class="outline-card"></studentEvaluationCard>
        <knowledgeStageStyleCard class="outline-card"></knowledgeStageStyleCard>
      </div>
      <div class="chart-main">
        <div class="chart-main-content">
          <div v-if="$route.matched.length <= 1" class="pre-view">
            请选择左右两侧卡片以查看更多信息
          </div>
          <router-view :key="$route.fullPath"></router-view>
        </div>
      </div>
      <div class="chart-right">
        <studentWarningTable></studentWarningTable>
      </div>
    </div>
  </div>
</template>

<script>
import outlineCard from '@/views/dataPlatform/styleScore/styleScore.vue'
import classBaseInfo from '@/views/dataPlatform/classBaseInfo.vue'
import studentWarningTable from '@/views/dataPlatform/studentDetail/studentWarningTable.vue'
import studentEvaluationCard from '@/views/dataPlatform/studentEvaluation/studentEvaluationCard.vue'
import knowledgeStageStyleCard from '@/views/dataPlatform/knowledgeStageStyle/knowledgeStageStyleCard.vue'
import { classesGetByIdServer } from '@/api/classes.js'
import {personClassServer} from "@/api/person.js";

export default {
  name: "MainPlatform",
  components: {
    outlineCard,
    classBaseInfo,
    studentWarningTable,
    studentEvaluationCard,
    knowledgeStageStyleCard
  },
  data() {
    return {
      classInfo: {},
      classList: [],
      selectedClass: {},
      selectWatch: null
    }
  },
  created() {
    this.getClassInfo();
    this.getAllClass();
  },
  beforeUnmount() {
    this.selectWatch()
  },
  methods: {
    getClassInfo(){
      classesGetByIdServer(this.$route.params.classId)
      .then((res) => {
        this.classInfo = res.data
      })
    },
    async getAllClass() {
      let res = await personClassServer()
      this.classList = res.data
      this.selectedClass = res.data.find(item => {
        return item.classId.toString() === this.$route.params.classId
      })
      this.selectWatch = this.$watch('selectedClass', async (newValue) => {
        await this.$router.replace({
          name: 'dataPlatform',
          params: {
            classId: newValue.classId
          }
        })
        window.location.reload()
      })
    }
  },
}
</script>

<style scoped>
.main-background{
  min-width: 1200px;
  min-height: 800px;
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f7;
  background-image: radial-gradient(farthest-corner at 40px 40px, rgba(255, 198, 198, 0.8), rgb(255, 255, 255, 0) 45%),
  radial-gradient(farthest-corner at 100% 100%, rgba(245, 255, 177, 0.8), rgb(255, 255, 255, 0) 55%);
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  padding: 20px;
}
.top-background{
  max-height: 120px;
  min-height: 80px;
  height: 15%;
  position: relative;
}
.title{
  margin-left: 5px;
  font-size: 40px;
  font-weight: bold;
  float: left;;
}
.class-info{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  transition: 0.5s;
}
.operate{
  float: right;
}
.operate > button{
  border: none;
  background-color: #cEcEce;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: 16px;
  border-radius: 5px;
  color: #a6a6a8;
  transition: 0.3s;
}
.operate > button:hover{
  background-color: #969698;
  color: #dEdEdE;
}
.operate > button:active{
  background-color: #adadb0;
}
.select-class-label {
  font-size: 1.3rem;
  font-weight: bold;
  color: #555;
}
.select-item {
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 1);
  height: 30px;
  font-size: 1rem;
  color: #555;
  border-radius: 6px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  margin-left: 5px;
  text-indent: 5px;
  transition: 0.2s;
}
.select-item:hover {
  filter: brightness(95%);
}
.chart{
  display: flex;
  height: 85%;
}
.chart-left{
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.chart-main{
  width: 50%;
  box-sizing: border-box;
  padding: 0 20px;
}
.chart-main-content{
  border-radius: 8px;
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 6px 0px rgba(0, 0, 0, 0.2);
  transition: 0.4s;
  padding: 15px 15px 10px 15px;
  box-sizing: border-box;
}
.chart-main-content:hover{
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.3);
}
.pre-view {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #555;
  font-weight: bold;
  border-radius: 5px;
}
.chart-right{
  width: 25%;
  display: flex;
  flex-direction: column;
}
.outline-card{
  flex: 1;
}
.outline-card:hover {
  cursor: pointer;
}
.outline-card:not(:last-child){
  margin-bottom: 20px;
}
</style>