import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: 'erIOT',
    drawerVisibility: false,
    loading: false,
    transition: 'forward'
  },
  mutations: {
    changeTitle (state, title) {
      state.title = title
    },
    toggleDrawer (state) {
      state.drawerVisibility = !state.drawerVisibility
    },
    hideLoading (state) {
      state.loading = false
    },
    showLoading (state) {
      state.loading = true
    },
    setTransitionAction (state, action) {
      if (action === 'forward') {
        state.transition = 'slide-in'
      } else {
        state.transition = 'slide-out'
      }
    }
  }
})

export default store
