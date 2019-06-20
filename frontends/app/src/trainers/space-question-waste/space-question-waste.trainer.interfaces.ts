import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ISpaceQuestionWasteTrainer = "space-question-waste"

export interface ISpaceQuestionWasteTrainerConfig extends ITrainerConfig {
  id: ISpaceQuestionWasteTrainer

  playTimeLimit: number

  items: Array<{
    data: string,
    correct: boolean,
  }>
}

export interface ISpaceQuestionWasteTrainerResult extends ITrainerResult {
  config: ISpaceQuestionWasteTrainerConfig
}