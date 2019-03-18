
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsExclusionTrainer = "words-exclusion"

export interface IWordsExclusionTrainerConfig extends ITrainerConfig {
  id: IWordsExclusionTrainer
  items: Array<string>
}

export interface IWordsExclusionTrainerResult extends ITrainerResult {
  id: IWordsExclusionTrainer
  config: IWordsExclusionTrainerConfig
}
