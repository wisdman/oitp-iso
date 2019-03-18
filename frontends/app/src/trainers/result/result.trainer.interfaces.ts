
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IResultTrainer = "result"

export interface IResultTrainerConfig extends ITrainerConfig {
  id: IResultTrainer
  result: number
}

export interface IResultTrainerResult extends ITrainerResult {
  id: IResultTrainer
  config: IResultTrainerConfig
  isFinish?: true
}
