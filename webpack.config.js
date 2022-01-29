'use strict'
module.exports = {
  entry: ['./src/app.js'],
  mode: 'development',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    host: 'dev.tms.tterpbeta.vn',
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
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'babel-preset-react', 'babel-preset-stage-3'],
            plugins: [['transform-class-properties', 'syntax-dynamic-import', { spec: true }]]
          }
        }
      },

      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      },

      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader?limit=100000'
      }
    ]
  }
}
