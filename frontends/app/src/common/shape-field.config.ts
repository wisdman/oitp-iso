
import {
  ShuffleArray,
  RandomInt,
  RandomBoolean,
} from "./functions"

import { UUID } from "./uuid"
import { Poligon, Ellipse, Shape } from "./shape"

import {
  IShapeFieldTrainerConfig
} from "../trainers"

import {
  PALETTE
} from "./colors"

const TYPES = ["triangle", "square", "parallelogram", "polygon", "ellipse"]

export async function getImageConstructorConfig(): Promise<IShapeFieldTrainerConfig[]> {

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

  const config = {
    uid: new UUID(1).toString(),
    items,
    matrix: Array.from(Array(25), (_, i) => {
      if (i === 6 || i === 8 || i == 16 || i === 18) {
        return -1
      }

      return RandomBoolean() ? RandomInt(0, items.length - 1) : -1
    }),
  }

  return [{
    ...config,
    id: "shape-field",
    isGameMode: false,
  },{
    ...config,
    id: "shape-field",
    isGameMode: true,
  }]
}

// X X X X X
// X   X   X
// X X X X X
// X   X   X
// X X X X X