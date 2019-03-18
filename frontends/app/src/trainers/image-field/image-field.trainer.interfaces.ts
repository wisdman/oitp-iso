
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageFieldTrainer = "image-field"

export interface IImageFieldTrainerConfig extends ITrainerConfig {
  id: IImageFieldTrainer
  items: Array<string>
}

export interface IImageFieldTrainerResult extends ITrainerResult {
  config: IImageFieldTrainerConfig
}
