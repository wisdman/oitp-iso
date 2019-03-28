const FS = require("fs")
const { extname, join } = require("path")
const { PNG } = require("pngjs")
const BlinkDiff = require("blink-diff")


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

function getHorizontalLines(image) {
  const lines = []
  for (let y = 0; y < image.height; y++) {
    let everyNotWhite = true
    for (let x = 0; x < image.width; x++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r > 250 || g > 250 || b > 250) {
        everyNotWhite = false
        break;
      }
    }
    if (everyNotWhite) {
      let prev = lines.pop()
      if (prev !== undefined && prev !== y - 1 && prev !== y - 2 && prev !== y - 3) {
        lines.push(prev)
      }
      lines.push(y)
    }
  }

  return lines
}

function getVerticalLines(image) {
  const lines = []
  for (let x = 0; x < image.width; x++) {
    let everyNotWhite = true
    for (let y = 0; y < image.height; y++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r > 250 || g > 250 || b > 250) {
        everyNotWhite = false
        break;
      }
    }
    if (everyNotWhite) {
      let prev = lines.pop()
      if (prev !== undefined && prev !== x - 1 && prev !== x - 2 && prev !== x - 3) {
        lines.push(prev)
      }
      lines.push(x)
    }
  }

  return lines
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

function getTop(image) {
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r < 250 || g < 250 || b < 250) {
        return y
      }
    }
  }
}

function getBottom(image) {
  for (let y = image.height-1; y >= 0; y--) {
    for (let x = 0; x < image.width; x++) {
      const [r,g,b] = getPixel(image, x, y)
      if (r < 250 || g < 250 || b < 250) {
        return y
      }
    }
  }
}

function cropImage(image) {
  const left = getLeft(image)
  const right = getRight(image)
  const top = getTop(image)
  const bottom = getBottom(image)

  if (left === undefined || top === undefined) {
    const newImage = new PNG({ width:3, height:3 })
    for (let x = 0; x < newImage.width; x++) {
      for (let y = 0; y < newImage.height; y++) {
        setPixel(newImage, x, y, [255, 0, 0, 255])
      }
    }
    return newImage
  }

  const width = right - left + 1
  const height = bottom - top + 1

  const newImage = new PNG({ width, height })
  image.bitblt(newImage, left, top, width, height, 0, 0)

  return newImage
}

async function buildImagesMatrix(path) {
  let image = await readImage(path)

  let horizontalLines = getHorizontalLines(image)
  let verticalLines = getVerticalLines(image)

  horizontalLines.forEach(y => {
    for (let x = 0; x < image.width; x++) {
      setPixel(image, x, y, [255, 0, 0, 255])
    }
  })

  verticalLines.forEach(x => {
    for (let y = 0; y < image.height; y++) {
      setPixel(image, x, y, [255, 0, 0, 255])
    }
  })

  await writeImage(image, "out.png")

  horizontalLines = horizontalLines.map((v, i, arr) => {
    if (i < arr.length - 1) {
      return [v + 1, arr[i+1] - 1]
    }
  }).filter(v => v)

  verticalLines = verticalLines.map((v, i, arr) => {
    if (i < arr.length - 1) {
      return [v + 1, arr[i+1] - 1]
    }
  }).filter(v => v)

  const size = Math.min(...horizontalLines.map(([a,b]) => b-a), ...verticalLines.map(([a,b]) => b-a))

  const matrix = []
  for (let [top] of horizontalLines) {
    for (let [left] of verticalLines) {
      let newImage = new PNG({ width:size, height:size })
      image.bitblt(newImage, left, top, size, size, 0, 0)
      newImage = cropImage(newImage)
      matrix.push(newImage)
    }
  }
  return matrix
}

async function outImages(matrix) {
  for (let i=0; i < matrix.length; i++) {
    await writeImage(matrix[i], `out/${i}.png`)
  }
}

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

function cmpImageFiles(imageAPath, imageBPath) {
  return new Promise( (resolve, reject) => {
    try {
      const diff = new BlinkDiff({
        imageAPath,
        imageBPath,
        thresholdType: BlinkDiff.THRESHOLD_PERCENT,
        threshold: 0.03, // 1% threshold
        // imageOutputPath: "out/diff.png"
      })

      diff.run((error, result) => {
        if (error) {
          reject(error)
        }
        resolve(diff.hasPassed(result.code))
      })
    } catch(error) {
      reject(error)
    }
  })
}

async function getMatrx(path) {
  const images = await buildImagesMatrix(path)

  await clearOutDir()
  await outImages(images)

  const unique = []
  label1:
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < unique.length; j++) {
      result = await cmpImageFiles(`out/${i}.png`, `out/${unique[j]}.png`)
      if (result) {
        continue label1
      }
    }
    unique.push(i)
  }

  const matrix = []
  for (let i = 0; i < images.length; i++) {
    for (let j = 0; j < unique.length; j++) {
      result = await cmpImageFiles(`out/${i}.png`, `out/${unique[j]}.png`)
      if (result) {
        matrix[i] = unique[j]
      }
    }
  }

  return matrix
}

void async function() {

  const file = process.argv[2]

  if (file === undefined) {
    return process.exit(1)
  }

  const matrix = await getMatrx(file)
  await clearOutDir()
  console.log(matrix)

}().catch(error => console.error(error))