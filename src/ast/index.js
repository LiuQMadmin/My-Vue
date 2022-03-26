import { compileToRenderFunction } from './compiler'
import { mountComponent } from '../lifecycle/lifecycle'
import { Watcher } from '../uitls/index'
const $mount = function (el) {
  const vm = this
  const options = vm.$options
  el = document.querySelector(el)
  // 把el挂载到vm上
  vm.$el = el
  /**
   * 先判断render函数存不存在
   */
  if (!options.render) {
    // 在判断存不存在tempalte
    let template = options.template
    // 最后采取获取el里面的内容，template不存在并且el存在的时候
    if (!template && el) {
      template = el.outerHTML
    }
    const render = compileToRenderFunction(template)

    options.render = render
  }
  // render函数转成虚拟节点
  // mountComponent(vm)
  /**
   * 思想：在这里创建Watcher实例，并且吧render函数变成虚拟节点的函数传递进去
   * 在Watcher内部去调用mountComponent函数，把render变成虚拟节点，并且把Wacther实例
   * 存储到dep.target变量中去，mountComponent函数执行时，可以进行收集依赖，在函数执行
   * 完毕之后再把dep.target变成null，从而实现收集变量依赖，实现双向绑定
   */
  new Watcher(vm, mountComponent)
}

export { $mount }
