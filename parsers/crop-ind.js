const FS = require("fs")
const { extname } = require("path")
const { PNG } = require("pngjs")

function readImage(path) {
  return new Promise(resolve => {
    FS.createReadStream(path)
      .pipe(new PNG({
        colorType: 2,
        bgColor: {
          red: 255,
          green: 255,
          blue: 255,
        }
      }))
      .on("parsed", function() { resolve(this) })
  })
}

function writeImage(image, path) {
  return new Promise(resolve => {
    image.pack()
         .pipe(FS.createWriteStream(path))
         .on("close", () => resolve())
  })
}

function getPixel(image, x, y) {
  const idx = (image.width * y + x) << 2
  const r = image.data[idx]
  const g = image.data[idx+1]
  const b = image.data[idx+2]
  const a = image.data[idx+3]
  return [r,g,b,a]
}

function setPixel(image, x, y, rgba) {
  const idx = (image.width * y + x) << 2
  image.data[idx] = rgba[0] || 0
  image.data[idx+1] = rgba[1] || 0
  image.data[idx+2] = rgba[2] || 0
  image.data[idx+3] = rgba[3] || 255
}

function getLeft(image) {
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r < 250 || g < 250 || b < 250) {
        return x
      }
    }
  }
}

function getRight(image) {
  for (let x = image.width-1; x >= 0; x--) {
    for (let y = 0; y < image.height; y++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r < 250 || g < 250 || b < 250) {
        return x
      }
    }
  }
}

function getTop(image, left, right) {
  for (let y = 0; y < image.height; y++) {
    let everyNotWhite = true
    for (let x = left; x <= right; x++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r > 250 || g > 250 || b > 250) {
        everyNotWhite = false
        break;
      }
    }
    if (everyNotWhite) {
      return y
    }
  }
}

function getBottom(image, left, right) {
  for (let y = image.height-1; y >= 0; y--) {
    let everyNotWhite = true
    for (let x = left; x <= right; x++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r > 250 || g > 250 || b > 250) {
        everyNotWhite = false
        break;
      }
    }
    if (everyNotWhite) {
      return y
    }
  }
}

function cropImage(image) {
  const left = getLeft(image)
  const right = getRight(image)
  const top = getTop(image, left, right)
  const bottom = getBottom(image, left, right)

  const width = right - left + 1
  const height = bottom - top + 1

  const newImage = new PNG({ width, height })
  image.bitblt(newImage, left, top, width, height, 0, 0)

  return newImage
}

void async function() {

  const files = FS.readdirSync("./ind/")
                  .filter(name => extname(name) === ".png")
  let i = 1
  for (let file of files) {
    const path = `./ind/${file}`
    let image = await readImage(path)
    image = cropImage(image)
    await writeImage(image, path)
    console.log(i++)
  }
}()