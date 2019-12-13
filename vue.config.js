module.exports = {
  assetsDir: 'assets',   //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8081',
    https: false,   //是否使用https协议
    hotOnly: false, //是否开启热更新
    proxy: {
      '/api': {
        target: 'http://172.100.14.56:9999', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  transpileDependencies: [/\bvue-echarts\b/, /\bresize-detector\b/],
  publicPath: ''
}
