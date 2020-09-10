import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "./src/index.js", // 打包入口
  output: {
    file: "dist/umd/vue.js", // 出口
    name: 'Vue', // 指定一个打包后全局变量的名字
    format: "umd", // 统一模块规范
    sourcemap: true, // 开启源码调试
  },
  plugins: [
    babel({
      exclude: "node_modules/**" // 忽略这个文件下面的所有文件
    }),
    process.env.ENV === "development" ? // 开发环境配置这个服务
      serve({
        open: true,
        openPage: "/public/index.html", // 打开那个文件
        port: 8080,
        contentBase: ""
      }) : null
  ]
}