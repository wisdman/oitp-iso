
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type INumberTableTrainer = "number-table"

export type INumberTableTrainerItem = {
  value: number
  color?: string
  success?: boolean
  error?: boolean
}

export type INumberTableTrainerMatrix = Array<INumberTableTrainerItem>

export interface INumberTableTrainerConfig extends ITrainerConfig {
  id: INumberTableTrainer

  columns: number
  rows: number
  last: number

  matrix: INumberTableTrainerMatrix
}

export interface INumberTableTrainerResult extends ITrainerResult {
  config: INumberTableTrainerConfig

  success: number
  error: number
  step: number
}
