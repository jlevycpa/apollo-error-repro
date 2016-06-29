var path = require('path');
var fs = require('fs');

module.exports = {
  //It's a good idea for css to get loaded first to avoid flickering
  entry: ["./src/app.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: [ "node_modules", __dirname + "/src" ]
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
