import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsQuestionCloseTrainer = "words-question-close"

export interface IWordsQuestionCloseTrainerConfig extends ITrainerConfig {
  ui: IWordsQuestionCloseTrainer

  playTimeLimit: number

  word: string
  items: Array<{
    data: string,
    correct: boolean,
  }>
}

export interface IWordsQuestionCloseTrainerResult extends ITrainerResult {
  config: IWordsQuestionCloseTrainerConfig
}
