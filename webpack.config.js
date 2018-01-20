var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var url = 'http://localhost:8888/kc/';
var port = 8892;
var host = 'localhost';

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : false,
  entry: ['./js/app.js', './admin/scss/_admin.scss'],
  output: {
    path: __dirname + "/dist",
    filename: "scripts.js"
  },
  module: {
    rules: [
      /*
      your other rules for JavaScript transpiling go in here
      */
      { // regular css files
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css-loader']),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
    ],
  },
  plugins: debug ? [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'app.css',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      host: host,
      port: port,
      proxy: url,
      files: ['dist/*.css', '**/*.php'],
    }, {
      reload: false
    }),
  ] : [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'app.css',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      host: host,
      port: port,
      proxy: url
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],


};