
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageFieldTrainer = "image-field"
export const ImageFieldID: IImageFieldTrainer = "image-field"

export interface IImageFieldItem {
  data: string,
  transform: string,
}

export interface IImageFieldTrainerConfig extends ITrainerConfig {
  id: IImageFieldTrainer
  items: Array<string>
  showTimeLimit: number
}

export interface IImageFieldTrainerResult extends ITrainerResult {
  config: IImageFieldTrainerConfig
}