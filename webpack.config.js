
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
                        presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-3'],
                        plugins: [["transform-class-properties", { spec: true }]]
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