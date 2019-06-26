
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsTrainer = "image-expressions"

export interface IImageExpressionsTrainerConfig extends ITrainerConfig {
  ui: IImageExpressionsTrainer

  showTimeLimit: number

  image: number
  data: string
}

export interface IImageExpressionsTrainerResult extends ITrainerResult {
  config: IImageExpressionsTrainerConfig
  success: number
  error: number
}
