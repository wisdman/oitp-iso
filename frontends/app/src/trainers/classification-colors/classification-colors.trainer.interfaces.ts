
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationColorsTrainer = "classification-colors"

export interface IClassificationColorsTrainerItem {
  color: string,
  data: string,
}

export interface IClassificationColorsTrainerConfig extends ITrainerConfig {
  ui: IClassificationColorsTrainer

  itemTimeLimit: number
  items: Array<IClassificationColorsTrainerItem>
}

export interface IClassificationColorsTrainerResult extends ITrainerResult {
  config: IClassificationColorsTrainerConfig
  success: number
  error: number
}
