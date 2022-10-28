const path = require('path');
const webpack = require('webpack');

const dotenv = require('dotenv');

module.exports = () => {
  dotenv.config();

  return {
    entry: path.resolve(__dirname, 'src/index.jsx'),
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
    },
    devServer: {
      historyApiFallback: {
        index: 'index.html',
      },
    },
    // devServer: {
    //   historyApiFallback: true,
    // },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};
