const { join, resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const manifest = require('../dll/vendor-manifest.json');
const { DEV_PORT, DEV_IP, getEntries, getPagePlugins } = require('./helper');
const BASE_DIR = join(__dirname, '..');

module.exports = {
  entry: getEntries('./examples_src/**/*.js', true),
  output: {
    path: join(BASE_DIR, 'dist'),
    filename: '[name].[hash].js',
    publicPath: `http://${DEV_IP}:${DEV_PORT}/`,
  },
  mode: 'development',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|\/lib\//,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },

    ],
  },
  plugins: [
    ...getPagePlugins('./examples_src/**/*.html', true),
    new AddAssetHtmlPlugin({
      filepath: resolve(__dirname, '../dll/*.dll.js'),
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest,
    }),
  ],
};
