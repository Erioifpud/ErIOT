function onmouseup (el: HTMLElement) {
  return (ev: MouseEvent) => {
    if (el.dataset._timeout) {
      clearTimeout(+el.dataset._timeout)
    } else {
      ev.stopPropagation()
    }
  }
}

function onmousedown (el: HTMLElement, binding: any, options: any, context: any) {
  return (ev: MouseEvent) => {
    const id = setTimeout(function () {
      binding.value.call(context, ev)
      el.dataset._timeout = ''
    }, options.duration)
    el.dataset._timeout = `${id}`
  }
}

export default {
  install (Vue: any, options: any) {
    if (!options) options = {}
    if (!options.duration) options.duration = 2000

    const that: any = this

    Vue.directive('long-press', {
      bind: function (el: HTMLElement, binding: any) {
        that.onMouseDown = onmousedown(el, binding, options, self)
        that.onMouseUp = onmouseup(el)
        el.addEventListener('mousedown', that.onMouseDown)
        document.addEventListener('mouseup', that.onMouseUp)
      },
      unbind: function (el: HTMLElement) {
        if (el.dataset._timeout) {
          clearTimeout(+el.dataset._timeout)
        }
        if (that.onMouseDown) {
          el.removeEventListener('mousedown', that.onMouseDown)
        }
        if (that.onMouseUp) {
          document.removeEventListener('mouseup', that.onMouseUp)
        }
      }
    })
  }
}
