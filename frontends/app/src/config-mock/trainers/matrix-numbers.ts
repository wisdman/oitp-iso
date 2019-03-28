import { UUID } from "../uuid"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerItem,
} from "../../trainers"

function fetchMatrixs(): Promise<Array<Array<number>>> {
  return fetch("/matrixs-numbers.json").then(response => response.json())
}

export async function getMatrixSequenceNumbersTrainerConfigs({
  side,
  colors,
}:{
  side: number
  colors?: boolean
}): Promise<IMatrixSequenceTrainerConfig> {

  const matrixs = await fetchMatrixs()
  let matrix = matrixs.sort(() => Math.random() - 0.5)
                      .filter(M => Math.sqrt(M.length) === side)
                      .sort(() => Math.random() - 0.5)[0]
                       .map(value => {
                          const item: IMatrixSequenceTrainerItem = {
                            value,
                            color: "#776e65",
                            background: "#ffffff",
                          }
                          return item
                        })

  if (colors) {
    console.log(colors)
  }

  return {
    id: "matrix-sequence",
    uid: new UUID(1).toString(),
    matrix,
  }

}
