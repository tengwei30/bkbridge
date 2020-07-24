const path = require('path')
// const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bkbridge.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'bkbridge',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  devtool: 'source-map',
  target: 'web',
  optimization: {
    minimizer: [
      // 压缩JS
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true, // 去除debugger
            drop_console: true, // 去除console.log
          },
          warnings: false,
        },
        cache: true, // 开启缓存
        parallel: true, // 平行压缩
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}
