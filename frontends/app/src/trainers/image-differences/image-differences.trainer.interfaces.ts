
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageDifferencesTrainer = "image-differences"

export interface IImageDifferencesTrainerConfig extends ITrainerConfig {
  id: IImageDifferencesTrainer

  timeLimit: number

  A: number,
  B: number,
  differences?: Array<string>
}

export interface IImageDifferencesTrainerResult extends ITrainerResult {
  id: IImageDifferencesTrainer
  config: IImageDifferencesTrainerConfig

  success: number
  error: number
}
