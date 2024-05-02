<template>
  <div class="container">
    <div class="graph" ref="knowledgeChartRef"></div>
    <div class="search" ref="searchRef">
      <div class="drag-operate" @mousedown="moveSearch"></div>
      <div class="close-search" @click="hideSearch">
        <el-icon><CloseBold /></el-icon>
      </div>
      <el-input
        placeholder="输入查询"
        @keyup.enter.native="relationSearch(input)"
        v-model="input"></el-input
      >
      <div class="search-answer">
        <div v-if="!answerNodes || !answerNodes.length" class="pre-search-answer">搜索结果将展示在这里</div>
        <template v-else>
          <div
            v-for="(item,index) in answerNodes"
            :key="'answer_' + index"
            class="search-answer-item"
          >
            {{ searchFormedAnswer(item,index) }}
          </div>
        </template>
      </div>
    </div>
    <div class="open-search" @click="showSearch">
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <label class="select-class-label">
      知识点分类:
      <select v-model="selectedClass" class="select-wrapper">
        <option value="">全部知识点</option>
        <option
          v-for="item in classList"
          :value="item"
          class="option-item"
        >
          {{item.className}}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Fuse from "fuse.js"
import {ArrowRightBold, CloseBold} from '@element-plus/icons-vue'
import {personClassServer} from "@/api/person.js";
import {classesGetClassKnowledgeGraphServer} from '@/api/classes.js'
export default {
  components: {
    ArrowRightBold,
    CloseBold
  },
  data() {
    return {
      input: '',
      answerNodes: [],
      test: {},
      searchLeft: "-350px",
      searchTop: "-140px",
      searchTransition: '0s',
      searchOpacity: '0',
      openOpacity: '1',
      isInit: false,
      classList: [],
      selectedClass: "",
      selectWatch: null
    };
  },
  mounted() {
    this.getAllClass();
    this.getGraphData(this.$route.query.classId);
  },
  methods: {
    async getAllClass() {
      let res = await personClassServer()
      this.classList = res.data
      this.selectedClass = res.data.find(item => {
        return item.classId.toString() === this.$route.query.classId
      }) || ""
      this.selectWatch = this.$watch('selectedClass', async (newValue) => {
        await this.$router.replace({
          name: 'graph',
          query: {
            classId: newValue.classId
          }
        })
        await this.getGraphData(newValue.classId)
      })
    },
    relationSearch(question){
      this.answerNodes = [];
      this.input = '';
      //获取匹配节点信息
      const fuseOptions = {
        threshold: 0.2,
        keys: [
          "name",
        ]
      };
      const fuse = new Fuse(this.test.nodes, fuseOptions);
      fuse.search(question).forEach(nodeItem => {
        this.test.links.forEach(linkItem => {
          //子节点
          if(linkItem.source === nodeItem.item.id){
            let childrenName;
            this.test.nodes.forEach(childrenItem => {
              if(childrenItem.id === linkItem.target){
                childrenName = childrenItem.name;
              }
            })
            if(childrenName){ //去除undefined
              this.answerNodes.push({
                relation: linkItem.value,
                childrenName: childrenName,
                parentName: nodeItem.item.name
              })
            }
          }
          //父节点
          if(linkItem.target === nodeItem.item.id){
            let parentName;
            this.test.nodes.forEach(parentItem => {
              if(parentItem.id === linkItem.source){
                parentName = parentItem.name;
              }
            })
            if(parentName){
              this.answerNodes.push({
                relation: linkItem.value,
                parentName: parentName,
                childrenName: nodeItem.item.name
              })
            }
          }
        })
      })
      this.answerNodes = this.answerNodes.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t.childrenName === item.childrenName && t.parentName === item.parentName && t.relation === item.relation
        ))
      );
    },
    searchFormedAnswer(item,index){
      return index+1 + ". " + item.parentName+ " " + item.relation+ " " + item.childrenName;
    },
    async getGraphData(classId) {
      let res = await classesGetClassKnowledgeGraphServer(classId)
      this.test = res.data
      this.loadGraph()
    },
    loadGraph() {
      let myChart = echarts.init(this.$refs.knowledgeChartRef);
      myChart.showLoading({
        text: "加载中...",
        fontSize: "16",
        maskColor: "white"
      })
      setTimeout(() => {
        myChart.hideLoading()
      }, 1000)
      let option;
      const graph = this.test;
      graph.nodes.forEach(node => {
        node.label = {
          show: node.symbolSize > 15
        };
      });
      option = {
        title: {
          text: '知识图谱',
          bottom: '15px',
          right: '20px'
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
            //name: '数据库系统概论',
            name: '对外汉语教育',
            type: 'graph',
            draggable: 'true',
            layout: 'force',
            force: {
              repulsion: 600
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
              curveness: 0.1
            },
            emphasis: {
              // focus: 'adjacency',
              lineStyle: {
                width: 10
              },
            }
          }
        ]
      };
      myChart.setOption(option);
      myChart.on("click",(params) => {
        if(params.dataType === 'node'){
          this.relationSearch(params.data.name);
        }
      })
      window.onresize = () => {
        myChart.showLoading()
        myChart.resize()
        myChart.hideLoading();
      }
    },
    moveSearch(event) {
      this.isInit = true
      const clientRect = this.$refs.searchRef.getBoundingClientRect()
      this.searchLeft = clientRect.x + "px"
      this.searchTop = clientRect.y - 370 + "px"
      document.addEventListener("mousemove", this.moveChange)
      document.addEventListener("mouseup", this.stopMove)
      event.preventDefault()
    },
    moveChange(e) {
      if(!this.isInit) return
      this.searchLeft = e.clientX - 165 + "px"
      this.searchTop = e.clientY - 380 + "px"
    },
    stopMove() {
      this.isInit = false
      document.removeEventListener('mousemove', this.moveChange)
      document.removeEventListener('mouseup', this.stopMove)
    },
    showSearch() {
      this.searchTransition = '0.3s'
      this.$nextTick(() => {
        this.searchLeft = '50px'
        this.searchTop = '-140px'
        this.searchOpacity = '1'
        this.openOpacity = '0'
      })
      setTimeout(() => {
        this.searchTransition = '0s'
      }, 300)
    },
    hideSearch() {
      this.searchTransition = '0.3s'
      this.$nextTick(() => {
        this.searchLeft = '-350px'
        this.searchTop = '-140px'
        this.openOpacity = '1'
        this.searchOpacity = '0.65'
      })
      setTimeout(() => {
        this.searchTransition = '0s'
      }, 300)
    }
  },
};
</script>

<style scoped>
.container{
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;
}
.graph {
  width: 100%;
  height: 100%;
}
.search{
  position: absolute;
  z-index: 200;
  left: v-bind(searchLeft);
  top: v-bind(searchTop);
  width: 350px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  transform: translateY(50%);
  box-sizing: border-box;
  padding: 5px;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, .2);
  transition: 0.5s, left v-bind(searchTransition), top v-bind(searchTransition);
  opacity: v-bind(searchOpacity);
}
.search:hover{
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.4);
}
.drag-operate {
  height: 5px;
  margin: 2px 30% 8px;
  cursor: pointer;
  background-color: #4293fd;
  border-radius: 999px;
}
.close-search {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 19px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: 0.2s;
}
.close-search:hover {
  background-color: #4293fde0;
  color: whitesmoke;
}
.el-input:deep(.el-input__wrapper)  {
  border-radius: 99px;
  background-color: rgba(90, 90, 90, 0.12);
}
.el-input:deep(.el-input__inner)  {
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}
.search-answer{
  width: 100%;
  height: calc(100% - 55px);
  background-color: rgba(90, 90, 90, 0.12);
  margin-top: 8px;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: scroll;
  border-radius: 12px;
  /* 隐藏IE, Edge和Firefox的滚动条 */
  -ms-overflow-style: none; /* IE和Edge */
  scrollbar-width: none; /* Firefox */
}
/* 隐藏Chrome, Safari, Opera等基于Webkit的浏览器的滚动条 */
.search-answer::-webkit-scrollbar {
  display: none;
}
.search-answer-item{
  margin-bottom: 12px;
}
.pre-search-answer {
  font-size: 1.1rem;
  font-weight: bold;
  color: #555;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.open-search {
  position: absolute;
  z-index: 200;
  top: 40%;
  left: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.1s;
  opacity: v-bind(openOpacity);
}
.open-search:hover {
  filter: brightness(90%);
}
.select-class-label {
  position: absolute;
  z-index: 200;
  top: 20px;
  right: 20px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
}
.select-wrapper {
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  height: 40px;
  font-size: 1.15rem;
  color: #333;
  border-radius: 6px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.15);
  margin-left: 5px;
  transition: 0.2s;
  padding: 0 5px;
}
.select-wrapper:hover {
  filter: brightness(85%);
}
</style>
