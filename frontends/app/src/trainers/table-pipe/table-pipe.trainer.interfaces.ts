
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITablePipeTrainer = "table-pipe"
export const TablePipeID: ITablePipeTrainer = "table-pipe"

export type ITablePipeTrainerItemActionType = "up" | "down" | "left" | "right"

export interface ITablePipeTrainerItem {
  data: string
  action: ITablePipeTrainerItemActionType

  viewBox: string,
  width: number,
  height: number,

  fillPath: string,
  path: string,

  isSuccess: boolean,
  isError: boolean,
}

export interface ITablePipeTrainerConfig extends ITrainerConfig {
  id: ITablePipeTrainer
  items: Array<{
    data: string
    action: ITablePipeTrainerItemActionType
  }>
  matrix: Array<number>
}

export interface ITablePipeTrainerResult extends ITrainerResult {
  id: ITablePipeTrainer
  config: ITablePipeTrainerConfig
  success: number
  error: number
}
