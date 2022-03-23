# My-Vue

### Vue 解析 AST 树

1. 获取到 template 模板
2. template -> AST 树
3. AST 树 -> render 函数(源码通过 generate 函数被渲染执行) -> \_c() \_v() \_s()
4. render 函数执行 -> 虚拟节点（vnode）
5. 虚拟节点(document.createElement) -> 真实节点
6. 真实节点(patch 打补丁) -> 渲染到页面
