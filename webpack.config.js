var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'wwwroot/client/public');
var APP_DIR = path.resolve(__dirname, 'wwwroot/client/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module : {
        rules : [
        {
            test : /\.jsx?/,
            include : APP_DIR,
            loader : 'babel-loader'
        }
        ]
    },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendors~main.js']
        })
    ]
};

module.exports = config;