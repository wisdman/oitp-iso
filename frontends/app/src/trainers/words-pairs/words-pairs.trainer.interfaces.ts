
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsPairsTrainer = "words-pairs"

export interface IWordsPairsTrainerConfig extends ITrainerConfig {
  id: IWordsPairsTrainer
  items: Array<Array<string>>
}

export interface IWordsPairsTrainerResult extends ITrainerResult {
  id: IWordsPairsTrainer
  config: IWordsPairsTrainerConfig
}
