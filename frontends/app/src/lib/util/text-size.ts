
let context: CanvasRenderingContext2D | null = null

const width = 100
const height = 100

void function init() {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  context = canvas.getContext("2d")
  if (!context) {
    return
  }

  context.textAlign = "left"
  context.textBaseline = "top"
}()

export function textSize(text: string, fontStyle: string): {
  height: number
  width: number
} {
  if (!context) {
    return { height: 0, width: 0 }
  }

  context.clearRect(0, 0, width, height)

  context.font = fontStyle
  context.fillText(text, 25, 10)

  const imageData = context.getImageData(0, 0, width, height).data

  let firstY: number = -1
  let lastY: number = -1;

  // find first row
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = imageData[((width * y) + x) * 4 + 3]
      if (alpha > 0) {
        firstY = y
        break
      }
    }
    if (firstY >= 0) {
      break;
    }
  }

  // find ast row
  for (let y = height; y > 0; y--) {
    for (let x = 0; x < width; x++) {
      const alpha = imageData[((width * y) + x) * 4 + 3];
      if (alpha > 0) {
        lastY = y
        break
      }
    }
    if (lastY >= 0) {
      break
    }
  }

  return {
    height: lastY - firstY,
    width: Math.ceil(context.measureText(text).width),
  }
}
