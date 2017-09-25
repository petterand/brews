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
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname + '/web/',
        publicPath: __dirname + '/web/out',
        inline: true,
        port: 9099
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
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            }
        ]
    }
}