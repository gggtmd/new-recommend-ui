<template>
  <div class="class-graph">
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
        <div
            v-for="(item,index) in answerNodes"
            :key="'answer_' + index"
            class="search-answer-item"
        >
          {{ searchFormedAnswer(item,index) }}
        </div>
      </div>
    </div>
    <div class="open-search" @click="showSearch">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Fuse from "fuse.js"
import {ArrowLeftBold, CloseBold} from "@element-plus/icons-vue";
import {classesGetClassKnowledgeGraphServer} from '@/api/classes.js'
export default {
  components: {CloseBold, ArrowLeftBold},
  data() {
    return {
      input: '',
      answerNodes: [],
      test: {},
      searchRight: "-350px",
      searchTop: "-200px",
      searchTransition: '0s',
      searchOpacity: '0',
      openOpacity: '1',
      isInit: false
    };
  },
  mounted() {
    this.loadGraph()
  },
  methods: {
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
    async loadGraph() {
      let res = await classesGetClassKnowledgeGraphServer(this.$route.params.classId)
      this.test = res.data
      let myChart = echarts.init(this.$refs.knowledgeChartRef);
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
        dataZoom: [{
          type: 'inside', // 或者 'slider'，根据需要选择内嵌式还是滑块式缩放控件
          start: 0,      // 初始缩放范围起点
          end: 100       // 初始缩放范围终点（100%）
        }],
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
              repulsion: 300
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
      myChart.setOption(option);
      myChart.on("click", (params) => {
        if (params.dataType === 'node') {
          this.relationSearch(params.data.name);
        }
      })
      myChart.on('dataZoom', function (event) {
        const dataZoomInfo = event.batch[0];
        const currentStart = dataZoomInfo.start;
        const currentEnd = dataZoomInfo.end;
        const initialRange = 100; // 初始缩放范围的总百分比

        // 计算当前实际显示数据的百分比范围
        const visibleRange = currentEnd - currentStart;

        // 计算放大倍数，相对于初始范围的比例
        const zoomScale = visibleRange / initialRange;
        graph.nodes.forEach(node => {
          node.label = {
            show: node.symbolSize > 30
          };
        });
      });

      window.onresize = () => {
        myChart.showLoading()
        myChart.resize()
        myChart.hideLoading();
      }
    },
    moveSearch(event) {
      this.isInit = true
      const clientRect = this.$refs.searchRef.getBoundingClientRect()
      this.searchRight = window.document.body.offsetWidth - clientRect.right + "px"
      this.searchTop = clientRect.y - 250 + "px"
      document.addEventListener("mousemove", this.moveChange)
      document.addEventListener("mouseup", this.stopMove)
      event.preventDefault()
    },
    moveChange(e) {
      if(!this.isInit) return
      this.searchRight = window.document.body.offsetWidth - e.clientX - 175 + "px"
      this.searchTop = e.clientY - 257 + "px"
    },
    stopMove() {
      this.isInit = false
      document.removeEventListener('mousemove', this.moveChange)
      document.removeEventListener('mouseup', this.stopMove)
    },
    showSearch() {
      this.searchTransition = '0.3s'
      this.$nextTick(() => {
        this.searchRight = '50px'
        this.searchTop = '-200px'
        this.openOpacity = '0'
      })
      setTimeout(() => {
        this.searchTransition = '0s'
      }, 300)
    },
    hideSearch() {
      this.searchTransition = '0.3s'
      this.$nextTick(() => {
        this.searchRight = '-350px'
        this.searchTop = '-200px'
        this.openOpacity = '1'
      })
      setTimeout(() => {
        this.searchTransition = '0s'
      }, 300)
    }
  },
};
</script>

<style scoped>
.class-graph{
  //width: 100%;
  height: 100vh;
}
.graph {
  width: 100%;
  height: 100%;
}
.search{
  position: absolute;
  z-index: 200;
  right: v-bind(searchRight);
  top: v-bind(searchTop);
  width: 350px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  transform: translateY(50%);
  box-sizing: border-box;
  padding: 5px;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, .2);
  transition: 0.5s, right v-bind(searchTransition), top v-bind(searchTransition);
}
.search:hover{
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, .4);
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
  background-color: rgba(70, 70, 70, 0.1);
}
.el-input:deep(.el-input__inner)  {
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
}
.drag-operate {
  height: 5px;
  margin: 2px 30% 8px;
  cursor: pointer;
  background-color: #4293fd;
  border-radius: 999px;
}
.search-answer{
  width: 100%;
  height: calc(100% - 55px);
  background-color: rgba(70, 70, 70, 0.1);
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
  //color: rgba(0, 0, 0, 0.9);
}
.open-search {
  position: absolute;
  z-index: 200;
  top: 40%;
  right: 0;
  transform: translateY(-50%);
  width: 50px;
  height: 80px;
  background-color: rgba(130, 130, 130, 0.3);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.1s;
  opacity: v-bind(openOpacity);
}
.open-search:hover {
  filter: brightness(90%);
}
</style>
