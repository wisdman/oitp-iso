import { createServer } from "http"
import { lstatSync, readdirSync, readFile } from "fs"
import { join, extname } from "path"

const root = __dirname

const isSVG = (name: string) => /\.svg/i.test(extname(name))

const dirs = readdirSync(root)
              .map(name => ({name, path: join(root, name)}))
              .filter(({ path }) => lstatSync(path).isDirectory())
              .map(({name, path}) => {
                const svgs = readdirSync(path).filter(isSVG)
                return { name, path, svgs }
              })

const content = dirs
                .map(({ name, svgs }) => {
                  const images = svgs.map(svg => `<img src="${join(name, svg)}" alt="${svg}" title="${svg}">`).join("")
                  return `<section><h1>${name}</h1>${images}</section>`
                }).join("")

const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <title>Icons</title>
  <style type="text/css">
    section {
      display: flex;
      flex-wrap: wrap;
    }
    h1 {
      flex: 0 0 100%;
      margin: 24px 0 0 0;
      font-family: sans-serif;
      font-size: 24px;
      line-height: 1;
      text-transform: uppercase;
      text-align: center;
    }
    img {
      margin: 16px 16px 0 0;
      width: 64px;
      height: 64px;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`

const srv = createServer((request, response) => {
  if (!request.url || request.url === "" || request.url === "/" || request.url === "index.html") {
    response.setHeader("Content-Type", "text/html")
    response.end(HTML)
    return
  }

  const path = join(__dirname, request.url)
  readFile(path, (error, content) => {
    if (error) {
      if(error.code == "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/plain" })
        response.end("404", "utf-8")
        return
      }

      response.writeHead(500, { "Content-Type": "text/plain" })
      response.end("500", "utf-8")
      console.error(error)
      return
    }

    const contentType = isSVG(path) ? "image/svg+xml" : "application/octet-stream"

    response.writeHead(200, { "Content-Type": contentType })
    response.end(content, "utf-8")
  })
})

srv.listen(8080, "localhost", () => {
  const {address, port} = srv.address() as any
  console.log(`http://${address}:${port}`)
})
