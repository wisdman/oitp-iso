
import { resolve, extname, parse } from "path"
import { readdirSync, readFileSync, writeFileSync } from "fs"
import { load } from "cheerio"
import { clearLine, cursorTo } from "readline"
import { createServer } from "http"

const isSVG = (name: string) => /\.svg/i.test(extname(name))

const DIE = (error: any) => {
  process.stderr.write(`${String(error)}\n`)
  process.exit(1)
}

const PROGRESS = (n: number, l: number) => {
  if(!process.stdout.isTTY) {
    return
  }

  clearLine(process.stdout, 0)
  cursorTo(process.stdout, 0)
  process.stdout.write(`${n} / ${l}${n >= l ? '\n' : ''}`)
}

void async function (){
  let [inDir, outFile] = process.argv.slice(2)

  if (!inDir) {
    return DIE("Input directory isn't set")
  }
  inDir = resolve(process.cwd(), inDir)

  if (outFile) {
    outFile = resolve(process.cwd(), outFile)
  }

  let files: Array<string>

  try {
    files = readdirSync(inDir, { withFileTypes: true })
            .filter(file => file.isFile())
            .map(({name}) => name)
            .filter(isSVG)
            .map(name => resolve(inDir,name))
  } catch (error) {
    return DIE(error)
  }

  const XML =load(
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`,
     { xmlMode: true }
  )

  let i = 0

  for (const file of files) {
    PROGRESS(++i, files.length)

    const { name } = parse(file)
    let svgData: string

    try {
      svgData = readFileSync(file, "utf8")
    } catch (error) {
      process.stderr.write(`${String(error)}\n`)
      continue
    }

    const svgNode = XML(svgData)

    const symbolNode = XML("<symbol></symbol>")
    symbolNode.attr("viewBox", svgNode.attr("viewBox"))
    symbolNode.attr("id", `i-${name}`)
    symbolNode.append(svgNode.contents())

    XML("svg").append(symbolNode)
  }

  if (outFile) {
    try {
      writeFileSync(outFile, XML.html(), "utf8")
    } catch (error) {
      DIE(error)
    }
    return
  }


  // ======= Serve icons =======


  const constent = XML("symbol")
                    .toArray()
                    .map(symbolNode => symbolNode.attribs["id"])
                    .filter(id => !!id)
                    .map(id => `<svg title="${id}"><use xlink:href="sprite.svg#${id}"></use></svg>`)
                    .join("\n")

  const HTMLData =
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <title>Icons</title>
  <style type="text/css">
    body {
      display: flex;
      flex-wrap: wrap;
      padding: 16px;
    }
    svg {
      margin: 0 16px 16px 0;
      width: 64px;
      height: 64px;
    }
  </style>
</head>
<body>
${constent}
</body>
</html>`

  const XMLData = XML.html()

  const srv = createServer((request, response) => {
    if (!request.url || /^\/?(index\.html?|)$/i.test(request.url)) {
      response.setHeader("Content-Type", "text/html")
      response.end(HTMLData)
      return
    }

    if (/^\/?sprite.svg$/i.test(request.url)) {
      response.setHeader("Content-Type", "image/svg+xml")
      response.end(XMLData)
      return
    }

    response.writeHead(404, { "Content-Type": "text/plain" })
    response.end("404", "utf-8")
  })

  srv.listen(8080, "localhost", () => {
    const {address, port} = srv.address() as any
    console.log(`http://${address}:${port}`)
  })
}()






