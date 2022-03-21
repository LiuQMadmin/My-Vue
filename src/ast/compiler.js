import { parseHTMLtoAST } from './astParser'
const compileToRenderFunction = function (html) {
  // 将html转化成ast树parseHTMLtoAST --> 源码parseHTML()方法去处理
  const ast = parseHTMLtoAST(html)
  return ast
}
export { compileToRenderFunction }
