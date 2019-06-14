
import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"

import * as CoreJSCompat from "core-js-compat"

const PATH = (...p: Array<string>) => resolve(__dirname, ...p)

const browserslistFile = PATH("browserslist")
const polyfillsFile = PATH("src/polyfills-core-js.ts")

const browserslist = readFileSync(browserslistFile).toString().split("\n")
const compat = (<any>CoreJSCompat)({ targets: browserslist })

const polyfills = (compat.list as Array<string>).map(module => {
  return `import "core-js/modules/${module}"`
}).join("\n")

writeFileSync(polyfillsFile, polyfills, "utf8")
