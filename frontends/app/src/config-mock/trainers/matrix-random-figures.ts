import { UUID } from "../uuid"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerItem,
} from "../../trainers"

import {
  randomShapes
} from "../shape"

// function fetchFigures(): Promise<Array<string>> {
//   return fetch("/figures.json").then(response => response.json())
// }

export async function getMatrixFillingRandomFiguresTrainerConfigs({
  side,
  itemsCount,
}:{
  side: number
  itemsCount: number
}): Promise<Array<IMatrixFillingTrainerConfig>> {

  const figures = randomShapes()
  const items = figures.sort(() => Math.random() - 0.5)
                       .slice(0, itemsCount)
                       .map(shape => {
                          const item: IMatrixFillingTrainerItem = {
                            shape,
                            color: "#000000",
                            background: "#ffffff",
                          }
                          return item
                        })

  const matrix = Array.from(Array(side * side), () => Math.floor(Math.random() * items.length))

  const config: IMatrixFillingTrainerConfig =  {
    id: "matrix-filling",
    uid: new UUID(1).toString(),
    mode: "show",
    items,
    matrix
  }

  return [config, {...config, mode: "play"}]
}
