
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsTrainer = "image-expressions"
export const ImageExpressionsTrainerID: IImageExpressionsTrainer = "image-expressions"

export interface IImageExpressionsTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsTrainer

  timeLimit: number

  image: number
  data: string
}

export interface IImageExpressionsTrainerResult extends ITrainerResult {
  id: IImageExpressionsTrainer
  config: IImageExpressionsTrainerConfig

  success: number
  error: number
}
