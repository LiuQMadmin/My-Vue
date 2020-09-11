import { isObject } from "../uitls/index";
import { arrayMethods } from "./array.js";

class Observe {
  constructor(value) {
    Object.defineProperty(value, "__ob__", {
      enumerable: false, // 不可枚举
      configurable: false, // 不可修改
      value: this //  赋值
    })
    // vue如果数据测层次过多，需要递归去解析对象中的属性，一次增加set和get方法
    if (Array.isArray(value)) {
      // value.__ob__ = this; // 在每一个监控的对象上面绑定一个实例属性
      // 如果是数组的话，并不会对索引进行观测，this.observeArray(value);会导致性能过差
      // 如果数组里面是对象，我再监控
      // 前端开发中很少去操作索引，push、shift、unshift || value.__proto__ => Array.prototype
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };
  walk(data) {
    let keys = Object.entries(data); // 获取data中所有的kay
    keys.forEach(([key, value]) => {
      defineReactive(data, key, value); // 定义相应式数据
    })
  };
  //监控数组里面的每一项
  observeArray(data) {
    data.forEach((item) => {
      observe(item);
    })
  };
}
// 数据动态响应
function defineReactive(data, key, value) { // 相当于一个闭包函数，把value保存到当前函数中
  observe(value); // 如果key对应的是对象的话，进行递归遍历收集依赖
  Object.defineProperty(data, key, { // 依赖收集
    configurable: true, //是否可变化
    enumerable: true, // 是否可枚举
    get() {
      return value;
    },
    set(newValue) {
      if (Object.is(newValue, value)) return; // 如果和原来的值相等
      observe(newValue); // 如果用户设置的值是一个对象，那就继续去劫持数据
      value = newValue; // 如果不相等，那就直接赋值
    }
  });
}

// 相应式原理,把data中的数据都使用Object.defineProprety重新定义
export function observe(data) {
  // 判断data是不是对象 typeof null === 'object' => true
  let isObj = isObject(data);
  if (!isObj) {
    return;
  }
  return new Observe(data);
}