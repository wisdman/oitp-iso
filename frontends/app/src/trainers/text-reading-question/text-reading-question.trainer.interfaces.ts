import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextReadingQuestionTrainer = "text-reading-question"

export interface ITextReadingQuestionTrainerConfig extends ITrainerConfig {
  ui: ITextReadingQuestionTrainer

  playTimeLimit: number

  data: string
  correct: boolean
}

export interface ITextReadingQuestionTrainerResult extends ITrainerResult {
  config: ITextReadingQuestionTrainerConfig
}