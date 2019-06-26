
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITableWordsTrainer = "table-words"

export interface ITableWordsTrainerConfig extends ITrainerConfig {
  ui: ITableWordsTrainer

  playTimeLimit: number

  title: string
  runes: Array<string>
}

export interface ITableWordsTrainerResult extends ITrainerResult {
  config: ITableWordsTrainerConfig
  success: number
  error: number
}
