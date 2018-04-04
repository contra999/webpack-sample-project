
const webpack = require('webpack');
/**
 * 依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。
 * 这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。
 * html-webpack-plugin 将html也生成在内存里, 对比webpack-dev-server
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "eval-source-map",

  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",  // 使用html-webpack-plugin插件后的出口路径
    // path: __dirname + "/public",
    filename: "bundle.js" // 打包的文件在开发环境下生成在内存里, 生成环境才会打包到path路径里
  },

  // webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中(但是需要html, 对比html-webpack-plugin)
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
    new webpack.HotModuleReplacementPlugin()  // 热加载插件
  ]
};