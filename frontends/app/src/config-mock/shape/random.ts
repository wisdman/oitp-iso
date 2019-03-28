
import {
  Poligon,
  Ellipse,
} from "./shape"

const TYPES = ["triangle", "square", "parallelogram", "polygon", "ellipse"]

// ======= Random functions ======

function RandomInt(min: number = 0, max?: number) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const PALETTE = [
  "#004499",
  "#EEEE00",
  "#00CC00",
  "#DD0000",
  "#00BBFF",
  "#FF6403",
  "#F20884",
  "#808080",
  "#562C05",
]

export function ShuffleArray<T>(arr: Array<T>, copy: boolean = true): Array<T> {
  return copy ? ShuffleArray(Array.from(arr), false) : arr.sort(() => Math.random() - 0.5)
}

export function randomShapes() {

  return ShuffleArray(TYPES)
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
          .map( s => s.getImage() )
}