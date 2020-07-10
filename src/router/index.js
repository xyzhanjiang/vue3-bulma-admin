import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  {
    path: '/posts',
    component: () => import('@/views/posts/index.vue')
  },
  {
    path: '/posts/post/:id',
    component: () => import('@/views/posts/post.vue')
  },
  {
    path: '/posts/add',
    component: () => import('@/views/posts/add.vue')
  },
  {
    path: '/register', // 目前没有注册页，同登录
    component: () => import('@/views/login.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/about.vue')
  },
  {
    path: '/:catchAll(.*)', // Catch all routes
    component: () => import('@/views/about.vue')
  }
]

const router = createRouter({
  // also createWebHistory and createMemoryHistory
  // createMemoryHistory 用于服务端渲染 SSR
  history: createWebHashHistory(),
  routes
})

export default router
