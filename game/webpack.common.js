const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageJSON = require('../package.json')

const phaser = path.join(__dirname, '../node_modules/phaser-ce/build/custom/phaser-arcade-physics.js')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: './',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJSON.version)
    }),
    new CopyWebpackPlugin([
      { from: './game/src/index.html', to: 'index.html' },
      { from: './game/src/locacle.js', to: 'locacle.js' },
      { from: phaser, to: 'vendor.js' }
    ]),
    new webpack.ExtendedAPIPlugin(),
  ],
  module: {
    rules: [
      { test: /main\.js$/, use: ['babel-loader'] },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: [ 'file-loader?publicPath=&name=[name].[ext]']},
      { test: /\.(json|bmp|aac|ac3|caf|flac|m4a|mp3|mp4|ogg|wav|webm)$/, use: 'file-loader?publicPath=&name=[name].[ext]'},
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(woff|woff2)$/, use: ['base64-font-loader'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
