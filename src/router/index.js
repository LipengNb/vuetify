import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: Layout
  },
  {
    path: '/system',
    name: '系统设置',
    component: Layout,
    children: [
      {
        path: '/account',
        name: '账号管理',
        component: () => import ('@/views/system/account')
      },
      {
        path: '/role',
        name: '角色管理',
        component: () => import ('@/views/system/role')
      },
      {
        path: '/menu',
        name: '菜单管理',
        component: () => import ('@/views/system/menu')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
