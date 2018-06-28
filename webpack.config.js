const path = require("path");

// config options can be found at https://webpack.js.org/configuration/

module.exports = {
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js")
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\..js$/,
        loader: "babel-loader",
        options: {
          presets: ["dev"]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
