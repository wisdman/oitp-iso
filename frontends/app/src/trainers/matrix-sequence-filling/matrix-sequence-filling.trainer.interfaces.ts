import { ITrainerConfig } from "../interfaces"

export type IMatrixSequenceFillingTrainerID = "matrix-sequence-pattern" | "matrix-sequence-random"
export type IMatrixSequenceFillingTrainerUI = "matrix-sequence-filling"

export interface IMatrixSequenceFillingTrainerConfig extends ITrainerConfig {
  id: IMatrixSequenceFillingTrainerID
  ui: IMatrixSequenceFillingTrainerUI

  matrix: Array<number>
  showSucess?: boolean
}
