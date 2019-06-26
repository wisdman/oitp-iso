
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageCarpetTrainer = "image-carpet"

export interface IImageCarpetTrainerConfig extends ITrainerConfig {
  ui: IImageCarpetTrainer

  playTimeLimit: number
  showTimeLimit: number

  item: number
}

export interface IImageCarpetTrainerResult extends ITrainerResult {
  config: IImageCarpetTrainerConfig
  success: number
  error: number
}
