import {
  ITrainerConfig,
  ITrainingType,
} from "../interfaces"

export type IGreetingTrainerID = "greeting"
export type IGreetingTrainerUI = "greeting"

export interface IGreetingTrainerConfig extends ITrainerConfig {
  id: IGreetingTrainerID
  ui: IGreetingTrainerUI

  type: ITrainingType
}
