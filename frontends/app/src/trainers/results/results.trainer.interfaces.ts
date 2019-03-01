
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IResultsTrainer = "results"

export interface IResultsTrainerConfig extends ITrainerConfig {
  id: IResultsTrainer
  header: string
  result: number
  text: Array<string>
  button: string
}

export interface IResultsTrainerResult extends ITrainerResult {
  config: IResultsTrainerConfig
}
