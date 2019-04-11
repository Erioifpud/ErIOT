import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// vuex持久化
const vuexLocal = new VuexPersistence<IState>({
  strictMode: true,
  storage: window.localStorage,
  // 需要同步至LocalStorage的状态
  reducer: state => {
    return {
      auth: state.auth
    }
  }
})

interface IState {
  loading: {
    count: number,
    text: string
  },
  toast: {
    queue: Array<{ text: string }>,
    text: string
  },
  dialog: {},
  header: {},
  menu: {},
  auth: {
    [key: string]: any
  }
}

export default new Vuex.Store<IState>({
  strict: true,
  state: {
    // count不为0时显示loading组件
    loading: {
      count: 0,
      text: ''
    },
    toast: {
      queue: [],
      text: ''
    },
    dialog: {},
    header: {},
    menu: {},
    auth: {}
  },
  // 与Dialog与Toast相关的方法在mixin中都有进一步的封装
  mutations: {
    /**
     * showLoading() or showLoading(text)
     * 显示loading组件，text为loading时要显示的内容。
     *
     * @param state
     * @param text loading的文字内容
     */
    showLoading (state, text = '') {
      state.loading.count++
      state.loading.text = text
    },
    /**
     * hideLoading() or hideLoading(true)
     * 隐藏loading组件，hide为true时直接隐藏，默认或为false时使count--，count为0时清空text内容。
     *
     *
     * @param state
     * @param hide 强制隐藏loading
     */
    hideLoading (state, hide = false) {
      const val = state.loading.count
      if (hide) {
        state.loading.count = 0
      } else if (val) {
        state.loading.count--
      }
      if (!state.loading.count) {
          state.loading.text = ''
      }
    },
    /**
     * 更新Header的内容，忽略show参数时默认显示顶栏。
     * leftBtn与rightBtn的格式为{ icon: String, handler: Function }，leftBtn无指定handler时默认为**路由返回**，rightBtn无指定handler时默认**不执行操作**。
     *
     * @param state
     * @param param1
     */
    updateHeader (state, { title, show = true, leftBtn = undefined, rightBtn = undefined}) {
      state.header = {
        title,
        show,
        leftBtn,
        rightBtn
      }
    },
    /**
     * 更新Menu的状态，忽略show参数时默认显示底部菜单。
     * current为Menu当前选中的项。
     *
     * @param state
     * @param param1 \{ current, show = true \}
     */
    updateMenu (state, { current, show = true }) {
      state.menu = {
        current,
        show
      }
    },
    /**
     * 私有方法，用于删除过时的Toast信息。
     *
     * @param state
     * @param param1 \{ text \}
     */
    _removeToast (state, { text }) {
      const queue = state.toast.queue
      const index = queue.findIndex(item => item.text === text)
      index !== -1 && queue.splice(index, 1)
      const latest = queue.slice(-1).pop()
      state.toast.text = latest ? latest.text : text
    },
    /**
     * 私有方法，用于添加Toast信息。
     *
     * @param state
     * @param param1 \{ text \}
     */
    _addToast (state, { text }) {
      const queue = state.toast.queue
      const item = { text }
      queue.push(item)
      const newest = queue.slice(-1).pop()
      state.toast.text = newest ? newest.text : ''
    },
    /**
     * 关闭Dialog。
     *
     * @param state
     */
    closeDialog (state) {
      state.dialog = {}
    },
    /**
     * 显示Dialog。
     * message为内容，title为标题，leftBtn与rightBtn的结构为{ text, handler }，persistent控制点击外围时是否关闭Dialog。
     *
     * @param state
     * @param param1 \{ message, title = '', leftBtn = undefined, rightBtn = undefined, persistent = false \}
     */
    showDialog (state, { message, component = undefined,  title = '', leftBtn = undefined, rightBtn = undefined, persistent = false }) {
      state.dialog = {
        title,
        component,
        message,
        leftBtn,
        rightBtn,
        persistent,
      }
    },
    setAuth (state, auth) {
      state.auth = auth
    },
    // 使vuex-persist支持strict模式
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION
  },
  getters: {
    /**
     * 根据state判断是否应该显示Toast。
     *
     * @param state
     */
    shouldShowToast (state) {
      return state.toast.queue.length && state.toast.text
    },
    /**
     * 根据state判断是否应该显示Dialog。
     * @param state
     */
    shouldShowDialog (state) {
      return !!Object.keys(state.dialog).length
    }
  },
  actions: {
    /**
     * 添加并显示Toast的主要方法，由于使用了setTimeout，所以需要放在Actions里。
     * Toast的逻辑并不是覆盖前者，而是设置一个列表，一个Toast过期时从列表结尾开始找出该元素，并将其移出列表，页面上显示的是最后一个元素。
     * 比如说，第一条Toast持续10秒，第二条持续3秒，两条一起添加，在第二条消失后会显示第一条的内容。
     *
     * @param context
     * @param param1 \{ text, delay = 3000 \}
     */
    showToast (context, { text, delay = 3000 }) {
      context.commit('_addToast', { text })
      setTimeout(() => {
        context.commit('_removeToast', { text })
      }, delay)
    }
  },
  plugins: [vuexLocal.plugin]
})
