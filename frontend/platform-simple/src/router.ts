import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import homeRoutes from './views/Home/routes'
import meRoutes from './views/Me/routes'
import loginRoutes from './views/Login/routes'
import manageRoutes from './views/Manage/routes'
import chartRoutes from './views/Chart/routes'

Vue.use(Router)

const router = new Router({
  routes: [
    ...homeRoutes,
    ...manageRoutes,
    ...meRoutes,
    ...chartRoutes,
    ...loginRoutes,
    // 其他url重定向至首页
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

// 使用ES6的代理对router原有方法进行注入，记录每次路由的操作，供过渡使用
// router.push = new Proxy(router.push, {
//   apply: (target, context, args) => {
//     store.commit('setBack', false)
//     return target.apply(context, args)
//   }
// })

// router.back = new Proxy(router.back, {
//   apply: (target, context, args) => {
//     store.commit('setBack', true)
//     return target.apply(context, args)
//   }
// })

router.beforeEach((to, from, next) => {
  // 关闭已打开的Dialog
  store.commit('closeDialog')
  // 通过localStorage取得已同步的token
  // const token = JSON.parse(window.localStorage.getItem('token') || 'null')
  const token = window.localStorage.getItem('token')

  // 拦截未登陆的路由请求，放行声明了withoutAuth元信息的请求
  if (token) {
    next()
  } else {
    if (to.meta.withoutAuth) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
