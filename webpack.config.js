const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATH = {
  SRC: path.join(__dirname, "./src"),
  COMPONENTS: path.join(__dirname, "./src/utils"),
  UTILS: path.join(__dirname, "./src/components"),
  DIST: path.join(__dirname, "./dist"),
};

module.exports = {
  mode: "development",
  entry: {
    main: path.join(PATH.SRC, "index.tsx"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
  },
  devtool: "source-map",
  devServer: {
    compress: false,
    hot: true,
    https: false,
    open: true,
    port: 3000,
    proxy: {
      "/api/**": "http://localhost:8080",
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  },
};
