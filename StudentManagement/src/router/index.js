import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      component: () => import('../views/layout/LayoutContainer.vue'),
      children: [
        {
          path: 'total',
          component: () => import('../views/layout/LayoutTotal.vue')
        },
        {
          path: 'chinese',
          component: () => import('../views/layout/LayoutChinese.vue')
        },
        {
          path: 'math',
          component: () => import('../views/layout/LayoutMath.vue')
        },
        {
          path: 'english',
          component: () => import('../views/layout/LayoutEnglish.vue')
        }
      ],
      redirect: '/layout/total'
    }
  ]
})

export default router
