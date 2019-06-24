
import {
  ITrainerConfig,
  ITrainerResult,
  ITrainingType,
} from "../interfaces"

export type IResultTrainer = "result"

export interface IResultTrainerConfig extends ITrainerConfig {
  id: IResultTrainer
  type: ITrainingType
}

export interface IResultTrainerResult extends ITrainerResult {
  id: IResultTrainer
  config: IResultTrainerConfig

  success: number
  error: number
}
