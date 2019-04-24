
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITablePipeTrainer = "table-pipe"

export type ITablePipeTrainerItemActionType = "up" | "down" | "left" | "right"

export interface ITablePipeTrainerItem {
  data: string
  action: ITablePipeTrainerItemActionType
  isSuccess?: boolean
}

export interface ITablePipeTrainerConfig extends ITrainerConfig {
  id: ITablePipeTrainer
  items: Array<ITablePipeTrainerItem>
  matrix: Array<number>

  showCurrent?: boolean
}

export interface ITablePipeTrainerResult extends ITrainerResult {
  id: ITablePipeTrainer
  config: ITablePipeTrainerConfig
  success: number
  error: number
}
