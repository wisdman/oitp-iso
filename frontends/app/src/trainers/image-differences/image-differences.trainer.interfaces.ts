
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageDifferencesTrainer = "image-differences"

export interface IImageDifferencesTrainerConfig extends ITrainerConfig {
  ui: IImageDifferencesTrainer

  timeLimit: number

  A: number,
  B: number,
  differences?: Array<string>
}

export interface IImageDifferencesTrainerResult extends ITrainerResult {
  config: IImageDifferencesTrainerConfig
}
