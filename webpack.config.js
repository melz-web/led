require('./env.js');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const compact = (o) => o.filter((v) => !!(v));

module.exports = () => {
  const isProduction = process.env['NODE_ENV'] === 'production';
  return {
    mode: (isProduction) ? 'production' : 'development',
    context: path.resolve(__dirname, 'app/client'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      clean: true
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/i, loader: 'babel-loader' },
        { test: /\.(css|scss)$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
        { test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i, type: 'asset' },
      ]
    },
    plugins: compact([
      new EnvironmentPlugin(['NODE_ENV']),
      new HtmlPlugin({ template: 'index.html' }),
      new MiniCssExtractPlugin(),
      (isProduction) && new WorkboxWebpackPlugin.GenerateSW()
    ]),
    devServer: {
      proxy: {
        context: '/state',
        target: `ws://localhost:${process.env['PORT']}`,
        ws: true
      }
    }
  };
};
