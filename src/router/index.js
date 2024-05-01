import {createRouter, createWebHashHistory} from 'vue-router'
import RecommendDetail from "@/views/recommend/RecommendDetail.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/personstyle',
      name: 'personStyle',
      component: () => import('@/views/personStyle/PersonStyle.vue')
    },
    {
      path: '/BigFivePersonality',
      name: 'BigFivePersonality',
      component: () => import('@/views/personStyle/BigFivePersonality.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home/Home.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/recommend/Recommend.vue'),
          children: [
            {
              path: '/home/:resourceId',
              name: 'recommendDetail',
              component: RecommendDetail  //立即导入，防止初次加载卡顿
            },
          ]
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/Test.vue'),
          children: [
            {
              path: '/test/:bankId',
              name: 'testList',
              component: () => import('@/views/test/TestList.vue'),
              children: [
                {
                  path: '/test/:bankId/:questionId',
                  name: 'question',
                  component: () => import('@/views/test/Question.vue')
                },
              ]
            },
          ]
        },
        {
          path: '/answer',
          name: 'answer',
          component: () => import('@/views/answer/Answer2.vue')
        },
        {
          path: '/hotAnswer',
          name: 'hotAnswer',
          component: () => import('@/views/answer/HotAnswer.vue')
        },
        {
          path: '/class',
          name: 'class',
          component: () => import('@/views/class/Class.vue')
        },
        {
          path: '/classWarningDiagnosis',
          name: 'classWarningDiagnosis',
          component: () => import('@/views/class/WarningDiagnosis.vue'),
          children: [
            {
              path: '/classWarningDiagnosis/:classId/:studentId:/:studentName',
              name: 'classWarningDiagnosisDetail',
              component: () => import('@/views/class/classWarningDiagnosisDetail.vue')
            }
          ]
        },
        {
          path: '/graph',
          name: 'graph',
          component: () => import('@/views/graph/Graph.vue')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/my/My.vue')
        },
      ]
    },
    {
      path: '/classinfo/:classId',
      name: 'classInfo',
      component: () => import('@/views/classInfo/ClassInfo.vue'),
      redirect: {name: "classDescription"},
      children: [
        {
          path: '/classinfo/:classId/classDescription',
          name: 'classDescription',
          component: () => import('@/views/classInfo/ClassDescription.vue')
        },
        {
          path: '/classinfo/:classId/classNotice',
          name: 'classNotice',
          component: () => import('@/views/classInfo/ClassNotice.vue')
        },
        {
          path: '/classinfo/:classId/classResource',
          name: 'classResource',
          component: () => import('@/views/classInfo/ClassResource.vue')
        },
        {
          path: '/classinfo/:classId/classStage',
          name: 'classStage',
          component: () => import('@/views/classInfo/ClassStage.vue')
        },
        {
          path: '/classinfo/:classId/classExam',
          name: 'classExam',
          component: () => import('@/views/classInfo/ClassExam.vue')
        },
        {
          path: '/classinfo/:classId/classPaper',
          name: 'classPaper',
          component: () => import('@/views/classInfo/ClassPaper.vue')
        },
        {
          path: '/classinfo/:classId/classStudent',
          name: 'classStudent',
          component: () => import('@/views/classInfo/ClassStudent.vue')
        },
        {
          path: '/classinfo/:classId/classGraph',
          name: 'classGraph',
          component: () => import('@/views/classInfo/ClassGraph.vue')
        },
        {
          path: '/classinfo/:classId/classInvestigation',
          name: 'investigation',
          component: () => import('@/views/classInfo/ClassInvestigation.vue')
        },
        {
          path: '/classinfo/:classId/classDiagnosis',
          name: 'classDiagnosis',
          component: () => import('@/views/classInfo/ClassDiagnosis.vue')
        },
      ]
    },
    {
      path: '/classKnowledge/:classId/:categoryId',
      name: 'classKnowledge',
      component: () => import('@/views/classKnowledge/ClassKnowledge.vue')
    },
    {
      path: '/examInfo/:examId',
      name: 'examInfo',
      component: () => import('@/views/examInfo/ExamInfo.vue')
    },
    {
      path: '/classPaperAdd/:classId/:paperId',
      name: 'classPaperAdd',
      component: () => import('@/views/classPaperAdd/classPaperAdd.vue')
    },
    {
      path: '/startExam/:classId/:examId/:paperId',
      name: 'startExam',
      component: () => import('@/views/startExam/StartExam.vue')
    },
    {
      path: '/dataPlatform/:classId',
      name: 'dataPlatform',
      component: () => import('@/views/dataPlatform/mainPlatform.vue'),
      children:[
        {
          path: '/dataPlatform/:classId/studentChartDetail/:studentId/:studentName',
          name:'studentChartDetail',
          component: () => import('@/views/dataPlatform/studentDetail/studentChartDetail.vue'),
        },
        {
          path: '/dataPlatform/:classId/styleScoreDetail/:time/:sliderData',
          name:'styleScoreDetail',
          component: () => import('@/views/dataPlatform/styleScore/styleScoreDetail.vue'),
        },
        {
          path: '/dataPlatform/:classId/studentEvaluationDetail/:stage/:score',
          name:'studentEvaluationDetail',
          component: () => import('@/views/dataPlatform/studentEvaluation/studentEvaluationDetail.vue'),
        },
        {
          path: '/dataPlatform/:classId/knowledgeStageStyleDetail/:stage',
          name:'knowledgeStageStyleDetail',
          component: () => import('@/views/dataPlatform/knowledgeStageStyle/knowledgeStageStyleDetail.vue'),
        },
      ]
    },
    {
      path: '/transferStation',
      name: 'transferStation',
      component: () => import('@/views/transferStation/TransferStation.vue')
    }
  ]
})

import { useTokenStore } from '@/stores/token'
import {usePersonStylePaperStore} from "@/stores/personStylePaper.js";
import {usePathStore} from "@/stores/path.js";

router.beforeEach((to, from) => {
  const tokenStore = useTokenStore()
  const personStylePaperStore = usePersonStylePaperStore()
  const pathStore = usePathStore()
  pathStore.setPath(to.path)
  if (
    // 检查用户是否已登录
    !tokenStore.token &&
    // 避免无限重定向
    to.name !== 'login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  } else if(
      // 检查用户是否填写风格测试
      !personStylePaperStore.personStylePaper &&
      to.name !== 'personStyle' &&
      to.name !== 'login'
  ) {
    return { name: 'personStyle' }
  }
})

export default router
