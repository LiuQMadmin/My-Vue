import { parseHTMLtoAST } from './astParser'
import { generate } from '../render/generate'
const compileToRenderFunction = function (html) {
  // 将html转化成ast树parseHTMLtoAST --> 源码parseHTML()方法去处理
  const ast = parseHTMLtoAST(html)
  // 将ast树转成render函数
  const code = generate(ast)
  const render = new Function(`
    with(this) { return ${code} }
  `)
  return render
}
export { compileToRenderFunction }
