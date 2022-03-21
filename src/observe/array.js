// 我要重写数组的那些方法：push、shift、unshift、pop、reverse、sort、splice会导致数组发生变化
let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods; // 一层一层向上查找，原型链查找问题
// arrayMethods.__proto__ = oldArrayMethods;(Object.create()第一个参数就是存放着原型对象)
// 本来value__proto__.__proto__ = Object.prototype, 相当于直接更改最高作用域里面顶层作用域链
export const arrayMethods = Object.create(oldArrayMethods) // 相当于继承

const methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']
// 重写原有的方法

methods.forEach((method) => {
  arrayMethods[method] = function () {
    // 把arguments类数组变成真正的args数组，arguments是方法传过来的数组
    var args = Array.prototype.slice.call(arguments)
    // this => 相当于value调用的（原数组方法执行，改变数组）
    const result = oldArrayMethods[method].apply(this, args) // 调用原生的数组方法（切片编程）
    let inserted // 当前用户插入的元素
    let ob = this.__ob__ // 因为是value再调用，所以可以直接this__ob__
    switch (method) {
      // 这里直接是新增一项数组元素
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice': // 3个参数， splice有删除，新增， arr.splice(0, 1, { name: 1 })
        // 只需要拿出来新增的一项{name: 1}或者是其他，从第2个取到最后
        inserted = args.slice(2)
        break
      default:
        break
    }
    // inserted有可能不存在，splice里面乜有第三个参数就会不存在
    if (inserted) {
      // inserted肯定是个数组
      // inserted ------> [.....]都会是数组
      // 判断添加的数据是不是数组，如果是继续添加监听数据
      ob.observeArray(inserted)
    }
    // return 没有用
    return result
  }
})
