import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Framwork.vue'),
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('@/views/Framwork/DataAnalysis.vue')
        },
        {
          path: '/staticsInfo',
          name: 'staticsInfo',
          component: () => import('@/views/Framwork/StaticsInfo.vue')
        },
        {
          path: '/offsetRecord',
          name: 'offsetRecord',
          component: () => import('@/views/Framwork/OffsetRecord.vue')
        },
        {
          path: '/positionRecord',
          name: 'positionRecord',
          component: () => import('@/views/Framwork/PositionRecord.vue')
        },
        {
          path: '/matchRecord',
          name: 'matchRecord',
          component: () => import('@/views/Framwork/MatchRecord.vue')
        }
      ]
    },
  ]
})

export default router
