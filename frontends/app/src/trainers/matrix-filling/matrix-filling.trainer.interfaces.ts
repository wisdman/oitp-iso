import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixFillingTrainer = "matrix-filling"

export interface IMatrixFillingTrainerConfig extends ITrainerConfig {
  ui: IMatrixFillingTrainer

  showTimeLimit: number
  playTimeLimit: number

  items: Array<number>
  matrix: Array<number>
}

export interface IMatrixFillingTrainerResult extends ITrainerResult {
  config: IMatrixFillingTrainerConfig
}
