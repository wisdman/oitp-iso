
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IRelaxTrainer = "relax"

export interface IRelaxTrainerConfig extends ITrainerConfig {
  id: IRelaxTrainer

  image: number
  text: string

  timeLimit: number
}

export interface IRelaxTrainerResult extends ITrainerResult {
  id: IRelaxTrainer
  config: IRelaxTrainerConfig
}
