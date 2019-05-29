
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsTrainer = "image-expressions"

export interface IImageExpressionsTrainerPage {
  image: number
  data: string
}

export interface IImageExpressionsTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsTrainer

  showTimeLimit: number
  playTimeLimit: number

  pages: Array<IImageExpressionsTrainerPage>
}

export interface IImageExpressionsTrainerResult extends ITrainerResult {
  id: IImageExpressionsTrainer
  config: IImageExpressionsTrainerConfig

  success: number
  error: number
}
