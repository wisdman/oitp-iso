import { resolve } from "path"
import * as zlib from "zlib"

import {
  Configuration,
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  ProgressPlugin,
} from "webpack"

import { AngularCompilerPlugin, PLATFORM } from "@ngtools/webpack"
import { SuppressExtractedTextChunksWebpackPlugin } from "@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin"

import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as TerserWebpackPlugin from "terser-webpack-plugin"
import * as CompressionWebpackPlugin from "compression-webpack-plugin"

const PATH = (...p: Array<string>) => resolve(__dirname, ...p)
const PKG = require("./package.json")
const isProduction = process.env.NODE_ENV === "production"
const rxPaths = require("rxjs/_esm2015/path-mapping")

const postCSSPlugins = [
  require("postcss-import")(),
  require("autoprefixer")(),
  require("postcss-csso")(),
]

export default {
  name: PKG.name,

  mode: isProduction ? "production" : "development",
  target: "web",

  context: PATH("./src"),

  entry: {
    main: PATH("./src/main.ts"),
    styles: PATH("./src/styles/index.css"),
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    mainFields: ["es2015", "browser", "module", "main"],
    symlinks: true,
    alias: {
      ...rxPaths(),
    },
  },

  output: {
    path: PATH("./artifacts"),
    publicPath: "/",
    filename: `js/${isProduction ? "[id].[hash:10]" : "[name]"}.js`,
    crossOriginLoading: false,
  },

  module: {
    rules: [{
      // === HTML ===
      test: /\.html$/i,
      use: [{
        loader: "raw-loader"
      }]
    },{
      // === SVG files ===
      test: /\.svg$/,
      use: [{
        loader: "file-loader",
        options: {
          outputPath: "svg/",
          name: "[name].[ext]",
        },
      },{
        loader: "svgo-loader",
        options: {
          plugins: [
            { cleanupIDs: false },
            { convertPathData: false },
            { removeUselessDefs: false },
            { removeXMLProcInst: false },
          ]
        }
      }]
    },{
      // === Components styles ===
      test: /\.css$/i,
      exclude: [
        PATH("./src/styles"),
        PATH("./src/directives"),
        PATH("./node_modules"),
      ],
      use: [{
        loader: "raw-loader",
      },{
        loader: "postcss-loader",
        options: {
          ident: "main",
          plugins: postCSSPlugins
        }
      }]
    },{
      // === Directives styles ===
      test: /\.css$/i,
      include: [
        PATH("./src/directives"),
      ],
      use: [{
        loader: "style-loader",
      },{
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
        },
      },{
        loader: "postcss-loader",
        options: {
          ident: "main",
          plugins: postCSSPlugins
        }
      }]
    },{
      // === Main page styles ===
      test: /\.css$/i,
      include: [
        PATH("./src/styles"),
        PATH("./node_modules"),
      ],
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },{
        loader: "css-loader",
        options: {
          importLoaders: 1
        }
      },{
        loader: "postcss-loader",
        options: {
          ident: "main",
          plugins: postCSSPlugins
        }
      }]
    },{
      test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      parser: { system: true }
    },{
      test: /\.js$/,
      use: [{
        loader: "@angular-devkit/build-optimizer/webpack-loader",
      }]
    },{
      test: /\.js$/,
      exclude: /(ngfactory|ngstyle).js$/,
      enforce: "pre",
    },{
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: [{
        loader: "@angular-devkit/build-optimizer/webpack-loader",
      },{
        loader: "@ngtools/webpack"
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

    new DefinePlugin({
      DEFINE_APP_NAME: JSON.stringify(PKG.name),
      DEFINE_APP_VERSION: JSON.stringify(PKG.version),
      DEFINE_DEBUG: JSON.stringify(!isProduction),
    }),

    new AngularCompilerPlugin({
      entryModule: PATH("./src/app.module#AppModule"),
      mainPath: PATH("./src/main.ts"),
      platform: PLATFORM.Browser,
      sourceMap: true,
      tsConfigPath: PATH("./tsconfig.json"),
    }),

    new MiniCssExtractPlugin({
      filename: `css/${isProduction ? "[id].[hash:10]" : "[name]"}.css`,
    }),

    new SuppressExtractedTextChunksWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: PATH("./src/index.html"),
      inject: "head",
      chunksSortMode: "manual",
      chunks: ["vendor", "common", "styles", "main"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    new CopyWebpackPlugin([{
      from: PATH("./favicon"),
      ignore: [".*"],
    },{
      from: PATH("./manifest.json"),
      transform(content) {
        return JSON.stringify(JSON.parse(String(content)))
      },
    },{
      from: PATH("./data"),
    }]),

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
    new HotModuleReplacementPlugin()
  ]),

  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: {
      name: "vendor"
    },
    splitChunks: {
      maxAsyncRequests: Infinity,
      cacheGroups: {
        default: {
          chunks: "async",
          minChunks: 2,
          priority: 10,
        },
        common: {
          name: "common",
          chunks: "async",
          minChunks: 1,
          enforce: true,
          priority: 5,
        },
        vendors: false,
        vendor: {
          name: "vendor",
          chunks: "initial",
          enforce: true,
          test: (module, chunks) => {
            const moduleName = module.nameForCondition ? module.nameForCondition() : ""
            return /[\\/]node_modules[\\/]/.test(moduleName) &&
              !chunks.some(({ name }:{ name: string }) => name === "styles")
          },
        },
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          safari10: true,
          output: {
            ascii_only: true,
            comments: false,
          },
        },
      }),
    ],
  },

  performance: {
    hints: false,
  },

  node: false,
  devtool: isProduction ? false : "source-map",

  stats: "minimal",

  devServer: {
    clientLogLevel: "warning",
    compress: isProduction,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: !isProduction,
    progress: true,
    stats: "minimal",

    proxy: {
      "/api/training": {
        target: "http://localhost",
        pathRewrite: { "^/api/training" : "" }
      },
      "/api/recommendation": {
        target: "http://localhost",
        pathRewrite: { "^/api/recommendation" : "" }
      }
    }
  }

} as Configuration
