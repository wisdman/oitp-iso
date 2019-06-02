
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

import { ISwipe, IArrow } from "../../services"

export type ITablePipeTrainer = "table-pipe"

export type ITablePipeTrainerAction = ISwipe | IArrow

export interface ITablePipeTrainerConfig extends ITrainerConfig {
  id: ITablePipeTrainer

  playTimeLimit: number

  items: Array<{
    data: string
    action: ITablePipeTrainerAction
  }>
  matrix: Array<number>
}

export interface ITablePipeTrainerResult extends ITrainerResult {
  id: ITablePipeTrainer
  config: ITablePipeTrainerConfig
  success: number
  error: number
}

