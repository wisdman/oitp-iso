
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextPairsTrainer = "text-pairs"

export interface ITextPairsTrainerConfig extends ITrainerConfig {
  id: ITextPairsTrainer
  mode: "show" | "play"
  pairs: Array<[string, string]>
}

export interface ITextPairsTrainerResult extends ITrainerResult {
  id: ITextPairsTrainer
  config: ITextPairsTrainerConfig
  success: number
  error: number
}
