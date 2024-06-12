const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

const getPlugins = (chunks) => {
  return chunks.map(
    (ele) =>
      new HtmlPlugin({
        title: "QuickQuery | Home",
        filename: `${ele}.html`,
        chunks: [ele],
      })
  );
};

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.resolve("./src/popup/popup.tsx"),
    options: path.resolve("./src/options/options.tsx"),
    sidePanel: path.resolve("./src/sidePanel/sidePanel.tsx"),
    background: path.resolve('./src/background/background.ts'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("./src/static/manifest.json"),
          to: path.resolve("./dist"),
        },
        {
          from: path.resolve(__dirname, "src/static/icon.png"),
          to: path.resolve(__dirname, "dist"),
        }
      ],
    }),
    ...getPlugins(["popup", "options", "sidePanel"]),
  ],

  output: {
    filename: "[name].js",
  },
};
