import { resolve } from "path"
import * as FS from "fs"

import { minify } from "html-minifier"

const PATH = (...p: Array<string>) => resolve(__dirname, ...p)

const ARTIFACTS_CSS = PATH("./artifacts/css")
const PUBLIC_CSS = "/css"

const ARTIFACTS_JS = PATH("./artifacts/js")
const PUBLIC_JS = "/js"

const INDEX_HTML = PATH("./src/index.html")
const ARTIFACTS_INDEX_HTML = PATH("./artifacts/index.html")

const CHUNKS = [
  "runtime-es2015",
  "polyfills-es2015",
  "runtime-es5",
  "polyfills-es5",
  "vendor-es2015",
  "common-es2015",
  "styles-es2015",
  "main-es2015",
  "vendor-es5",
  "common-es5",
  "styles-es5",
  "main-es5",
]

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
                              file: scriptsFiles.find(fileName => fileName.startsWith(chunk)),
                              isModule: chunk.endsWith("es2015"),
                            }))
                        .filter(({file}) => file !== undefined)
                        .map(({file, isModule}) =>
                          `<script src="${resolve(PUBLIC_JS, file as string)}" ${isModule ? 'type="module"' : 'nomodule'} defer></script>`
                        )
                        .join("")

  index = index.replace("</head>", styles + scripts + "</head>")

  index = minify(index,{
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeComments: true,
  })

  FS.writeFileSync(ARTIFACTS_INDEX_HTML, index, "utf8")
}()
