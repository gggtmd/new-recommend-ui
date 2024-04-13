<template>
  <div class="container">
    <div class="graph" ref="knowledgeChartRef"></div>
    <div class="search" ref="searchRef">
      <div class="drag-operate" @mousedown="moveSearch"></div>
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
  </div>
</template>

<script>
import * as echarts from "echarts";
import Fuse from "fuse.js"
export default {
  data() {
    return {
      input: '',
      answerNodes: [],
      test: {
        "nodes": [
          {
            "id": "0",
            "name": "音节",
            "symbolSize": 40,
            "x": -366.82776,
            "y": 399.6904,
            "value": 40,
            "category": 1
          },
          {
            "id": "1",
            "name": "元音和辅音",
            "symbolSize": 31,
            "x": -418.08344,
            "y": 446.8853,
            "value": 31,
            "category": 1
          },
          {
            "id": "2",
            "name": "元音和辅音的差异",
            "symbolSize": 25,
            "x": -212.76357,
            "y": 245.29176,
            "value": 25,
            "category": 1
          },
          {
            "id": "3",
            "name": "汉语",
            "symbolSize": 50,
            "x": -242.82404,
            "y": 235.26283,
            "value": 50,
            "category": 0
          },
          {
            "id": "4",
            "name": "现代汉语普通话的元音和辅音",
            "symbolSize": 30,
            "x": -379.30386,
            "y": 429.06424,
            "value": 30,
            "category": 1
          },
          {
            "id": "5",
            "name": "现代汉语普通话的音节",
            "symbolSize": 30,
            "x": -417.26337,
            "y": 406.03506,
            "value": 30,
            "category": 1
          },
          {
            "id": "6",
            "name": "韵母",
            "symbolSize": 25,
            "x": -332.6012,
            "y": 485.16974,
            "value": 25,
            "category": 1
          },
          {
            "id": "7",
            "name": "单韵母",
            "symbolSize": 20,
            "x": -382.69568,
            "y": 475.09113,
            "value": 20,
            "category": 1
          },
          {
            "id": "8",
            "name": "复韵母",
            "symbolSize": 20,
            "x": -320.384,
            "y": 387.17325,
            "value": 20,
            "category": 1
          },
          {
            "id": "9",
            "name": "鼻韵母",
            "symbolSize": 10,
            "x": -344.39832,
            "y": 451.16772,
            "value": 10,
            "category": 1
          },
          {
            "id": "10",
            "name": "汉字的演变",
            "symbolSize": 31,
            "x": -89.34107,
            "y": 234.56128,
            "value": 31,
            "category": 2
          },
          {
            "id": "11",
            "name": "手写体",
            "symbolSize": 25,
            "x": -87.93029,
            "y": -6.8120565,
            "value": 25,
            "category": 2
          },
          {
            "id": "12",
            "name": "象形字",
            "symbolSize": 25,
            "x": -339.77908,
            "y": -184.69139,
            "value": 25,
            "category": 2
          },
          {
            "id": "13",
            "name": "指事字",
            "symbolSize": 25,
            "x": -194.31313,
            "y": 178.55301,
            "value": 25,
            "category": 2
          },
          {
            "id": "14",
            "name": "会意字",
            "symbolSize": 25,
            "x": -158.05168,
            "y": 201.99768,
            "value": 25,
            "category": 2
          },
          {
            "id": "15",
            "name": "形声字",
            "symbolSize": 20,
            "x": -127.701546,
            "y": 242.55057,
            "value": 20,
            "category": 2
          },
          {
            "id": "16",
            "name": "假借字",
            "symbolSize": 20,
            "x": -385.2226,
            "y": -393.5572,
            "value": 20,
            "category": 2
          },
          {
            "id": "17",
            "name": "转注字",
            "symbolSize": 20,
            "x": -516.55884,
            "y": -393.98975,
            "value": 20,
            "category": 2
          },
          {
            "id": "18",
            "name": "辅助字体",
            "symbolSize": 15,
            "x": -464.79382,
            "y": -493.57944,
            "value": 15,
            "category": 2
          },
          {
            "id": "19",
            "name": "词性分类",
            "symbolSize": 40,
            "x": -515.1624,
            "y": -456.9891,
            "value": 40,
            "category": 7
          },
          {
            "id": "20",
            "name": "名词",
            "symbolSize": 30,
            "x": -408.12122,
            "y": -464.5048,
            "value": 30,
            "category": 7
          },
          {
            "id": "21",
            "name": "短语",
            "symbolSize": 31,
            "x": -456.44113,
            "y": -425.13303,
            "value": 31,
            "category": 3
          },
          {
            "id": "22",
            "name": "主谓短语",
            "symbolSize": 20,
            "x": -459.1107,
            "y": -362.5133,
            "value": 20,
            "category": 3
          },
          {
            "id": "23",
            "name": "俗语",
            "symbolSize": 20,
            "x": -313.42786,
            "y": -289.44803,
            "value": 20,
            "category": 3
          },
          {
            "id": "24",
            "name": "动宾短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "25",
            "name": "反义词",
            "symbolSize": 30,
            "x": 82.80825,
            "y": -203.1144,
            "value": 30,
            "category": 7
          },
          {
            "id": "26",
            "name": "单纯词",
            "symbolSize": 25,
            "x": 78.64646,
            "y": -31.512747,
            "value": 25,
            "category": 7
          },
          {
            "id": "27",
            "name": "形容词",
            "symbolSize": 30,
            "x": -81.46074,
            "y": -204.20204,
            "value": 30,
            "category": 7
          },
          {
            "id": "28",
            "name": "习题：在汉语交际中，用来传递知识和思想的主要手段是什么？ ",
            "symbolSize": 10,
            "x": -225.73984,
            "y": 82.41631,
            "value": 10,
            "category": 4
          },
          {
            "id": "29",
            "name": "习题：文化对语言的影响主要体现在哪个方面？",
            "symbolSize": 10,
            "x": -385.6842,
            "y": -20.206686,
            "value": 10,
            "category": 4
          },
          {
            "id": "30",
            "name": "文档：综合汉语期末复习资料",
            "symbolSize": 10,
            "x": -403.92447,
            "y": -197.69823,
            "value": 10,
            "category": 5
          },
          {
            "id": "31",
            "name": "文档：汉语基础1.1",
            "symbolSize": 10,
            "x": -281.4253,
            "y": -158.45137,
            "value": 10,
            "category": 5
          },
          {
            "id": "32",
            "name": "视频：现代汉语课程（考研、自学、期末）汉语国际教育专业讲师-博士-英韩归国志愿者",
            "symbolSize": 10,
            "x": -122.41348,
            "y": 210.37503,
            "value": 10,
            "category": 6
          },
          {
            "id": "33",
            "name": "视频：汉语拼音课程",
            "symbolSize": 10,
            "x": -234.6001,
            "y": -113.15067,
            "value": 10,
            "category": 6
          },
          {
            "id": "34",
            "name": "韵头、韵腹和韵尾",
            "symbolSize": 25,
            "x": -387.84915,
            "y": 58.7059,
            "value": 25,
            "category": 1
          },
          {
            "id": "35",
            "name": "韵和押韵",
            "symbolSize": 25,
            "x": -338.2307,
            "y": 87.48405,
            "value": 25,
            "category": 1
          },
          {
            "id": "36",
            "name": "音位",
            "symbolSize": 25,
            "x": -453.26874,
            "y": 58.94648,
            "value": 25,
            "category": 1
          },
          {
            "id": "37",
            "name": "汉语语音的特点",
            "symbolSize": 25,
            "x": -386.44904,
            "y": 140.05937,
            "value": 25,
            "category": 1
          },
          {
            "id": "38",
            "name": "韵母和韵的差异",
            "symbolSize": 25,
            "x": -446.7876,
            "y": 123.38005,
            "value": 25,
            "category": 1
          },
          {
            "id": "39",
            "name": "音位归并的原则",
            "symbolSize": 20,
            "x": 336.49738,
            "y": -269.55914,
            "value": 20,
            "category": 1
          },
          {
            "id": "40",
            "name": "音位和音位变体",
            "symbolSize": 20,
            "x": 29.187843,
            "y": -460.13132,
            "value": 20,
            "category": 1
          },
          {
            "id": "41",
            "name": "动词",
            "symbolSize": 30,
            "x": 238.36697,
            "y": -210.00926,
            "value": 30,
            "category": 7
          },
          {
            "id": "42",
            "name": "介词",
            "symbolSize": 30,
            "x": 189.69513,
            "y": -346.50662,
            "value": 30,
            "category": 7
          },
          {
            "id": "43",
            "name": "多义短语",
            "symbolSize": 15,
            "x": -187.00418,
            "y": -145.02663,
            "value": 15,
            "category": 3
          },
          {
            "id": "44",
            "name": "单义短语",
            "symbolSize": 10,
            "x": -252.99521,
            "y": 129.87549,
            "value": 10,
            "category": 3
          },
          {
            "id": "45",
            "name": "主谓语的语义关系",
            "symbolSize": 15,
            "x": -296.07935,
            "y": 163.11964,
            "value": 15,
            "category": 3
          },
          {
            "id": "46",
            "name": "连谓短语",
            "symbolSize": 20,
            "x": -459.1107,
            "y": -362.5133,
            "value": 20,
            "category": 3
          },
          {
            "id": "47",
            "name": "语音的物理性质",
            "symbolSize": 20,
            "x": -386.44904,
            "y": 140.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "48",
            "name": "语音的生理性质",
            "symbolSize": 20,
            "x": -40.44904,
            "y": 120.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "49",
            "name": "语音的社会性质",
            "symbolSize": 20,
            "x": -60.44904,
            "y": 100.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "50",
            "name": "声母和辅音的关系",
            "symbolSize": 20,
            "x": -60.44904,
            "y": 100.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "51",
            "name": "韵母和元音的关系",
            "symbolSize": 20,
            "x": -70.44904,
            "y": 110.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "52",
            "name": "普通话韵母按构成成分分类",
            "symbolSize": 30,
            "x": -70.44904,
            "y": 110.05937,
            "value": 30,
            "category": 1
          },
          {
            "id": "53",
            "name": "汉字的性质",
            "symbolSize": 31,
            "x": 10.44904,
            "y": 510.05937,
            "value": 31,
            "category": 2
          },
          {
            "id": "54",
            "name": "汉字的结构单位",
            "symbolSize": 25,
            "x": 10.44904,
            "y": 510.05937,
            "value": 25,
            "category": 2
          },
          {
            "id": "55",
            "name": "笔画连接方式",
            "symbolSize": 20,
            "x": 10.44904,
            "y": 510.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "56",
            "name": "部件",
            "symbolSize": 20,
            "x": 10.44904,
            "y": 510.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "57",
            "name": "整字",
            "symbolSize": 20,
            "x": 10.44904,
            "y": 510.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "58",
            "name": "笔顺",
            "symbolSize": 20,
            "x": 14.44904,
            "y": 500.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "59",
            "name": "间架结构",
            "symbolSize": 20,
            "x": 10.44904,
            "y": 510.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "60",
            "name": "独体字与合体字",
            "symbolSize": 20,
            "x": 10.44904,
            "y": 510.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "61",
            "name": "汉字笔画顺序",
            "symbolSize": 23,
            "x": 10.44904,
            "y": 510.05937,
            "value": 23,
            "category": 2
          },
          {
            "id": "62",
            "name": "多音字",
            "symbolSize": 25,
            "x": -158.05168,
            "y": 201.99768,
            "value": 25,
            "category": 2
          },
          {
            "id": "63",
            "name": "同音字",
            "symbolSize": 25,
            "x": -158.05168,
            "y": 201.99768,
            "value": 25,
            "category": 2
          },
          {
            "id": "64",
            "name": "近义词",
            "symbolSize": 30,
            "x": 82.80825,
            "y": -203.1144,
            "value": 30,
            "category": 7
          },
          {
            "id": "65",
            "name": "词语的结构分类",
            "symbolSize": 40,
            "x": 82.80825,
            "y": -203.1144,
            "value": 40,
            "category": 7
          },
          {
            "id": "66",
            "name": "复合式",
            "symbolSize": 25,
            "x": 82.80825,
            "y": -203.1144,
            "value": 25,
            "category": 7
          },
          {
            "id": "67",
            "name": "虚词",
            "symbolSize": 30,
            "x": 82.80825,
            "y": -203.1144,
            "value": 30,
            "category": 7
          },
          {
            "id": "68",
            "name": "成语",
            "symbolSize": 20,
            "x": 82.80825,
            "y": -203.1144,
            "value": 20,
            "category": 3
          },
          {
            "id": "69",
            "name": "偏正短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "70",
            "name": "兼语短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "71",
            "name": "同位短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "72",
            "name": "方位短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "73",
            "name": "量词短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "74",
            "name": "介词短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "75",
            "name": "“的”字短语",
            "symbolSize": 20,
            "x": 4.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 3
          },
          {
            "id": "76",
            "name": "句式",
            "symbolSize": 40,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 40,
            "category": 8
          },
          {
            "id": "77",
            "name": "比较句和“比”字句",
            "symbolSize": 30,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 30,
            "category": 8
          },
          {
            "id": "78",
            "name": "“比”字句的结构",
            "symbolSize": 25,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 25,
            "category": 8
          },
          {
            "id": "79",
            "name": "“比”字句使用的条件限制",
            "symbolSize": 25,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 25,
            "category": 8
          },
          {
            "id": "80",
            "name": "“不如”句的结构",
            "symbolSize": 25,
            "x": -440.6313396,
            "y": -373.8517,
            "value": 25,
            "category": 8
          },
          {
            "id": "81",
            "name": "“不如”句使用的条件限制",
            "symbolSize": 25,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 25,
            "category": 8
          },
          {
            "id": "82",
            "name": "用“跟/和/同/与/像...一样”表示的比较句",
            "symbolSize": 20,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 8
          },
          {
            "id": "83",
            "name": "用“更”表示的比较句",
            "symbolSize": 20,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 8
          },
          {
            "id": "84",
            "name": "用“最”表示的比较句",
            "symbolSize": 20,
            "x": -340.6313396,
            "y": -273.8517,
            "value": 20,
            "category": 8
          },
          {
            "id": "85",
            "name": "“没有”句和“不如”句",
            "symbolSize": 30,
            "x": -40.6313396,
            "y": -73.8517,
            "value": 30,
            "category": 8
          },
          {
            "id": "86",
            "name": "“把”字句",
            "symbolSize": 30,
            "x": -60.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 8
          },
          {
            "id": "87",
            "name": "“被”字句",
            "symbolSize": 30,
            "x": -60.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 8
          },
          {
            "id": "88",
            "name": "中华文化",
            "symbolSize": 50,
            "x": -260.6313396,
            "y": -293.8517,
            "value": 50,
            "category": 0
          },
          {
            "id": "89",
            "name": "中华文化的起源",
            "symbolSize": 30,
            "x": -260.6313396,
            "y": -293.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "90",
            "name": "中华文化历史发展",
            "symbolSize": 30,
            "x": -260.6313396,
            "y": -293.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "91",
            "name": "中国礼仪文化",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -193.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "92",
            "name": "中国经典诗歌",
            "symbolSize": 30,
            "x": 160.6313396,
            "y": 193.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "93",
            "name": "中国历史故事",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -193.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "94",
            "name": "中国传统文化书籍作品",
            "symbolSize": 30,
            "x": -60.6313396,
            "y": -293.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "95",
            "name": "中华多民族文化",
            "symbolSize": 30,
            "x": -6.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "96",
            "name": "中华民俗风情特色",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "97",
            "name": "“文化”的含义",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "98",
            "name": "文化的分类",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "99",
            "name": "文化的特性",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -83.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "100",
            "name": "隐性文化的基本内容",
            "symbolSize": 20,
            "x": -160.6313396,
            "y": -193.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "101",
            "name": "人类交际的主要手段",
            "symbolSize": 30,
            "x": -160.6313396,
            "y": -93.8517,
            "value": 30,
            "category": 0
          },
          {
            "id": "102",
            "name": "音高",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "103",
            "name": "音强",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "104",
            "name": "音长",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "105",
            "name": "音色",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "106",
            "name": "方言与地域差异",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "107",
            "name": "语境与语用",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "108",
            "name": "语调和语气",
            "symbolSize": 17,
            "x": -386.44904,
            "y": 140.05937,
            "value": 17,
            "category": 1
          },
          {
            "id": "109",
            "name": "声调",
            "symbolSize": 40,
            "x": -386.44904,
            "y": 140.05937,
            "value": 40,
            "category": 1
          },
          {
            "id": "110",
            "name": "阴平",
            "symbolSize": 20,
            "x": -386.44904,
            "y": 140.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "111",
            "name": "阳平",
            "symbolSize": 20,
            "x": -386.44904,
            "y": 140.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "112",
            "name": "上声",
            "symbolSize": 20,
            "x": -386.44904,
            "y": 140.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "113",
            "name": "去声",
            "symbolSize": 20,
            "x": -386.44904,
            "y": 140.05937,
            "value": 20,
            "category": 1
          },
          {
            "id": "114",
            "name": "清辅音",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 1
          },
          {
            "id": "115",
            "name": "浊辅音",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 1
          },
          {
            "id": "116",
            "name": "表意性",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 2
          },
          {
            "id": "117",
            "name": "音义二维性",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 2
          },
          {
            "id": "118",
            "name": "构形理据性",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 2
          },
          {
            "id": "119",
            "name": "汉字的起源",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 2
          },
          {
            "id": "120",
            "name": "横",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "121",
            "name": "竖",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "122",
            "name": "撇",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "123",
            "name": "点",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "124",
            "name": "折",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "125",
            "name": "捺",
            "symbolSize": 17,
            "x": -418.08344,
            "y": 446.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "126",
            "name": "五种正式字体",
            "symbolSize": 25,
            "x": -418.08344,
            "y": 446.8853,
            "value": 25,
            "category": 2
          },
          {
            "id": "127",
            "name": "楷书",
            "symbolSize": 20,
            "x": -418.08344,
            "y": 446.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "128",
            "name": "隶书",
            "symbolSize": 20,
            "x": -418.08344,
            "y": 446.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "129",
            "name": "行书",
            "symbolSize": 20,
            "x": -418.08344,
            "y": 446.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "130",
            "name": "草书",
            "symbolSize": 20,
            "x": -418.08344,
            "y": 446.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "131",
            "name": "篆书",
            "symbolSize": 20,
            "x": -418.08344,
            "y": 446.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "132",
            "name": "完全象形字",
            "symbolSize": 20,
            "x": -339.77908,
            "y": -184.69139,
            "value": 20,
            "category": 2
          },
          {
            "id": "133",
            "name": "不完全象形字",
            "symbolSize": 20,
            "x": -339.77908,
            "y": -184.69139,
            "value": 20,
            "category": 2
          },
          {
            "id": "134",
            "name": "动物象形字",
            "symbolSize": 20,
            "x": -339.77908,
            "y": -184.69139,
            "value": 20,
            "category": 2
          },
          {
            "id": "135",
            "name": "植物象形字",
            "symbolSize": 20,
            "x": -339.77908,
            "y": -184.69139,
            "value": 20,
            "category": 2
          },
          {
            "id": "136",
            "name": "自然现象象形字",
            "symbolSize": 20,
            "x": -239.77908,
            "y": -284.69139,
            "value": 20,
            "category": 2
          },
          {
            "id": "137",
            "name": "实指事字",
            "symbolSize": 20,
            "x": -294.31313,
            "y": 158.55301,
            "value": 20,
            "category": 2
          },
          {
            "id": "138",
            "name": "虚指事字",
            "symbolSize": 20,
            "x": -254.31313,
            "y": 138.55301,
            "value": 20,
            "category": 2
          },
          {
            "id": "139",
            "name": "内部指事字",
            "symbolSize": 20,
            "x": -234.31313,
            "y": 128.55301,
            "value": 20,
            "category": 2
          },
          {
            "id": "140",
            "name": "外部指事字",
            "symbolSize": 20,
            "x": -214.31313,
            "y": 118.55301,
            "value": 20,
            "category": 2
          },
          {
            "id": "141",
            "name": "同体会意字",
            "symbolSize": 20,
            "x": -148.05168,
            "y": 191.99768,
            "value": 20,
            "category": 2
          },
          {
            "id": "142",
            "name": "异体会意字",
            "symbolSize": 20,
            "x": -138.05168,
            "y": 181.99768,
            "value": 20,
            "category": 2
          },
          {
            "id": "143",
            "name": "具体会意字",
            "symbolSize": 20,
            "x": -128.05168,
            "y": 180.99768,
            "value": 20,
            "category": 2
          },
          {
            "id": "144",
            "name": "抽象会意字",
            "symbolSize": 20,
            "x": -128.05168,
            "y": 150.99768,
            "value": 20,
            "category": 2
          },
          {
            "id": "145",
            "name": "左形右声",
            "symbolSize": 17,
            "x": -107.701546,
            "y": 242.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "146",
            "name": "右形左声",
            "symbolSize": 17,
            "x": -107.701546,
            "y": 222.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "147",
            "name": "上形下声",
            "symbolSize": 17,
            "x": -107.701546,
            "y": 202.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "148",
            "name": "下形上声",
            "symbolSize": 17,
            "x": -107.701546,
            "y": 182.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "149",
            "name": "内形外声",
            "symbolSize": 17,
            "x": -157.701546,
            "y": 182.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "150",
            "name": "外形内声",
            "symbolSize": 17,
            "x": -167.701546,
            "y": 182.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "151",
            "name": "同部首转注字",
            "symbolSize": 17,
            "x": -506.55884,
            "y": -393.98975,
            "value": 17,
            "category": 2
          },
          {
            "id": "152",
            "name": "异部首转注字",
            "symbolSize": 17,
            "x": -506.55884,
            "y": -383.98975,
            "value": 17,
            "category": 2
          },
          {
            "id": "153",
            "name": "同音转注字",
            "symbolSize": 17,
            "x": -506.55884,
            "y": -363.98975,
            "value": 17,
            "category": 2
          },
          {
            "id": "154",
            "name": "异音转注字",
            "symbolSize": 17,
            "x": -506.55884,
            "y": -353.98975,
            "value": 17,
            "category": 2
          },
          {
            "id": "155",
            "name": "偏旁部首",
            "symbolSize": 20,
            "x": 20.44904,
            "y": 410.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "156",
            "name": "声旁和形旁",
            "symbolSize": 20,
            "x": 30.44904,
            "y": 450.05937,
            "value": 20,
            "category": 2
          },
          {
            "id": "157",
            "name": "左偏旁",
            "symbolSize": 17,
            "x": 53.44904,
            "y": 400.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "158",
            "name": "右偏旁",
            "symbolSize": 17,
            "x": 58.44904,
            "y": 390.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "159",
            "name": "上偏旁",
            "symbolSize": 17,
            "x": 68.44904,
            "y": 375.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "160",
            "name": "下偏旁",
            "symbolSize": 17,
            "x": 78.44904,
            "y": 365.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "161",
            "name": "上形下声",
            "symbolSize": 17,
            "x": -117.701546,
            "y": 249.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "162",
            "name": "下形上声",
            "symbolSize": 17,
            "x": -137.701546,
            "y": 269.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "163",
            "name": "顺位连接",
            "symbolSize": 17,
            "x": -171.701546,
            "y": 296.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "164",
            "name": "借位连接",
            "symbolSize": 17,
            "x": -188.701546,
            "y": 256.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "165",
            "name": "错位连接",
            "symbolSize": 17,
            "x": -123.701546,
            "y": 255.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "166",
            "name": "顺势连接",
            "symbolSize": 17,
            "x": -155.701546,
            "y": 203.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "167",
            "name": "避让连接",
            "symbolSize": 17,
            "x": -131.701546,
            "y": 245.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "168",
            "name": "融合连接",
            "symbolSize": 17,
            "x": -144.701546,
            "y": 266.55057,
            "value": 17,
            "category": 2
          },
          {
            "id": "169",
            "name": "成字部件",
            "symbolSize": 17,
            "x": 20.44904,
            "y": 410.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "170",
            "name": "非成字部件",
            "symbolSize": 17,
            "x": 26.44904,
            "y": 456.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "171",
            "name": "基础部件",
            "symbolSize": 17,
            "x": 77.44904,
            "y": 489.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "172",
            "name": "合成部件",
            "symbolSize": 17,
            "x": 34.44904,
            "y": 492.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "173",
            "name": "单笔部件",
            "symbolSize": 17,
            "x": 55.44904,
            "y": 497.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "174",
            "name": "复笔部件",
            "symbolSize": 17,
            "x": 33.44904,
            "y": 464.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "175",
            "name": "单一结构",
            "symbolSize": 17,
            "x": 29.44904,
            "y": 533.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "176",
            "name": "左右结构",
            "symbolSize": 17,
            "x": 64.44904,
            "y": 539.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "177",
            "name": "上下结构",
            "symbolSize": 17,
            "x": 36.44904,
            "y": 553.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "178",
            "name": "包围结构",
            "symbolSize": 17,
            "x": 91.44904,
            "y": 573.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "179",
            "name": "简体字",
            "symbolSize": 25,
            "x": -79.34107,
            "y": 204.56128,
            "value": 25,
            "category": 2
          },
          {
            "id": "180",
            "name": "繁体字",
            "symbolSize": 25,
            "x": -39.34107,
            "y": 233.56128,
            "value": 25,
            "category": 2
          },
          {
            "id": "181",
            "name": "先横后竖",
            "symbolSize": 17,
            "x": 61.44904,
            "y": 506.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "182",
            "name": "先撇后捺",
            "symbolSize": 17,
            "x": 46.44904,
            "y": 502.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "183",
            "name": "先上后下",
            "symbolSize": 17,
            "x": 99.44904,
            "y": 578.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "184",
            "name": "先左后右",
            "symbolSize": 17,
            "x": 53.44904,
            "y": 524.05937,
            "value": 17,
            "category": 2
          },
          {
            "id": "185",
            "name": "具体名词",
            "symbolSize": 25,
            "x": -401.12122,
            "y": -444.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "186",
            "name": "抽象名词",
            "symbolSize": 25,
            "x": -421.12122,
            "y": -433.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "187",
            "name": "可数名词",
            "symbolSize": 25,
            "x": -431.12122,
            "y": -445.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "188",
            "name": "不可数名词",
            "symbolSize": 25,
            "x": -466.12122,
            "y": -412.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "189",
            "name": "普通名词",
            "symbolSize": 25,
            "x": -455.12122,
            "y": -497.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "190",
            "name": "专有名词",
            "symbolSize": 25,
            "x": -413.12122,
            "y": -485.5048,
            "value": 25,
            "category": 7
          },
          {
            "id": "191",
            "name": "及物动词",
            "symbolSize": 25,
            "x": 230.36697,
            "y": -220.00926,
            "value": 25,
            "category": 7
          },
          {
            "id": "192",
            "name": "不及物动词",
            "symbolSize": 25,
            "x": 203.36697,
            "y": -202.00926,
            "value": 25,
            "category": 7
          },
          {
            "id": "193",
            "name": "系动词",
            "symbolSize": 25,
            "x": 231.36697,
            "y": -290.00926,
            "value": 25,
            "category": 7
          },
          {
            "id": "194",
            "name": "情态动词",
            "symbolSize": 25,
            "x": 246.36697,
            "y": -231.00926,
            "value": 25,
            "category": 7
          },
          {
            "id": "195",
            "name": "助动词",
            "symbolSize": 25,
            "x": 240.36697,
            "y": -288.00926,
            "value": 25,
            "category": 7
          },
          {
            "id": "196",
            "name": "一般现在时",
            "symbolSize": 20,
            "x": 241.36697,
            "y": -285.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "197",
            "name": "一般过去时",
            "symbolSize": 20,
            "x": 215.36697,
            "y": -225.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "198",
            "name": "一般将来时",
            "symbolSize": 20,
            "x": 285.36697,
            "y": -258.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "199",
            "name": "现在进行时",
            "symbolSize": 20,
            "x": 226.36697,
            "y": -251.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "200",
            "name": "过去进行时",
            "symbolSize": 20,
            "x": 269.36697,
            "y": -296.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "201",
            "name": "现在完成时",
            "symbolSize": 20,
            "x": 211.36697,
            "y": -278.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "202",
            "name": "过去完成时",
            "symbolSize": 20,
            "x": 255.36697,
            "y": -255.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "203",
            "name": "将来完成时",
            "symbolSize": 20,
            "x": 222.36697,
            "y": -299.00926,
            "value": 20,
            "category": 7
          },
          {
            "id": "204",
            "name": "性质形容词",
            "symbolSize": 25,
            "x": -82.46074,
            "y": -222.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "205",
            "name": "状态形容词",
            "symbolSize": 25,
            "x": -83.46074,
            "y": -223.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "206",
            "name": "单音节形容词",
            "symbolSize": 25,
            "x": -84.46074,
            "y": -224.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "207",
            "name": "多音节形容词",
            "symbolSize": 25,
            "x": -85.46074,
            "y": -225.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "208",
            "name": "褒义形容词",
            "symbolSize": 25,
            "x": -86.46074,
            "y": -226.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "209",
            "name": "贬义形容词",
            "symbolSize": 25,
            "x": -87.46074,
            "y": -227.20204,
            "value": 25,
            "category": 7
          },
          {
            "id": "210",
            "name": "简单介词",
            "symbolSize": 25,
            "x": 190.69513,
            "y": -347.50662,
            "value": 25,
            "category": 7
          },
          {
            "id": "211",
            "name": "复合介词",
            "symbolSize": 25,
            "x": 191.69513,
            "y": -348.50662,
            "value": 25,
            "category": 7
          },
          {
            "id": "212",
            "name": "分词介词",
            "symbolSize": 25,
            "x": 192.69513,
            "y": -349.50662,
            "value": 25,
            "category": 7
          },
          {
            "id": "213",
            "name": "语素",
            "symbolSize": 20,
            "x": -419.08344,
            "y": 447.8853,
            "value": 20,
            "category": 2
          },
          {
            "id": "214",
            "name": "单音节语素",
            "symbolSize": 17,
            "x": -420.08344,
            "y": 448.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "215",
            "name": "多音节语素",
            "symbolSize": 17,
            "x": -421.08344,
            "y": 449.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "216",
            "name": "成词语素",
            "symbolSize": 17,
            "x": -422.08344,
            "y": 450.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "217",
            "name": "不成词语素",
            "symbolSize": 17,
            "x": -423.08344,
            "y": 451.8853,
            "value": 17,
            "category": 2
          },
          {
            "id": "218",
            "name": "名词短语",
            "symbolSize": 25,
            "x": -457.44113,
            "y": -426.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "219",
            "name": "动词短语",
            "symbolSize": 25,
            "x": -458.44113,
            "y": -427.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "220",
            "name": "形容词短语",
            "symbolSize": 25,
            "x": -459.44113,
            "y": -428.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "221",
            "name": "副词短语",
            "symbolSize": 25,
            "x": -460.44113,
            "y": -429.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "222",
            "name": "连词短语",
            "symbolSize": 25,
            "x": -461.44113,
            "y": -430.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "223",
            "name": "祈使短语",
            "symbolSize": 25,
            "x": -462.44113,
            "y": -431.13303,
            "value": 25,
            "category": 3
          },
          {
            "id": "224",
            "name": "主谓结构",
            "symbolSize": 35,
            "x": -463.44113,
            "y": -432.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "225",
            "name": "动宾结构",
            "symbolSize": 35,
            "x": -464.44113,
            "y": -433.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "226",
            "name": "偏正结构",
            "symbolSize": 35,
            "x": -465.44113,
            "y": -434.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "227",
            "name": "动补结构",
            "symbolSize": 35,
            "x": -466.44113,
            "y": -435.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "228",
            "name": "并列结构",
            "symbolSize": 35,
            "x": -467.44113,
            "y": -436.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "229",
            "name": "介宾结构",
            "symbolSize": 35,
            "x": -468.44113,
            "y": -437.13303,
            "value": 35,
            "category": 3
          },
          {
            "id": "230",
            "name": "主谓一致",
            "symbolSize": 29,
            "x": -464.44113,
            "y": -433.13303,
            "value": 29,
            "category": 3
          },
          {
            "id": "231",
            "name": "主谓搭配",
            "symbolSize": 29,
            "x": -465.44113,
            "y": -434.13303,
            "value": 29,
            "category": 3
          },
          {
            "id": "232",
            "name": "动宾一致",
            "symbolSize": 29,
            "x": -466.44113,
            "y": -435.13303,
            "value": 29,
            "category": 3
          },
          {
            "id": "233",
            "name": "动宾搭配",
            "symbolSize": 29,
            "x": -467.44113,
            "y": -438.13303,
            "value": 29,
            "category": 3
          },
          {
            "id": "234",
            "name": "单音节单纯词",
            "symbolSize": 20,
            "x": 79.64646,
            "y": -32.512747,
            "value": 20,
            "category": 7
          },
          {
            "id": "235",
            "name": "双音节单纯词",
            "symbolSize": 20,
            "x": 80.64646,
            "y": -33.512747,
            "value": 20,
            "category": 7
          },
          {
            "id": "236",
            "name": "多音节单纯词",
            "symbolSize": 20,
            "x": 81.64646,
            "y": -34.512747,
            "value": 20,
            "category": 7
          },
          {
            "id": "237",
            "name": "代词",
            "symbolSize": 25,
            "x": 83.80825,
            "y": -204.1144,
            "value": 25,
            "category": 7
          },
          {
            "id": "238",
            "name": "副词",
            "symbolSize": 25,
            "x": 84.80825,
            "y": -205.1144,
            "value": 25,
            "category": 7
          },
          {
            "id": "239",
            "name": "连词",
            "symbolSize": 25,
            "x": 85.80825,
            "y": -206.1144,
            "value": 25,
            "category": 7
          },
          {
            "id": "240",
            "name": "拟声词",
            "symbolSize": 25,
            "x": 86.80825,
            "y": -207.1144,
            "value": 25,
            "category": 7
          },
          {
            "id": "241",
            "name": "人称代词",
            "symbolSize": 20,
            "x": 87.80825,
            "y": -208.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "242",
            "name": "物主代词",
            "symbolSize": 20,
            "x": 88.80825,
            "y": -209.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "243",
            "name": "反身代词",
            "symbolSize": 20,
            "x": 89.80825,
            "y": -210.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "244",
            "name": "相互代词",
            "symbolSize": 20,
            "x": 90.80825,
            "y": -211.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "245",
            "name": "指示代词",
            "symbolSize": 20,
            "x": 91.80825,
            "y": -212.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "246",
            "name": "疑问代词",
            "symbolSize": 20,
            "x": 92.80825,
            "y": -213.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "247",
            "name": "关系代词",
            "symbolSize": 20,
            "x": 93.80825,
            "y": -214.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "248",
            "name": "不定代词",
            "symbolSize": 20,
            "x": 94.80825,
            "y": -215.1144,
            "value": 20,
            "category": 7
          },
          {
            "id": "249",
            "name": "第一人称代词",
            "symbolSize": 17,
            "x": 95.80825,
            "y": -216.1144,
            "value": 17,
            "category": 7
          },
          {
            "id": "250",
            "name": "第二人称代词",
            "symbolSize": 17,
            "x": 96.80825,
            "y": -217.1144,
            "value": 17,
            "category": 7
          },
          {
            "id": "251",
            "name": "第三人称代词",
            "symbolSize": 17,
            "x": 97.80825,
            "y": -218.1144,
            "value": 17,
            "category": 7
          },
          {
            "id": "252",
            "name": "形容词性物主代词",
            "symbolSize": 17,
            "x": 89.80825,
            "y": -210.1144,
            "value": 17,
            "category": 7
          },
          {
            "id": "253",
            "name": "名词性物主代词",
            "symbolSize": 17,
            "x": 90.80825,
            "y": -211.1144,
            "value": 17,
            "category": 7
          },
          {
            "id": "254",
            "name": "描写性成语",
            "symbolSize": 17,
            "x": 83.80825,
            "y": -204.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "255",
            "name": "动作性成语",
            "symbolSize": 17,
            "x": 84.80825,
            "y": -205.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "256",
            "name": "情感性成语",
            "symbolSize": 17,
            "x": 85.80825,
            "y": -206.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "257",
            "name": "褒义成语",
            "symbolSize": 17,
            "x": 86.80825,
            "y": -207.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "258",
            "name": "贬义成语",
            "symbolSize": 17,
            "x": 87.80825,
            "y": -208.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "259",
            "name": "中性成语",
            "symbolSize": 17,
            "x": 88.80825,
            "y": -209.1144,
            "value": 17,
            "category": 3
          },
          {
            "id": "260",
            "name": "描写性俗语",
            "symbolSize": 17,
            "x": -314.42786,
            "y": -290.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "261",
            "name": "比喻性俗语",
            "symbolSize": 17,
            "x": -315.42786,
            "y": -291.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "262",
            "name": "警示性俗语",
            "symbolSize": 17,
            "x": -316.42786,
            "y": -292.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "263",
            "name": "劝诫性俗语",
            "symbolSize": 17,
            "x": -317.42786,
            "y": -293.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "264",
            "name": "讽刺性俗语",
            "symbolSize": 17,
            "x": -318.42786,
            "y": -294.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "265",
            "name": "安慰性俗语",
            "symbolSize": 17,
            "x": -319.42786,
            "y": -295.44803,
            "value": 17,
            "category": 3
          },
          {
            "id": "266",
            "name": "同素词",
            "symbolSize": 30,
            "x": -522.1624,
            "y": -466.9891,
            "value": 30,
            "category": 7
          },
          {
            "id": "267",
            "name": "单语素同素词",
            "symbolSize": 20,
            "x": -523.1624,
            "y": -467.9891,
            "value": 20,
            "category": 7
          },
          {
            "id": "268",
            "name": "多语素同素词",
            "symbolSize": 20,
            "x": -524.1624,
            "y": -468.9891,
            "value": 20,
            "category": 7
          },
          {
            "id": "269",
            "name": "名词同素词",
            "symbolSize": 20,
            "x": -525.1624,
            "y": -469.9891,
            "value": 20,
            "category": 7
          },
          {
            "id": "270",
            "name": "动词同素词",
            "symbolSize": 20,
            "x": -526.1624,
            "y": -470.9891,
            "value": 20,
            "category": 7
          },
          {
            "id": "271",
            "name": "形容词同素词",
            "symbolSize": 20,
            "x": -527.1624,
            "y": -471.9891,
            "value": 20,
            "category": 7
          },
          {
            "id": "272",
            "name": "补语",
            "symbolSize": 31,
            "x": -243.82404,
            "y": 236.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "273",
            "name": "数量补语和介宾补语",
            "symbolSize": 25,
            "x": -244.82404,
            "y": 237.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "274",
            "name": "情态补语",
            "symbolSize": 25,
            "x": -245.82404,
            "y": 238.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "275",
            "name": "结果补语",
            "symbolSize": 25,
            "x": -246.82404,
            "y": 239.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "276",
            "name": "趋向补语",
            "symbolSize": 25,
            "x": -247.82404,
            "y": 240.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "277",
            "name": "可能补语",
            "symbolSize": 25,
            "x": -248.82404,
            "y": 241.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "278",
            "name": "中补补语",
            "symbolSize": 25,
            "x": -249.82404,
            "y": 242.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "279",
            "name": "联合补语",
            "symbolSize": 25,
            "x": -250.82404,
            "y": 243.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "280",
            "name": "语义关系",
            "symbolSize": 31,
            "x": -123.82404,
            "y": 123.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "281",
            "name": "同义关系",
            "symbolSize": 25,
            "x": -124.82404,
            "y": 124.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "282",
            "name": "反义关系",
            "symbolSize": 25,
            "x": -125.82404,
            "y": 125.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "283",
            "name": "上下关系",
            "symbolSize": 25,
            "x": -126.82404,
            "y": 126.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "284",
            "name": "因果关系",
            "symbolSize": 25,
            "x": -127.82404,
            "y": 127.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "285",
            "name": "并列关系",
            "symbolSize": 25,
            "x": -128.82404,
            "y": 128.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "286",
            "name": "对立关系",
            "symbolSize": 25,
            "x": -129.82404,
            "y": 129.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "287",
            "name": "绝对反义关系",
            "symbolSize": 20,
            "x": -130.82404,
            "y": 130.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "288",
            "name": "相对反义关系",
            "symbolSize": 20,
            "x": -131.82404,
            "y": 131.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "289",
            "name": "述宾之间的语义关系",
            "symbolSize": 15,
            "x": -297.07935,
            "y": 164.11964,
            "value": 15,
            "category": 3
          },
          {
            "id": "290",
            "name": "定语",
            "symbolSize": 31,
            "x": -244.82404,
            "y": 237.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "291",
            "name": "限制性定语",
            "symbolSize": 25,
            "x": -245.82404,
            "y": 238.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "292",
            "name": "非限制性定语",
            "symbolSize": 25,
            "x": -246.82404,
            "y": 239.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "293",
            "name": "定语的语义指向",
            "symbolSize": 25,
            "x": -247.82404,
            "y": 240.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "294",
            "name": "状语",
            "symbolSize": 31,
            "x": -250.82404,
            "y": 246.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "295",
            "name": "多项状语的位置",
            "symbolSize": 31,
            "x": -251.82404,
            "y": 247.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "296",
            "name": "状语的语义指向",
            "symbolSize": 31,
            "x": -252.82404,
            "y": 248.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "297",
            "name": "时间状语",
            "symbolSize": 25,
            "x": -253.82404,
            "y": 249.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "298",
            "name": "地点状语",
            "symbolSize": 25,
            "x": -254.82404,
            "y": 250.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "299",
            "name": "原因状语",
            "symbolSize": 25,
            "x": -255.82404,
            "y": 251.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "300",
            "name": "目的状语",
            "symbolSize": 25,
            "x": -256.82404,
            "y": 252.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "301",
            "name": "结果状语",
            "symbolSize": 25,
            "x": -257.82404,
            "y": 253.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "302",
            "name": "条件状语",
            "symbolSize": 25,
            "x": -258.82404,
            "y": 254.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "303",
            "name": "让步状语",
            "symbolSize": 25,
            "x": -259.82404,
            "y": 255.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "304",
            "name": "比较状语",
            "symbolSize": 25,
            "x": -260.82404,
            "y": 256.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "305",
            "name": "方式状语",
            "symbolSize": 25,
            "x": -261.82404,
            "y": 257.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "306",
            "name": "具体时间状语",
            "symbolSize": 20,
            "x": -262.82404,
            "y": 258.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "307",
            "name": "时间段状语",
            "symbolSize": 20,
            "x": -263.82404,
            "y": 259.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "308",
            "name": "频率状语",
            "symbolSize": 20,
            "x": -264.82404,
            "y": 260.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "309",
            "name": "相对时间状语",
            "symbolSize": 20,
            "x": -265.82404,
            "y": 261.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "310",
            "name": "具体地点状语",
            "symbolSize": 20,
            "x": -266.82404,
            "y": 262.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "311",
            "name": "抽象地点状语",
            "symbolSize": 20,
            "x": -267.82404,
            "y": 263.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "312",
            "name": "地点状语从句",
            "symbolSize": 20,
            "x": -268.82404,
            "y": 264.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "313",
            "name": "具体原因状语",
            "symbolSize": 20,
            "x": -269.82404,
            "y": 265.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "314",
            "name": "抽象原因状语",
            "symbolSize": 20,
            "x": -270.82404,
            "y": 266.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "315",
            "name": "具体目的状语",
            "symbolSize": 20,
            "x": -271.82404,
            "y": 267.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "316",
            "name": "抽象目的状语",
            "symbolSize": 20,
            "x": -272.82404,
            "y": 268.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "317",
            "name": "对外汉语教学体系的八类补语",
            "symbolSize": 28,
            "x": -254.82404,
            "y": 246.26283,
            "value": 28,
            "category": 0
          },
          {
            "id": "318",
            "name": "程度补语",
            "symbolSize": 25,
            "x": -255.82404,
            "y": 247.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "319",
            "name": "时量补语",
            "symbolSize": 25,
            "x": -256.82404,
            "y": 248.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "320",
            "name": "动量补语",
            "symbolSize": 25,
            "x": -257.82404,
            "y": 249.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "321",
            "name": "简单趋向补语",
            "symbolSize": 20,
            "x": -227.82404,
            "y": 220.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "322",
            "name": "复合趋向补语",
            "symbolSize": 20,
            "x": -228.82404,
            "y": 221.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "323",
            "name": "绝对程度补语",
            "symbolSize": 25,
            "x": -266.82404,
            "y": 237.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "324",
            "name": "相对程度补语",
            "symbolSize": 25,
            "x": -267.82404,
            "y": 238.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "325",
            "name": "句型",
            "symbolSize": 40,
            "x": -288.82404,
            "y": 208.26283,
            "value": 40,
            "category": 0
          },
          {
            "id": "326",
            "name": "句类",
            "symbolSize": 40,
            "x": -289.82404,
            "y": 209.26283,
            "value": 40,
            "category": 0
          },
          {
            "id": "327",
            "name": "单句",
            "symbolSize": 31,
            "x": -290.82404,
            "y": 210.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "328",
            "name": "复句",
            "symbolSize": 31,
            "x": -291.82404,
            "y": 211.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "329",
            "name": "主谓句",
            "symbolSize": 25,
            "x": -292.82404,
            "y": 212.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "330",
            "name": "非主谓句",
            "symbolSize": 25,
            "x": -293.82404,
            "y": 213.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "331",
            "name": "名词谓语句",
            "symbolSize": 20,
            "x": -294.82404,
            "y": 214.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "332",
            "name": "动词谓语句",
            "symbolSize": 20,
            "x": -295.82404,
            "y": 215.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "333",
            "name": "形容词谓语句",
            "symbolSize": 20,
            "x": -296.82404,
            "y": 216.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "334",
            "name": "名词性非主谓句",
            "symbolSize": 20,
            "x": -297.82404,
            "y": 217.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "335",
            "name": "动词性非主谓句",
            "symbolSize": 20,
            "x": -298.82404,
            "y": 218.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "336",
            "name": "形容词性非主谓句",
            "symbolSize": 20,
            "x": -299.82404,
            "y": 219.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "337",
            "name": "叹词句",
            "symbolSize": 20,
            "x": -300.82404,
            "y": 220.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "338",
            "name": "拟声词句",
            "symbolSize": 20,
            "x": -301.82404,
            "y": 221.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "339",
            "name": "陈述句",
            "symbolSize": 31,
            "x": -302.82404,
            "y": 222.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "340",
            "name": "疑问句",
            "symbolSize": 31,
            "x": -303.82404,
            "y": 223.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "341",
            "name": "感叹句",
            "symbolSize": 31,
            "x": -304.82404,
            "y": 224.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "342",
            "name": "祈使句",
            "symbolSize": 31,
            "x": -305.82404,
            "y": 225.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "343",
            "name": "肯定陈述句",
            "symbolSize": 25,
            "x": -306.82404,
            "y": 226.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "344",
            "name": "否定陈述句",
            "symbolSize": 25,
            "x": -307.82404,
            "y": 227.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "345",
            "name": "非问句",
            "symbolSize": 25,
            "x": -308.82404,
            "y": 228.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "346",
            "name": "特指问句",
            "symbolSize": 25,
            "x": -309.82404,
            "y": 229.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "347",
            "name": "选择问句",
            "symbolSize": 25,
            "x": -310.82404,
            "y": 230.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "348",
            "name": "正反问句",
            "symbolSize": 25,
            "x": -311.82404,
            "y": 231.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "349",
            "name": "命令句",
            "symbolSize": 25,
            "x": -312.82404,
            "y": 232.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "350",
            "name": "请求句",
            "symbolSize": 25,
            "x": -313.82404,
            "y": 233.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "351",
            "name": "劝告句",
            "symbolSize": 25,
            "x": -314.82404,
            "y": 234.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "352",
            "name": "警告句",
            "symbolSize": 25,
            "x": -315.82404,
            "y": 235.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "353",
            "name": "“连”字句",
            "symbolSize": 30,
            "x": -66.6313396,
            "y": -99.8517,
            "value": 30,
            "category": 8
          },
          {
            "id": "354",
            "name": "中原文化",
            "symbolSize": 25,
            "x": -261.6313396,
            "y": -294.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "355",
            "name": "江南文化",
            "symbolSize": 25,
            "x": -262.6313396,
            "y": -295.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "356",
            "name": "巴蜀文化",
            "symbolSize": 25,
            "x": -263.6313396,
            "y": -296.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "357",
            "name": "岭南文化",
            "symbolSize": 25,
            "x": -264.6313396,
            "y": -297.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "358",
            "name": "家庭礼仪",
            "symbolSize": 25,
            "x": -161.6313396,
            "y": -194.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "359",
            "name": "社交礼仪",
            "symbolSize": 25,
            "x": -162.6313396,
            "y": -195.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "360",
            "name": "饮食礼仪",
            "symbolSize": 25,
            "x": -163.6313396,
            "y": -196.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "361",
            "name": "节日礼仪",
            "symbolSize": 25,
            "x": -164.6313396,
            "y": -197.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "362",
            "name": "中国经典诗歌的历史演变",
            "symbolSize": 25,
            "x": 165.6313396,
            "y": 198.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "363",
            "name": "《诗经》",
            "symbolSize": 20,
            "x": 166.6313396,
            "y": 199.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "364",
            "name": "《楚辞》",
            "symbolSize": 20,
            "x": 167.6313396,
            "y": 200.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "365",
            "name": "唐诗",
            "symbolSize": 20,
            "x": 168.6313396,
            "y": 201.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "366",
            "name": "宋词",
            "symbolSize": 20,
            "x": 169.6313396,
            "y": 202.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "367",
            "name": "元曲",
            "symbolSize": 20,
            "x": 170.6313396,
            "y": 203.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "368",
            "name": "明清时期的诗词",
            "symbolSize": 20,
            "x": 171.6313396,
            "y": 204.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "369",
            "name": "中国经典诗歌的主题风格",
            "symbolSize": 25,
            "x": 172.6313396,
            "y": 205.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "370",
            "name": "山水田园",
            "symbolSize": 20,
            "x": 173.6313396,
            "y": 206.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "371",
            "name": "边塞战争",
            "symbolSize": 20,
            "x": 174.6313396,
            "y": 207.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "372",
            "name": "爱情婚姻",
            "symbolSize": 20,
            "x": 175.6313396,
            "y": 208.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "373",
            "name": "哲理思考",
            "symbolSize": 20,
            "x": 176.6313396,
            "y": 209.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "374",
            "name": "历史事件",
            "symbolSize": 20,
            "x": 177.6313396,
            "y": 210.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "375",
            "name": "儒家经典",
            "symbolSize": 25,
            "x": -61.6313396,
            "y": -294.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "376",
            "name": "道家经典",
            "symbolSize": 25,
            "x": -62.6313396,
            "y": -295.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "377",
            "name": "法家经典",
            "symbolSize": 25,
            "x": -63.6313396,
            "y": -296.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "378",
            "name": "兵家经典",
            "symbolSize": 25,
            "x": -64.6313396,
            "y": -297.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "379",
            "name": "史书",
            "symbolSize": 25,
            "x": -65.6313396,
            "y": -298.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "380",
            "name": "诗词歌赋",
            "symbolSize": 25,
            "x": -66.6313396,
            "y": -299.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "381",
            "name": "小说",
            "symbolSize": 25,
            "x": -67.6313396,
            "y": -300.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "382",
            "name": "戏剧",
            "symbolSize": 25,
            "x": -68.6313396,
            "y": -301.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "383",
            "name": "书法",
            "symbolSize": 25,
            "x": -69.6313396,
            "y": -302.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "384",
            "name": "绘画",
            "symbolSize": 25,
            "x": -70.6313396,
            "y": -303.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "385",
            "name": "《论语》",
            "symbolSize": 20,
            "x": -71.6313396,
            "y": -304.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "386",
            "name": "《孟子》",
            "symbolSize": 20,
            "x": -72.6313396,
            "y": -305.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "387",
            "name": "《大学》",
            "symbolSize": 20,
            "x": -73.6313396,
            "y": -306.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "388",
            "name": "《中庸》",
            "symbolSize": 20,
            "x": -74.6313396,
            "y": -307.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "389",
            "name": "《道德经》",
            "symbolSize": 20,
            "x": -75.6313396,
            "y": -308.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "390",
            "name": "《庄子》",
            "symbolSize": 20,
            "x": -76.6313396,
            "y": -309.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "391",
            "name": "《韩非子》",
            "symbolSize": 20,
            "x": -77.6313396,
            "y": -310.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "392",
            "name": "《孙子兵法》",
            "symbolSize": 20,
            "x": -78.6313396,
            "y": -311.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "393",
            "name": "《史记》",
            "symbolSize": 20,
            "x": -79.6313396,
            "y": -312.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "394",
            "name": "《史记》",
            "symbolSize": 20,
            "x": -80.6313396,
            "y": -313.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "395",
            "name": "不同文化的语言",
            "symbolSize": 25,
            "x": -7.6313396,
            "y": -94.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "396",
            "name": "不同文化的宗教信仰",
            "symbolSize": 25,
            "x": -8.6313396,
            "y": -95.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "397",
            "name": "汉语",
            "symbolSize": 20,
            "x": -8.6313396,
            "y": -95.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "398",
            "name": "藏语",
            "symbolSize": 20,
            "x": -9.6313396,
            "y": -96.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "399",
            "name": "维吾尔语",
            "symbolSize": 20,
            "x": -10.6313396,
            "y": -97.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "400",
            "name": "蒙古语",
            "symbolSize": 20,
            "x": -11.6313396,
            "y": -98.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "401",
            "name": "苗语",
            "symbolSize": 20,
            "x": -12.6313396,
            "y": -99.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "402",
            "name": "彝语",
            "symbolSize": 20,
            "x": -13.6313396,
            "y": -100.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "403",
            "name": "佛教",
            "symbolSize": 20,
            "x": -14.6313396,
            "y": -101.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "404",
            "name": "道教",
            "symbolSize": 20,
            "x": -15.6313396,
            "y": -102.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "405",
            "name": "伊斯兰教",
            "symbolSize": 20,
            "x": -16.6313396,
            "y": -103.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "406",
            "name": "基督教",
            "symbolSize": 20,
            "x": -17.6313396,
            "y": -104.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "407",
            "name": "节日习俗",
            "symbolSize": 25,
            "x": -18.6313396,
            "y": -105.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "408",
            "name": "婚丧嫁娶",
            "symbolSize": 25,
            "x": -19.6313396,
            "y": -106.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "409",
            "name": "服饰文化",
            "symbolSize": 25,
            "x": -20.6313396,
            "y": -107.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "410",
            "name": "春节",
            "symbolSize": 20,
            "x": -21.6313396,
            "y": -108.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "411",
            "name": "中秋节",
            "symbolSize": 20,
            "x": -22.6313396,
            "y": -109.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "412",
            "name": "端午节",
            "symbolSize": 20,
            "x": -23.6313396,
            "y": -110.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "413",
            "name": "元宵节",
            "symbolSize": 20,
            "x": -24.6313396,
            "y": -111.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "414",
            "name": "贴春联",
            "symbolSize": 17,
            "x": -25.6313396,
            "y": -112.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "415",
            "name": "放鞭炮",
            "symbolSize": 17,
            "x": -26.6313396,
            "y": -113.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "416",
            "name": "守岁",
            "symbolSize": 17,
            "x": -27.6313396,
            "y": -114.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "417",
            "name": "赏月",
            "symbolSize": 17,
            "x": -28.6313396,
            "y": -115.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "418",
            "name": "吃月饼",
            "symbolSize": 17,
            "x": -29.6313396,
            "y": -116.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "419",
            "name": "赛龙舟",
            "symbolSize": 17,
            "x": -30.6313396,
            "y": -117.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "420",
            "name": "包粽子",
            "symbolSize": 17,
            "x": -31.6313396,
            "y": -118.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "421",
            "name": "猜灯谜",
            "symbolSize": 17,
            "x": -32.6313396,
            "y": -119.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "422",
            "name": "吃汤圆",
            "symbolSize": 17,
            "x": -33.6313396,
            "y": -120.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "423",
            "name": "婚礼的六礼",
            "symbolSize": 20,
            "x": -34.6313396,
            "y": -121.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "424",
            "name": "葬礼的孝服",
            "symbolSize": 20,
            "x": -35.6313396,
            "y": -122.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "425",
            "name": "哭丧",
            "symbolSize": 20,
            "x": -36.6313396,
            "y": -123.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "426",
            "name": "守灵",
            "symbolSize": 20,
            "x": -37.6313396,
            "y": -124.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "427",
            "name": "汉族的汉服",
            "symbolSize": 20,
            "x": -38.6313396,
            "y": -125.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "428",
            "name": "藏族的藏袍",
            "symbolSize": 20,
            "x": -39.6313396,
            "y": -126.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "429",
            "name": "苗族的银饰",
            "symbolSize": 20,
            "x": -40.6313396,
            "y": -127.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "430",
            "name": "壮族的壮服",
            "symbolSize": 20,
            "x": -41.6313396,
            "y": -128.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "431",
            "name": "纳采",
            "symbolSize": 17,
            "x": -42.6313396,
            "y": -129.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "432",
            "name": "问名",
            "symbolSize": 17,
            "x": -43.6313396,
            "y": -130.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "433",
            "name": "纳吉",
            "symbolSize": 17,
            "x": -44.6313396,
            "y": -131.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "434",
            "name": "纳征",
            "symbolSize": 17,
            "x": -45.6313396,
            "y": -132.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "435",
            "name": "请期",
            "symbolSize": 17,
            "x": -46.6313396,
            "y": -133.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "436",
            "name": "迎娶",
            "symbolSize": 17,
            "x": -47.6313396,
            "y": -134.8517,
            "value": 17,
            "category": 0
          },
          {
            "id": "437",
            "name": "京剧",
            "symbolSize": 20,
            "x": -48.6313396,
            "y": -135.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "438",
            "name": "越剧",
            "symbolSize": 20,
            "x": -49.6313396,
            "y": -136.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "439",
            "name": "黄梅戏",
            "symbolSize": 20,
            "x": -50.6313396,
            "y": -137.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "440",
            "name": "评剧",
            "symbolSize": 20,
            "x": -51.6313396,
            "y": -138.8517,
            "value": 20,
            "category": 0
          },
          {
            "id": "441",
            "name": "物质文化",
            "symbolSize": 25,
            "x": -161.6313396,
            "y": -94.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "442",
            "name": "行为文化",
            "symbolSize": 25,
            "x": -162.6313396,
            "y": -95.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "443",
            "name": "制度文化",
            "symbolSize": 25,
            "x": -163.6313396,
            "y": -96.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "444",
            "name": "观念文化",
            "symbolSize": 25,
            "x": -164.6313396,
            "y": -97.8517,
            "value": 25,
            "category": 0
          },
          {
            "id": "445",
            "name": "汉语语构文化、语义文化与语用文化.",
            "symbolSize": 40,
            "x": -42.82404,
            "y": 35.26283,
            "value": 40,
            "category": 0
          },
          {
            "id": "446",
            "name": "修辞手法",
            "symbolSize": 31,
            "x": -43.82404,
            "y": 36.26283,
            "value": 31,
            "category": 0
          },
          {
            "id": "447",
            "name": "比喻",
            "symbolSize": 25,
            "x": -44.82404,
            "y": 37.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "448",
            "name": "拟人",
            "symbolSize": 25,
            "x": -45.82404,
            "y": 38.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "449",
            "name": "夸张",
            "symbolSize": 25,
            "x": -46.82404,
            "y": 39.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "450",
            "name": "对偶",
            "symbolSize": 25,
            "x": -47.82404,
            "y": 40.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "451",
            "name": "排比",
            "symbolSize": 25,
            "x": -48.82404,
            "y": 41.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "452",
            "name": "设问",
            "symbolSize": 25,
            "x": -49.82404,
            "y": 42.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "453",
            "name": "反问",
            "symbolSize": 25,
            "x": -50.82404,
            "y": 43.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "454",
            "name": "借代",
            "symbolSize": 25,
            "x": -51.82404,
            "y": 44.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "455",
            "name": "通感",
            "symbolSize": 25,
            "x": -52.82404,
            "y": 45.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "456",
            "name": "反复",
            "symbolSize": 25,
            "x": -53.82404,
            "y": 46.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "457",
            "name": "反讽",
            "symbolSize": 25,
            "x": -54.82404,
            "y": 47.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "458",
            "name": "象征",
            "symbolSize": 25,
            "x": -55.82404,
            "y": 48.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "459",
            "name": "双关",
            "symbolSize": 25,
            "x": -56.82404,
            "y": 49.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "460",
            "name": "顶真",
            "symbolSize": 25,
            "x": -57.82404,
            "y": 50.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "461",
            "name": "引用",
            "symbolSize": 25,
            "x": -58.82404,
            "y": 51.26283,
            "value": 25,
            "category": 0
          },
          {
            "id": "462",
            "name": "明喻",
            "symbolSize": 20,
            "x": -59.82404,
            "y": 52.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "463",
            "name": "暗喻",
            "symbolSize": 20,
            "x": -60.82404,
            "y": 53.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "464",
            "name": "隐喻",
            "symbolSize": 20,
            "x": -61.82404,
            "y": 54.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "465",
            "name": "比拟",
            "symbolSize": 20,
            "x": -62.82404,
            "y": 55.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "466",
            "name": "正对偶",
            "symbolSize": 20,
            "x": -63.82404,
            "y": 56.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "467",
            "name": "反对偶",
            "symbolSize": 20,
            "x": -64.82404,
            "y": 57.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "468",
            "name": "串对偶",
            "symbolSize": 20,
            "x": -65.82404,
            "y": 58.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "469",
            "name": "成分排比",
            "symbolSize": 20,
            "x": -66.82404,
            "y": 59.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "470",
            "name": "句子排比",
            "symbolSize": 20,
            "x": -67.82404,
            "y": 60.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "471",
            "name": "部分代整体",
            "symbolSize": 20,
            "x": -68.82404,
            "y": 61.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "472",
            "name": "特征代整体",
            "symbolSize": 20,
            "x": -69.82404,
            "y": 62.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "473",
            "name": "具体代抽象",
            "symbolSize": 20,
            "x": -70.82404,
            "y": 63.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "474",
            "name": "听觉到视觉",
            "symbolSize": 20,
            "x": -71.82404,
            "y": 64.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "475",
            "name": "听觉到味觉",
            "symbolSize": 20,
            "x": -72.82404,
            "y": 65.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "476",
            "name": "视觉到味觉",
            "symbolSize": 20,
            "x": -73.82404,
            "y": 66.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "477",
            "name": "视觉到听觉",
            "symbolSize": 20,
            "x": -74.82404,
            "y": 67.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "478",
            "name": "谐意双关",
            "symbolSize": 20,
            "x": -75.82404,
            "y": 68.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "479",
            "name": "语义双关",
            "symbolSize": 20,
            "x": -76.82404,
            "y": 69.26283,
            "value": 20,
            "category": 0
          },
          {
            "id": "480",
            "name": "双宾句",
            "symbolSize": 31,
            "x": -77.82404,
            "y": 70.26283,
            "value": 31,
            "category": 8
          },
          {
            "id": "481",
            "name": "给予类双宾句",
            "symbolSize": 25,
            "x": -78.82404,
            "y": 71.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "482",
            "name": "取得类双宾句",
            "symbolSize": 25,
            "x": -79.82404,
            "y": 72.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "483",
            "name": "告知类双宾句",
            "symbolSize": 25,
            "x": -80.82404,
            "y": 73.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "484",
            "name": "连动句",
            "symbolSize": 31,
            "x": -81.82404,
            "y": 74.26283,
            "value": 31,
            "category": 8
          },
          {
            "id": "485",
            "name": "目的连动句",
            "symbolSize": 25,
            "x": -82.82404,
            "y": 75.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "486",
            "name": "方式连动句",
            "symbolSize": 25,
            "x": -83.82404,
            "y": 76.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "487",
            "name": "因果连动句",
            "symbolSize": 25,
            "x": -84.82404,
            "y": 77.26283,
            "value": 25,
            "category": 8
          },
          {
            "id": "488",
            "name": "并列关系连词",
            "symbolSize": 20,
            "x": -85.82404,
            "y": 78.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "489",
            "name": "承接关系连词",
            "symbolSize": 20,
            "x": -86.82404,
            "y": 79.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "490",
            "name": "转折关系连词",
            "symbolSize": 20,
            "x": -87.82404,
            "y": 80.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "491",
            "name": "因果关系连词",
            "symbolSize": 20,
            "x": -88.82404,
            "y": 81.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "492",
            "name": "选择关系连词",
            "symbolSize": 20,
            "x": -89.82404,
            "y": 82.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "493",
            "name": "假设关系连词",
            "symbolSize": 20,
            "x": -90.82404,
            "y": 83.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "494",
            "name": "让步关系连词",
            "symbolSize": 20,
            "x": -91.82404,
            "y": 84.26283,
            "value": 20,
            "category": 7
          },
          {
            "id": "495",
            "name": "受动关系",
            "symbolSize": 25,
            "x": -92.82404,
            "y": 85.26283,
            "value": 25,
            "category": 7
          },
          {
            "id": "496",
            "name": "使动关系",
            "symbolSize": 25,
            "x": -93.82404,
            "y": 86.26283,
            "value": 25,
            "category": 7
          },
          {
            "id": "497",
            "name": "为动关系",
            "symbolSize": 25,
            "x": -94.82404,
            "y": 87.26283,
            "value": 25,
            "category": 7
          },
          {
            "id": "498",
            "name": "并列主语",
            "symbolSize": 31,
            "x": -95.82404,
            "y": 88.26283,
            "value": 31,
            "category": 3
          },
          {
            "id": "499",
            "name": "并列宾语",
            "symbolSize": 31,
            "x": -96.82404,
            "y": 89.26283,
            "value": 31,
            "category": 3
          },
          {
            "id": "500",
            "name": "并列谓语",
            "symbolSize": 31,
            "x": -97.82404,
            "y": 90.26283,
            "value": 31,
            "category": 3
          },
        ],
        "links": [

          {
            "source": "0",
            "target": "2",
            "value" : "包含"
          },
          {
            "source": "0",
            "target": "3",
            "value" : "属于"
          },
          {
            "source": "1",
            "target": "0",
            "value" : "组成",
          },
          {
            "source": "1",
            "target": "2",
            "value" : "包含"
          },
          {
            "source": "1",
            "target": "50",
            "value" : "关联"
          },
          {
            "source": "1",
            "target": "51",
            "value" : "关联"
          },
          {
            "source": "1",
            "target": "114",
            "value" : "组成部分"
          },
          {
            "source": "1",
            "target": "115",
            "value" : "组成部分"
          },
          {
            "source": "0",
            "target": "4",
            "value" : "包含"
          },
          {
            "source": "0",
            "value" : "包含",
            "target": "5"
          },
          {
            "value" : "包含",
            "source": "1",
            "target": "4"
          },
          {
            "value" : "构成",
            "source": "1",
            "target": "6"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "10"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "19"
          },
          {
            "source": "3",
            "value" : "包含",
            "target": "65"
          },
          {
            "source": "3",
            "value" : "包含",
            "target": "76"
          },
          {
            "source": "3",
            "value" : "体现",
            "target": "88"
          },
          {
            "value" : "属于",
            "source": "3",
            "target": "101"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "109"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "272"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "280"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "290"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "294"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "325"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "326"
          },
          {
            "value" : "包含",
            "source": "3",
            "target": "445"
          },
          {
            "value" : "属于",
            "source": "4",
            "target": "1"
          },
          {
            "value" : "组成",
            "source": "4",
            "target": "5"
          },

          {
            "value" : "包含",
            "source": "6",
            "target": "7"
          },
          {
            "value" : "包含",
            "source": "6",
            "target": "8"
          },
          {
            "value" : "包含",
            "source": "6",
            "target": "9"
          },
          {
            "value" : "关联",
            "source": "6",
            "target": "51"
          },
          {
            "value" : "构成",
            "source": "6",
            "target": "52"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "11"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "12"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "13"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "14"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "62"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "63"
          },
          {
            "value" : "反映",
            "source": "10",
            "target": "53"
          },
          {
            "value" : "影响",
            "source": "10",
            "target": "60"
          },
          {
            "value" : "始于",
            "source": "10",
            "target": "119"
          },
          {
            "value" : "历经",
            "source": "10",
            "target": "179"
          },
          {
            "value" : "历经",
            "source": "10",
            "target": "180"
          },
          {
            "value" : "呈现方式",
            "source": "11",
            "target": "60"
          },
          {
            "value" : "属于",
            "source": "12",
            "target": "60"
          },
          {
            "value" : "不同程度",
            "source": "12",
            "target": "132"
          },
          {
            "value" : "不同程度",
            "source": "12",
            "target": "133"
          },
          {
            "value" : "不同对象",
            "source": "12",
            "target": "134"
          },
          {
            "value" : "不同对象",
            "source": "12",
            "target": "135"
          },
          {
            "value" : "不同对象",
            "source": "12",
            "target": "136"
          },
          {
            "value" : "属于",
            "source": "13",
            "target": "60"
          },
          {
            "value" : "不同符号性质",
            "source": "13",
            "target": "137"
          },
          {
            "value" : "不同符号性质",
            "source": "13",
            "target": "138"
          },
          {
            "value" : "不同符号位置",
            "source": "13",
            "target": "139"
          },
          {
            "value" : "不同符号位置",
            "source": "13",
            "target": "140"
          },
          {
            "value" : "属于",
            "source": "14",
            "target": "60"
          },
          {
            "value" : "不同结构",
            "source": "14",
            "target": "141"
          },
          {
            "value" : "不同结构",
            "source": "14",
            "target": "142"
          },
          {
            "value" : "不同意义",
            "source": "14",
            "target": "143"
          },
          {
            "value" : "不同意义",
            "source": "14",
            "target": "144"
          },
          {
            "value" : "影响",
            "source": "15",
            "target": "11"
          },
          {
            "value" : "属于",
            "source": "15",
            "target": "60"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "145"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "146"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "147"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "148"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "149"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "150"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "161"
          },
          {
            "value" : "包含",
            "source": "15",
            "target": "162"
          },
          {
            "value" : "源于",
            "source": "16",
            "target": "12"
          },
          {
            "value" : "源于",
            "source": "17",
            "target": "13"
          },

          {
            "value" : "使用",
            "source": "17",
            "target": "18"
          },
          {
            "value" : "包含",
            "source": "17",
            "target": "151"
          },
          {
            "value" : "包含",
            "source": "17",
            "target": "152"
          },
          {
            "value" : "包含",
            "source": "17",
            "target": "153"
          },
          {
            "value" : "包含",
            "source": "17",
            "target": "154"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "20"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "25"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "27"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "41"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "42"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "64"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "67"
          },
          {
            "value" : "包含",
            "source": "19",
            "target": "266"
          },
          {
            "value" : "组成部分",
            "source": "20",
            "target": "21"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "185"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "186"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "187"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "188"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "189"
          },
          {
            "value" : "分类",
            "source": "20",
            "target": "190"
          },
          {
            "value" : "特殊",
            "source": "20",
            "target": "253"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "22"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "23"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "24"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "69"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "70"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "71"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "72"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "73"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "74"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "75"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "218"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "219"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "220"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "221"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "222"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "223"
          },
          {
            "value" : "按含义分",
            "source": "23",
            "target": "260"
          },
          {
            "value" : "按含义分",
            "source": "23",
            "target": "261"
          },
          {
            "value" : "按含义分",
            "source": "23",
            "target": "262"
          },
          {
            "value" : "按用途分",
            "source": "23",
            "target": "263"
          },
          {
            "value" : "按用途分",
            "source": "23",
            "target": "264"
          },
          {
            "value" : "按用途分",
            "source": "23",
            "target": "265"
          },
          {
            "value" : "组成部分",
            "source": "25",
            "target": "21"
          },
          {
            "value" : "组成部分",
            "source": "42",
            "target": "21"
          },
          {
            "value" : "存在于",
            "source": "25",
            "target": "20"
          },
          {
            "value" : "存在于",
            "source": "25",
            "target": "27"
          },
          {
            "value" : "存在于",
            "source": "25",
            "target": "41"
          },
          {
            "value" : "复合",
            "source": "26",
            "target": "66"
          },
          {
            "value" : "包含",
            "source": "26",
            "target": "234"
          },
          {
            "value" : "包含",
            "source": "26",
            "target": "235"
          },
          {
            "value" : "包含",
            "source": "26",
            "target": "236"
          },
          {
            "value" : "特殊",
            "source": "27",
            "target": "252"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "10"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "11"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "12"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "13"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "14"
          },
          {
            "value" : "关联",
            "source": "28",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "29",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "29",
            "target": "0"
          },
          {
            "value" : "关联",
            "source": "29",
            "target": "1"
          },
          {
            "value" : "关联",
            "source": "29",
            "target": "4"
          },
          {
            "value" : "关联",
            "source": "30",
            "target": "21"
          },
          {
            "value" : "关联",
            "source": "30",
            "target": "22"
          },
          {
            "value" : "关联",
            "source": "30",
            "target": "23"
          },
          {
            "value" : "关联",
            "source": "30",
            "target": "24"
          },
          {
            "value" : "关联",
            "source": "30",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "10"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "11"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "12"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "13"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "14"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "15"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "16"
          },
          {
            "value" : "关联",
            "source": "31",
            "target": "17"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "0"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "1"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "2"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "4"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "5"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "6"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "7"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "8"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "9"
          },
          {
            "value" : "关联",
            "source": "32",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "3"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "20"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "21"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "22"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "23"
          },
          {
            "value" : "关联",
            "source": "33",
            "target": "24"
          },
          {
            "value" : "特殊",
            "source": "1",
            "target": "35"
          },
          {
            "value" : "属于",
            "source": "1",
            "target": "36"
          },
          {
            "value" : "组成",
            "source": "1",
            "target": "37"
          },
          {
            "value" : "遵循",
            "source": "36",
            "target": "39"
          },
          {
            "value" : "属于",
            "source": "40",
            "target": "36"
          },
          {
            "value" : "影响",
            "source": "0",
            "target": "40"
          },
          {
            "value" : "包含",
            "source": "37",
            "target": "38"
          },
          {
            "value" : "包含",
            "source": "37",
            "target": "47"
          },
          {
            "value" : "包含",
            "source": "37",
            "target": "48"
          },
          {
            "value" : "包含",
            "source": "37",
            "target": "49"
          },
          {
            "value" : "可组成",
            "source": "41",
            "target": "21"
          },
          {
            "value" : "分类",
            "source": "41",
            "target": "191"
          },
          {
            "value" : "分类",
            "source": "41",
            "target": "192"
          },
          {
            "value" : "分类",
            "source": "41",
            "target": "193"
          },
          {
            "value" : "分类",
            "source": "41",
            "target": "194"
          },
          {
            "value" : "分类",
            "source": "41",
            "target": "195"
          },
          {
            "value" : "特殊",
            "source": "43",
            "target": "24"
          },
          {
            "value" : "特殊",
            "source": "43",
            "target": "44"
          },

          {
            "value" : "体现",
            "source": "22",
            "target": "45"
          },
          {
            "value" : "包含",
            "source": "21",
            "target": "46"
          },
          {
            "value" : "包括",
            "source": "35",
            "target": "34"
          },
          {
            "value" : "属于",
            "source": "45",
            "target": "280"
          },
          {
            "value" : "包括",
            "source": "47",
            "target": "102"
          },
          {
            "value" : "包括",
            "source": "47",
            "target": "103"
          },
          {
            "value" : "包括",
            "source": "47",
            "target": "104"
          },
          {
            "value" : "包括",
            "source": "47",
            "target": "105"
          },
          {
            "value" : "包括",
            "source": "49",
            "target": "106"
          },
          {
            "value" : "包括",
            "source": "49",
            "target": "107"
          },
          {
            "value" : "包括",
            "source": "49",
            "target": "108"
          },
          {
            "value" : "组成",
            "source": "52",
            "target": "5"
          },
          {
            "value" : "关联",
            "source": "53",
            "target": "31"
          },
          {
            "value" : "关联",
            "source": "53",
            "target": "28"
          },
          {
            "value" : "包含",
            "source": "53",
            "target": "19"
          },
          {
            "value" : "包含",
            "source": "53",
            "target": "54"
          },
          {
            "value" : "属于",
            "source": "55",
            "target": "54"
          },
          {
            "value" : "包含",
            "source": "54",
            "target": "155"
          },
          {
            "value" : "包含",
            "source": "54",
            "target": "156"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "120"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "121"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "122"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "123"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "124"
          },
          {
            "value" : "基本笔画",
            "source": "55",
            "target": "125"
          },
          {
            "value" : "属于",
            "source": "56",
            "target": "54"
          },
          {
            "value" : "属于",
            "source": "57",
            "target": "54"
          },
          {
            "value" : "结构",
            "source": "57",
            "target": "175"
          },
          {
            "value" : "结构",
            "source": "57",
            "target": "176"
          },
          {
            "value" : "结构",
            "source": "57",
            "target": "177"
          },
          {
            "value" : "结构",
            "source": "57",
            "target": "178"
          },
          {
            "value" : "变化形式",
            "source": "57",
            "target": "179"
          },
          {
            "value" : "变化形式",
            "source": "57",
            "target": "180"
          },
          {
            "value" : "属于",
            "source": "58",
            "target": "54"
          },
          {
            "value" : "遵循",
            "source": "58",
            "target": "61"
          },
          {
            "value" : "基本规则",
            "source": "58",
            "target": "181"
          },
          {
            "value" : "基本规则",
            "source": "58",
            "target": "182"
          },
          {
            "value" : "基本规则",
            "source": "58",
            "target": "183"
          },
          {
            "value" : "基本规则",
            "source": "58",
            "target": "184"
          },
          {
            "value" : "属于",
            "source": "59",
            "target": "54"
          },
          {
            "value" : "属于",
            "source": "59",
            "target": "54"
          },
          {
            "value" : "存在于",
            "source": "62",
            "target": "0"
          },
          {
            "value" : "属于",
            "source": "62",
            "target": "37"
          },
          {
            "value" : "存在于",
            "source": "63",
            "target": "0"
          },
          {
            "value" : "属于",
            "source": "63",
            "target": "37"
          },
          {
            "value" : "相反",
            "source": "64",
            "target": "25"
          },
          {
            "value" : "存在于",
            "source": "64",
            "target": "20"
          },
          {
            "value" : "存在于",
            "source": "64",
            "target": "27"
          },
          {
            "value" : "存在于",
            "source": "64",
            "target": "41"
          },
          {
            "value" : "包含",
            "source": "65",
            "target": "26"
          },
          {
            "value" : "包含",
            "source": "65",
            "target": "66"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "224"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "225"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "226"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "227"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "228"
          },
          {
            "value" : "构造方式",
            "source": "65",
            "target": "229"
          },
          {
            "value" : "属于",
            "source": "68",
            "target": "21"
          },
          {
            "value" : "按意义分",
            "source": "68",
            "target": "254"
          },
          {
            "value" : "按意义分",
            "source": "68",
            "target": "255"
          },
          {
            "value" : "按意义分",
            "source": "68",
            "target": "256"
          },
          {
            "value" : "按用途分",
            "source": "68",
            "target": "257"
          },
          {
            "value" : "按用途分",
            "source": "68",
            "target": "258"
          },
          {
            "value" : "按用途分",
            "source": "68",
            "target": "259"
          },
          {
            "value" : "属于",
            "source": "74",
            "target": "42"
          },
          {
            "value" : "属于",
            "source": "77",
            "target": "76"
          },
          {
            "value" : "属于",
            "source": "77",
            "target": "76"
          },
          {
            "value" : "组成部分",
            "source": "77",
            "target": "78"
          },
          {
            "value" : "受限",
            "source": "77",
            "target": "79"
          },
          {
            "value" : "受限",
            "source": "77",
            "target": "79"
          },
          {
            "value" : "特殊",
            "source": "77",
            "target": "82"
          },
          {
            "value" : "特殊",
            "source": "77",
            "target": "83"
          },
          {
            "value" : "特殊",
            "source": "77",
            "target": "84"
          },
          {
            "value" : "属于",
            "source": "85",
            "target": "76"
          },
          {
            "value" : "组成部分",
            "source": "85",
            "target": "80"
          },
          {
            "value" : "受限",
            "source": "85",
            "target": "81"
          },
          {
            "value" : "属于",
            "source": "86",
            "target": "76"
          },
          {
            "value" : "属于",
            "source": "87",
            "target": "76"
          },
          {
            "value" : "源于",
            "source": "88",
            "target": "89"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "91"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "92"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "93"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "94"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "95"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "97"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "98"
          },
          {
            "value" : "包含",
            "source": "88",
            "target": "99"
          },
          {
            "value" : "组成部分",
            "source": "89",
            "target": "119"
          },
          {
            "value" : "始于",
            "source": "90",
            "target": "89"
          },
          {
            "value" : "不同地域",
            "source": "90",
            "target": "354"
          },
          {
            "value" : "不同地域",
            "source": "90",
            "target": "355"
          },
          {
            "value" : "不同地域",
            "source": "90",
            "target": "356"
          },
          {
            "value" : "不同地域",
            "source": "90",
            "target": "357"
          },
          {
            "value" : "包含",
            "source": "91",
            "target": "358"
          },
          {
            "value" : "包含",
            "source": "91",
            "target": "359"
          },
          {
            "value" : "包含",
            "source": "91",
            "target": "360"
          },
          {
            "value" : "包含",
            "source": "91",
            "target": "361"
          },
          {
            "value" : "特征",
            "source": "92",
            "target": "369"
          },
          {
            "value" : "反映",
            "source": "93",
            "target": "90"
          },
          {
            "value" : "语言特征",
            "source": "95",
            "target": "395"
          },
          {
            "value" : "宗教特征",
            "source": "95",
            "target": "396"
          },
          {
            "value" : "体现",
            "source": "96",
            "target": "88"
          },
          {
            "value" : "包括",
            "source": "96",
            "target": "407"
          },
          {
            "value" : "包括",
            "source": "96",
            "target": "408"
          },
          {
            "value" : "包括",
            "source": "96",
            "target": "409"
          },
          {
            "value" : "体现",
            "source": "100",
            "target": "99"
          },
          {
            "value" : "基本部分",
            "source": "109",
            "target": "110"
          },
          {
            "value" : "基本部分",
            "source": "109",
            "target": "111"
          },
          {
            "value" : "基本部分",
            "source": "109",
            "target": "112"
          },
          {
            "value" : "基本部分",
            "source": "109",
            "target": "113"
          },
          {
            "value" : "属于",
            "source": "116",
            "target": "53"
          },
          {
            "value" : "属于",
            "source": "117",
            "target": "53"
          },
          {
            "value" : "特殊",
            "source": "117",
            "target": "213"
          },
          {
            "value" : "属于",
            "source": "118",
            "target": "53"
          },
          {
            "value" : "体现",
            "source": "126",
            "target": "10"
          },
          {
            "value" : "属于",
            "source": "127",
            "target": "126"
          },
          {
            "value" : "属于",
            "source": "128",
            "target": "126"
          },
          {
            "value" : "属于",
            "source": "129",
            "target": "126"
          },
          {
            "value" : "属于",
            "source": "130",
            "target": "126"
          },
          {
            "value" : "属于",
            "source": "131",
            "target": "126"
          },
          {
            "value" : "子类",
            "source": "155",
            "target": "157"
          },
          {
            "value" : "子类",
            "source": "155",
            "target": "158"
          },
          {
            "value" : "子类",
            "source": "155",
            "target": "159"
          },
          {
            "value" : "子类",
            "source": "155",
            "target": "160"
          },
          {
            "value" : "属于",
            "source": "163",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "164",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "165",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "166",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "167",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "168",
            "target": "55"
          },
          {
            "value" : "属于",
            "source": "169",
            "target": "56"
          },
          {
            "value" : "对立",
            "source": "169",
            "target": "170"
          },
          {
            "value" : "属于",
            "source": "170",
            "target": "56"
          },
          {
            "value" : "属于",
            "source": "171",
            "target": "56"
          },
          {
            "value" : "组合",
            "source": "171",
            "target": "172"
          },
          {
            "value" : "属于",
            "source": "172",
            "target": "56"
          },
          {
            "value" : "属于",
            "source": "173",
            "target": "56"
          },
          {
            "value" : "属于",
            "source": "174",
            "target": "56"
          },
          {
            "value" : "特殊",
            "source": "174",
            "target": "173"
          },
          {
            "value" : "对立",
            "source": "185",
            "target": "186"
          },
          {
            "value" : "对立",
            "source": "187",
            "target": "188"
          },
          {
            "value" : "特殊",
            "source": "189",
            "target": "190"
          },
          {
            "value" : "相反",
            "source": "191",
            "target": "192"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "196"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "197"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "198"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "199"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "200"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "201"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "202"
          },
          {
            "value" : "时态",
            "source": "191",
            "target": "203"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "196"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "197"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "198"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "199"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "200"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "201"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "202"
          },
          {
            "value" : "时态",
            "source": "192",
            "target": "203"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "196"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "197"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "198"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "199"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "200"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "201"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "202"
          },
          {
            "value" : "时态",
            "source": "193",
            "target": "203"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "196"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "197"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "198"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "199"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "200"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "201"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "202"
          },
          {
            "value" : "时态",
            "source": "194",
            "target": "203"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "196"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "197"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "198"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "199"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "200"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "201"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "202"
          },
          {
            "value" : "时态",
            "source": "195",
            "target": "203"
          },
          {
            "value" : "属于",
            "source": "204",
            "target": "27"
          },
          {
            "value" : "属于",
            "source": "205",
            "target": "27"
          },
          {
            "value" : "属于",
            "source": "206",
            "target": "27"
          },
          {
            "value" : "属于",
            "source": "207",
            "target": "27"
          },
          {
            "value" : "特殊",
            "source": "207",
            "target": "206"
          },
          {
            "value" : "属于",
            "source": "208",
            "target": "27"
          },
          {
            "value" : "属于",
            "source": "209",
            "target": "27"
          },
          {
            "value" : "相反",
            "source": "209",
            "target": "208"
          },
          {
            "value" : "属于",
            "source": "210",
            "target": "42"
          },
          {
            "value" : "属于",
            "source": "211",
            "target": "42"
          },
          {
            "value" : "特殊",
            "source": "211",
            "target": "210"
          },
          {
            "value" : "包含",
            "source": "211",
            "target": "238"
          },
          {
            "value" : "属于",
            "source": "212",
            "target": "42"
          },
          {
            "value" : "包含",
            "source": "213",
            "target": "214"
          },
          {
            "value" : "包含",
            "source": "213",
            "target": "215"
          },
          {
            "value" : "包含",
            "source": "213",
            "target": "216"
          },
          {
            "value" : "包含",
            "source": "213",
            "target": "217"
          },
          {
            "value" : "特殊",
            "source": "215",
            "target": "214"
          },
          {
            "value" : "相反",
            "source": "216",
            "target": "217"
          },
          {
            "value" : "包含",
            "source": "218",
            "target": "20"
          },
          {
            "value" : "包含",
            "source": "219",
            "target": "41"
          },
          {
            "value" : "包含",
            "source": "220",
            "target": "27"
          },
          {
            "value" : "包含",
            "source": "222",
            "target": "239"
          },
          {
            "value" : "包含",
            "source": "224",
            "target": "22"
          },
          {
            "value" : "特性",
            "source": "224",
            "target": "230"
          },
          {
            "value" : "特性",
            "source": "224",
            "target": "231"
          },
          {
            "value" : "包含",
            "source": "225",
            "target": "24"
          },
          {
            "value" : "特性",
            "source": "225",
            "target": "232"
          },
          {
            "value" : "特性",
            "source": "225",
            "target": "233"
          },
          {
            "value" : "包含",
            "source": "226",
            "target": "69"
          },
          {
            "value" : "包含",
            "source": "228",
            "target": "498"
          },
          {
            "value" : "包含",
            "source": "228",
            "target": "499"
          },
          {
            "value" : "包含",
            "source": "228",
            "target": "500"
          },
          {
            "value" : "特殊",
            "source": "235",
            "target": "234"
          },
          {
            "value" : "特殊",
            "source": "236",
            "target": "234"
          },
          {
            "value" : "特殊",
            "source": "236",
            "target": "235"
          },
          {
            "value" : "属于",
            "source": "237",
            "target": "67"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "241"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "242"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "243"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "244"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "245"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "246"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "247"
          },
          {
            "value" : "包含",
            "source": "237",
            "target": "248"
          },
          {
            "value" : "属于",
            "source": "238",
            "target": "67"
          },
          {
            "value" : "属于",
            "source": "239",
            "target": "67"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "488"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "489"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "490"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "491"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "492"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "493"
          },
          {
            "value" : "包含",
            "source": "239",
            "target": "494"
          },
          {
            "value" : "属于",
            "source": "240",
            "target": "67"
          },
          {
            "value" : "包含",
            "source": "241",
            "target": "249"
          },
          {
            "value" : "包含",
            "source": "241",
            "target": "250"
          },
          {
            "value" : "包含",
            "source": "241",
            "target": "251"
          },
          {
            "value" : "属于",
            "source": "252",
            "target": "242"
          },
          {
            "value" : "属于",
            "source": "253",
            "target": "20"
          },
          {
            "value" : "按词性分",
            "source": "266",
            "target": "269"
          },
          {
            "value" : "按词性分",
            "source": "266",
            "target": "270"
          },
          {
            "value" : "按词性分",
            "source": "266",
            "target": "271"
          },
          {
            "value" : "属于",
            "source": "267",
            "target": "266"
          },
          {
            "value" : "属于",
            "source": "268",
            "target": "266"
          },
          {
            "value" : "特殊",
            "source": "268",
            "target": "267"
          },
          {
            "value" : "包含",
            "source": "272",
            "target": "278"
          },
          {
            "value" : "包含",
            "source": "272",
            "target": "279"
          },
          {
            "value" : "包含",
            "source": "276",
            "target": "321"
          },
          {
            "value" : "包含",
            "source": "276",
            "target": "322"
          },
          {
            "value" : "包含",
            "source": "278",
            "target": "273"
          },
          {
            "value" : "包含",
            "source": "278",
            "target": "274"
          },
          {
            "value" : "包含",
            "source": "278",
            "target": "275"
          },
          {
            "value" : "包含",
            "source": "278",
            "target": "276"
          },
          {
            "value" : "包含",
            "source": "278",
            "target": "277"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "281"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "282"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "283"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "284"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "285"
          },
          {
            "value" : "包含",
            "source": "280",
            "target": "286"
          },
          {
            "value" : "相反",
            "source": "281",
            "target": "282"
          },
          {
            "value" : "属于",
            "source": "287",
            "target": "282"
          },
          {
            "value" : "属于",
            "source": "288",
            "target": "282"
          },
          {
            "value" : "属于",
            "source": "289",
            "target": "280"
          },
          {
            "value" : "包含",
            "source": "290",
            "target": "291"
          },
          {
            "value" : "包含",
            "source": "290",
            "target": "292"
          },
          {
            "value" : "包含",
            "source": "290",
            "target": "293"
          },
          {
            "value" : "相对",
            "source": "291",
            "target": "292"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "295"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "296"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "297"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "298"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "299"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "300"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "301"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "302"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "303"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "304"
          },
          {
            "value" : "包含",
            "source": "294",
            "target": "305"
          },
          {
            "value" : "包含",
            "source": "297",
            "target": "306"
          },
          {
            "value" : "包含",
            "source": "297",
            "target": "307"
          },
          {
            "value" : "包含",
            "source": "297",
            "target": "308"
          },
          {
            "value" : "包含",
            "source": "297",
            "target": "309"
          },
          {
            "value" : "包含",
            "source": "298",
            "target": "310"
          },
          {
            "value" : "包含",
            "source": "298",
            "target": "311"
          },
          {
            "value" : "包含",
            "source": "298",
            "target": "312"
          },
          {
            "value" : "相对",
            "source": "311",
            "target": "312"
          },
          {
            "value" : "包含",
            "source": "299",
            "target": "313"
          },
          {
            "value" : "包含",
            "source": "299",
            "target": "314"
          },
          {
            "value" : "相对",
            "source": "313",
            "target": "314"
          },
          {
            "value" : "包含",
            "source": "300",
            "target": "315"
          },
          {
            "value" : "包含",
            "source": "300",
            "target": "316"
          },
          {
            "value" : "相对",
            "source": "315",
            "target": "316"
          },
          {
            "value" : "属于",
            "source": "317",
            "target": "272"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "273"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "275"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "276"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "277"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "318"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "319"
          },
          {
            "value" : "包含",
            "source": "317",
            "target": "320"
          },
          {
            "value" : "包含",
            "source": "318",
            "target": "323"
          },
          {
            "value" : "包含",
            "source": "318",
            "target": "324"
          },
          {
            "value" : "属于",
            "source": "327",
            "target": "325"
          },
          {
            "value" : "属于",
            "source": "328",
            "target": "325"
          },
          {
            "value" : "特殊",
            "source": "328",
            "target": "327"
          },
          {
            "value" : "包含",
            "source": "327",
            "target": "330"
          },
          {
            "value" : "属于",
            "source": "329",
            "target": "326"
          },
          {
            "value" : "包含",
            "source": "329",
            "target": "331"
          },
          {
            "value" : "包含",
            "source": "329",
            "target": "332"
          },
          {
            "value" : "包含",
            "source": "329",
            "target": "333"
          },
          {
            "value" : "包含",
            "source": "330",
            "target": "334"
          },
          {
            "value" : "包含",
            "source": "330",
            "target": "335"
          },
          {
            "value" : "包含",
            "source": "330",
            "target": "336"
          },
          {
            "value" : "包含",
            "source": "330",
            "target": "337"
          },
          {
            "value" : "包含",
            "source": "330",
            "target": "338"
          },
          {
            "value" : "包含",
            "source": "326",
            "target": "339"
          },
          {
            "value" : "包含",
            "source": "326",
            "target": "340"
          },
          {
            "value" : "包含",
            "source": "326",
            "target": "341"
          },
          {
            "value" : "包含",
            "source": "326",
            "target": "342"
          },
          {
            "value" : "包含",
            "source": "339",
            "target": "343"
          },
          {
            "value" : "包含",
            "source": "339",
            "target": "344"
          },
          {
            "value" : "不同提问方式",
            "source": "340",
            "target": "345"
          },
          {
            "value" : "不同提问方式",
            "source": "340",
            "target": "346"
          },
          {
            "value" : "不同提问方式",
            "source": "340",
            "target": "347"
          },
          {
            "value" : "不同提问方式",
            "source": "340",
            "target": "348"
          },
          {
            "value" : "不同语气",
            "source": "342",
            "target": "349"
          },
          {
            "value" : "不同语气",
            "source": "342",
            "target": "350"
          },
          {
            "value" : "不同语气",
            "source": "342",
            "target": "351"
          },
          {
            "value" : "不同语气",
            "source": "342",
            "target": "352"
          },
          {
            "value" : "属于",
            "source": "348",
            "target": "453"
          },
          {
            "value" : "属于",
            "source": "353",
            "target": "76"
          },
          {
            "value" : "影响",
            "source": "362",
            "target": "92"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "363"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "364"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "365"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "366"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "367"
          },
          {
            "value" : "不同阶段",
            "source": "362",
            "target": "368"
          },
          {
            "value" : "包含",
            "source": "369",
            "target": "370"
          },
          {
            "value" : "包含",
            "source": "369",
            "target": "371"
          },
          {
            "value" : "包含",
            "source": "369",
            "target": "372"
          },
          {
            "value" : "包含",
            "source": "369",
            "target": "373"
          },
          {
            "value" : "包含",
            "source": "369",
            "target": "374"
          },
          {
            "value" : "属于",
            "source": "375",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "376",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "377",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "378",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "379",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "380",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "381",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "382",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "383",
            "target": "94"
          },
          {
            "value" : "属于",
            "source": "384",
            "target": "94"
          },
          {
            "value" : "包含",
            "source": "375",
            "target": "385"
          },
          {
            "value" : "包含",
            "source": "375",
            "target": "386"
          },
          {
            "value" : "包含",
            "source": "375",
            "target": "387"
          },
          {
            "value" : "包含",
            "source": "375",
            "target": "388"
          },
          {
            "value" : "包含",
            "source": "376",
            "target": "389"
          },
          {
            "value" : "包含",
            "source": "376",
            "target": "390"
          },
          {
            "value" : "包含",
            "source": "377",
            "target": "391"
          },
          {
            "value" : "包含",
            "source": "378",
            "target": "392"
          },
          {
            "value" : "包含",
            "source": "379",
            "target": "393"
          },
          {
            "value" : "包含",
            "source": "379",
            "target": "394"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "397"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "398"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "399"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "400"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "401"
          },
          {
            "value" : "包含",
            "source": "395",
            "target": "402"
          },
          {
            "value" : "属于",
            "source": "403",
            "target": "396"
          },
          {
            "value" : "属于",
            "source": "404",
            "target": "396"
          },
          {
            "value" : "属于",
            "source": "405",
            "target": "396"
          },
          {
            "value" : "属于",
            "source": "406",
            "target": "396"
          },
          {
            "value" : "不同节日",
            "source": "407",
            "target": "410"
          },
          {
            "value" : "不同节日",
            "source": "407",
            "target": "411"
          },
          {
            "value" : "不同节日",
            "source": "407",
            "target": "412"
          },
          {
            "value" : "不同节日",
            "source": "407",
            "target": "413"
          },
          {
            "value" : "习俗",
            "source": "410",
            "target": "414"
          },
          {
            "value" : "习俗",
            "source": "410",
            "target": "415"
          },
          {
            "value" : "习俗",
            "source": "410",
            "target": "416"
          },
          {
            "value" : "习俗",
            "source": "411",
            "target": "417"
          },
          {
            "value" : "习俗",
            "source": "411",
            "target": "418"
          },
          {
            "value" : "习俗",
            "source": "412",
            "target": "419"
          },
          {
            "value" : "习俗",
            "source": "412",
            "target": "420"
          },
          {
            "value" : "习俗",
            "source": "413",
            "target": "421"
          },
          {
            "value" : "习俗",
            "source": "413",
            "target": "422"
          },
          {
            "value" : "包含",
            "source": "408",
            "target": "423"
          },
          {
            "value" : "包含",
            "source": "408",
            "target": "424"
          },
          {
            "value" : "包含",
            "source": "408",
            "target": "425"
          },
          {
            "value" : "包含",
            "source": "408",
            "target": "426"
          },
          {
            "value" : "包含",
            "source": "409",
            "target": "427"
          },
          {
            "value" : "包含",
            "source": "409",
            "target": "428"
          },
          {
            "value" : "包含",
            "source": "409",
            "target": "429"
          },
          {
            "value" : "包含",
            "source": "409",
            "target": "430"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "431"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "432"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "433"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "434"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "435"
          },
          {
            "value" : "包含",
            "source": "423",
            "target": "436"
          },
          {
            "value" : "属于",
            "source": "437",
            "target": "382"
          },
          {
            "value" : "属于",
            "source": "438",
            "target": "382"
          },
          {
            "value" : "属于",
            "source": "439",
            "target": "382"
          },
          {
            "value" : "属于",
            "source": "440",
            "target": "382"
          },
          {
            "value" : "包含",
            "source": "98",
            "target": "441"
          },
          {
            "value" : "包含",
            "source": "98",
            "target": "442"
          },
          {
            "value" : "包含",
            "source": "98",
            "target": "443"
          },
          {
            "value" : "包含",
            "source": "98",
            "target": "444"
          },
          {
            "value" : "语构文化",
            "source": "445",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "447",
            "target": "446"
          },
          {
            "value" : "包含",
            "source": "447",
            "target": "462"
          },
          {
            "value" : "包含",
            "source": "447",
            "target": "463"
          },
          {
            "value" : "包含",
            "source": "447",
            "target": "464"
          },
          {
            "value" : "包含",
            "source": "447",
            "target": "465"
          },
          {
            "value" : "属于",
            "source": "448",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "449",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "450",
            "target": "446"
          },
          {
            "value" : "包括",
            "source": "450",
            "target": "466"
          },
          {
            "value" : "包括",
            "source": "450",
            "target": "467"
          },
          {
            "value" : "包括",
            "source": "450",
            "target": "468"
          },
          {
            "value" : "属于",
            "source": "451",
            "target": "446"
          },
          {
            "value" : "包括",
            "source": "451",
            "target": "469"
          },
          {
            "value" : "包括",
            "source": "451",
            "target": "470"
          },
          {
            "value" : "属于",
            "source": "452",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "453",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "454",
            "target": "446"
          },
          {
            "value" : "运用方式",
            "source": "454",
            "target": "471"
          },
          {
            "value" : "运用方式",
            "source": "454",
            "target": "472"
          },
          {
            "value" : "运用方式",
            "source": "454",
            "target": "473"
          },
          {
            "value" : "属于",
            "source": "455",
            "target": "446"
          },
          {
            "value" : "类型",
            "source": "455",
            "target": "474"
          },
          {
            "value" : "类型",
            "source": "455",
            "target": "475"
          },
          {
            "value" : "类型",
            "source": "455",
            "target": "476"
          },
          {
            "value" : "类型",
            "source": "455",
            "target": "477"
          },
          {
            "value" : "属于",
            "source": "456",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "457",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "458",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "459",
            "target": "446"
          },
          {
            "value" : "包含",
            "source": "459",
            "target": "478"
          },
          {
            "value" : "包含",
            "source": "459",
            "target": "479"
          },
          {
            "value" : "属于",
            "source": "460",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "461",
            "target": "446"
          },
          {
            "value" : "属于",
            "source": "480",
            "target": "76"
          },
          {
            "value" : "包含",
            "source": "480",
            "target": "481"
          },
          {
            "value" : "包含",
            "source": "480",
            "target": "482"
          },
          {
            "value" : "包含",
            "source": "480",
            "target": "483"
          },
          {
            "value" : "属于",
            "source": "484",
            "target": "76"
          },
          {
            "value" : "包含",
            "source": "484",
            "target": "485"
          },
          {
            "value" : "包含",
            "source": "484",
            "target": "486"
          },
          {
            "value" : "包含",
            "source": "484",
            "target": "487"
          },
          {
            "value" : "属于",
            "source": "495",
            "target": "232"
          },
          {
            "value" : "属于",
            "source": "496",
            "target": "232"
          },
          {
            "value" : "属于",
            "source": "497",
            "target": "232"
          },
        ],
        "categories": [
          {
            "name": "中华文化"
          },
          {
            "name": "音节"
          },
          {
            "name": "汉字"
          },
          {
            "name": "短语"
          },
          {
            "name": "习题"
          },
          {
            "name": "文档"
          },
          {
            "name": "视频"
          },
          {
            "name": "词"
          },
          {
            "name": "句"
          },

        ]
      },
      searchLeft: "1300px",
      searchTop: "-200px",
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
    loadGraph() {
      let myChart = echarts.init(this.$refs.knowledgeChartRef);
      let option;
      const graph = this.test;
      graph.nodes.forEach(node => {
        node.label = {
          show: node.symbolSize > 30
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
            //name: '数据库系统概论',
            name: '对外汉语教育',
            type: 'graph',
            draggable: 'true',
            layout: 'force',
            force: {
              repulsion: 500
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
      myChart.on("click",(params) => {
        if(params.dataType === 'node'){
          this.relationSearch(params.data.name);
        }
      })
      // myChart.on('mouseup',(params) => {
      //   let option = myChart.getOption();
      //   option.series[0].data[params.dataIndex].x=params.event.offsetX;
      //   option.series[0].data[params.dataIndex].y=params.event.offsetY;
      //   option.series[0].data[params.dataIndex].fixed=true;
      //   myChart.setOption(option);
      // });
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
      this.searchTop = clientRect.y - 250 + "px"
      document.addEventListener("mousemove", this.moveChange)
      document.addEventListener("mouseup", this.stopMove)
      event.preventDefault()
    },
    moveChange(e) {
      if(!this.isInit) return
      this.searchLeft = e.clientX - 5 + "px"
      this.searchTop = e.clientY - 255 + "px"
    },
    stopMove() {
      this.isInit = false
      document.removeEventListener('mousemove', this.moveChange)
      document.removeEventListener('mouseup', this.stopMove)
    }
  },
};
</script>

<style scoped>
.container{
  width: 100%;
  height: calc(100vh - 60px);
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
  border-radius: 5px;
  overflow: hidden;
  background: #ecebeb;
  transform: translateY(50%);
  box-sizing: border-box;
  padding: 5px;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, .2);
  transition: 0.5s, left 0s, top 0s;
}
.search:hover{
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, .4);
}
.drag-operate {
  height: 5px;
  margin: 0 30% 10px;
  cursor: pointer;
  background-color: #4293fd;
  border-radius: 999px;
}
.search-answer{
  width: 100%;
  height: calc(100% - 55px);
  background: #ffffff;
  margin-top: 8px;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: scroll;
  border-radius: 3px;
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
  color: rgba(0, 0, 0, 0.7);
}
</style>
