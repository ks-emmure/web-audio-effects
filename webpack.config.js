const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'dev/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        }, 'eslint-loader'],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.pug/,
        exclude: /(node_modules)/,
        use: {
          loader: 'pug-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /(node_modules)/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'dev/index.pug'),
    }),
    new RuntimeAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  devtool: 'inline-cheap-module-source-map',
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'dev/assets'),
      dev: path.resolve(__dirname, 'dev'),
    },
  },
};
