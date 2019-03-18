
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageTableTrainer = "image-table"

export interface IImageTableTrainerConfig extends ITrainerConfig {
  id: IImageTableTrainer

  items: Array<string>
  matrix: Array<number>
}

export interface IImageTableTrainerResult extends ITrainerResult {
  config: IImageTableTrainerConfig
}
