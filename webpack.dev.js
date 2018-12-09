const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  plugins: [
      new webpack.SourceMapDevToolPlugin({
          filename: '[name].js.map',
          exclude: ['vendors~main.js']
      })
  ],
  devServer: {
    contentBase: './client/public',
    watchContentBase: true
  }
});