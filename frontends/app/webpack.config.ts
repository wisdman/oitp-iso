import { resolve } from "path"
import * as zlib from "zlib"

import {
  Configuration,
  ContextReplacementPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  ProgressPlugin,
  SourceMapDevToolPlugin,
} from "webpack"

import { AngularCompilerPlugin, PLATFORM } from "@ngtools/webpack"
import { SuppressExtractedTextChunksWebpackPlugin } from "@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin"

import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as TerserWebpackPlugin from "terser-webpack-plugin"
import * as CompressionWebpackPlugin from "compression-webpack-plugin"
import * as CircularDependencyPlugin from "circular-dependency-plugin"
import * as ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin"

import { ScriptTarget } from "typescript"

const isProduction = process.env.NODE_ENV === "production"
const isES5 = process.env.JS_TARGET === "ES5"

const rxPaths = require(isES5 ? "rxjs/_esm5/path-mapping.js" : "rxjs/_esm2015/path-mapping.js")

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
    main: PATH("./src/main.ts"),
    polyfills: [
      isES5 ? PATH("./src/es5-polyfills.js") : PATH("./src/safari-nomodule.js"),
      PATH("./src/polyfills.ts"),
    ],
    styles: PATH("./src/styles/index.css"),
  },

  resolve: {
    extensions: [".ts", ".mjs", ".js", ".json"],
    mainFields: [ ...(isES5 ? [] : ["es2015"]), "browser", "module", "main"],
    symlinks: true,
    alias: {
      ...rxPaths(),
      ...(isES5 ? {} : { "zone.js/dist/zone": "zone.js/dist/zone-evergreen" }),
    },
  },

  output: {
    path: PATH("./artifacts"),
    publicPath: "/",
    filename: `js/[name]-${isES5 ? "es5" : "es2015"}.[hash:10].js`,
    crossOriginLoading: false,
    futureEmitAssets: true,
  },

  module: {
    rules: [{
      // === HTML ===
      test: /\.html$/i,
      use: [{
        loader: "raw-loader"
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
    new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)/),

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

    new CircularDependencyPlugin({
      exclude: /([\\\/]node_modules[\\\/])|(ngfactory\.js$)/,
    }),

    new AngularCompilerPlugin({
      mainPath: PATH("./src/main.ts"),
      entryModule: PATH("./src/app.module#AppModule"),
      platform: PLATFORM.Browser,
      sourceMap: true,
      directTemplateLoading: true,
      nameLazyFiles: false,
      tsConfigPath: PATH("./tsconfig.json"),
      forkTypeChecker: true,
      contextElementDependencyConstructor: require("webpack/lib/dependencies/ContextElementDependency"),
      compilerOptions: {
        enableIvy: false,
        target: isES5 ? ScriptTarget.ES5 : ScriptTarget.ES2015,
      },
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:10].css",
      chunkFilename: "css/[name].[contenthash:10].css",
    }),

    new SuppressExtractedTextChunksWebpackPlugin(),

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

    new HtmlWebpackPlugin({
      template: PATH("./src/index.html"),
      inject: "head",
      chunksSortMode: "manual",
      chunks: ["runtime", "polyfills", "vendor", "common", "styles", "main"],
    }),

    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),

    new HotModuleReplacementPlugin()
  ]),

  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: "single",
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
          minChunks: 2,
          enforce: true,
          priority: 5,
        },
        vendors: false,
        vendor: {
          name: "vendor",
          chunks: "initial",
          enforce: true,
          test: (module: { nameForCondition?: Function }, chunks: Array<{ name: string }>) => {
            const moduleName = module.nameForCondition ? module.nameForCondition() : ""
            return /[\\/]node_modules[\\/]/.test(moduleName)
                && !chunks.some(({ name }) => name === "polyfills"
                                           || name === "polyfills-es5"
                                           || name === "styles"
                                )
            }
        },
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        sourceMap: false,
        cache: true,
        terserOptions: {
          ecma: isES5 ? 5 : 6,
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
    disableHostCheck: true,
    historyApiFallback: true,
    hot: !isProduction,
    progress: true,
    stats: "minimal",

    contentBase: PATH("../../nginx"),

    proxy: {
      "/api/public/progress": {
        target: "http://localhost",
        pathRewrite: { "^/api/public/progress" : "" },
      },
      "/api/auth": {
        target: "http://localhost:8081",
        pathRewrite: { "^/api/auth" : "" },
      }
    }
  }

} as Configuration
