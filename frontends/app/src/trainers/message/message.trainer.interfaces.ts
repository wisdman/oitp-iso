
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMessageTrainer = "message"

export interface IMessageTrainerConfig extends ITrainerConfig {
  id: IMessageTrainer
  header: string
  body: string
  button: string
}

export interface IMessageTrainerResult extends ITrainerResult {
  config: IMessageTrainerConfig
}
