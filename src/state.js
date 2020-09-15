import { observe } from "./observe/index";
import { ProxyData } from "./uitls/index";
// 初始化状态（数据）
export function initState(vm) {
  const opts = vm.$options;
  // vue的数据来源，属性，方法，数据，计算属性，watch
  if (opts.props) {
    initProps(vm);
  };
  if (opts.methods) {
    initMethod(vm);
  };
  if (opts.data) {
    initData(vm);
  };
  if (opts.computed) {
    initComputed(vm);
  };
  if (opts.watch) {
    initWatch(vm);
  };
}
function initProps(vm) { }
function initMethod(vm) { }
function initData(vm) {
  let data = vm.$options.data;
  // data.call(vm) 考虑到data() {return {age: this.age}}
  data = typeof data === 'function' ? data.call(vm) : data;
  // 让用户方便拿取数据,把_data挂载上去
  vm.$data = data;
  /**
   * 对数据进行拦截，实现this.xxx这种形式
   */
  Object.entries(vm.$data).forEach(([key]) => {
    ProxyData(vm, "$data", key);
  })
  // 对象劫持（用户改变数据我希望得到通知， 刷新页面数据）
  // Object.definePrototype() 给属性增加get和set方法
  observe(data); // 相应式原理
}
function initComputed(vm) { }
function initWatch(vm) { }