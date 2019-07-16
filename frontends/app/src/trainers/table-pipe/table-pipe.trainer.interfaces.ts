import { ITrainerConfig } from "../interfaces"

import { ISwipe } from "../../services"

export type ITablePipeTrainerID = "table-pipe"
export type ITablePipeTrainerUI = "table-pipe"

export interface ITablePipeTrainerConfig extends ITrainerConfig {
  id: ITablePipeTrainerID
  ui: ITablePipeTrainerUI

  items: Array<{
    data: string
    action: ISwipe
  }>
  matrix: Array<number>
}
