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
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 4,
            minSize: 0,
            maxSize: 5500000
        },
    },
    plugins: [
        new CleanWebpackPlugin(),// clean thu mục trước khi build
        new HtmlWebpackPlugin({
            inject: true,
            template: "./index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/js', to: './src/js' },
                { from: './src/scripts', to: './src/scripts' },
                { from: './src/scripts', to: './src/scripts' },
                { from: './src/img', to: './src/img' },
                { from: './src/fonts', to: './src/fonts' },
                { from: './src/css', to: './src/css' },
                { from: './web.config', to: './' },
                { from: './main.css', to: './' },
            ],
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        }),
    ],
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