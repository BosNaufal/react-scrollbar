var path = require('path');

module.exports =
{

  entry: path.resolve(__dirname, './app.jsx'),

  output: {
    path: './build',
    filename: 'react-scrollbar.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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

//  resolve: {
//    alias: {
//      'react-scrollbar-js': 'e:\\DevelopWeb\\_Forks\\_Scrollbar\\react-scrollbar-js\\',
//    }
//  },


  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: "/build/",
    clientLogLevel: "none",
//    inline: true,
//    hot: true
  }

};
