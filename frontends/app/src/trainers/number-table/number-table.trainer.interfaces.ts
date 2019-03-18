
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberTableTrainer = "number-table"

export interface INumberTableTrainerItem {
  value: number
  background: string
}

export interface INumberTableTrainerConfig extends ITrainerConfig {
  id: INumberTableTrainer

  matrix: Array<INumberTableTrainerItem>
  last: number
}

export interface INumberTableTrainerResult extends ITrainerResult {
  id: INumberTableTrainer
  config: INumberTableTrainerConfig
  current: number,
  success: number,
  error: number,
}
