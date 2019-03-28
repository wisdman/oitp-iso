import { UUID } from "../uuid"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerItem,
} from "../../trainers"

const PALETTE = [
  "#004499",
  "#00CC00",
  "#DD0000",
  "#00BBFF",
  "#FF6403",
  "#F20884",
  "#808080",
  "#562C05",
]

export async function getMatrixSequenceRandomNumbersTrainerConfigs({
  side,
  colors = false,
}:{
  side: number
  colors?: boolean
}): Promise<IMatrixSequenceTrainerConfig> {

  let matrix = Array.from(Array(side * side), (_,i)=> i+1)
                    .sort(() => Math.random() - 0.5)
                    .map(value => {
                      const item: IMatrixSequenceTrainerItem = {
                        value,
                        color: colors ? PALETTE[Math.floor((value-1)/5)] : "#776e65",
                        background: "#ffffff",
                      }
                      return item
                    })

  return {
    id: "matrix-sequence",
    uid: new UUID(1).toString(),
    matrix
  }
}
