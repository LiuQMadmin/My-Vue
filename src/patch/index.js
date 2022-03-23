function patch(oldNode, vNode) {
  let el = createElement(vNode)
  // 找到就节点的父节点
  let parentElement = oldNode.parentNode
  // 把el插入到oldNode的后面
  parentElement.insertBefore(el, oldNode.nextSibling)
  // 从父节点把oldNode移除掉
  parentElement.removeChild(oldNode)
}
// 把虚拟节点变成真实节点
function createElement(vnode) {
  const { tag, props, children, text } = vnode
  // 元素节点
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    // 处理元素上面的属性
    updateProps(vnode)
    // 递归子节点
    children &&
      children.map((child) => {
        vnode.el.appendChild(createElement(child))
      })
  } else {
    // 文本节点
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
// 处理元素上面的属性
function updateProps(vnode) {
  const el = vnode.el
  const newProps = vnode.props || {}
  Object.entries(newProps).map(([key, value]) => {
    if (key === 'style') {
      Object.entries(value).map(([k, v]) => {
        el.style[k] = v
      })
    } else if (key === 'class') {
      el.className = value
    } else {
      el.setAttribute(key, value)
    }
  })
}

export { patch }
