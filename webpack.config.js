
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {

  entry: __dirname + '/src/js/components/app.js',

  output: {
    path: __dirname + '/build',
    filename: 'build.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.sass$/,
        loaders: ['style','css', 'sass']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }

};
