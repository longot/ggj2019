const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const BabelWebpackPlugin = require('babel-webpack-plugin')
const ArchivePlugin = require('webpack-archive-plugin');
const commonConfigs = require('./webpack.common.js')
const packageJSON = require('./package.json')

module.exports = merge(commonConfigs, {
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify('true'),
      __DEV__: JSON.stringify('false')
    }),
    new BabelWebpackPlugin({
      test: /\.js$/,
      presets: ['env'],
      sourceMaps: false,
      compact: false
    }),
    new UglifyJSPlugin(),
    new ArchivePlugin({
      output: `SampleGame.${packageJSON.version}`,
      format: 'zip'
    })
  ]
})
