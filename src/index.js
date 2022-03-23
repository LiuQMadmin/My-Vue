// 该文件就是一个vue的声明
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle/lifecycle'
import { renderMixin } from './vdom/index'
import { proxyMixin } from './proxy/index'
function Vue(options) {
  // 进行vue的初始化操作
  this._init(options)
}

// 通过引入文件的方式 给vue原型上面添加方法,也算是一种全局混入的写法
initMixin(Vue)
// 挂在Vue的生命周期
lifecycleMixin(Vue)
// 把redner函数处理成虚拟dom的方法挂在到Vue上
renderMixin(Vue)
// 在Vue中挂在data中的数据代理到this上面
proxyMixin(Vue)

export default Vue
