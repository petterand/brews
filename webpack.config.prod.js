const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
   entry: [__dirname + '/web/app.js', __dirname + '/web/style/style.less'],
   mode: 'production',
   output: {
      path: __dirname + '/dist/',
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
            test: /\.vue$/,
            loader: 'vue-loader'
         },
         {
            test: /\.html$/,
            loader: 'raw-loader'
         },
         {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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
   },
   plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
         filename: 'style.css'
      }),
      new CopyWebpackPlugin([
         { from: 'web/prod.html', to: 'index.html' }
      ]),
      new webpack.DefinePlugin({
         'process.env': {
            'NODE_ENV': JSON.stringify('production')
         }
      })
   ]
}