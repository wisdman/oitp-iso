
import { resolve } from "path"
import {
  Configuration,
  DefinePlugin,
  LoaderOptionsPlugin,
  ProgressPlugin,
} from "webpack"

import { AngularCompilerPlugin, PLATFORM } from "@ngtools/webpack"
import { SuppressExtractedTextChunksWebpackPlugin } from "@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin"

import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as HtmlWebpackPlugin from "html-webpack-plugin"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
import * as PwaManifestWebpackPlugin from "webpack-pwa-manifest"
import * as TerserWebpackPlugin from "terser-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

import * as PostcssImport from "postcss-import"
import * as PostcssAutoprefixer from "autoprefixer"
import * as PostcssCSSO from "postcss-csso"

const rxPaths = require("rxjs/_esm2015/path-mapping")

const isProduction = process.env.NODE_ENV === "production"

const PKG = require("./package.json")
const PATH = (...p: Array<string>) => resolve(__dirname, ...p)

const postCSSPlugins = [
  PostcssImport(),
  PostcssAutoprefixer(),
  PostcssCSSO(),
]

export default {
  name: PKG.name,

  mode: isProduction ? "production" : "development",
  target: "web",

  context: PATH("./app"),

  entry: {
    main: PATH(`./app/main.ts`),
    polyfills: PATH("./app/polyfills.ts"),
    styles: PATH("./app/styles/index.css"),
    material: PATH("./app/styles/material.scss"),
  },

  output: {
    path: PATH("./artifacts"),
    publicPath: "/",
    filename: `js/${isProduction ? "[id].[hash:10]" : "[name]"}.js`,
    crossOriginLoading: false,
  },

  resolve: {
    extensions: [".ts", ".js", ".json"],
    mainFields: ["browser", "module", "main"],
    symlinks: true,
    alias: {
      "@common": PATH("../common"),
      ...rxPaths(),
    }
  },

  module: {
    rules: [{
      // === HTML files ===
      test: /\.html$/i,
      use: [{
        loader: "raw-loader",
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
      // === Global CSS ===
      test: /\.s?css$/i,
      include: [
        PATH("./app/styles"),
        PATH("./node_modules"),
      ],
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },{
        loader: "css-loader",
        options: {
          importLoaders: 2
        }
      },{
        loader: "postcss-loader",
        options: {
          ident: "main",
          plugins: postCSSPlugins,
        }
      },{
        loader: "sass-loader"
      }]
    },{
      // === Modules CSS ===
      test: /\.css$/i,
      exclude: [
        PATH("./app/styles"),
        PATH("./node_modules"),
      ],
      use: [{
        loader: "raw-loader",
      },{
        loader: "postcss-loader",
        options: {
          ident: "embedded",
          plugins: postCSSPlugins,
        }
      },{
        loader: "sass-loader"
      }]
    },{
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: [{
        loader: "@ngtools/webpack"
      }]
    },{
      test: /\.js$/,
      exclude: /(ngfactory|ngstyle).js$/,
      use: [{
        loader: "@angular-devkit/build-optimizer/webpack-loader",
        options: { sourceMap: true }
      }]
    },{
      test: /\.js$/,
      exclude: /(ngfactory|ngstyle).js$/,
      enforce: "pre",
      use: [{
        loader: "source-map-loader"
      }]
    },{
      test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      parser: { system: true }
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
      entryModule: PATH("./app/app.module#AppModule"),
      mainPath: PATH("./app/main.ts"),
      platform: PLATFORM.Browser,
      sourceMap: true,
      tsConfigPath: PATH("./tsconfig.json"),

    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),

    new SuppressExtractedTextChunksWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: PATH("./app/index.html"),
      inject: "head",
      chunksSortMode: "manual",
      chunks: ["runtime", "polyfills", "vendor", "material", "common", "styles", "main"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    new PwaManifestWebpackPlugin ({
      name: "ISOV LMS",
      description: PKG.description,

      start_url: ".",

      // background_color: APP_COLOR,
      // theme_color: APP_COLOR,

      display: "fullscreen",
      orientation: "landscape",

      inject: true,
      ios: true,
      fingerprints: false,
      filename: "manifest.json",
    }),

    new CopyWebpackPlugin([{
      from: PATH("./assets")
    }]),

    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: true,
    }),
  ],

  optimization: {
    noEmitOnErrors: true,
    runtimeChunk: "single",
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
            ecma: 8,
          },
        },
      }),
    ],
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
          test: (module, chunks) => {
            const moduleName = module.nameForCondition ? module.nameForCondition() : ""
            return /[\\/]node_modules[\\/]/.test(moduleName) &&
              !chunks.some(({ name }:{ name: string }) => name === "polyfills" || name === "styles")
          },
        },
      }
    },
  },

  performance: {
    hints: false,
  },

  node: false,
  devtool: isProduction ? false : "source-map",
  stats: "minimal",
} as Configuration
