/**
 * true=>是对象 false=>不是对象
 * @param {*} data 
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null;
}

/**
 * 数据动态响应
 */
export function def(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: false,
    configurable: false,
    value
  })
}
/**
 * 判断是不是元素节点,node.nodeType === 1 的时候就是元素节点
 */
export function isElementNode(node) {
  return node.nodeType === 1;
}
/**
 * 判断是不是指令
 */
export function isDirective(attrName) {
  return attrName.startsWith("v-");
}

/**
 * 判断是不是事件@
 */
export function isEventName(attrName) {
  return attrName.startsWith("@");
}
/**
 * 数据proxy代理
 */
export function ProxyData(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue, value) {
      if (Object.is(newValue, value)) return;
      vm[target][key] = newValue;
    }
  })
}