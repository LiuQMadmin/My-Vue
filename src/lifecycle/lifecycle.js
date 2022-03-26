import { patch } from '../patch/index'
/**
 * 将render转成虚拟dom
 * @param {*} vm
 */
function mountComponent(vm) {
  vm._update(vm._render())
}
/**
 * 挂在生命周期函数
 * @param {*} Vue
 */
function lifecycleMixin(Vue) {
  // 更新视图
  Vue.prototype._update = function (vnode) {
    const vm = this
    patch(vm, vnode)
  }
}
export { mountComponent, lifecycleMixin }
