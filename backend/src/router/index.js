import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// 异步路由
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'role',
        name: 'system-role',
        component: () => import('@/views/system/role'),
        meta: { title: '权限组', icon: 'role',
          permissions: ['roles.index', 'roles.update', 'roles.destroy', 'roles.store'] }
      },
      {
        path: 'admin',
        name: 'system-admin',
        component: () => import('@/views/system/admin'),
        meta: { title: '管理员', icon: 'admin',
          permissions: ['admins.index', 'admins.update', 'admins.store'] }
      },
      {
        path: 'admin-log',
        name: 'system-admin-log',
        component: () => import('@/views/system/admin-log'),
        meta: { title: '操作日志1', icon: 'log',
          permissions: ['admin-logs.index'] }
      }
    ]
  },
  {
    path: '/mission',
    component: Layout,
    meta: { title: '任务管理', icon: 'mission' },
    children: [
      {
        path: 'mission-underway',
        name: 'underway',
        component: () => import('@/views/mission/underway'),
        meta: { title: '进行中任务', icon: 'role',
          permissions: ['roles.index', 'roles.update', 'roles.destroy', 'roles.store'] }
      },
      {
        path: 'admin',
        name: 'system-admin',
        component: () => import('@/views/system/admin'),
        meta: { title: '超时任务', icon: 'admin',
          permissions: ['admins.index', 'admins.update', 'admins.store'] }
      },
      {
        path: 'admin-log',
        name: 'system-admin-log',
        component: () => import('@/views/system/admin-log'),
        meta: { title: '已完结任务', icon: 'log',
          permissions: ['admin-logs.index'] }
      },
      {
        path: 'admin-log2',
        name: 'performance-appraisal',
        component: () => import('@/views/system/admin-log'),
        meta: { title: '人员完成率绩效评估', icon: 'log',
          permissions: ['admin-logs.index'] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

