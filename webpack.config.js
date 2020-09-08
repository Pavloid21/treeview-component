var path = require('path')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/register')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath)

module.exports = {
  entry: resolveAppPath('src'),
  output: {
    path: resolveAppPath('dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'treeview-component'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html')
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: resolveAppPath('public'),
    compress: true,
    hot: true,
    port: 3000,
    publicPath: '/'
  }
}
