const path = require("path");

// config options can be found at https://webpack.js.org/configuration/

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets/js/"),
    filename: "bundle.js",
    publicPath: "assets/"
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
