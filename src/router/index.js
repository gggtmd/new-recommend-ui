import { createRouter, createWebHistory } from 'vue-router'
import RecommendDetail from "@/views/recommend/RecommendDetail.vue";

const router = createRouter({
  history: createWebHistory(),
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
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue'),
      redirect: '/recommend',
      children: [
        {
          path: '/recommend',
          name: 'recommend',
          component: () => import('@/views/recommend/Recommend.vue'),
          children: [
            {
              path: '/recommend/:resourceId',
              name: 'recommendDetail',
              component: RecommendDetail  //立即导入，防止初次加载卡顿
            },
          ]
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/Test.vue'),
          redirect: '/test/0',
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
          component: () => import('@/views/answer/Answer.vue')
        },
        {
          path: '/class',
          name: 'class',
          component: () => import('@/views/class/Class.vue')
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
