import { compileToRenderFunction } from './compiler'
import { mountComponent } from '../lifecycle/lifecycle'
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
  mountComponent(vm)
}

export { $mount }
