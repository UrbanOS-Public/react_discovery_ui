const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {
  const productionOptimizationsEnabled = argv.mode === 'production'

  let plugins = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new CopyWebpackPlugin([
      { from: 'config' }
    ])
  ]

  return {
    watch: true,
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
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        ident: 'postcss',
                      },
                    ],
                  ],
                },
              },
            },
            'sass-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        }
      ]
    },
    devServer: {
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
        }),
      ],
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      }
    }
  }
}
