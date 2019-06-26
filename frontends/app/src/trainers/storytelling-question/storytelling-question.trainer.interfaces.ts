import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IStorytellingQuestionTrainer = "storytelling-question"

export interface IStorytellingQuestionTrainerConfig extends ITrainerConfig {
  ui: IStorytellingQuestionTrainer

  playTimeLimit: number

  data: string
  correct: boolean
}

export interface IStorytellingQuestionTrainerResult extends ITrainerResult {
  config: IStorytellingQuestionTrainerConfig
}