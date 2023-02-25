const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const styleLoader = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: isProduction
        ? '[hash:base64:5]'
        : '[local]__[hash:base64:5]',
      auto: true,
    },
  },
};

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index',
  output: {
    publicPath: 'auto',
    chunkFilename: isProduction ? '[contenthash].bundle.js' : '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@api': path.resolve(__dirname, 'src/api/'),
    },
    fallback: {
      stream: false,
      http: false,
      https: false,
      zlib: false,
      util: false,
      assert: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: !isProduction,
        },
      },
      {
        test: /\.css$/,
        use: [styleLoader, cssLoader],
      },
      {
        test: /\.s[ac]ss$/,
        use: [styleLoader, cssLoader, 'sass-loader'],
      },
      {
        test: /\.(a?png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff2?|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
    }),
    ...(isProduction ? [] : [new ForkTsCheckerWebpackPlugin()]),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      logging: 'warn',
    },
    devMiddleware: {
      stats: 'minimal',
    },
  },
  devtool: isProduction ? false : 'source-map',
};
