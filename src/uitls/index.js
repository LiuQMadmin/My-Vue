import { compileUtil } from '../compiler/index'
/**
 * true=>是对象 false=>不是对象
 * @param {*} data
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null
}

/**
 * 数据动态响应
 */
export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value,
  })
}
/**
 * 收集依赖
 */
export class dep {
  constructor() {
    this.subs = []
  }
  // 收集观察者的函数（new dep()之后就可以使用这个函数）
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者去更新（new dep()之后就可以使用这个函数）
  notify() {
    // 此时this.subs里面存的就是创建的观察者函数
    this.subs.forEach((watcher) => {
      watcher.update()
    })
  }
}
/**
 * 创建观察者函数
 */
// export class Watcher {
//   constructor(vm, expr, cb) {
//     this.vm = vm
//     this.expr = expr
//     this.cb = cb
//     // 先把旧值保存起来
//     this.oldValue = this.getOldValue()
//   }
//   getOldValue() {
//     // 给target赋值，保存当前的Watch对象
//     dep.target = this
//     let oldVlaue = compileUtil.getVal(this.expr, this.vm)
//     dep.target = null
//     return oldVlaue
//   }
//   // 更新新值
//   update() {
//     const newVal = compileUtil.getVal(this.expr, this.vm)
//     if (!Object.is(this.oldValue, newVal)) {
//       this.cb(newVal)
//     }
//   }
// }
export class Watcher {
  constructor(vm, exprFun) {
    this.vm = vm
    this.exprFun = exprFun
    // 触发收集依赖
    this.get()
  }
  get() {
    // 给target赋值，保存当前的Watch对象,并且把全局的Watcher存入进去
    dep.target = this
    this.exprFun(this.vm)
    dep.target = null
  }
  // 更新新值
  update() {
    this.exprFun(this.vm)
  }
}
/**
 * 判断是不是元素节点,node.nodeType === 1 的时候就是元素节点
 */
export function isElementNode(node) {
  return node.nodeType === 1
}
/**
 * 判断是不是指令
 */
export function isDirective(attrName) {
  return attrName.startsWith('v-')
}

/**
 * 判断是不是事件@
 */
export function isEventName(attrName) {
  return attrName.startsWith('@')
}
/**
 * 数据proxy代理
 */
export function ProxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue, value) {
      if (Object.is(newValue, value)) return
      vm[target][key] = newValue
    },
  })
}
