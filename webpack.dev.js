const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: false,
  plugins: [
      new webpack.SourceMapDevToolPlugin({
          filename: '[name].js.map',
          exclude: ['vendors~main.js']
      }),
      new BundleAnalyzerPlugin()
  ],
  devServer: {
    publicPath: '/scripts/',
    contentBase: './client/public',
    watchContentBase: true
  }
});