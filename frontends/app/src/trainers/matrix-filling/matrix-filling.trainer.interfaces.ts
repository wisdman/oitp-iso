
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMatrixFillingTrainer = "matrix-filling"

export interface IMatrixFillingTrainerItem {
  data: string

  x: number,
  y: number,
  width: number,
  height: number,

  fillPath: string,
  path: string,
}

export interface IMatrixFillingTrainerMatrixItem {
  data: number
  userData: number

  x: number,
  y: number,
  width: number,
  height: number,

  fillPath: string,
  path: string,
}

export interface IMatrixFillingTrainerConfig extends ITrainerConfig {
  id: IMatrixFillingTrainer

  items: Array<string>
  matrix: Array<number>

  showTimeLimit: number
  playTimeLimit: number
}

export interface IMatrixFillingTrainerResult extends ITrainerResult {
  id: IMatrixFillingTrainer
  config: IMatrixFillingTrainerConfig
  success: number
  error: number
}
