import { resolve } from "path"
import { readdirSync } from "fs"

import {
  Configuration,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  ProgressPlugin,
  SourceMapDevToolPlugin,
} from "webpack"

import * as HtmlWebpackExcludeAssetsPlugin from "html-webpack-exclude-assets-plugin"
import * as HtmlWebpackInlineSourcePlugin from "html-webpack-inline-source-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"

const isProduction = process.env.NODE_ENV === "production"
const PATH = (...p: Array<string>) => resolve(__dirname, ...p)
const PKG = require("./package.json")

const postCSSPlugins = [
  require("postcss-import")(),
  require("postcss-gap-properties")(),
  require("autoprefixer")(),
  require("cssnano")({ preset: "default" }),
]

export default {
  name: PKG.name,

  mode: isProduction ? "production" : "development",
  target: "web",

  context: PATH("./src"),

  entry: {
    styles: PATH("./src/styles/index.css"),
  },

  resolve: {
    symlinks: true,
  },

  output: {
    path: PATH("./templates"),
    crossOriginLoading: false,
    futureEmitAssets: true,
  },

  module: {
    rules: [{
      // === HTML ===
      test: /\.html$/i,
      use: [{
        loader: "html-loader",
        options: {
          attrs: ["img:src", "link:href", "source:srcset"],
          minimize: true,
        },
      }]
    },{
      // === Styles ===
      test: /\.css$/i,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },{
        loader: "css-loader",
        options: { importLoaders: 1 },
      },{
        loader: "postcss-loader",
        options: {
          ident: "main",
          plugins: postCSSPlugins
        }
      }]
    }],
  },

  plugins: [
    new ProgressPlugin(),

    new LoaderOptionsPlugin({
      debug: !isProduction,
      sourceMap: !isProduction,
      minimize: isProduction,
    }),

    new MiniCssExtractPlugin(),

    ...readdirSync(PATH("./src"))
    .filter(file => file.match(/\.html$/))
    .map(file => new HtmlWebpackPlugin({
      template: PATH(`./src/${file}`),
      filename: file,
      inlineSource: "\.css$",
      excludeAssets: /\.js$/,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    })),

    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackExcludeAssetsPlugin(),

    {apply(compiler) {
      compiler.hooks.emit.tap("SuppressAssets", (compilation) => {
        Object.keys(compilation.assets)
        .filter(asset => !asset.match(/\.html$/))
        .forEach(asset => delete compilation.assets[asset])

        // compilation.hooks.afterSeal.tap("SuppressChunks", () => {
        //   compilation.chunks.forEach(chunk => {
        //     chunk.files = []
        //   })
        // })
      })
    }},
  ].concat(isProduction ? [] : [
    // === Development mode plugins ===
    new SourceMapDevToolPlugin({
      filename: "[file].map",
      include: [/js$/, /css$/],
    }),

    new HotModuleReplacementPlugin()
  ]),

  performance: {
    hints: false,
  },

  node: false,
  profile: false,
  devtool: isProduction ? false : "cheap-eval-source-map",

  stats: "errors-warnings",

  devServer: {
    clientLogLevel: "warning",
    compress: isProduction,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: !isProduction,
    progress: true,
    stats: "minimal",
  }
} as Configuration
