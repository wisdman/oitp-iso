
const FS = require("fs")
const { extname, join } = require("path")
SVGO = require("svgo")
cheerio = require("cheerio")

const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true
  },{
    cleanupIDs: true
  },{
    cleanupEnableBackground: true
  },{
    cleanupIDs: true
  },{
    cleanupNumericValues: true
  },{
    collapseGroups: true
  },{
    convertColors: true
  },{
    convertPathData: true
  },{
    convertShapeToPath: false // !!!
  },{
    convertStyleToAttrs: true
  },{
    convertTransform: true
  },{
    mergePaths: false // !!!
  },{
    moveElemsAttrsToGroup: false // !!!
  },{
    moveGroupAttrsToElems: true
  },{
    removeComments: true
  },{
    removeDesc: true
  },{
    removeDimensions: true
  },{
    removeDoctype: true
  },{
    removeEditorsNSData: true
  },{
    removeEmptyAttrs: true
  },{
    removeEmptyContainers: true
  },{
    removeEmptyText: true
  },{
    removeHiddenElems: true
  },{
    removeMetadata: true
  },{
    removeNonInheritableGroupAttrs: true
  },{
    removeOffCanvasPaths: true // ???
  },{
    removeRasterImages: false // ???
  },{
    removeScriptElement: true
  },{
    removeStyleElement: true
  },{
    removeTitle: true
  },{
    removeUnknownsAndDefaults: true
  },{
    removeUnusedNS: true
  },{
    removeUselessDefs: true
  },{
    removeUselessStrokeAndFill: true
  },{
    removeViewBox: false
  },{
    removeXMLNS: false // ???
  },{
    removeXMLProcInst: true
  },{
    reusePaths: false // ???
  },{
    sortAttrs: true
  }]
})


function clearOutDir() {
  return new Promise(resolve => {
    FS.readdir("out", (err, files) => {
      if (err) throw err

      for (const file of files) {
        FS.unlink(join("out", file), err => {
          if (err) throw err;
        })
      }

      resolve()
    })
  })
}


void async function() {

  await clearOutDir()

  const dirs = FS.readdirSync("carpets")
                  .filter(file => extname(file) === ".svg")

  let html = ""

  for (let file of dirs) {
    const input = `carpets/${file}`
    const {data} = await svgo.optimize(FS.readFileSync(input, "utf8"))

    const XML = cheerio.load(data, { xmlMode: true })
    XML('[width="17441"]').remove()
    XML("svg").removeAttr("fill-rule")
              .removeAttr("clip-rule")
              .removeAttr("image-rendering")
              .removeAttr("shape-rendering")
              .removeAttr("text-rendering")
              .attr("viewBox", "0 0 17441 11811")

    // const output = `out/${file}`
    // FS.writeFileSync(output, XML.html(), "utf8")
    html += XML.html()
  }

  FS.writeFileSync("carpets.html", html, "utf8")


}().catch(error => console.error(error))