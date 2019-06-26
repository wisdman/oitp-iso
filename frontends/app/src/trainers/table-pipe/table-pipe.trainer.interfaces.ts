
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

import { ISwipe } from "../../services"

export type ITablePipeTrainer = "table-pipe"

export interface ITablePipeTrainerConfig extends ITrainerConfig {
  ui: ITablePipeTrainer

  playTimeLimit: number

  items: Array<{
    data: string
    action: ISwipe
  }>
  matrix: Array<number>
}

export interface ITablePipeTrainerResult extends ITrainerResult {
  config: ITablePipeTrainerConfig
  success: number
  error: number
}

