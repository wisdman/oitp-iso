import {
  ITrainerConfig,
  ITrainingType,
} from "../interfaces"

export type IResultID = "result"
export type IResultUI = "result"

export interface IResultConfig extends ITrainerConfig {
  id: IResultID
  ui: IResultUI

  type: ITrainingType
  training: string
}
