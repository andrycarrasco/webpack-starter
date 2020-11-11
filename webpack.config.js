const  path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'development',
    // entry: './src/index.js',
    // output: {
    //     filename: 'main.js',
    //     path: path.join(__dirname,'dist')
    // },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()],
    },
    module: {
        rules: [
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
            filename: '[name].css'
        }),
    ]
}