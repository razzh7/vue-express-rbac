import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
import nestedModule from './modules/nested'
/**
 * hidden: Boolean,不显示在菜单栏
 * affix: Boolean,tag固定在导航栏,首页默认固定
 */
/* 通用路由 */
export const commonRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录页'},
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Test',
        component: () => import('@/views/routertest'),
        meta: { title: '测试单元', icon: 'el-icon-s-promotion', affix: true }
      }
    ]
  },
  nestedModule,
  // { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes = [
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'ratable',
        name: 'Table',
        component: () => import('@/views/table'),
        meta: { title: '表格', icon: 'el-icon-s-grid', roles: ['admin'] }
      }
    ]
  },
]

const createRouter = () => {
  return new Router({
    routes: commonRoutes
  })
}
const router = createRouter()

// fix:用户切换菜单栏不变的问题： https://github.com/vuejs/vue-router/issues/1234
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}

export default router
