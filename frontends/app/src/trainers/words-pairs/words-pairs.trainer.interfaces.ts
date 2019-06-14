
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsPairsTrainer = "words-pairs"

export interface IWordsPairsTrainerConfig extends ITrainerConfig {
  id: IWordsPairsTrainer

  playTimeLimit: number
  showTimeLimit: number

  items: Array<[string, string]>
}

export interface IWordsPairsTrainerResult extends ITrainerResult {
  id: IWordsPairsTrainer
  config: IWordsPairsTrainerConfig

  success: number
  error: number
}
