var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: resolveAppPath('src') + '/index.js',
  output: {
    path: resolveAppPath('dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'treeview-component',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {importLoaders: 1, modules: true}}],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.json', '.tsx', '.css', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: resolveAppPath('public'),
    },
    compress: true,
    hot: true,
    port: 3000,
  },
};
