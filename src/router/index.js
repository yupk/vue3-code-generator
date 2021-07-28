import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/index/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/parser',
    name: 'parser',
    component: () => import('@/components/parser/example/Index.vue')
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: () => import('@/components/tinymce/example/Index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
