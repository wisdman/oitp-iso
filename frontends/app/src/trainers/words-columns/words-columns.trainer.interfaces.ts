
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsColumnsTrainer = "words-columns"
export const WordsColumnsTrainerID: IWordsColumnsTrainer = "words-columns"

export interface IWordsColumnsTrainerConfig extends ITrainerConfig {
  id: IWordsColumnsTrainer

  timeLimit: number
}

export interface IWordsColumnsTrainerResult extends ITrainerResult {
  id: IWordsColumnsTrainer
  config: IWordsColumnsTrainerConfig

  success: number
  error: number
}
