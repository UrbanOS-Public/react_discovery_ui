const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const productionOptimizationsEnabled = argv.mode === 'production'

  const plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      chunkFilename: '[id].[fullhash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'config' }]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ]

  return {
    resolve: {
      fallback: {
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/")
      }
    },
    entry: {
      main: ['@babel/polyfill', path.join(__dirname, 'src', 'index.js')]
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
          test: /\.(pdf|jpg|png|gif|ico)$/,
          use: [{ loader: 'file-loader' }]
        },
        {
          test: /\.svg$/,
          use: [{ loader: 'svg-inline-loader' }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { plugins: [require('autoprefixer')()] }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    devServer: {
      static: { directory: path.join(__dirname, 'dist') },
      historyApiFallback: true,
      compress: productionOptimizationsEnabled,
      open: true,
      port: 9001
    },
    plugins: plugins,
    optimization: {
      minimize: productionOptimizationsEnabled,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              typeofs: false
            }
          }
        })
      ],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }
}
