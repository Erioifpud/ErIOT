const VConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new VConsolePlugin({
        filter: [],
        enable: true
      })
    ]
  }
}
