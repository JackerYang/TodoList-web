module.exports = {

  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : './',

  // 打包生成文件夹
  outputDir: 'dist',
  // 放置生成的静态资源文件夹的 (相对于 outputDir 的) 目录
  assetsDir: 'static',

  // 生产环境 sourceMap
  productionSourceMap: false,

  // 使用less
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  
};
