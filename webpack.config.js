const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './src/index.js');
const BUILD_DIR = path.resolve(__dirname, './build');
const TEMPLATE_DIR = path.resolve(__dirname, './src/template.index.html');

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: [
      '.js', '.jsx'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: TEMPLATE_DIR,
      inject: true
    })
  ]
};
