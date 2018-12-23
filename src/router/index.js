import Vue from 'vue';
import Router from 'vue-router';

// 开发环境未使用lazyloading
Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/frontpage',
    name: 'Frontpage',
    hidden: true,
    children: [
      {
        path: 'frontpage',
        component: () => import('@/views/frontpage/index'),
      },
      {
        path: 'detail/:articleid',
        name:'detail',
        component: () => import('@/views/detail/index'),
        meta: { title: '详情', icon: 'form' },
      },
    ],
  },
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: Layout,
  //   children: [
  //     {
  //       path: ':id',
  //       name:'详情',
  //       component: () => import('@/views/detail/index'),
  //       meta: { title: '详情', icon: 'form' },
  //     },
  //   ],
  // },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: '',
        name: 'article',
        component: () => import('@/views/article/index'),
        meta: { title: '写文章', icon: 'form' },
      },
    ],
  },

  {
    path: '/tree',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' },
      },
    ],
  },
  {
    path: '/aboutme',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'aboutme',
        component: () => import('@/views/form/index'),
        meta: { title: '关于我', icon: 'form' },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' },
      },
    ],
  },

  { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
