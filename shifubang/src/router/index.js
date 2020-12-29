import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/index',
        component: () => import('../views/index.vue'),
        meta: { title: '首页' },
      },
      {
        path: '/order',
        component: () => import('../views/Order.vue'),
        meta: { title: '订单' },
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: { title: '登录' }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
