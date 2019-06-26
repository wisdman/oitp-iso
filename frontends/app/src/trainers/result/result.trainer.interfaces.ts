
import {
  ITrainerConfig,
  ITrainerResult,
  ITrainingType,
} from "../interfaces"

export type IResultTrainer = "result"

export interface IResultTrainerConfig extends ITrainerConfig {
  ui: IResultTrainer
  type: ITrainingType
}

export interface IResultTrainerResult extends ITrainerResult {
  config: IResultTrainerConfig
}
