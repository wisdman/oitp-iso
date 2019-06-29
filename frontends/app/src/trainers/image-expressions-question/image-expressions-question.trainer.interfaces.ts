
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageExpressionsQuestionTrainer = "image-expressions-question"

export interface IImageExpressionsQuestionTrainerConfig extends ITrainerConfig {
  ui: IImageExpressionsQuestionTrainer

  playTimeLimit: number

  image: number
  data: string
}

export interface IImageExpressionsQuestionTrainerResult extends ITrainerResult {
  config: IImageExpressionsQuestionTrainerConfig
}
