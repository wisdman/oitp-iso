
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixSequenceTrainer = "matrix-sequence"

export interface IMatrixSequenceTrainerItem {
  data: number

  x: number,
  y: number,
  width: number,
  height: number,

  fillPath: string,
  path: string,

  color: string
  background: string

  isActive?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export interface IMatrixSequenceTrainerConfig extends ITrainerConfig {
  id: IMatrixSequenceTrainer

  matrix: Array<number>
  showSucess?: boolean

  timeLimit: number
}

export interface IMatrixSequenceTrainerResult extends ITrainerResult {
  id: IMatrixSequenceTrainer
  config: IMatrixSequenceTrainerConfig
  success: number
  error: number
}
