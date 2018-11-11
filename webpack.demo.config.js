const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfigFn = require('./webpack.helper');
var baseConfig  = webpackConfigFn('demo', __dirname);

module.exports = Object.assign({}, baseConfig, {

    entry: {
        'demo': path.resolve(__dirname, './demo/app.tsx')
    },

    externals: [{
    }],

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './demo/index.html'),
            // favicon: path.resolve(__dirname, '../example/favicon.ico')
        })
    ]
});
