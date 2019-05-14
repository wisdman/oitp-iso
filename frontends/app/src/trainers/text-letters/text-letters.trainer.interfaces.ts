
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextLettersTrainer = "text-letters"

export interface ITextLettersTrainerConfig extends ITrainerConfig {
  id: ITextLettersTrainer

  timeLimit: number

  data: string
}

export interface ITextLettersTrainerResult extends ITrainerResult {
  id: ITextLettersTrainer
  config: ITextLettersTrainerConfig
  success: number
  error: number
}
