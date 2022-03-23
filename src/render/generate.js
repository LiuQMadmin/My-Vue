/** 根据ast树生成render函数
 * @param {*} el sat树
 * _c() => createElement()         创建元素节点
 * _v() => createTextNode()        创建文本节点
 * _s() => {{ name }} => _s(name)  读取变量值
 */
// render函数返回的数据格式
function vrender() {
  return `
    _c(
      "div",
      {
        "id": "app",
        "style": {
          "color": "red",
          "font-size": "20px"
        }
      },
      _v("你好，" + _s(name))
      _c(
        "span",
        {
          "class": "text",
          style: {
            "color": "green",
            "font-size": "20px"
          }
        },
        _s(age)
      )
    )
  `
}
var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g //匹配viwe 视图中的{{指令}}
// genProps和源码处理函数一致，把attr变成key:value的格式
function genProps(attrs) {
  let attrStr = ''
  attrs.forEach((attr) => {
    if (attr.name == 'style') {
      let styleAttrs = {}
      attr.value.split(';').map((styleAttr) => {
        let [key, value] = styleAttr.split(':')
        styleAttrs[key] = value
      })
      // 取出来是字符串，赋值进去是Object
      attr.value = styleAttrs
    }
    attrStr += `${attr.name}:${JSON.stringify(attr.value)},`
  })
  // 去掉字符串最后一位的‘逗号’，使用slice(0, -1)
  return `{${attrStr.slice(0, -1)}}`
}

// 判断子节点是元素节点还是文本节点
function generateChildren(node) {
  // 元素节点
  if (node.type === 1) {
    return generate(node)
    // 文本节点
  } else if (node.type === 3) {
    let text = node.text
    // 文本中不包含{{}}的时候
    if (!defaultTagRE.test(text)) {
      // 直接返回文本_v(text)
      return `_v(${JSON.stringify(text)})`
    }
    let match,
      index,
      lastIndex = (defaultTagRE.lastIndex = 0),
      textArr = []
    while ((match = defaultTagRE.exec(text))) {
      index = match.index
      // 根据lastIndex 和 index 截取出来对应的字符串
      // lastIndex是正则表达式defaultTagRE匹配出来的最后一位，
      // 例如：defaultTagRE.exec("你好啊，{{ name }}欢迎")
      // lastIndex就在"你好啊，{{ name }}|欢迎"，等于14
      // index就等于开始匹配的位置  "你好啊，|{{ name }}|欢迎"，等于4
      // index > lastIndex 的时候表示没有匹配到 {{name}} 变量
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      textArr.push(`_s(${match[1].trim()})`)
      // 这两种写法都可以，就是为了拿到下表截取字符串
      // lastIndex = index + match[0].length
      lastIndex = defaultTagRE.lastIndex
    }
    // 表示后面后面剩下纯文本没有匹配出来
    if (lastIndex < text.length) {
      // 把最后的纯文本再放入到数组中去
      textArr.push(JSON.stringify(text.slice(lastIndex)))
    }
    // console.log(`_v(${textArr.join('+')})`)
    return `_v(${textArr.join('+')})`
  }
}
// 把子节点变成render函数
function genChildren(el) {
  const children = el.children
  if (children) {
    return children.map((c) => generateChildren(c)).join(',')
  }
}
const generate = function generate(el) {
  let children = genChildren(el)
  let code = `_c(
      '${el.tag}',
      ${el.attrs && el.attrs.length > 0 ? genProps(el.attrs) : undefined},
      ${children ? children : ''}
    )
  `
  return code
}

export { generate }
