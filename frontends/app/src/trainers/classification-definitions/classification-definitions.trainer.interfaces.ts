
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
  id: IClassificationDefinitionsTrainer

  timeLimit: number
  items: Array<IClassificationDefinitionsTrainerItem>
}

export interface IClassificationDefinitionsTrainerResult extends ITrainerResult {
  id: IClassificationDefinitionsTrainer
  config: IClassificationDefinitionsTrainerConfig

  success: number
  error: number
}
