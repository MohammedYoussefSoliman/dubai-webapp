const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    building: "./src/index.js",
    floor: "./src/floor.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
  },
  mode: "none",
  // target: "node",
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.svg/,
        type: "asset/resource",
        generator: {
          filename: "images/svgs/[hash][ext][query]",
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      // {
      //   test: /\.json$/i,
      //   use: [
      //     {
      //       loader: "json-loader",
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["building"],
    }),
    new HtmlWebpackPlugin({
      filename: "floor.html",
      template: "./src/floor.html",
      chunks: ["floor"],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "data/data.json"),
    //       to: path.resolve(__dirname, "dist", "data/data.json"),
    //     },
    //   ],
    // }),
  ],
};
