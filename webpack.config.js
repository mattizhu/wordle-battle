const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './wordlebattleonline.js',
    output: {
        filename: 'wordlebattleonline.min.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.svg$/,
            use: '@svgr/webpack'
        }]
    },
    devServer: {
        port: 8080,
        hot: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
