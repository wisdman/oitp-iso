
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsTrainer = "image-expressions"

export interface IImageExpressionsTrainerItem {
  image: number
  data: string
}

export interface IImageExpressionsTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsTrainer

  showTimeLimit: number
  playTimeLimit: number

  items: Array<IImageExpressionsTrainerItem>
}

export interface IImageExpressionsTrainerResult extends ITrainerResult {
  id: IImageExpressionsTrainer
  config: IImageExpressionsTrainerConfig

  success: number
  error: number
}
