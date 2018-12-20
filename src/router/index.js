import Vue from 'vue'
import Router from 'vue-router'
import LoginAndRegister from '@/components/LoginAndRegister'
import Register from '@/components/Register'
import Login from '@/components/Login'
import MainPage from '@/components/MainPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/LoginAndRegister',
      name: 'LoginAndRegister',
      component: LoginAndRegister,
      children: [
        { path: 'register', component: Register },
        { path: 'login', component: Login }
      ]
    },
    {
      path: '/mainPage',
      name: MainPage,
      component: MainPage
    }
  ]
})
