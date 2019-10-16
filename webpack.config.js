const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
  // console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  // console.log('Production: ', env.production); // true
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './public/index.html'),
        showErrors: true,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          query: {
            removeSVGTagAttrs: false
          }
        }
      ]
    }
  }
}