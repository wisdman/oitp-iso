
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IRelaxTrainer = "relax"

export interface IRelaxTrainerConfig extends ITrainerConfig {
  ui: IRelaxTrainer

  showTimeLimit: number

  image: number
  text: string
}

export interface IRelaxTrainerResult extends ITrainerResult {
  config: IRelaxTrainerConfig
}
