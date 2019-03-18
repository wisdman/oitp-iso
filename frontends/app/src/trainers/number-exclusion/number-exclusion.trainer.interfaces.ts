
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberExclusionTrainer = "number-exclusion"

export interface INumberExclusionTrainerConfig extends ITrainerConfig {
  id: INumberExclusionTrainer
  items: Array<number>
}

export interface INumberExclusionTrainerResult extends ITrainerResult {
  id: INumberExclusionTrainer
  config: INumberExclusionTrainerConfig
}
