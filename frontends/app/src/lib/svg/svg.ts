
import {
  genEllipse,
  genRectangle,
  opsToPath,
} from "./generator"

export interface SVGRectangle {
  x: number
  y: number

  width: number
  height: number

  path: string
  fillPath: string
}

export type SVGShape = SVGRectangle

export interface SVGCircle {
  x: number
  y: number

  width: number
  height: number

  path: string
}

export function genSVGRectangle(x: number, y: number, width: number, height: number, fill: boolean = true): SVGRectangle {
  const sets = genRectangle(x, y, width, height, { fill })

  const pathSet = sets.find(set => set.type === "path")
  const path = pathSet && opsToPath(pathSet) || ""

  const fillPathSet = sets.find(set => set.type === "fillPath")
  const fillPath = fillPathSet && opsToPath(fillPathSet) || ""

  return { x, y, width, height, path, fillPath }
}

export function genSVGEllipse(x: number, y: number, width: number, height: number, fill: boolean = true) {
  const sets = genEllipse(x, y, width, height, { fill })

  const pathSet = sets.find(set => set.type === "path")
  const path = pathSet && opsToPath(pathSet) || ""

  const fillPathSet = sets.find(set => set.type === "fillPath")
  const fillPath = fillPathSet && opsToPath(fillPathSet) || ""

  return { x, y, width, height, path, fillPath }
}