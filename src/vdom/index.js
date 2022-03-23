import { createElement, createTextVnode } from './vnode'

function renderMixin(Vue) {
  // 挂在创建dom元素的_c()方法
  Vue.prototype._c = function () {
    return createElement(...arguments)
  }
  // 挂在创建{{ name }}的方法_s()
  Vue.prototype._s = function (value) {
    // 这里value好像已经是从data里面代理过的数据的value了
    // 好像得做数据代理
    if (value == null) return
    return typeof value === 'object' ? JSON.stringify(value) : value
  }
  Vue.prototype._v = function (text) {
    return createTextVnode(text)
  }
  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    // 把render函数转成vnode
    const vnode = render.call(vm) // 改变函数调用的this指向，这样才会调用到Vue原型上面的方法，_c(), _s(), _v()方法
    return vnode
  }
}
export { renderMixin }
