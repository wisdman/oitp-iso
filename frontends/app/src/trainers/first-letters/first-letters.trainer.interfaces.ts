
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IFirstLettersTrainer = "first-letters"

export interface IFirstLettersTrainerConfig extends ITrainerConfig {
  id: IFirstLettersTrainer
  mode: "show" | "fill"
  sentence: string
}

export interface IFirstLettersTrainerResult extends ITrainerResult {
  config: IFirstLettersTrainerConfig
}
