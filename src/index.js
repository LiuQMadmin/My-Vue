// 该文件就是一个vue的声明
import { initMixin } from "./init";
function Vue(options) {
  // 进行vue的初始化操作
  this._init(options);
}

// 通过引入文件的方式 给vue原型上面添加方法
initMixin(Vue);
export default Vue;