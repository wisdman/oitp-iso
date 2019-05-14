
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextReadingTrainer = "text-reading"

export interface ITextReadingTrainerConfig extends ITrainerConfig {
  id: ITextReadingTrainer
  mode: "show" | "play"
  data: string

  timeLimit: number
}

export interface ITextReadingTrainerResult extends ITrainerResult {
  id: ITextReadingTrainer
  config: ITextReadingTrainerConfig
  success: number
  error: number
}
