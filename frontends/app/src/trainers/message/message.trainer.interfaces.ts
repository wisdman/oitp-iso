
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IMessageTrainer = "message"

export interface IMessageTrainerConfig extends ITrainerConfig {
  id: IMessageTrainer
  header: string
  text: Array<string>
  button: string
}

export interface IMessageTrainerResult extends ITrainerResult {
  config: IMessageTrainerConfig
}
