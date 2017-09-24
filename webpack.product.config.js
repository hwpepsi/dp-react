var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
    // 将 第三方依赖 单独打包
    vendor: [
      'react',
      'react-dom',
      // 'react-redux',
      // 'react-router',
      // 'redux',
      // 'es6-promise',
      // 'whatwg-fetch',
      // 'immutable'
    ]
  },
  output: {
  path: __dirname + "/build",
    filename: "[name].js",
    publicPath: '/'
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { 
        test: /\.(css|scss)$/, 
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']     
      })
      },

      {
        test:/\.(gif|png|jpe?g|svg)$/i,
        use:['file-loader?limit=500&name=images/[name].[ext]',
            //压缩图片文件
            'image-webpack-loader'
        ]//当图片大小小于这个限制的时候，会自动启用base64编码图片。减少http请求,提高性能
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, 
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin("Copyright by zachrey@github.com."),

    // html 模板插件
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin({
      filename:'[name].bundle.css',
      //disable:true,
      allChunks:true
    }),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
};