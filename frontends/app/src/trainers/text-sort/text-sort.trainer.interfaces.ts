
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextSortTrainer = "text-sort"

export interface ITextSortTrainerConfig extends ITrainerConfig {
  id: ITextSortTrainer
  mode: "show" | "play"
  items: Array<string>
}

export interface ITextSortTrainerResult extends ITrainerResult {
  id: ITextSortTrainer
  config: ITextSortTrainerConfig
  success: number
  error: number
}
