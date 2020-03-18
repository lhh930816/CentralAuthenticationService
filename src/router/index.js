import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: '/login',
    redirect: '/login',
    component: resolve => require(['@/views/login.vue'], resolve),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login')
      },
      {
        path: '/callback',
        name: 'callback',
        component: () => import('@/views/callback')
      },
      {
        path: "/error",
        name: "error",
        component: () => import('@/views/error-page/500')
      }
    ]
  }]
})
