import { DirectiveOptions } from 'vue'

/**
 * Ripple的参数接口
 * *times*表示波纹扩散的倍数，默认为1
 * *color*表示波纹的颜色，默认为rgba(0, 0, 0, 0.3)
 * *duration*表示波纹效果的扩散时间，默认为500ms
 */
interface RippleArgs {
  times: number
  color: string
  duration: number
}

/**
 * 在目标元素下创建子元素，通过**setTimeout**触发子元素的重绘，实现波纹动画效果。
 *
 * @param el
 * @param binding
 * @param vnode
 */
function addRipple (el: HTMLElement, binding: any, vnode: any) {
  // vnode.componentInstance.$rippleTemp = {
  //   position: el.style.position,
  //   overflow: el.style.overflow
  // }
  return function (e: TouchEvent | MouseEvent) {
    const args: RippleArgs = binding.value
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    const { width, height, left, top } = el.getBoundingClientRect()
    const length = Math.max(width, height) * (args.times || 1)
    // const { pageX, pageY } = e
    var pageX = 0, pageY = 0
    if (e instanceof TouchEvent) {
      var { pageX, pageY } = e.touches[0]
    } else {
      var { pageX, pageY } = e
    }
    const ripple = document.createElement('div')
    ripple.style.position = 'absolute'
    ripple.style.left = `${pageX - left - length / 2}px`
    ripple.style.top = `${pageY - top - length / 2}px`
    ripple.style.width = `${length}px`
    ripple.style.height = `${length}px`
    ripple.style.borderRadius = '50%'
    ripple.style.backgroundColor = args.color || 'rgba(255, 255, 255, 0.3)'
    ripple.style.transform = 'scale(0)'
    ripple.style.opacity = '1'
    ripple.style.transitionProperty = 'all'
    ripple.style.transitionDuration = `${args.duration || 500}ms`

    el.appendChild(ripple)
    setTimeout(() => {
      ripple.style.transform = 'scale(1)'
      ripple.style.opacity = '0'
      setTimeout(() => {
        el.removeChild(ripple)
      }, args.duration || 500)
    }, 0)
  }
}

const ripple: DirectiveOptions = {
  bind (el, binding, vnode) {
    el.addEventListener('mousedown', addRipple(el, binding, vnode))
    // el.addEventListener('touchstart', addRipple(el, binding, vnode))
  },
  unbind (el, binding, vnode: any) {
    el.removeEventListener('mousedown', addRipple(el, binding, vnode))
    // el.removeEventListener('touchstart', addRipple(el, binding, vnode))
    // el.style.position = vnode.componentInstance.$rippleTemp.position
    // el.style.overflow = vnode.componentInstance.$rippleTemp.overflow
    // delete vnode.componentInstance.$rippleTemp
  }
}

export default ripple
