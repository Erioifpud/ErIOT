import store from '@/store'

export default {
  updateBar: {
    mounted () {
      store.commit('changeTitle', this.title || 'ErIOT')
    },
    activated () {
      store.commit('changeTitle', this.title || 'ErIOT')
    }
  }
}
