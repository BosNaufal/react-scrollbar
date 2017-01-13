var path = require('path');
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {

  entry: './src/js/components/app.js',

  output: {
    path: '/build',
    filename: 'build.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        loaders: ['style-loader','css-loader','sass-loader']
      }
    ]
  },

  devtool: 'source-map',


  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/build/",
    clientLogLevel: "none",
//    inline: true,
//    hot: true
  }

};
