import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/users',
        component: () => import('@/views/users/index.vue')
      },
      {
        path: '/users/add',
        component: () => import('@/views/users/add.vue')
      },
      {
        path: '/posts',
        component: () => import('@/views/posts/index.vue')
      },
      {
        path: '/form',
        component: () => import('@/views/form/index.vue')
      },
      {
        path: '/tiles',
        component: () => import('@/views/tiles/index.vue')
      },
    ]
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
  // 也有 createWebHistory 和 createMemoryHistory
  // createMemoryHistory 用于服务端渲染 SSR
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'is-active' // 激活状态的 link 添加的 class
})

router.beforeEach((to, from, next) => {
  // 未登录只能访问登录页面
  if (to.path === '/login' || to.path === '/about') {
    next()
  } else {
    if (store.state.user) {
      next()
    } else {
      // 如果未登录，则跳转到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 传递当前页面的路径用于登录之后返回
      })
    }
  }
})

export default router
