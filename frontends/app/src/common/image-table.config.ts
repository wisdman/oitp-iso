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

import { Poligon, Ellipse, Shape } from "./shape"

import {
  IImageTableTrainerConfig
} from "../trainers"

const TYPES = ["triangle", "square", "parallelogram", "polygon", "ellipse"]


function getShapesImages() {
  const items: Array<Shape> = ShuffleArray(TYPES)
                .slice(0, 3)
                .map((type, i) => {
                  switch (type) {
                    case "triangle":
                      return new Poligon({
                        id: i,
                        type: "triangle",
                        width: 50,
                        side: ShuffleArray(["left","center","right"])[0] as ("left" | "center" | "right"),
                        rotate: ShuffleArray([0, 90, 180, 270])[0] as (0 | 90 | 180 | 270),
                        fill: ShuffleArray(PALETTE)[0],
                      })
                      break

                    case "square":
                      return new Poligon({
                        id: i,
                        type: "square",
                        width: 50,
                        fill: ShuffleArray(PALETTE)[0],
                      })

                    case "parallelogram":
                      return new Poligon({
                        id: i,
                        type: "parallelogram",
                        width: 50,
                        offset: 20,
                        fill: ShuffleArray(PALETTE)[0],
                      })

                    case "polygon":
                      return new Poligon({
                        id: i,
                        type: "polygon",
                        width: 50,
                        vertex: RandomInt(5, 8),
                        fill: ShuffleArray(PALETTE)[0],
                      })

                    case "ellipse":
                      const rx = ShuffleArray([15, 25])[0]
                      return new Ellipse({
                        id: i,
                        type: "ellipse",
                        rx,
                        ry: rx === 15 ? 25 : ShuffleArray([15, 25])[0],
                        fill: ShuffleArray(PALETTE)[0],
                      })
                  }

                  return new Poligon({
                        id: i,
                        type: "square",
                        width: 50,
                        fill: ShuffleArray(PALETTE)[0],
                      })
                })

  return items.map(shape => shape.getImage())
}



export async function getImageTableConfig(shapes: boolean = false): Promise<IImageTableTrainerConfig[]> {
  const columns = RandomInt(2, 5)
  const rows = RandomInt(Math.max(2, columns - 1), Math.min(5, columns + 1))

  const iconsCount = RandomInt(2, Math.min(3, columns * rows))

  const items = shapes ? getShapesImages() : (await fetchIcons(ShuffleArray(ICONS["flat"]).slice(0, iconsCount)))

  const matrix = Array.from(Array(columns * rows), () => RandomInt(0, items.length - 1))

  const config = {
    uid: new UUID(1).toString(),
    columns,
    rows,
    items,
    matrix,
  }

  return [{
    ...config,
    id: "image-table",
    isGameMode: false,
    timeLimit: 30,
  },{
    ...config,
    id: "image-table",
    isGameMode: true,
  }]
}
