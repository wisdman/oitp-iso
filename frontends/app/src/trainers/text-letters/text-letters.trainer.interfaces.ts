
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextLettersTrainer = "text-letters"

export interface ITextLettersTrainerConfig extends ITrainerConfig {
  id: ITextLettersTrainer
  mode: "show" | "play"
  sentence: string
}

export interface ITextLettersTrainerResult extends ITrainerResult {
  id: ITextLettersTrainer
  config: ITextLettersTrainerConfig
  success: number
  error: number
}
