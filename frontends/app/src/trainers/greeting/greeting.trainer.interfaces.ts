
import {
  ITrainerConfig,
  ITrainerResult,
  ITrainingType,
} from "../interfaces"

export type IGreetingTrainer = "greeting"

export interface IGreetingTrainerConfig extends ITrainerConfig {
  id: IGreetingTrainer
  type: ITrainingType
}

export interface IGreetingTrainerResult extends ITrainerResult {
  id: IGreetingTrainer
  config: IGreetingTrainerConfig

  success: number
  error: number
}
