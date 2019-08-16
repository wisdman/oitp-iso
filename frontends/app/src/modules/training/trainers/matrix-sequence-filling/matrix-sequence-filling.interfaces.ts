import { ITrainerConfig } from "../interfaces"

export type IMatrixSequenceFillingID = "matrix-sequence-pattern" | "matrix-sequence-random"
export type IMatrixSequenceFillingUI = "matrix-sequence-filling"

export interface IMatrixSequenceFillingConfig extends ITrainerConfig {
  id: IMatrixSequenceFillingID
  ui: IMatrixSequenceFillingUI

  matrix: Array<number>
  showSucess?: boolean
}
