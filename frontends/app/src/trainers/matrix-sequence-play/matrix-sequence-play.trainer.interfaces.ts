import { ITrainerConfig } from "../interfaces"

export type IMatrixSequencePlayTrainerID = "matrix-sequence-pattern" | "matrix-sequence-random"
export type IMatrixSequencePlayTrainerUI = "matrix-sequence-play"

export interface IMatrixSequencePlayTrainerConfig extends ITrainerConfig {
  id: IMatrixSequencePlayTrainerID
  ui: IMatrixSequencePlayTrainerUI

  matrix: Array<number>
  showSuccess?: boolean
}
