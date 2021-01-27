const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        // removeAvailableModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 4,
            minSize: 0,
            maxSize: 550000
        },
        // minimizer: [
        //     // new OptimizeCSSAssetsPlugin({}),
        //     new TerserPlugin({
        //         extractComments: true,
        //         cache: true,
        //         parallel: true,
        //         sourceMap: true, // Must be set to true if using source-maps in production
        //         terserOptions: {
        //             // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        //             extractComments: 'all',
        //             compress: {
        //                 drop_console: true,
        //             },
        //         }
        //     })
        // ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
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