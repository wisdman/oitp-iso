
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextReadingTrainer = "text-reading"

export interface ITextReadingTrainerConfig extends ITrainerConfig {
  ui: ITextReadingTrainer
  data: string
}

export interface ITextReadingTrainerResult extends ITrainerResult {
  config: ITextReadingTrainerConfig
  success: number
  error: number
}
