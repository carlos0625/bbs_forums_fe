import Vue from 'vue';
import Router from 'vue-router';

// 开发环境未使用lazyloading
Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout';

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
    path: '/aboutme',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'aboutme',
        component: () => import('@/views/about/index'),
        meta: { title: '关于我', icon: 'form' },
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
