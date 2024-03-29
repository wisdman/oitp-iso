const { readdirSync, readFileSync } = require("fs")
const { extname, join } = require("path")
const cheerio = require("cheerio")

const [,,max] = process.argv

const COLORS = {
  "alice blue":"#f0f8ff",
  "antique white":"#faebd7",
  "aqua marine":"#7fffd4",
  "aqua":"#00ffff",
  "azure":"#f0ffff",
  "beige":"#f5f5dc",
  "bisque":"#ffe4c4",
  "black":"#000000",
  "blanched almond":"#ffebcd",
  "blue violet":"#8a2be2",
  "blue":"#0000ff",
  "brown":"#a52a2a",
  "burly wood":"#deb887",
  "cadet blue":"#5f9ea0",
  "chart reuse":"#7fff00",
  "chocolate":"#d2691e",
  "coral":"#ff7f50",
  "corn flower blue":"#6495ed",
  "corn silk":"#fff8dc",
  "crimson":"#dc143c",
  "cyan":"#00ffff",
  "dark blue":"#00008b",
  "dark cyan":"#008b8b",
  "dark golden rod":"#b8860b",
  "dark gray":"#a9a9a9",
  "dark green":"#006400",
  "dark grey":"#a9a9a9",
  "dark khaki":"#bdb76b",
  "dark magenta":"#8b008b",
  "dark olive green":"#556b2f",
  "dark orange":"#ff8c00",
  "dark orchid":"#9932cc",
  "dark red":"#8b0000",
  "dark salmon":"#e9967a",
  "dark sea green":"#8fbc8f",
  "dark slate blue":"#483d8b",
  "dark slate gray":"#2f4f4f",
  "dark turquoise":"#00ced1",
  "dark violet":"#9400d3",
  "deep pink":"#ff1493",
  "deep sky blue":"#00bfff",
  "dim gray":"#696969",
  "dim grey":"#696969",
  "dodger blue":"#1e90ff",
  "firebrick":"#b22222",
  "floral white":"#fffaf0",
  "forest green":"#228b22",
  "fuchsia":"#ff00ff",
  "gainsboro":"#dcdcdc",
  "ghost white":"#f8f8ff",
  "gold":"#ffd700",
  "golden rod":"#daa520",
  "gray":"#808080",
  "green yellow":"#adff2f",
  "green":"#008000",
  "grey":"#808080",
  "honeydew":"#f0fff0",
  "hot pink":"#ff69b4",
  "indian red":"#cd5c5c",
  "indigo":"#4b0082",
  "ivory":"#fffff0",
  "khaki":"#f0e68c",
  "lavender blush":"#fff0f5",
  "lavender":"#e6e6fa",
  "lawn green":"#7cfc00",
  "lemon chiffon":"#fffacd",
  "light blue":"#add8e6",
  "light coral":"#f08080",
  "light cyan":"#e0ffff",
  "light golden rod yellow":"#fafad2",
  "light gray":"#d3d3d3",
  "light green":"#90ee90",
  "light grey":"#d3d3d3",
  "light pink":"#ffb6c1",
  "light salmon":"#ffa07a",
  "light sea green":"#20b2aa",
  "light sky blue":"#87cefa",
  "light slate gray":"#778899",
  "light steel blue":"#b0c4de",
  "light yellow":"#ffffe0",
  "lime green":"#32cd32",
  "lime":"#00ff00",
  "linen":"#faf0e6",
  "magenta":"#ff00ff",
  "maroon":"#800000",
  "medium aqua marine":"#66cdaa",
  "medium blue":"#0000cd",
  "medium orchid":"#ba55d3",
  "medium purple":"#9370db",
  "medium sea green":"#3cb371",
  "medium slate blue":"#7b68ee",
  "medium spring green":"#00fa9a",
  "medium turquoise":"#48d1cc",
  "medium violet red":"#c71585",
  "midnight blue":"#191970",
  "mint cream":"#f5fffa",
  "misty rose":"#ffe4e1",
  "moccasin":"#ffe4b5",
  "navajo white":"#ffdead",
  "navy":"#000080",
  "old lace":"#fdf5e6",
  "olive drab":"#6b8e23",
  "olive":"#808000",
  "orange red":"#ff4500",
  "orange":"#ffa500",
  "orchid":"#da70d6",
  "pale golden rod":"#eee8aa",
  "pale green":"#98fb98",
  "pale turquoise":"#afeeee",
  "pale violet red":"#db7093",
  "papaya whip":"#ffefd5",
  "peach puff":"#ffdab9",
  "peru":"#cd853f",
  "pink":"#ffc0cb",
  "plum":"#dda0dd",
  "powder blue":"#b0e0e6",
  "purple":"#800080",
  "red":"#ff0000",
  "rosy brown":"#bc8f8f",
  "royal blue":"#4169e1",
  "saddle brown":"#8b4513",
  "salmon":"#fa8072",
  "sandy brown":"#f4a460",
  "sea green":"#2e8b57",
  "sea shell":"#fff5ee",
  "sienna":"#a0522d",
  "silver":"#c0c0c0",
  "sky blue":"#87ceeb",
  "slate blue":"#6a5acd",
  "slate gray":"#708090",
  "snow":"#fffafa",
  "spring green":"#00ff7f",
  "steel blue":"#4682b4",
  "tan":"#d2b48c",
  "teal":"#008080",
  "thistle":"#d8bfd8",
  "tomato":"#ff6347",
  "turquoise":"#40e0d0",
  "violet":"#ee82ee",
  "wheat":"#f5deb3",
  "white smoke":"#f5f5f5",
  "white":"#ffffff",
  "yellow green":"#9acd32",
  "yellow":"#ffff00",
}

void async function() {

  const dirPath = join(__dirname, "carpets")
  const dirs = readdirSync(dirPath)
               .filter(file => extname(file) === ".svg")
               .sort()
               .slice(0,Number.parseInt(max))

 for (let file of dirs) {
    const filePath = join(dirPath, file)
    const data = readFileSync(filePath, "utf8")

    const XML = cheerio.load(data, { xmlMode: true })

    const viewBox = XML("svg").attr("viewBox")
    const [,,,width,height] = viewBox.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)

    const OBJ = {
      width: Number.parseInt(width),
      height: Number.parseInt(height),
      items: [],
    }

    const grps = XML("g")
    let grpID = 0

    const colorsIDS = []

    grps.each((_,g) => {

      const GRP = XML(g)
      const gfill = GRP.attr("fill")

      GRP.children("path").each((_,shape)=>{

        const _shape = XML(shape)
        let el = {type: "path"}

        // switch (el.type) {
        //   case "path":
        //     el = { ...el, d: _shape.attr("d") }
        //     break

        //   case "circle":
        //     el = {
        //       ...el,
        //       x: _shape.attr("cx"),
        //       y: _shape.attr("cy"),
        //       r: _shape.attr("r"),
        //     }
        // }

        const d = _shape.attr("d")

        let fill = (_shape.attr("fill") || gfill || "#ffffff").trim().toLowerCase()
        fill = COLORS[fill] || fill
        if ( !fill.match(/^#[0-9a-f]{6}$/) ) {
          const m = fill.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/)
          if (m) {
            fill = `#${m[1]}${m[1]}${m[2]}${m[2]}${m[3]}${m[3]}`
          } else {
            fill = "#ffffff"
          }
        }

        let colorID = colorsIDS.indexOf(fill)
        if (colorID < 0) colorID = colorsIDS.push(fill) - 1

        // group.fill = fill

        // group.push(d)
        OBJ.items.push({ type: "path", group: grpID, color: colorID, d })
      })

      grpID++
    })

    console.dir(JSON.stringify(OBJ))


    // console.dir(OBJ, { depth: null})
  }

}().catch(error => console.error(error))


