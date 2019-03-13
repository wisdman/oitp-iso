import {
  RandomInt,
  ShuffleArray,
} from "./functions"

import { UUID } from "./uuid"

import {
  ICONS,
  fetchIcons,
} from "./icons"

import {
  PALETTE
} from "./colors"

import {
  getMatrix
} from "./matrix"

import { Poligon, Ellipse, Shape } from "./shape"

import {
  IImageTableTrainerConfig
} from "../trainers"

const TYPES = ["triangle", "square", "parallelogram", "polygon", "ellipse"]


function getShapesImages(j: number) {
  const pallette = ShuffleArray(PALETTE).slice(0,j)
  const items: Array<Shape> = ShuffleArray(TYPES)
                .slice(0, j)
                .map((type, i) => {
                  switch (type) {
                    case "triangle":
                      return new Poligon({
                        id: i,
                        type: "triangle",
                        width: 50,
                        side: ShuffleArray(["left","center","right"])[0] as ("left" | "center" | "right"),
                        rotate: ShuffleArray([0, 90, 180, 270])[0] as (0 | 90 | 180 | 270),
                        fill: pallette[i],
                      })
                      break

                    case "square":
                      return new Poligon({
                        id: i,
                        type: "square",
                        width: 50,
                        fill: pallette[i],
                      })

                    case "parallelogram":
                      return new Poligon({
                        id: i,
                        type: "parallelogram",
                        width: 50,
                        offset: 20,
                        fill: pallette[i],
                      })

                    case "polygon":
                      return new Poligon({
                        id: i,
                        type: "polygon",
                        width: 50,
                        vertex: RandomInt(5, 8),
                        fill: pallette[i],
                      })

                    case "ellipse":
                      const rx = ShuffleArray([15, 25])[0]
                      return new Ellipse({
                        id: i,
                        type: "ellipse",
                        rx,
                        ry: rx === 15 ? 25 : ShuffleArray([15, 25])[0],
                        fill: pallette[i],
                      })
                  }

                  return new Poligon({
                        id: i,
                        type: "square",
                        width: 50,
                        fill: pallette[i],
                      })
                })

  return items.map(shape => shape.getImage())
}



export async function getImageTableConfig(shapes: boolean = false, i: number = 5, count: number = 1): Promise<IImageTableTrainerConfig[]> {

  const matrixList = ShuffleArray(getMatrix(i))
  const patterns = matrixList.slice(0, Math.min(count, matrixList.length))

  let result: Array<IImageTableTrainerConfig> = []

  for ( let matrix of patterns ) {
     const max = Math.max(...matrix)
     const items = shapes ? getShapesImages(max) : (await fetchIcons(ShuffleArray(ICONS["flat"]).slice(0, max)))
     const config = {
      uid: new UUID(1).toString(),
      columns: i,
      rows: i,
      items,
      matrix: matrix.map(id => shapes ? id-1 : id === 0 ? 0 : id-1)
    }
    result = result.concat([{
      ...config,
      id: "image-table",
      isGameMode: false,
      timeLimit: 10,
      scale: !shapes
    },{
      ...config,
      id: "image-table",
      isGameMode: true,
      timeLimit: 60,
      scale: !shapes
    }])
  }

  return result
}
