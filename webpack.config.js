require('babel-polyfill');
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    path: resolve(__dirname, './public/dist'),
    filename: '05142018-2155.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [resolve('./public/styles')],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000000,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.png', '.woff', '.woff2', '.css', '.ttf', '.eot', '.svg'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  watch: false,
  watchOptions: {
    ignored: /node_modules/,
  },
};
