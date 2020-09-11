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