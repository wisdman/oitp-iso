
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITableWordsTrainer = "table-words"

export interface ITableWordsTrainerConfig extends ITrainerConfig {
  id: ITableWordsTrainer

  playTimeLimit: number

  title: string
  runes: Array<string>
}

export interface ITableWordsTrainerResult extends ITrainerResult {
  id: ITableWordsTrainer
  config: ITableWordsTrainerConfig

  success: number
  error: number
}
