import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageFieldTrainer = "image-field"

export interface IImageFieldTrainerConfig extends ITrainerConfig {
  id: IImageFieldTrainer

  showTimeLimit: number

  items: Array<number>
}

export interface IImageFieldTrainerResult extends ITrainerResult {
  config: IImageFieldTrainerConfig
}