
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixSequenceTrainer = "matrix-sequence"

export interface IMatrixSequenceTrainerConfig extends ITrainerConfig {
  ui: IMatrixSequenceTrainer

  playTimeLimit: number

  matrix: Array<number>
  showSucess?: boolean
}

export interface IMatrixSequenceTrainerResult extends ITrainerResult {
  config: IMatrixSequenceTrainerConfig
}
