import { isElementNode, isDirective } from "../uitls/index";
export function node2Fragment(el) {
  // 创建文档碎片
  const f = document.createDocumentFragment();
  let firstChild;
  while (firstChild = el.firstChild) {
    // 添加到文档碎片里面去，同时移除el里面对应的元素节点
    f.appendChild(firstChild);
  }
  return f;
}

// 编译模板
export function compile(vm, fragment) {
  // 获取文档碎片里面元素的属性并且转称元素属性数组，准备转化成render函数,
  // 把fragment转化成对象AST树的的形式去描述
  const childNodes = fragment.childNodes;
  [...childNodes].forEach((child) => {
    if (isElementNode(child)) {
      // 是元素节点
      compileElement.call(vm, child);
    } else {
      // 文本节点
    }
    if (child.childNodes && child.childNodes.length) {
      compile(vm, child);
    }
  })
}
// 元素节点编译
function compileElement(node) {
  // 元素内部属性
  const attributes = node.attributes;
  [...attributes].forEach(attr => {
    const { name, value } = attr;
    if (isDirective(name)) { // 如果是指令 v-text v-html v-model v-on v-bind
      const [, dirctive] = name.split("-"); //text html model on:click
      const [dirName, eventName] = dirctive.split(":");
      compileUtil[dirName](this, node, value, eventName);
      node.addEventListener("input", (e) => {
        console.log("12121212");
      })
      // 删除标签v-
      node.removeAttribute("v-" + dirctive);
    }
  })
}

const compileUtil = {
  // 获取$data里面的数据
  getVal(expr, vm) {
    return expr.split(".").reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data)
  },
  bind(vm, node, expr, className) {
    console.log(node, "nodexxx")
    const value = this.getVal(expr, vm);
    node[className + "List"].add(value); // node.classList.add()为该元素添加class属性
  }
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