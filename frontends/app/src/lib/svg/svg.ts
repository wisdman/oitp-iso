
import { genRectangle, opsToPath } from "./generator"

export interface SVGRectangle {
  x: number
  y: number

  width: number
  height: number

  path: string
  fillPath: string
}

export function genSVGRectangle(x: number, y: number, width: number, height: number): SVGRectangle {
  const sets = genRectangle(x, y, width, height, { fill: true })

  const pathSet = sets.find(set => set.type === "path")
  const path = pathSet && opsToPath(pathSet) || ""

  const fillPathSet = sets.find(set => set.type === "fillPath")
  const fillPath = fillPathSet && opsToPath(fillPathSet) || ""

  return { x, y, width, height, path, fillPath }
}