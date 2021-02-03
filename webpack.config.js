'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");



module.exports = {
    entry: ['./src/app.js'],
    mode: "development",
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        host: "dev.tms.tterpbeta.vn",
        port: 8089,
        https: false
    },
    
    // 	devServer: {
    //     historyApiFallback: true,
    //     contentBase: './',
    //     hot: true
    //   },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-3'],
                        plugins: [["transform-class-properties", "syntax-dynamic-import", { spec: true }]]
                    }
                }
            },

            {
                // test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: "url-loader?limit=100000"
            }

        ]
    }
}