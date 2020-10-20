
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    entry: ['./src/app.js'],
    mode: "development",
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        host: "dev.tms.tterpbeta.vn",
        port: 8089,
        https: false
    },
 

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: 'app/index.html'
    //     })
    // ],
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
                        presets: ["@babel/preset-env", "@babel/preset-react"],//'babel-preset-env', 'babel-preset-react', 'babel-preset-stage-3',
                        plugins: ['@babel/proposal-class-properties','@babel/proposal-object-rest-spread', '@babel/syntax-dynamic-import']
                       // plugins: [["transform-class-properties","syntax-dynamic-import", { spec: true }]] //{ spec: true }
                       
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