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