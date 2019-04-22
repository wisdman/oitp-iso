
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixSequenceTrainer = "matrix-sequence"

export interface IMatrixSequenceTrainerItem {
  value: number
  color: string
  background: string
  isSuccess?: boolean
  isError?: boolean
}

export interface IMatrixSequenceTrainerConfig extends ITrainerConfig {
  id: IMatrixSequenceTrainer

  matrix: Array<number>

  showErrors?: boolean
  showSucess?: boolean
}

export interface IMatrixSequenceTrainerResult extends ITrainerResult {
  id: IMatrixSequenceTrainer
  config: IMatrixSequenceTrainerConfig
  current: number
  success: number
  error: number
}
