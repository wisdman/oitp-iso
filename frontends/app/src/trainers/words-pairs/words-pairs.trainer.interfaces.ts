
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsPairsTrainer = "words-pairs"

export interface IWordsPairsTrainerConfig extends ITrainerConfig {
  ui: IWordsPairsTrainer

  playTimeLimit: number
  showTimeLimit: number

  items: Array<[string, string]>
}

export interface IWordsPairsTrainerResult extends ITrainerResult {
  config: IWordsPairsTrainerConfig
  success: number
  error: number
}
