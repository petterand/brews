const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [__dirname + '/web/app.js', __dirname + '/web/style/style.less'],
    output: {
        path: __dirname + '/web/out/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new CopyWebpackPlugin([
            { from: 'web/prod.html', to: 'index.html' }
        ]),
        new webpack.DefinePlugin({
            'process_env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
}



// [{
//     loader: "style-loader"
// }, {
//     loader: "css-loader"
// }, {
//     loader: "less-loader"
// }]