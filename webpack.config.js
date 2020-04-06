const path = require('path');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const autoprefixer = requre('autoprefixer');

const config = {
    entry: './src/quill-tweet.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'quill-tweet.js'
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    },
    module: {
        rules: [
        {
            test: /\.scss$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: 'css-loader' },
                { loader: 'sass-loader' },
            ]
        },
        {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "src/")
            ],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['env', {modules: false}],]
                }
            }
        },
        ]
    },
    optimization: {
        minimizer: [ new OptimizeCSSAssetsPlugin({}) ],
    },
    plugins: [
        new MiniCssExtractPlugin('quill-tweet.css'),
        new UglifyJSPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                join_vars: true,
                if_return: true
            },
            output: {
                comments: false
            }
        }),
    ]
};

module.exports = config;