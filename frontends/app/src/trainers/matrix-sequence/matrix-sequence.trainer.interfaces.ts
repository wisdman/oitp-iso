
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixSequenceTrainer = "matrix-sequence"

export interface IMatrixSequenceTrainerConfig extends ITrainerConfig {
  id: IMatrixSequenceTrainer

  playTimeLimit: number

  matrix: Array<number>
  showSucess?: boolean
}

export interface IMatrixSequenceTrainerResult extends ITrainerResult {
  id: IMatrixSequenceTrainer
  config: IMatrixSequenceTrainerConfig
  success: number
  error: number
}
