<script>
import { categoryKnowledgeQueryServer } from '@/api/categoryKnowledge.js'
import KnowledgeItem from './KnowledgeItem.vue'
import PeriodItem from './PeriodItem.vue'
import AddPeriodCard from './AddPeriodCard.vue'
import { classKnowledgeSaveServer } from '@/api/classKnowledge.js'
export default{
  components:{
    KnowledgeItem,
    PeriodItem,
    AddPeriodCard
  },
  data() {
    return {
      classId: 0,
      categoryKnowledgeQuery:{
        categoryId: 0,
        pageNum: 0,
        pageSize: 15
      },
      knowledgeList: [],
      isLoading: false,
      noMore: false,
      periodList: [
        {
          periodId: 1 + new Date(),
          periodKnowledgeList: [],
        },
        {
          periodId: 2 + new Date(),
          periodKnowledgeList: [],
        }
      ],
      selectedPeriod: null,
    }
  },
  created() {
    this.categoryKnowledgeQuery.categoryId = this.$route.params.categoryId;
    this.classId = this.$route.params.classId;
  },
  methods: {
    getKnowledgeList(){
      if(!this.isLoading&&!this.noMore){
        this.isLoading = !this.isLoading;
        this.categoryKnowledgeQuery.pageNum++;
        categoryKnowledgeQueryServer(this.categoryKnowledgeQuery)
            .then((res) => {
              if (res.code === 200) {
                (res.data.records.length < this.categoryKnowledgeQuery.pageSize) && (this.noMore = true);
                this.knowledgeList.push(...res.data.records)
              } else {
                this.$message.error(res.msg);
              }
              this.isLoading = !this.isLoading;
            })
      }
    },
    submitPeriodKnowledge(){
      this.$confirm(
        `提交后不可修改`, "确认提交 ?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
        let submitForm = []
        this.periodList.forEach((periodItem,index) => {
          periodItem.periodKnowledgeList.forEach((periodKnowledgeItem) => {
            submitForm.push({
              classId: this.classId,
              stage: index + 1,
              knowledgeId: periodKnowledgeItem.knowledgeId
            })
          })
        })
        classKnowledgeSaveServer(submitForm).then(res => {
          if(res.code === 200){
            this.$message.success('保存成功');
            setTimeout(() => {
              window.close();
            }, 1000);
          }
        })
      })
    },
    periodSelect(index){
      if(this.selectedPeriod == null){
        this.selectedPeriod = index;
        this.$refs.periodItem[index].showInfo();
      }else if(index !== this.selectedPeriod){
        this.$refs.periodItem[this.selectedPeriod].cancelShow();
        this.selectedPeriod = index;
        this.$refs.periodItem[index].showInfo();
      }else {
        this.$refs.periodItem[this.selectedPeriod].cancelShow();
        this.selectedPeriod = null;
      }
    },
    deleteRefresh(index){
      setTimeout(() => {
        if(this.selectedPeriod === index){
          this.selectedPeriod = null;
        }
        this.knowledgeList.push(...this.periodList[index].periodKnowledgeList)
        this.periodList.splice(index,1);
      }, 500);
    },
    handleCancel(records, index, callback){
      callback(true)
      setTimeout(() => {
        this.periodList[this.selectedPeriod].periodKnowledgeList.splice(index,1);
        this.$nextTick(() => {
          this.$refs.periodItem[this.selectedPeriod].showInfo();
        })
        this.knowledgeList.push(records);
      }, 500);
    },
    addPeriod(){
      this.periodList.push({
        periodId: `${this.periodList.length+1} + ${new Date()}`,
        periodKnowledgeList:[]
      })
    },
    afterDeleteItem(record){

    },
    handleSelect(records, index, callback){
      if(this.selectedPeriod !== null) {
        callback(true)
      } else {
        callback(false);
      }
      if(this.selectedPeriod !== null){
        setTimeout(() => {
          this.periodList[this.selectedPeriod].periodKnowledgeList.push(records);
          this.$refs.VirtualScroll.deleteItem(index)
          setTimeout(() => {
            this.$refs.periodItem[this.selectedPeriod].showInfo();
          }, 0);
        }, 500);
      }
    },
  },
}
</script>

<template>
  <div class="main">
    <div class="period-list">
      <div class="header">
        <span class="tag">
          课堂阶段
        </span>
      </div>
      <div class="period-list-box">
        <PeriodItem
            @selected="periodSelect"
            @deleteRefresh="deleteRefresh"
            ref="periodItem"
            class="period-item"
            v-for="(item,index) in periodList"
            :key="item.periodId"
            :records="item"
            :index="index"
            v-slot="periodKnowledgeItem">
          <KnowledgeItem
              class="knowledge-item"
              :key="periodKnowledgeItem.item.knowledgeId"
              :records="periodKnowledgeItem.item"
              :index="periodKnowledgeItem.index"
              buttonColor="rgba(64, 149, 229, 0.69)"
              buttonText="取 消"
              @selectedRefresh="handleCancel">
          </KnowledgeItem>
        </PeriodItem>
        <AddPeriodCard @addPeriod="addPeriod"></AddPeriodCard>
      </div>
    </div>
    <div class="knowledge-list">
      <div class="header">
        <span class="tag">
          知识点列表
        </span>
        <div class="headerButton" @click="submitPeriodKnowledge">提&nbsp;&nbsp;交</div>
      </div>
      <VirtualScroll
        class="virtual-scroll"
        ref="VirtualScroll"
        @afterDeleteItem="afterDeleteItem"
        :allListData = knowledgeList
        :load="getKnowledgeList"
        :itemHeight="85"
        v-slot="itemInfo"
      >
        <KnowledgeItem
          ref="knowledgeItemRef"
          class="knowledge-item"
          :records="itemInfo.item"
          :index="itemInfo.index"
          buttonColor="#86cd63"
          @selectedRefresh="handleSelect"
        >
        </KnowledgeItem>
      </VirtualScroll>
    </div>
  </div>
</template>

<style scoped>
.main{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
}
.period-list,.knowledge-list{
  flex: 1;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 20px 0;
}
.header{
  width: 95%;
  text-align: center;
  box-sizing: border-box;
  padding: 0 12px;
  margin-bottom: 20px;
  position: relative;
}
.tag{
  font-size: 20px;
  background-color: rgba(129, 179, 55, 0.69);
  padding: 5px 15px;
  border-radius: 999px;
  vertical-align: middle;
  margin: 0 auto;
}
.headerButton{
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(63, 162, 255, 0.801);
  box-sizing: border-box;
  padding: 8px 15px;
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  transition: 0.4s;
}
.headerButton:active{
  transform: translateY(-46%);
}
.headerButton::after{
  content: '';
  transition: 0.4s;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.headerButton:hover::after{
  background-color: rgba(0, 0, 0, 0.12);
}
.headerButton:active::after{
  background-color: rgba(0, 0, 0, 0.28);
}
.period-list-box{
  height: 100%;
  width: 95%;
  overflow-y: scroll;
  /* 隐藏IE, Edge和Firefox的滚动条 */
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 10px 65%;
}
.period-list-box::-webkit-scrollbar {
  display: none;
}
.knowledge-list .tag{
  background-color: rgba(64, 149, 229, 0.69);
}
.knowledge-list{
  background-color: #F2F2F7;
}
.virtual-scroll{
  padding-top: 10px;
}
.knowledge-item{
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.period-list-box .knowledge-item{
  width: calc(100% - 120px);
  margin-left: 20px;
}
</style>