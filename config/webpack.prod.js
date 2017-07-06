let helpers = require('./helpers.js');
let webpack = require('webpack');
let HTMLPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
let BabiliPlugin = require("babili-webpack-plugin");

module.exports = {

  entry: {
    'main':  './src/main.js'
  },

  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/assets/header/',
    filename: '[name].js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    compress: true,
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      helpers.root('src'),
      helpers.root('node_modules')
    ]
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader :"raw-loader"
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                helpers.root('node_modules')
              ]
            }
          }
        ]
      },{
        test: /\.js$/,
        loader: 'babel-loader'
      },{
        test: /\.html/,
        loader: 'raw-loader'
      }]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new ExtractTextPlugin('[name].css'),
    new HTMLPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),
    new webpack.ProgressPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      __dirname
    ),
    new BabiliPlugin()
  ]
}
