const  path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    // entry: './src/index.js',
    output: {
        filename: 'main.[contentHash].js',
        path: path.join(__dirname,'docs')
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use :[
                        'style-loader',
                        'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use :[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use :[
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: false,
                            minimize: false
                        }
                    }
                ]                
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use :[
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ] 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            ignoreOrder: false,
            filename: '[name].[contentHash].css'
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ]
}