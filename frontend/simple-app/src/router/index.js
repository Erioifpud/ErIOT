import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import AdminPage from '@/components/AdminPage'
import ControlPage from '@/components/ControlPage'
import DataPage from '@/components/DataPage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      meta: {
        hideBack: true,
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        hideBack: true
      }
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage,
      meta: {
        requireAuth: true,
        hideBack: true
      }
    },
    {
      path: '/control',
      name: 'ControlPage',
      component: ControlPage,
      meta: {
        requireAuth: true,
        hideBack: false,
        hasSetting: true
      }
    },
    {
      path: '/datapoint',
      name: 'DataPage',
      component: DataPage,
      meta: {
        requireAuth: true,
        hasSetting: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.commit('closeSettingDialog')
  if (to.meta.requireAuth) {
    const ls = window.localStorage
    if (ls.getItem('token')) {
      next()
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

router._push = router.push

router.forward = router.push = (target) => {
  store.commit('setTransitionAction', 'forward')
  setTimeout(() => { router._push(target) })
}

router.back = (target) => {
  store.commit('setTransitionAction', 'back')
  if (target) {
    setTimeout(() => { router._push(target) })
  }
  history.go(-1)
}

export default router
