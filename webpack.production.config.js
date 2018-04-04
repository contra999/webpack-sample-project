
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 清除之前打包的文件
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  // 正式环境下不用sourceMap, 能够大大压缩打包的代码
  devtool: 'none',

  entry: __dirname + "/app/main.js",
  output: {
    // 使用html-webpack-plugin插件后的出口路径
    path: __dirname + "/build",
    // path: __dirname + "/public",
    filename: "bundle-[hash].js"
  },

  devServer: {
    contentBase: "./public", // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, // 实时刷新
    hot: true // 启用热加载
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          // 配置提取到.babelrc文件里
          // options: {
          //   presets: [
          //     // 分别处理es6和jsx语法
          //     "env", "react"
          //   ]
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            // css模块化配置, 只对当前模块生效
            options: {
              modules: true,  // 指定启用css modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式 不指定则是一段字母数字混合
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin('版权所有, 翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"  // 模板文件路径
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),  // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.UglifyJsPlugin(),  // 压缩JS代码
    new ExtractTextPlugin("style.css"),  // 分离CSS和JS文件
    // 参数见https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ]
};