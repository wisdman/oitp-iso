
import {
  IImage,
  ITrainerConfig,
  ITrainerResult,
  IСell,
} from "../interfaces"

export type IIconsTableTrainer = "icons-table"
export type IIconsTableCell = IСell<IImage>

export interface IIconsTableTrainerConfig extends ITrainerConfig {
  id: IIconsTableTrainer

  mode: "show" | "fill"

  columns: number
  rows: number

  items: Array<IImage>
  matrix: Array<IIconsTableCell>
}

export interface IIconsTableTrainerResult extends ITrainerResult {
  config: IIconsTableTrainerConfig
}
