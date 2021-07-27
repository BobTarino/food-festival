const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
const webpack = require("webpack");

module.exports = {
  // entry points so webpack will know where to start the bundle of dependecies 
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    // add file-loader to webpack configuration - will identify files to pre-process using test property to find regex matching a .jpg file
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            // return file with proper path and file name
            options: {
              esModule: false,
              name (file) {
                return "[path][name].[ext]"
              },
              publicPath: function(url) {
                return url.replace("../", "/assets/")
              }
            }  
          },
          // reduce image size with image optimizer loader
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    })
  ],
  mode: 'development'
};
