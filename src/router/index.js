import { createRouter, createWebHistory } from 'vue-router'

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
          component: () => import('@/views/recommend/Recommend.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/Test.vue')
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
