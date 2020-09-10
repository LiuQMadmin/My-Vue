/**
 * true=>是对象 false=>不是对象
 * @param {*} data 
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null;
}