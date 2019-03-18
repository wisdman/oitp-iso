
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageDifferencesTrainer = "image-differences"

export interface IImageDifferencesTrainerConfig extends ITrainerConfig {
  id: IImageDifferencesTrainer
  imageA: string
  imageB: string
}

export interface IImageDifferencesTrainerResult extends ITrainerResult {
  id: IImageDifferencesTrainer
  config: IImageDifferencesTrainerConfig
}
