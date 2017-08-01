const webpack = require("webpack");
const path = require("path");
 
const DEV = path.resolve(__dirname, "client/dev");
const OUTPUT = path.resolve(__dirname, "client/output");
 
const config = {
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      include: DEV,
      loader: "babel-loader",
      options: { presets: ['es2015', 'react'] }
    }]
  }
};
 
module.exports = config;