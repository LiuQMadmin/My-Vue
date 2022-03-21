import { initState } from './state'
import { node2Fragment, compile } from './compiler/index.js'
import { isElementNode } from './uitls/index'
import { $mount } from './ast/index'
// 在原型上面添加init方法
export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this
    vm.$options = options // this.$options => 用户传递的options
    // 初始化状态
    initState(vm)

    // 如果用户传入了el属性，需要将页面渲染出来
    if (vm.$options.el) {
      // 调用this上面的$mount方法挂在DOM
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = $mount
  // Vue.prototype.$mount = function (el) {
  //   const vm = this
  //   const options = vm.$options
  //   // 判断el是不是元素节点,如果是就直赋值this.el,如果不是就去获取当前节点对象，
  //   el = isElementNode(el) ? el : document.querySelector(el)
  //   // 获取文档碎片对象，减少页面的回流和重绘
  //   const fragment = node2Fragment(el)
  //   compile(vm, fragment)
  //   // 把解析完毕的fragment重新加入到el中去
  //   el.appendChild(fragment)
  // }
}
