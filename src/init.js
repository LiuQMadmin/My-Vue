
import { initState } from "./state";
// 在原型上面添加init方法
export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this;
    vm.$options = options; // this.$options => 用户传递的options
    // 初始化状态
    initState(vm);
  }
}