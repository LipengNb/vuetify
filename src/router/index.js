import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    meta: { icon: 'mdi-home' },
    component: Layout
  },
  {
    path: '/customer',
    name: '客户管理',
    component: Layout,
    meta: { icon: 'mdi-account-box' },
    children: [
      {
        path: '/member',
        name: '会员列表',
        component: () => import('@/views/customer/member')
      },
      {
        path: '/details',
        name: '会员详情',
        hidden: true,
        component: () => import('@/views/customer/details')
      }
    ]
  },
  // {
  //   path: '/customer',
  //   name: '客户管理',
  //   component: Layout,
  //   meta: { icon: 'mdi-account-box' },
  //   children: [
  //     {
  //       path: '/member',
  //       name: '会员管理',
  //       component: () => import ('@/views/customer/index'),
  //       redirect: '/list',
  //       children: [
  //         {
  //           path: '/list',
  //           name: '会员列表',
  //           component: () => import('@/views/customer/member')
  //         },
  //         {
  //           path: '/details',
  //           name: '会员详情',
  //           component: () => import('@/views/customer/details')
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: '/operation',
    name: '运营管理',
    component: Layout,
    meta: { icon: 'mdi-align-vertical-bottom' },
    children: [
      {
        path: '/discountLevel',
        name: '折扣管理',
        component: () => import ('@/views/operation/discountLevel')
      },
      {
        path: '/planing',
        name: '活动策划',
        component: () => import ('@/views/operation/planing')
      },
      {
        path: '/label',
        name: '标签管理',
        component: () => import ('@/views/operation/label')
      },
      {
        path: '/coupon',
        name: '优惠券管理',
        component: () => import ('@/views/operation/coupon')
      }
    ]
  },
  {
    path: '/system',
    name: '系统设置',
    component: Layout,
    meta: { icon: 'mdi-cog-box' },
    children: [
      {
        path: '/account',
        name: '账号管理',
        icon: 'mdi-star',
        component: () => import ('@/views/system/account')
      },
      {
        path: '/role',
        name: '角色管理',
        icon: 'mdi-account-multiple',
        component: () => import ('@/views/system/role')
      },
      {
        path: '/menu',
        name: '菜单管理',
        icon: 'mdi-folder',
        component: () => import ('@/views/system/menu')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
