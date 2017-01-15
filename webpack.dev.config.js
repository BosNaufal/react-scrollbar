const path = require('path');

module.exports =
{

  entry: './develop/app.js',

  output: {
    path: '/dist',
    filename: 'react-scrollbar.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[a|c]ss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '*'],
    alias: {
      'react-scrollbar-js': path.resolve(__dirname, 'src/'),
    },
  },

  devtool: 'source-map',


  devServer: {
    contentBase: path.resolve(__dirname, 'develop/public'),
    publicPath: '/build/',
    clientLogLevel: 'none',

/** in webpack CLI
    inline: true,
    hot: true
    */
  },

};
