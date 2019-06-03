import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextQuestionTrainer = "text-question"

export interface ITextQuestionTrainerConfig extends ITrainerConfig {
  id: ITextQuestionTrainer

  playTimeLimit: number

  data: string
  correct: boolean
}

export interface ITextQuestionTrainerResult extends ITrainerResult {
  config: ITextQuestionTrainerConfig
}