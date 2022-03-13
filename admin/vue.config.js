const path = require('path');
const resolve = function(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-admin-webapp/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
  },
}