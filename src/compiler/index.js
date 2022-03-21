import { isElementNode, isDirective, isEventName } from '../uitls/index'
import { Watcher } from '../uitls/index'
export function node2Fragment(el) {
  // 创建文档碎片
  const f = document.createDocumentFragment()
  let firstChild
  while ((firstChild = el.firstChild)) {
    // 添加到文档碎片里面去，同时移除el里面对应的元素节点
    f.appendChild(firstChild)
  }
  return f
}

// 编译模板
export function compile(vm, fragment) {
  // 获取文档碎片里面元素的属性并且转称元素属性数组，准备转化成render函数,
  // 把fragment转化成对象AST树的的形式去描述
  const childNodes = fragment.childNodes
  ;[...childNodes].forEach((child) => {
    if (isElementNode(child)) {
      // 是元素节点
      compileElement.call(vm, child)
    } else {
      // 文本节点
      compileText.call(vm, child)
    }
    if (child.childNodes && child.childNodes.length) {
      compile(vm, child)
    }
  })
}
// 元素节点编译
function compileElement(node) {
  // 元素内部属性
  const attributes = node.attributes
  ;[...attributes].forEach((attr) => {
    const { name, value } = attr
    if (isDirective(name)) {
      // 如果是指令 v-text v-html v-model v-on v-bind
      const [, dirctive] = name.split('-') //text html model on:click
      const [dirName, eventName] = dirctive.split(':')
      compileUtil[dirName](this, node, value, eventName)
      node.addEventListener('input', (e) => {
        // console.log("12121212");
      })
      // 删除标签v-
      node.removeAttribute('v-' + dirctive)
    } else if (isEventName(name)) {
      let [, eventName] = name.split('@')
      compileUtil['on'](this, node, value, eventName)
    }
  })
}
// 文本节点编译
function compileText(node) {
  const content = node.textContent
  if (/\{\{(.+?)\}\}/.test(content)) {
    compileUtil['text'](this, node, content)
  }
}
export const compileUtil = {
  // 获取$data里面的数据
  getVal(expr, vm) {
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal]
    }, vm.$data)
  },
  bind(vm, node, expr, className) {
    const value = this.getVal(expr, vm)
    // node.classList.add()为该元素添加class属性
    node[className + 'List'].add(value)
  },
  text(vm, node, expr) {
    let value
    if (expr.indexOf('{{') != -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return this.getVal(args[1], vm)
      })
    } else {
      value = this.getVal(expr, vm)
    }
    // 数据动态响应的时候添加的Watcher
    new Watcher(vm, expr, (newVal) => {
      this.updater.textUpdater(node, newVal)
    })
    this.updater.textUpdater(node, value)
  },
  html(vm, node, expr) {
    const value = this.getVal(expr, vm)
    // 数据动态响应的时候添加的Watcher
    new Watcher(vm, expr, (newVal) => {
      this.updater.htmlUpdater(node, newVal)
    })
    this.updater.htmlUpdater(node, value)
  },
  /**
   * @param {*} vm 当前this
   * @param {*} node 当前节点
   * @param {*} expr 绑定的变量名称（v-model="falg"）就是falg
   */
  model(vm, node, expr) {
    // 获取到最新数据
    const value = this.getVal(expr, vm)
    // 数据动态响应的时候添加的Watcher
    new Watcher(vm, expr, (newVal) => {
      this.updater.modelUpdater(node, newVal)
    })
    this.updater.modelUpdater(node, value)
  },
  on(vm, node, expr, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr]
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  
  updater: {
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    modelUpdater(node, value) {
      node.value = value
    },
    textUpdater(node, value) {
      node.textContent = value
    },
  },
}

/**  AST语法树
 * <div id="app">
 * <p>hello</p>
 * </div>        =>
 * let root = {
 * tag:"div",
 * attrs:[{name:'id',value:'app'}],
 * parent:null,
 * type:1, 节点类型
 * children:{
 *   tag:'p',
 *   attrs:[],
 *   parent: root,
 *   type:1, 节点类型
 *   children:[
 *     text:"hello",
 *     type:3 文本类型
 *   ]
 * }
 * }
 */
