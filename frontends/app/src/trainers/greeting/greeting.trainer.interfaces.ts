import {
  ITrainerConfig,
  ITrainerResult,
  ITrainingType,
} from "../interfaces"

export type IGreetingTrainer = "greeting"

export interface IGreetingTrainerConfig extends ITrainerConfig {
  ui: IGreetingTrainer
  type: ITrainingType
}

export interface IGreetingTrainerResult extends ITrainerResult {
  config: IGreetingTrainerConfig
  success: number
  error: number
}
