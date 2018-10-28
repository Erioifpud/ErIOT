import Vue from 'vue'
import Vuex from 'vuex'
import utils from './util/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: 'erIOT',
    drawerVisibility: false,
    loading: false,
    transition: 'forward',
    userData: undefined
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
    },
    setUserData (state, action) {
      state.userData = action
    }
  },
  getters: {
    getPlacesFromUserData (state) {
      if (state.userData && state.userData.places) {
        return state.userData.places
      }
      return undefined
    },
    getDevicesFromUserData (state, getters) {
      if (!getters.getPlacesFromUserData) {
        return undefined
      }
      return getters.getPlacesFromUserData.map(item => item.devices)
    },
    getClientsFromUserData (state, getters) {
      if (!getters.getDevicesFromUserData) {
        return undefined
      }
      return getters.getDevicesFromUserData.map(item => item.map(item2 => item2.clients))
    }
  }
})

export default store
