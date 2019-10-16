const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = env => {
  // console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  // console.log('Production: ', env.production); // true
  return {
    entry: './src/index.js',
    output: {
      filename: 'main.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      // 设置别名
      alias: {
        '@': resolve('src')
      }
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
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
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