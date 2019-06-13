
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsColumnTrainer = "words-column"

export interface IWordsColumnTrainerConfig extends ITrainerConfig {
  id: IWordsColumnTrainer

  playTimeLimit: number
  showTimeLimit: number

  items: Array<string>
}

export interface IWordsColumnTrainerResult extends ITrainerResult {
  id: IWordsColumnTrainer
  config: IWordsColumnTrainerConfig

  success: number
  error: number
}
