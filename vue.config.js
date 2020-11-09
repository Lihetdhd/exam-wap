const path = require("path");
const webpack = require("webpack");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //生产环境添加根路径
  outputDir: "dist", //打包生成文件的名称
  assetsDir: "static", //放置静态文件（css、js、img..）的目录
  lintOnSave: false, //保存代码时是否Eslint检测
  productionSourceMap: false, //改为false以加速生产环境构建，否则打包会出现map文件，(map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错)。

  /* webpack-dev-server 相关配置 */
  devServer: {
    open: false, //自动打开浏览器
    https: false, //是否配置https请求
    hotOnly: true, //热跟新
    disableHostCheck: true,
    // 代理（解决跨域）
    proxy: {
      iqtc: {
        target: "http://192.168.43.16:15001", //代理的地址
        secure: false, //是https请求需要配置
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端(是否跨域)
        pathRewrite: {
          // '/api'会替换成'/'
          "^/iqtc": "/iqtc",
        },
      },
    },
  },
  //设置别名
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@comp": resolve("src/components"),
        "@images": resolve("src/assets/images"),
        "@utils": resolve("src/utils"),
        "@api": resolve("src/api"),
        "@views": resolve("src/views"),
        "@assets": resolve("src/assets"),
      },
    },
  },
};
