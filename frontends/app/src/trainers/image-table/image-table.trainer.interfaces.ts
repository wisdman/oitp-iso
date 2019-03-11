
import {
  IImage,
  ITrainerConfig,
  ITrainerResult,
  IСell,
} from "../interfaces"

export type IImageTableTrainer = "image-table"
export type IImageTableCell = IСell<IImage>

export interface IImageTableTrainerConfig extends ITrainerConfig {
  id: IImageTableTrainer

  columns: number
  rows: number

  items: Array<IImage>
  matrix: Array<number>

  isGameMode: boolean
}

export interface IImageTableTrainerResult extends ITrainerResult {
  config: IImageTableTrainerConfig
}
