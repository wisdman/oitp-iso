
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
  id: IClassificationColorsTrainer

  itemTimeLimit: number
  items: Array<IClassificationColorsTrainerItem>
}

export interface IClassificationColorsTrainerResult extends ITrainerResult {
  id: IClassificationColorsTrainer
  config: IClassificationColorsTrainerConfig

  success: number
  error: number
}
