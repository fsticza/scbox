// vue.config.js
const path = require('path')

module.exports = {
  configureWebpack: {
    externals: {
      WebCam: 'WebCam'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname, 'node_modules')]
      }
    }
  }
}
