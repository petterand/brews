const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [__dirname + '/web/app.js', __dirname + '/web/style/style.less'],
    output: {
        path: __dirname + '/web/out/',
        filename: 'bundle.js',
        publicPath: '/out/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname + '/web/',
        publicPath: '/out/',
        inline: true,
        port: 9099,
        proxy: {
            '/api': 'http://localhost:8888'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?name=fonts/[name].[ext]"
            },
            {
                test: /\.(woff|woff2|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
            }
        ]
    }
}