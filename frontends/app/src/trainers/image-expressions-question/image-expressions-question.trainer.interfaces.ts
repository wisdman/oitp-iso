
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsQuestionTrainer = "image-expressions-question"

export interface IImageExpressionsQuestionTrainerConfig extends ITrainerConfig {
  id: IImageExpressionsQuestionTrainer

  playTimeLimit: number

  image: number
  data: string
}

export interface IImageExpressionsQuestionTrainerResult extends ITrainerResult {
  id: IImageExpressionsQuestionTrainer
  config: IImageExpressionsQuestionTrainerConfig

  success: number
  error: number
}
