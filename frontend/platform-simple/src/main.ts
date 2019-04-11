import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from './connection'
import 'flex.css'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ripple from '@/directives/ripple'
import Clipboard from 'v-clipboard'

// 开发环境使用mock
// if (process.env.NODE_ENV === 'development') {
//   require('./mock')
// }

// 挂载axios实例
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(vueg, router, {
  forwardAnim: 'fadeInRight', //前进动画，默认为fadeInRight
  backAnim: 'fadeInLeft',
  shadow:false, //值为false，转场时没有阴影的层次效果
  disable: false,
  tabsDisable: true,
  sameDepthDisable: true,
  tabs: (router as any).options.routes.filter((route: any) => route.meta && route.meta.inMenu).map((route: any) => ({
    name: route.name
  }))
})

Vue.use(Vuetify)
Vue.use(Clipboard)

Vue.directive('ripples', ripple)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
