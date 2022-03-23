/**
 * 创建元素节点的函数
 * ...children将多余的参数放到children中
 */
function createElement(tag, attrs = {}, ...childen) {
  return vnode(tag, attrs, childen)
}
/**
 * 创建文本节点的函数
 */
function createTextVnode(text) {
  return vnode(undefined, undefined, undefined, text)
}

function vnode(tag, props, children, text) {
  return {
    tag,
    props,
    children,
    text,
  }
}

export { createElement, createTextVnode }
