import { compileToRenderFunction } from './compiler'
const $mount = function (el) {
  const vm = this
  const options = vm.$options
  el = document.querySelector(el)
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
}

export { $mount }
