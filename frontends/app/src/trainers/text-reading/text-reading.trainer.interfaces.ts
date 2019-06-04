
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextReadingTrainer = "text-reading"

export interface ITextReadingTrainerConfig extends ITrainerConfig {
  id: ITextReadingTrainer
  data: string
}

export interface ITextReadingTrainerResult extends ITrainerResult {
  id: ITextReadingTrainer
  config: ITextReadingTrainerConfig
  success: number
  error: number
}
