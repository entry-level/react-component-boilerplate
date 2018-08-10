const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

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
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  plugins: [
    ...getPagePlugins('./examples_src/**/*.html', true),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
