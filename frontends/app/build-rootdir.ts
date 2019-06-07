import { resolve } from "path"
import * as FS from "fs"

import { minify } from "html-minifier"

const PATH = (...p: Array<string>) => resolve(__dirname, ...p)

const ARTIFACTS = PATH("./artifacts")

const ARTIFACTS_CSS = PATH("./artifacts/css")
const PUBLIC_CSS = "/css"

const ARTIFACTS_JS = PATH("./artifacts/js")
const PUBLIC_JS = "/js"

const FAVICON = PATH("./favicon")

const INDEX_HTML = PATH("./src/index.html")
const ARTIFACTS_INDEX_HTML = PATH("./artifacts/index.html")

const CHUNKS = ["runtime", "polyfills", "vendor", "common", "styles", "main"]

const MANIFEST = {
  name: "VLL",
  short_name: "VLL",
  description: "International School of Vasilieva",

  icons: [{
    src: "/favicon.svg",
    sizes: "any",
    type: "image/svg+xml"
  },{
    src: "/favicon.png",
    sizes: "196x196",
    type: "image/png"
  }],

  orientation: "portrait",
  display: "fullscreen",
  start_url: ".",

  background_color: "#3f51b5",
  theme_color: "#3f51b5",
}

void function MakeIndex() {
  let index = FS.readFileSync(INDEX_HTML, "utf8")

  // Make CSS link
  const styles = FS.readdirSync(ARTIFACTS_CSS)
                   .filter(fileName => fileName.match(/\.css$/))
                   .map(fileName => `<link href="${resolve(PUBLIC_CSS, fileName)}" rel="stylesheet">`)
                   .join("")

  // Make JS script tags
  const scriptsFiles = FS.readdirSync(ARTIFACTS_JS)
                         .filter(fileName => fileName.match(/\.js/))
  const scripts = CHUNKS.map( chunk => ({
                              es2015: scriptsFiles.find(fileName => fileName.startsWith(`${chunk}-es2015`)),
                              es5: scriptsFiles.find(fileName => fileName.startsWith(`${chunk}-es5`))
                            }))
                        .map(({es2015, es5}) => {
                          let str = ""
                          if (es2015) {
                            str += `<script src="${resolve(PUBLIC_JS, es2015)}" type="module" defer></script>`
                          }
                          if (es5) {
                            str += `<script src="${resolve(PUBLIC_JS, es5)}" nomodule defer></script>`
                          }
                          return str
                        })
                        .join("")

  index = index.replace("</head>", styles + scripts + "</head>")

  index = minify(index,{
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
  })

  FS.writeFileSync(ARTIFACTS_INDEX_HTML, index, "utf8")
}()

void function CopyFavicon() {
  const files = FS.readdirSync(FAVICON)
                  .filter(fileName => fileName.match(/\.(ico|png|svg)$/) )
                  .map(fileName => ({
                    inFile: resolve(FAVICON, fileName),
                    outFile: resolve(ARTIFACTS, fileName),
                  }))

  for (let {inFile, outFile} of files) {
    FS.writeFileSync(outFile, FS.readFileSync(inFile, "binary"), "binary")
  }
}()

void function MakeManifest() {
  const outFile = resolve(ARTIFACTS, "manifest.json")
  FS.writeFileSync(outFile, JSON.stringify(MANIFEST), "utf8")
}()
