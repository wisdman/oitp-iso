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

function fetchMatrixs(): Promise<Array<Array<number>>> {
  return fetch("/matrixs.json").then(response => response.json())
}

export async function getMatrixFillingFiguresTrainerConfigs({
  side,
}:{
  side: number
}): Promise<Array<IMatrixFillingTrainerConfig>> {

  const matrixs = await fetchMatrixs()
  const matrix = matrixs
                  .filter(M => Math.sqrt(M.length) === side)
                  .sort(() => Math.random() - 0.5)[0]

  const figures = randomShapes()

  const items = matrix.filter((v, idx, self) => idx === self.indexOf(v))
                      .map(i => {
                        const item: IMatrixFillingTrainerItem = {
                          shape: figures[i],
                          color: "#776e65",
                          background: "#eee4da",
                        }
                        return item
                      })

  const config: IMatrixFillingTrainerConfig =  {
    id: "matrix-filling",
    uid: new UUID(1).toString(),
    mode: "show",
    items,
    matrix
  }

  return [config, {...config, mode: "play"}]
}
