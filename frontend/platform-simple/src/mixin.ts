import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'

interface Btn {
  text: string
  handler?: Function
}

const updateHeader = (vm: any) => {
  let header = vm.header
  if (header) {
    // 规范header的格式
    if (typeof header === 'string') {
      header = {
        title: header
      }
    }
  } else {
    header = {
      title: '',
      show: false
    }
  }
  vm.$store.commit('updateHeader', header)
}

const updateMenu = (vm: any) => {
  let menu = vm.menu
  if (menu) {
    if (typeof menu === 'string') {
      menu = {
        current: menu
      }
    }
  } else {
    menu = {
      show: false
    }
  }
  vm.$store.commit('updateMenu', menu)
}
// @Component
// class Color extends Vue {
//   themeColor =  '#f0e6b8'
// }

/**
 * 提供对组件中Header设置的更新方法，不混入则设置无法生效，设置包括页面标题，左右侧的图标按钮，未设置时将会保留上一页面Header中的内容。
 */
@Component
class UpdateHeader extends Vue {
  created () {
    updateHeader(this)
  }

  activated () {
    updateHeader(this)
  }
}

/**
 * 提供对组件中Menu设置的更新方法，不混入则设置无法生效，设置是否将该页面放入Menu中以及放入后显示的图标与文字。
 */
@Component
class UpdateMenu extends Vue {
  created () {
    updateMenu(this)
  }

  activated () {
    updateMenu(this)
  }
}

/**
 * 提供对Dialog与Toast的操作方法。
 */
@Component
class Utils extends Vue {
  showToast (text: string, delay:number = 3000) {
    store.dispatch('showToast', {
      text,
      delay
    })
  }

  showDialog (message: any, title?: string, persistent?: boolean, leftBtn?: Btn, rightBtn?: Btn) {
    if (!leftBtn && !rightBtn) {
      leftBtn = {
        text: 'OK'
      }
    }
    let payload = {
      message: '',
      component: undefined,
      title,
      leftBtn,
      rightBtn,
      persistent
    }
    if (typeof message === 'string') {
      payload.message = message
    } else {
      payload.component = message
    }
    store.commit('showDialog', payload)
  }

  showMessageDialog (message: string, title?: string, persistent?: boolean) {
    this.showDialog(message, title, persistent)
  }

  showComponentDialog (component: Vue, title?:string, persistent?: boolean, leftBtn?: Btn, rightBtn?: Btn) {
    this.showDialog(component, title, persistent, leftBtn, rightBtn)
  }
}

export default {
  // Color,
  UpdateHeader,
  UpdateMenu,
  Utils
}
