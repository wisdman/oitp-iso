import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsQuestionWasteTrainer = "words-question-waste"

export interface IWordsQuestionWasteTrainerConfig extends ITrainerConfig {
  ui: IWordsQuestionWasteTrainer

  playTimeLimit: number

  items: Array<{
    data: string,
    correct: boolean,
  }>
}

export interface IWordsQuestionWasteTrainerResult extends ITrainerResult {
  config: IWordsQuestionWasteTrainerConfig
}