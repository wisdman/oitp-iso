
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageClassificationTrainer = "image-classification"

export type IImageClassificationTrainerItem = {
  value: string,
  title: string,
}

export interface IImageClassificationTrainerConfig extends ITrainerConfig {
  id: IImageClassificationTrainer
  items: Array<IImageClassificationTrainerItem>
}

export interface IImageClassificationTrainerResult extends ITrainerResult {
  id: IImageClassificationTrainer
  config: IImageClassificationTrainerConfig
}
