import { ITrainerConfig } from "../interfaces"

export type IMatrixSequencePlayID = "matrix-sequence-pattern" | "matrix-sequence-random"
export type IMatrixSequencePlayUI = "matrix-sequence-play"

export interface IMatrixSequencePlayConfig extends ITrainerConfig {
  id: IMatrixSequencePlayID
  ui: IMatrixSequencePlayUI

  matrix: Array<number>
  showSuccess?: boolean
}
