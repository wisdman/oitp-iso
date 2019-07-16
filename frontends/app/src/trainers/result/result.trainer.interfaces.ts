import {
  ITrainerConfig,
  ITrainingType,
} from "../interfaces"

export type IResultTrainerID = "result"
export type IResultTrainerUI = "result"

export interface IResultTrainerConfig extends ITrainerConfig {
  id: IResultTrainerID
  ui: IResultTrainerUI

  type: ITrainingType
}
