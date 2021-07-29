const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");


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
    // * new keword invokes constructor function
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    // add reporting tools with plugin to analyze potential problem areas.
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    // PWA manifest for downloaded app icon
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      // homepage for the PWA relative to location of the manifest file
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      // fingerprints tell webpack whether or not it should generate unique fingerprints (ex. manifest.lhge325d.json)
      fingerprints: false,
      // inject property determines whether the link to manifest.json is added to the Html
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};
