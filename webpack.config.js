const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();

  return {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@fixtures': path.resolve(__dirname, 'fixtures'),
      },
    },
    devServer: {
      historyApiFallback: {
        index: '/index.html',
      },
      proxy: {
        '/api': { // /api로 시작하면 아래의 타켓으로 이동
          target: 'https://nextjsintro-flame.vercel.app',
          changeOrigin: true,
        },
      },
    },
    // devServer: {
    //   historyApiFallback: {
    //     index: 'index.html',
    //   },
    // },
    // devServer: {
    //   historyApiFallback: true,
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      // build 시 index.html 템플릿을 사용하여 html 파일을 생성
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        publicPath: '/',
      }),
    ],
  };
};
