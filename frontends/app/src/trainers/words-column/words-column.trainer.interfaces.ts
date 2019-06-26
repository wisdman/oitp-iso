
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsColumnTrainer = "words-column"

export interface IWordsColumnTrainerConfig extends ITrainerConfig {
  ui: IWordsColumnTrainer

  playTimeLimit: number
  showTimeLimit: number

  items: Array<string>
}

export interface IWordsColumnTrainerResult extends ITrainerResult {
  config: IWordsColumnTrainerConfig
  success: number
  error: number
}
