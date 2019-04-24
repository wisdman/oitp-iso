
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixFillingTrainer = "matrix-filling"

export interface IMatrixFillingTrainerItem {
  shape: string
}

export interface IMatrixFillingTrainerConfig extends ITrainerConfig {
  id: IMatrixFillingTrainer

  mode: "show" | "play"

  items: Array<string>
  matrix: Array<number>

  showErrors?: boolean
  showSucess?: boolean
}

export interface IMatrixFillingTrainerResult extends ITrainerResult {
  id: IMatrixFillingTrainer
  config: IMatrixFillingTrainerConfig
  success: number
  error: number
}
