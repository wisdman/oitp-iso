import {
  ITrainerConfig,
  ITrainingType,
} from "../interfaces"

export type IGreetingID = "greeting"
export type IGreetingUI = "greeting"

export interface IGreetingConfig extends ITrainerConfig {
  id: IGreetingID
  ui: IGreetingUI

  type: ITrainingType
}
