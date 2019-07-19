import { resolve } from "path"
import * as zlib from "zlib"

import {
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  ProgressPlugin,
  SourceMapDevToolPlugin,
} from "webpack"

import * as CompressionWebpackPlugin from "compression-webpack-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin"
import * as TerserWebpackPlugin from "terser-webpack-plugin"

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
    metrika: PATH("./src/scripts/metrika.ts"),
    scripts: [
      PATH("./src/scripts/anchor-link.ts"),
      PATH("./src/scripts/overlay.ts"),
      PATH("./src/scripts/text-review.ts"),
      PATH("./src/scripts/video-review.ts"),
    ],
  },

  resolve: {
    extensions: [".ts", ".mjs", ".js", ".json"],
    mainFields: [ "browser", "module", "main"],
    symlinks: true,
  },

  output: {
    path: PATH("./artifacts"),
    publicPath: "/",
    filename: `js/[name].[hash:10].js`,
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
        loader: "file-loader",
        options: {
          name: "[name].[hash:10].css",
          outputPath: "css",
          publicPath: "/css",
        },
      },{
        loader: "extract-loader",
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
    },{
      // === TypeScript ===
      test: /\.ts$/,
      use: [{
        loader: "ts-loader",
      }],
    }],
  },

  plugins: [
    new ProgressPlugin(),

    new LoaderOptionsPlugin({
      debug: !isProduction,
      sourceMap: !isProduction,
      minimize: isProduction,
    }),

    new DefinePlugin({
      DEFINE_APP_NAME: JSON.stringify(PKG.name),
      DEFINE_APP_VERSION: JSON.stringify(PKG.version),
      DEFINE_DEBUG: JSON.stringify(!isProduction),
    }),

    new HtmlWebpackPlugin({
      template: PATH("./src/index.html"),
      inject: "head",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
  ].concat(isProduction ? [
    // === Production mode plugins ===
    new CompressionWebpackPlugin({
      test: /\.(css|js|json|html|svg)$/i,
      filename: "[path].gz",
      algorithm: "gzip",
      compressionOptions: { level: 9 }
    }),

    new CompressionWebpackPlugin({
      test: /\.(css|js|json|html|svg)$/i,
      filename: "[path].br",
      algorithm(input, _, callback) {
        return (<any>zlib).brotliCompress(input, {
          params: {
            [(<any>zlib).constants.BROTLI_PARAM_MODE]: (<any>zlib).constants.BROTLI_MODE_GENERIC,
            [(<any>zlib).constants.BROTLI_PARAM_QUALITY]: 11,
          }
        }, callback)
      }
    })
  ] : [
    // === Development mode plugins ===
    new SourceMapDevToolPlugin({
      filename: "[file].map",
      include: [/js$/, /css$/],
    }),

    new HotModuleReplacementPlugin()
  ]),

  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: "single",
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: false,
        cache: true,
        terserOptions: {
          ecma: 6,
          safari10: true,
          ie8: false,
          output: {
            ascii_only: true,
            comments: false,
            webkit: true,
          },
          compress: {
            pure_getters: true,
            passes: 3,
            global_defs: {
              ngDevMode: false,
              ngI18nClosureMode: false,
            },
          },
        },
      }),
    ],
  },

  performance: {
    hints: false,
  },

  node: false,
  profile: false,
  devtool: isProduction ? false : "cheap-eval-source-map",

  stats: "minimal",

  devServer: {
    clientLogLevel: "warning",
    compress: isProduction,
    contentBase: PATH("./assets"),
    disableHostCheck: true,
    historyApiFallback: true,
    hot: !isProduction,
    progress: true,
    stats: "minimal",
  }
} as Configuration
