
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageConstructorTrainer = "image-constructor"

export interface IImageConstructorTrainerConfig extends ITrainerConfig {
  id: IImageConstructorTrainer
  matrix: Array<number>
}

export interface IImageConstructorTrainerResult extends ITrainerResult {
  config: IImageConstructorTrainerConfig
}
