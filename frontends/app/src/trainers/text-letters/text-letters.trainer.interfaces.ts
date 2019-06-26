
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextLettersTrainer = "text-letters"

export interface ITextLettersTrainerConfig extends ITrainerConfig {
  ui: ITextLettersTrainer

  showTimeLimit: number
  playTimeLimit: number

  data: string
}

export interface ITextLettersTrainerResult extends ITrainerResult {
  config: ITextLettersTrainerConfig
  success: number
  error: number
}
