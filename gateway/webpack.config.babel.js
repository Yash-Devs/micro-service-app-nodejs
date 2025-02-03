import path from "path";
import nodeExternals from "webpack-node-externals";

export default {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
  },
  externals: [nodeExternals()], // Avoid bundling node_modules
  mode: process.env.NODE_ENV === "production" ? "production" : "development",  // Set mode based on environment
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map", // Optional for debugging
};
