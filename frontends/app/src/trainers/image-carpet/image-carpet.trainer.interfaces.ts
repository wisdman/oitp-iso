
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageCarpetTrainer = "image-carpet"

export interface IImageCarpetTrainerConfig extends ITrainerConfig {
  id: IImageCarpetTrainer

  timeLimit: number

  mode: "show" | "play"
  carpet: string
}

export interface IImageCarpetTrainerResult extends ITrainerResult {
  id: IImageCarpetTrainer
  config: IImageCarpetTrainerConfig

  success: number
  error: number
}
