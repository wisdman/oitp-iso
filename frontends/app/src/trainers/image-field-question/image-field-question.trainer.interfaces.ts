import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageFieldQuestionTrainer = "image-field-question"

export interface IImageFieldQuestionTrainerConfig extends ITrainerConfig {
  ui: IImageFieldQuestionTrainer

  playTimeLimit: number

  items: Array<{
    icon: number,
    correct: boolean,
  }>
}

export interface IImageFieldQuestionTrainerResult extends ITrainerResult {
  config: IImageFieldQuestionTrainerConfig
}