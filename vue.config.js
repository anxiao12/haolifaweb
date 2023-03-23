module.exports = {
  baseUrl: '/',
  lintOnSave: false,
  devServer: {
    port: 8082,
    proxy: {
      '/haolifa': {
        target: 'http://127.0.0.1/',
        target: 'http://47.105.36.56:8080/',
        changeOrigin: true
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    plugins: []
  }
};