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
  },

  pwa: {
    name: 'Dashboard',
    themeColor: '#504299',
    msTileColor: '#FFFFFF'
  },

  runtimeCompiler: undefined
}
