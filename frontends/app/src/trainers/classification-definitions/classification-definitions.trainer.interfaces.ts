
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IClassificationDefinitionsTrainer = "classification-definitions"

export interface IClassificationDefinitionsTrainerItem {
  definition: string
  data: string
}

export interface IClassificationDefinitionsTrainerConfig extends ITrainerConfig {
  ui: IClassificationDefinitionsTrainer

  playTimeLimit: number
  items: Array<IClassificationDefinitionsTrainerItem>
}

export interface IClassificationDefinitionsTrainerResult extends ITrainerResult {
  config: IClassificationDefinitionsTrainerConfig
  success: number
  error: number
}
