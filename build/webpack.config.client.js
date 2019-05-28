// const path = require('path')
// const HTMLPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
// const merge = require('webpack-merge')
// const ExtractPlugin = require('extract-text-webpack-plugin')
// const baseConfig = require('./webpack.config.base')
// const VueClientPlugin = require('vue-server-renderer/client-plugin')

// const isDev = process.env.NODE_ENV === 'development'

// const defaultPlugins = [                                                // 不配置以下两个plugin， 访问到的是文件目录
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: isDev ? '"development"' : '"production"'
//       }
//     }),
//     new HTMLPlugin({
//     //   template: path.join(__dirname, 'template.html')
//     }),
//     new VueClientPlugin()
// ]

// const devServer = {
//     port: 8000,
//     host: '0.0.0.0',
//     overlay: {
//       errors: true,
//     },
//     historyApiFallback: {
//         index: '/public/index.html'
//     },
//     // proxy: {
//     //     '/api': 'http://127.0.0.1:3333'
//     // },
//     hot: true
// }

// let config

// if (isDev) {
//   config = merge(baseConfig, {                                      // merge不会覆盖baseConfig， 会生成一个新的Object
//     // mode: 'dev',
//     devtool: '#cheap-module-eval-source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.less$/,
//                 use: [
//                   'style-loader',
//                   'css-loader',
//                   {
//                     loader: 'postcss-loader',
//                     options: {
//                       sourceMap: true,
//                     }
//                   },
//                   'less-loader'
//                 ]
//             }
//         ]
//     },
//     devServer,
//     plugins: defaultPlugins.concat([
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoEmitOnErrorsPlugin()
//     ])
//   })
// } else {
//     config = merge(baseConfig, {
//         // mode: 'production',
//         entry: {
//             app: path.join(__dirname, '../client/index.js'),
//             vendor: ['vue']
//         },
//         output: {
//             filename: '[name].[chunkhash:8].js'
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.styl$/,
//                     use: ExtractPlugin.extract({
//                       fallback: 'vue-style-loader',
//                       use: [
//                         'css-loader',
//                         {
//                           loader: 'postcss-loader',
//                           options: {
//                             sourceMap: true,
//                           }
//                         },
//                         'stylus-loader'
//                       ]
//                     })
//                 },
//                 {
//                     test: /\.less$/,
//                     use: ExtractPlugin.extract({
//                       fallback: 'vue-style-loader',
//                       use: [
//                         'css-loader',
//                         {
//                           loader: 'postcss-loader',
//                           options: {
//                             sourceMap: true,
//                           }
//                         },
//                         'less-loader'
//                       ]
//                     })
//                 },
//             ]
//         },
//         plugins: defaultPlugins.concat([
//             new ExtractPlugin('styles.[contentHash:8].css'),                                // 打包css到单独的文件
//             new webpack.optimize.CommonsChunkPlugin({
//                 name: 'vendor'
//             }),
//             new webpack.optimize.CommonsChunkPlugin({
//                 name: 'runtime'
//             })
//         ])
//     })
// }


// module.exports = config



const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin()
]

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  historyApiFallback: {                                     // 开启支持本地mode： history模式   需要考虑webpack.config.base的publicPath
      index: '/index.html'
  },
  hot: true
}

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                        sourceMap: true,
                        }
                    },
                    'less-loader'
                    ]
                })
            },
        ]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
            test: /\.less$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                    sourceMap: true,
                    }
                },
                'less-loader'
                ]
            })
        },
      ]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}

module.exports = config
