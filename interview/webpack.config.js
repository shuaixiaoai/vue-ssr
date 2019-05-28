const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV || 'production',     // development || production
    // target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',       // 转换为base64， 也封装了fileloader
                        options: {
                            limit: 1024,
                            name: '[name].[contentHash:7].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'      // 这里定义了， 代码里面可以引用
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin({
            template: path.join(__dirname, './build/template.html')
        })
    ]
}
console.log(isDev)
if (isDev) {
    // config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',             // 这样子本机ip也可以访问， localhost不可以
        overlay: {
            errors: true
        },
        // open: true,
        // historyFallback: {      // 前端路由映射到index.js

        // },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.mode = 'production'
    config.entry = {
        entry: path.join(__dirname, 'src/index.js'),
        // verdor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
              "css-loader"
            ]
          }
    );
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true 
            }),
            new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
        ],
        splitChunks: {
          chunks: 'all'
        },
        // minimizer: true,
        runtimeChunk: true
    };
    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
    )
}

module.exports = config;
