import { ITrainerConfig } from "../interfaces"

import { ISwipe } from "../../services"

export type ITablePipeID = "table-pipe"
export type ITablePipeUI = "table-pipe"

export interface ITablePipeConfig extends ITrainerConfig {
  id: ITablePipeID
  ui: ITablePipeUI

  items: Array<{
    data: string
    action: ISwipe
  }>
  matrix: Array<number>
}
