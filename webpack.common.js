const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/public/scripts');
const APP_DIR = path.resolve(__dirname, 'client/app');

let config = {
    entry: APP_DIR + '/Components/index.jsx',
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
            },
            {
                test: /\.tsx?$/,
                include : APP_DIR,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
    },
};

module.exports = config;